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
        <!-- 帳號管理連結 -->
        <router-link to="TeacherLogin">老師登入測試</router-link>
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
          <img class="add" src="https://cdn-icons-png.flaticon.com/512/2377/2377839.png" alt="">
          <!-- 搜尋按鈕 -->
          <input type="text">
          <img class="search" src="https://cdn-icons-png.flaticon.com/512/954/954591.png" alt="">
        </div>
      </div>

      <!-- 使用 HTML 表格 -->
      <table>
        <thead>
          <tr>
            <th>學號</th> <!--"student_id"-->
            <th>班級</th><!--"grade"-->
            <th>姓名</th><!--"name"-->       
            <th>在學狀態</th><!--"status"-->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td>{{ row.student_id }}</td>
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
// export default {
//   data() {
//     return {
//       tableData: [], // 初始化表格數據為空
//     };
//   },
//   methods: {
//     // 定義一個方法來獲取表格數據
//     async fetchTableData() {
//       try {
//         // 使用 fetch API 發送 POST 請求到后端
//         const response = await fetch('http://localhost:8080/student/search', {
//           method: 'POST', // 使用 POST 方法
//           headers: {
//             'Content-Type': 'application/json' // 設置請求頭
//           },
//           // 發送的請求體
//           body: JSON.stringify({ club_id: 1 }) 
//         });

//         // 檢查響應是否成功
//         if (!response.ok) {
//           // 如果響應不成功，丟一個錯誤
//           throw new Error(`HTTP 錯誤！狀態碼：${response.status}`);
//         }

//         // 將響應轉換為 JSON 格式
//         const data = await response.json();
//         console.log('API 返回的資料：', data); // 調試輸出
//         // 設置 tableData 為返回的數據
//         this.tableData = data.studentList || [];
//       } catch (error) {
//         // 捕捉錯誤並在控制台輸出
//         console.error(`無法獲取數據：${error.message}`);
//       }
//     }
//   },
//   // 組件創建時，調用 fetchTableData 方法獲取數據
//   created() {
//     this.fetchTableData();
//   },
// };

import location from '@/stores/location';
import { mapState, mapActions } from 'pinia'; // 這邊要import pinia的方法
export default {
    data() {   // 這邊的 data 就像前端使用者輸入完需要送資料去後端的值
        return {
          student_id:null,     
                grade:"", 
                name:"",
                status:""

        };
    },
    created() {

    },
    mounted() {

    },
    computed: {
        ...mapState(location, ['errmsg',]), // 要把值顯現出來就要在這邊貼上要顯現的方法
    },
    components: {

    },

    methods: {
        ...mapActions(location, ['lteacherIdGetClubStudent']), // 如果要在新增其他方法，就在[]中在新增要使用的方法
    }
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

    .add {
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
    background-color: rgb(46, 245, 245); /* 表格背景顏色 */
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
