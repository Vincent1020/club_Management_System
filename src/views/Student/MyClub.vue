<template>
  <div class="MyClub">
    <!-- 頁面頭部，包括標題和導航欄 -->
    <header class="header">
      <h1>
        <router-link to="StudentHome">
          <img src="https://cdn-icons-png.flaticon.com/512/869/869189.png" alt="">首頁
        </router-link>
      </h1>
      <nav class="nav">
        <!-- 當前頁面指示 -->
        <span class="current-interface">學生介面</span>
      </nav>
    </header>

    <!-- 主內容區 -->
    <main class="main-content">
      <div class="table-container">
        <table class="styled-table">
          <thead>
            <tr>
              <th>學生姓名</th>
              <th>社團編號</th>
              <th>社團名稱</th>
              <th>社團費用</th>
              <th>社團教室</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="club in tableData" :key="club.clubId">
              <td>{{ club.name }}</td>
              <td>{{ club.clubId }}</td>
              <td>{{ club.clubName }}</td>
              <td>{{ club.pay }}</td>
              <td>{{ club.classroom }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [], // 初始化 tableData 為空數組，用於存儲學生社團數據
      studentobj: {
        student_id: null, // 初始化 student_id 為 null
      },
    };
  },
  methods: {
    // 獲取學生社團數據的方法
    async fetchMyClub() {
      try {
        // 從 sessionStorage 獲取 student_id
        this.studentobj.student_id = JSON.parse(sessionStorage.getItem('account'));
        console.log('從 sessionStorage 取到的 account:', this.studentobj.student_id);

        // 發送 POST 請求獲取學生數據
        const response = await fetch('http://localhost:8080/student/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.studentobj),
        });

        // 如果響應不成功，拋出錯誤
        if (!response.ok) {
          throw new Error(`HTTP 錯誤！狀態碼：${response.status}`);
        }

        // 將響應轉換為 JSON 格式
        const data = await response.json();
        console.log('API 返回的資料：', data);

        // 設置 tableData 為返回的學生數據，如果找到學生數據則更新 tableData
        if (data.studentList && data.studentList.length > 0) {
          const student = data.studentList[0];
          console.log('學生社團編號:', student.clubId);
          this.tableData = [{
            name: student.name,
            clubId: student.clubId,
            clubName: '', // 初始化為空，稍後設置
            pay: '', // 初始化為空，稍後設置
            classroom: '', // 初始化為空，稍後設置
          }];
          await this.fetchClubDetails(student.clubId);
        } else {
          console.error('未找到學生資料');
        }
      } catch (error) {
        console.error(`無法獲取數據：${error.message}`);
      }
    },
    // 獲取社團詳細信息的方法
    async fetchClubDetails(clubId) {
      try {
        console.log('發送請求獲取社團詳細信息，club_id:', clubId);
        // 發送 POST 請求獲取社團數據
        const response = await fetch('http://localhost:8080/Club/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ club_id: clubId }),
        });

        // 如果響應不成功，拋出錯誤
        if (!response.ok) {
          throw new Error(`HTTP 錯誤！狀態碼：${response.status}`);
        }

        // 將響應轉換為 JSON 格式
        const data = await response.json();
        console.log('Club API 返回的資料：', data);

        // 設置 tableData 的詳細信息，如果找到社團數據則更新 tableData，不過這裡好像又不用設置吧
        if (data.clubList && data.clubList.length > 0) {
          const club = data.clubList[0];
          this.tableData[0].clubName = club.name || '無資料';
          this.tableData[0].pay = club.pay || '0';
          this.tableData[0].classroom = club.classroom || '無資料';
        } else {
          console.error('未找到社團資料');
        }
      } catch (error) {
        console.error(`無法獲取社團數據：${error.message}`);
      }
    }
  },
  // 組件創建時調用獲取數據的方法
  created() {
    this.fetchMyClub();
  },
};
</script>

<style scoped lang="scss">
.MyClub {
  text-align: center; /* 文字置中 */
  font-family: Arial, sans-serif; /* 字體 */
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  .header {
    background-color: #87CEEB; /* 背景顏色 */
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
        font-weight: bold; /* 字體加粗 */
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
        animation: blink 1.5s infinite; /* 應用 blink 動畫 */
      }
    }
  }

  @keyframes blink {
    0%, 100% {
      opacity: 1; /* 完全不透明 */
    }
    50% {
      opacity: 0.5; /* 半透明 */
    }
  }

  .main-content {
    flex: 1; /* 使主內容區域填滿剩餘空間 */
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    gap: 8%; /* 調整元素間距 */
    background-color: #D3D3D3;
    width: 100%;
    padding: 30px;
  }

  .table-container {
    background-color: white; /* 背景色為白色 */
    padding: 100px;
    
    // box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    width: 100%; /* 調整寬度 */
    height: 100%;
  }

  .styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 18px;
    min-width: 100%;
   
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }

  .styled-table th, .styled-table td {
    padding: 12px 15px;
  }

  .styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: center;
  }

  .styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
    background-color: #ffffff; /* 設置行背景為白色 */
  }

  .styled-table tbody tr:nth-of-type(even) {
    background-color: #ffffff; /* 保持隔行同色 */
  }

  .styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  .styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }
}
</style>
