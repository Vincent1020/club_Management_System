<template>
  <div class="teacher-home">
    <!-- 頁面頭部，包括標題和導航欄 -->
    <header class="header">
      <!-- 首頁連結和圖標 -->
      <h1>
        <router-link to="TeacherHome">
          <img src="https://cdn-icons-png.flaticon.com/512/869/869189.png" alt="">首頁
        </router-link>
      </h1>
      <!-- 導航欄 -->
      <nav class="nav">
        <!-- 歡迎信息 -->
        <span class="info">{{ clubName }}  {{ teacherName }} 你好!!</span>
        <!-- 帳號管理連結 -->
        <router-link to="TeacherAccountManagement">帳號管理</router-link>
        <!-- 當前頁面指示 -->
        <span class="current-interface">老師介面</span>
      </nav>
    </header>

    <!-- 主內容區域 -->
    <main class="main-content">
      <div class="area">
        <div class="function">
          <!-- 新增按鈕 -->
          <img class="delete" src="https://cdn-icons-png.flaticon.com/512/748/748138.png" alt="">
          <!-- 搜尋部分 -->
          <div class="search-section">
            <input type="text" v-model="searchQuery" placeholder="搜尋學生"> 
           <!--  v-model="searchQuery" 的雙向綁定特性。當您在搜尋輸入框中輸入內容時，searchQuery 的值會立即更新，並觸發 filteredTableData 計算屬性的重新計算，從而立即更新表格中的資料顯示。-->
            <img class="search" src="https://cdn-icons-png.flaticon.com/512/954/954591.png" alt="">
          </div>
        </div>
      </div>

      <!-- 使用 HTML 表格 -->
      <table>
        <thead>
          <tr>
            <th></th> <!-- 保留空的表頭單元格 -->
            <th>學號</th>
            <th>班級</th>
            <th>姓名</th>
            <th>在學狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in filteredTableData" :key="index">
            <td><input type="checkbox" :value="row.studentId"></td>
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
export default {
  data() {
    return {
      tableData: [], // 初始化表格數據為空
      teacherobj: {
        teacher_id: null,
        studentId: null,
        grade: '',
        name: '',
        status: ''
      },
      searchQuery: '', // 用於存儲搜索查詢
      selected: [], // 用於存儲選中的學生 ID
      teacherName: '', // 新增，用於存儲教師姓名
      clubName: '' // 新增，用於存儲社團名稱
    };
  },

  computed: {
    filteredTableData() {
      // 檢查是否存在搜索查詢
      if (this.searchQuery) {
        // 如果存在，根據搜索查詢過濾 tableData
        return this.tableData.filter(row => 
          row.name.includes(this.searchQuery) || // 檢查 row.name 是否包含搜索查詢
          row.studentId.toString().includes(this.searchQuery) // 檢查 row.studentId（轉換為字符串後）是否包含搜索查詢
        );
      }
      // 如果沒有搜索查詢，返回完整的 tableData
      return this.tableData;
    }
  },
  methods: {
    async fetchTableData() {
      try {
        // 從 sessionStorage 獲取教師帳號信息
        this.teacherobj.teacher_id = JSON.parse(sessionStorage.getItem('account'));
        console.log(this.teacherobj);

        // 發送 POST 請求以獲取表格數據
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

        // 設置表格數據
        this.tableData = data.studentList || [];
        // 設置教師姓名
        this.teacherName = data.teacherName || ''; 
        // 設置社團名稱
        this.clubName = data.clubName || ''; 
      } catch (error) {
        console.error(`無法獲取數據：${error.message}`);
      }
    }
  },
  created() {
    // 在組件創建時調用 fetchTableData 方法以獲取表格數據
    this.fetchTableData();
  },
};
</script>

<style scoped lang="scss">
.teacher-home {
  text-align: center; /* 文字置中 */
  font-family: Arial, sans-serif; /* 設置字體 */
  height: 100vh; 
  width: 100%;
  display: flex;
  flex-direction: column;

  .header {
    background-color: #87CEEB;
    padding: 20px; /* 內邊距 */
    display: flex; 
    justify-content: space-between; /* 兩端對齊 */
    align-items: center; /* 垂直置中 */
    color: white; /* 文字顏色 */

    img {
      width: 4vw;
      height: 8vh;
      margin-right: 20px;
    }

    .nav {
      display: flex;
      align-items: center;
      gap: 20px; /* 元素間距 */

      .info {
        font-size: 24px;
        font-weight: bold;
        color: #ffffff; 
      }

      a {
        color: white; /* 連結文字顏色 */
        text-decoration: none; /* 去除下劃線 */
        font-size: 24px; /* 字體大小 */

        &:hover {
          text-decoration: underline; /* 懸停效果 */
        }
      }

      .current-interface {
        font-size: 24px; 
        font-weight: bold;
        color: white; 
      }
    }
  }

  .main-content {
    flex: 1; /* 填滿剩餘空間 */
    padding: 20px; /* 內邊距 */
    background-color: #F5F5F5; /* 背景顏色 */
    color: black;
  }

  .function {
    display: flex;
    justify-content: space-between; /* 新增按鈕和搜尋部分分開佈局 */
    align-items: center;
    margin-bottom: 20px;

    img {
      width: 30px;
      height: 30px;
      cursor: pointer;
      margin-left: 5%;//左邊的icon圖案
    }

    .search-section {
      display: flex;
      align-items: center;
    }

    input[type="text"] {
      width: 200px;
      padding: 5px;
      margin-left: 10px;
      border: 1px solid #b73131;
      border-radius: 4px;
    }

    .search {
      margin-left: 5%;
      margin-right: 0%;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse; /* 合併邊框 */
    background-color: rgb(218, 247, 247); /* 表格背景顏色 */
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  th, td {
    padding: 12px; /* 單元格內邊距 */
    border: 1px solid #dddddd; /* 單元格邊框 */
    text-align: center; /* 文字置中 */
    font-size: 18px; /* 字體大小 */
  }

  th {
    background-color: #6be2fa; /* 表頭背景顏色 */
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9; /* 奇偶行交替顏色 */
  }

  tbody tr:hover {
    background-color: #f1f1f1; /* 懸停效果 */
  }

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
  }
}
</style>
