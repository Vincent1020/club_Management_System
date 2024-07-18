<template>
  <div class="teacher-home">
    <!-- 頁面頭部，包括標題和導航欄 -->
    <header class="header">
      <h1>
        <router-link to="TeacherHome">
          <img src="https://cdn-icons-png.flaticon.com/512/869/869189.png" alt="">首頁
        </router-link>
      </h1>
      <nav class="nav">
        <!-- 歡迎信息 -->
        <span class="info">歡迎登入!! {{ clubName }}的{{ teacherName }} 登入</span>
        <!-- 帳號管理連結 -->
        <!--<router-link to="TeacherLogin">老師登入測試</router-link> -->
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
          <!-- 搜尋按鈕 -->
          <input type="text" v-model="searchQuery">
          <img class="search" src="https://cdn-icons-png.flaticon.com/512/954/954591.png" alt="">
        </div>
      </div>

      <!-- 使用 HTML 表格 -->
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" @change="selectAll($event)"></th>
            <th>學號</th>
            <th>班級</th>
            <th>姓名</th>
            <th>在學狀態</th>
          </tr>
        </thead>
        <tbody>
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
      teacherName: '', // 新增
      clubName: '' // 新增
    };
  },
<<<<<<< HEAD

=======
>>>>>>> 695727a45fcde5099c01c00b70f83f863f760c5f
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
        this.teacherName = data.teacherName || ''; // 設置 teacherName
        this.clubName = data.clubName || ''; // 設置 clubName
      } catch (error) {
        console.error(`無法獲取數據：${error.message}`);
      }
    },
    selectAll(event) {
      if (event.target.checked) {
        this.selected = this.tableData.map(item => item.studentId);
      } else {
        this.selected = [];
      }
    }
  },
  created() {
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
    padding: 3%; /* 內邊距 */
    display: flex; 
    justify-content: space-between; /* 兩端對齊 */
    align-items: center; /* 垂直置中 */
    color: white; /* 文字顏色 */

    img {
        width: 4vw;
        height: 8vh;
        margin-top: 1vh;
        margin-left: 4vw;
    }

    .nav {
      display: flex;
      gap: 20px; /* 元素間距 */

      a {
        color: white; /* 連結文字顏色 */
        text-decoration: none; /* 去除下劃線 */
        font-size: 30px; /* 字體大小 */

        &:hover {
          text-decoration: underline; /* 懸停效果 */
        }
      }

      .current-interface {
        position: relative; 
        font-size: 30px; 
        font-weight: bold;
        color: white; 
      }

      .current-interface::after {
        content: ""; /* 內容為空 */
        position: absolute; 
        bottom: -5px; /* 底部距離 */
        left: 0;
        right: 0;
        height: 2px; 
        background-color: white; 
        animation: blink 1.5s infinite;
      }

      .info {
        font-size: 24px;
        font-weight: bold;
        color: #ff0000; /* 跑馬燈文字顏色 */
        margin-right: 20px; /* 調整位置 */
      }
    }
  }

  /* @keyframes blink 動畫效果 */
  @keyframes blink { 
    0%, 100% {
      opacity: 1; /* 完全不透明 */
    }
    50% {
      opacity: 0.5; /* 半透明 */
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
    align-items: center;

    img {
        width: 2vw;
        height: 4vh;

        &:hover {
            cursor: pointer;
        }
    }

    .delete {
        margin-left: 4vw;
        margin-right: 55vw;
    }

    .search {
        margin-left: 1vw;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse; /* 合併邊框 */
    background-color: rgb(204, 250, 250); /* 表格背景顏色 */
  }

  th, td {
    padding: 12px; /* 單元格內邊距 */
    border: 1px solid #dddddd00; /* 單元格邊框 */
    text-align: center; /* 文字置中 */
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
}
</style>
