<template>
  <div class="teacher-home">
    <!-- 頁面頭部，包括標題和導航欄 -->
    <header class="header">
      <!-- 首頁連結和圖標 -->
      <h1>
        <a href="/teacherhome">首頁</a>
        <router-link to="teacherhome">
          <img src="https://cdn-icons-png.flaticon.com/512/869/869189.png" alt="">
        </router-link>
      </h1>
      <!-- 導航欄 -->
      <nav class="nav">
        <!-- 歡迎信息 -->
        <span class="info">{{ clubName }}  {{ teacherName }} 老師你好!!</span>
        <!-- 帳號管理連結 -->
        <router-link to="TeacherAccountManagement">帳號管理</router-link>
        <!-- 登出連結 -->
        <router-link to="Login" @click="logout">登出</router-link>
      </nav>
    </header>

    <!-- 主內容區域 -->
    <main class="main-content">
      <div class="area">
        <div class="function">
          <!-- 搜尋部分 -->
          <div class="search-section">
            <input type="text" v-model="searchQuery" placeholder="搜尋學生">
            <img class="search" src="https://cdn-icons-png.flaticon.com/512/954/954591.png" alt="">
            <select v-model="selectedSemester">
              <option value="">114-1學年度</option>
           
            </select>
          </div>
          <!-- 場地租借按鈕 -->
         <a href="/teacherhome/teacherrent"> <button  class="rent">租借項目</button></a>
          <!-- 導出 Excel 按鈕 -->
          <button @click="exportToExcel" class="export-button">導出Excel</button>
        </div>
      </div>

      <!-- 使用 HTML 表格 -->
      <table>
        <thead>
          <tr>
            <th>
              <!-- 刪除圖標，點擊後刪除選中的學生 -->
              <img @click="deleteSelected" class="delete" src="https://cdn-icons-png.flaticon.com/512/748/748138.png" alt="刪除">
            </th>
            <th>學號</th>
            <th>班級</th>
            <th>姓名</th>
            <th>在學狀態</th>
          </tr>
        </thead>
        <tbody>
          <!-- 迭代表格數據，生成表格行 -->
          <tr v-for="(row, index) in filteredTableData" :key="index">
            <td><input type="checkbox" :value="row.studentId" v-model="selected"></td>
            <td>{{ row.studentId }}</td>
            <td>{{ row.grade }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.status === '在學中' ? '✔️' : '❌' }}</td>
          </tr>
        </tbody>
      </table>

    </main>
  </div>
</template>

<script>
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      tableData: [], // 儲存表格數據
      teacherobj: {
        teacher_id: null,
        studentId: null,
        grade: '',
        name: '',
        status: ''
      },
      searchQuery: '', // 儲存搜尋關鍵字
      selected: [], // 儲存選中的學生 ID
      selectedSemester: '', // 儲存選中的學期
      semesters: ['114-1學年度'], // 假設學年度選項
      teacherName: '', // 儲存老師姓名
      clubName: '', // 儲存社團名稱
      isModalOpen: false, // 控制彈跳視窗顯示
      rentalItems: [] // 租借項目列表
    };
  },

  computed: {
    // 計算屬性，根據搜尋關鍵字篩選表格數據
    filteredTableData() {
      if (this.searchQuery) {
        return this.tableData.filter(row => 
          row.name.includes(this.searchQuery) ||
          row.studentId.toString().includes(this.searchQuery)
        );
      }
      return this.tableData;
    }
  },

  methods: {
    // 從後端獲取表格數據
    async fetchTableData() {
      try {
        this.teacherobj.teacher_id = JSON.parse(sessionStorage.getItem('account'));
        console.log(this.teacherobj);

        const response = await fetch('http://localhost:8080/teacherDatabase/clubStudentData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.teacherobj)
        });

        if (!response.ok) {
          throw new Error(`HTTP 錯誤！狀態碼：${response.status}`);
        }

        const data = await response.json();
        console.log('API 返回的資料：', data);

        this.tableData = data.studentList || [];
        this.teacherName = data.teacherName || '';
        this.clubName = data.clubName || '';
        sessionStorage.setItem("teacherName",this.teacherName);
        sessionStorage.setItem("clubName",this.clubName);
      
        console.log(sessionStorage.getItem("teacherName"));
      } catch (error) {
        console.error(`無法獲取數據：${error.message}`);
      }
    },

    
  

    // 刪除選中的學生
    deleteSelected() {
      // 過濾掉選中的學生
      this.tableData = this.tableData.filter(row => !this.selected.includes(row.studentId));
      // 清空選中狀態
      this.selected = [];
    },

    // 導出表格數據為 Excel
    exportToExcel() {
      const dataToExport = this.filteredTableData.map(row => ({
        學號: row.studentId,
        班級: row.grade,
        姓名: row.name,
        在學狀態: row.status
      }));

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);

      XLSX.utils.book_append_sheet(workbook, worksheet, "學生列表");

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveExcelFile(excelBuffer, `學生列表_${this.clubName}.xlsx`);
    },

    // 保存 Excel 文件
    saveExcelFile(buffer, fileName) {
      const data = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(data);
      link.download = fileName;
      link.click();
    },

    // 登出方法，清除 sessionStorage 並跳轉到 Login 頁面
    logout() {
      sessionStorage.clear();
    }
  },

  // 組件創建時調用，獲取表格數據
  created() {
    this.fetchTableData();
  }
};
</script>

<style scoped lang="scss">
.teacher-home {
  text-align: center;
  font-family: Arial, sans-serif;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  .header {
    background-color: #87CEEB;
    padding: 20px;
    display: flex; 
    justify-content: space-between;
    align-items: center;
    color: white;

    img {
      width: 4vw;
      height: 8vh;
      margin-right: 20px;
    }

    .nav {
      display: flex;
      align-items: center;
      gap: 20px;

      .info {
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
      }

      a {
        color: white;
        text-decoration: none;
        font-size: 24px;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .main-content {
    flex: 1;
    padding: 20px;
    background-color: #F5F5F5;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .function {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .search-section {
      display: flex;
      align-items: center;
    }

    input[type="text"] {
      width: 200px;
      padding: 5px;
      border: 1px solid #b73131;
      border-radius: 4px;
    }

    .search {
      margin-left: 10px;
      width: 5%;
      height: 5%;
    }

    select {
      margin-left: 10px;
      padding: 5px;
      border: 1px solid #b73131;
      border-radius: 4px;
      font-size: 16px;
    }

    .export-button {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;

      &:hover {
        background-color: #45a049;
      }
      
    }

    .rent {
      padding: 10px 20px;
      margin-right: 2vw;
      background-color: #ffa500;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;

      &:hover {
        background-color: #ff8c00;
      }
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: #ffffff; /* 背景顏色設為白色 */
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  th, td {
    padding: 12px;
    border: 1px solid #dddddd;
    text-align: center;
    font-size: 18px;
  }

  th {
    background-color: #6be2fa;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
  }

  .delete {
    cursor: pointer;
    width: 20px;
    height: 20px;
  }

  /* 新增的 modal 彈跳視窗樣式 */
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 800px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .styled-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .styled-table th, .styled-table td {
    padding: 12px;
    border: 1px solid #dddddd;
    text-align: center;
    font-size: 18px;
  }

  .styled-table th {
    background-color: #6be2fa;
  }

  .styled-table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .styled-table tbody tr:hover {
    background-color: #f1f1f1;
  }
}
</style>
