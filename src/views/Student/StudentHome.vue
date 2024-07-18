<template>
  <div class="student-home">
    <!-- 頁面頭部，包括標題和導航欄 -->
    <header class="header">
      <h1>
        <router-link to="StudentHome">
          <img src="https://cdn-icons-png.flaticon.com/512/869/869189.png" alt="">首頁
        </router-link>
      </h1>
      <nav class="nav">
        <!-- 顯示學生名字 -->
        <span class="student-name">歡迎光臨!! {{ studentName }} 登入</span>
        <!-- 帳號管理連結 -->
        <router-link class="a" to="/StudentAccountManagement">帳號管理</router-link>
        <!-- 當前頁面指示 -->
        <span class="current-interface">學生介面</span>
      </nav>
    </header>

    <!-- 主內容區域 -->
    <main class="main-content">
      <!-- 社團介紹連結 ---->
      <router-link class="option" to="/ClubIntroduction">社團介紹</router-link>
      <!-- 社團志願連結 -->
      <router-link class="option" to="/ClubSelection">社團志願</router-link>
      <!-- 我的社團連結 -->
      <router-link class="option" to="/MyClub">我的社團</router-link>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentName: '', // 用於存儲學生名字
      studentId: null,
    };
  },
  methods: {
    async fetchStudentData() {
      try {
        // 從 sessionStorage 獲取 student_id
        this.studentId = JSON.parse(sessionStorage.getItem('account'));
        console.log('從 sessionStorage 取到的 account:', this.studentId);

        // 發送 POST 請求獲取學生數據
        const response = await fetch('http://localhost:8080/student/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ student_id: this.studentId })
        });

        if (!response.ok) {
          throw new Error(`HTTP 錯誤！狀態碼：${response.status}`);
        }

        const data = await response.json();
        console.log('API 返回的資料：', data);

        // 設置 studentName 為返回的學生名字
        if (data.studentList && data.studentList.length > 0) {
          this.studentName = data.studentList[0].name;
        } else {
          console.error('未找到學生資料');
        }
      } catch (error) {
        console.error(`無法獲取數據：${error.message}`);
      }
    }
  },
  created() {
    this.fetchStudentData();
  }
};
</script>

<style scoped lang="scss">
.student-home {
  text-align: center; /* 文字置中 */
  font-family: Arial, sans-serif; /* 字體 */
  height: 100vh; 
  width: 100%;
  display: flex;
  flex-direction: column;
  
  img {
    width: 4vw;
    height: 8vh;
    margin-top: 1vh;
    margin-left: 4vw;
  }

  .header {
    background-color: #87CEEB;
    padding: 3%; /* 內邊距 */
    display: flex; 
    justify-content: space-between; /* 兩端對齊 */
    align-items: center; /* 垂直置中 */
    color: white; /* 文字顏色 */
    
    .nav {
      display: flex;
      gap: 20px; /* 元素間距 */

      .student-name {
        font-size: 30px;
        font-weight: bold;
        color: white;
      }

      .a {
        color: white; /* 連結文字顏色 */
        text-decoration: none; /* 去除下劃線 */
        font-size: 30px;

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
    flex: 1; /* 使主內容區域填滿剩餘空間 */
    display: flex; 
    justify-content: center; /* 設水平居中 */
    align-items: center; /* 垂直居中 */
    gap: 8%; /* 調整元素間距 */
    background-color: #ececec; 
    width: 100%;

    .option {
      background-color: #F5F5F5; 
      padding: 50px 60px; /* 內邊距 */
      border-radius: 10px; 
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 陰影 */
      text-decoration: none; /* 去除下劃線 */
      color: black; 
      font-size: 35px; 
      transition: background-color 0.3s, transform 0.3s; /* 過渡效果 */

      &:hover {
        background-color: #a7e2a7; /* 懸停背景顏色 */
        transform: translateY(-20px); /* 懸停位移 */
      }
    }
  }
}
</style>
