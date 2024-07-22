<template>
  <div class="TeacherAccountManagement">
    <!-- 頁面頭部，包括標題和導航欄 -->
    <header class="header">
      <h1>
        <router-link to="TeacherHome">
          <img src="https://cdn-icons-png.flaticon.com/512/869/869189.png" alt="">首頁
        </router-link>
      </h1>
      <nav class="nav">
        <!-- 當前頁面指示 -->
        <span class="current-interface">老師介面-帳號管理</span>
      </nav>
    </header>

    <!-- 主內容區域 -->
    <main class="main-content">
      <div class="sidebar">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#2d2d2d"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1" style="font-size: 24px;">
            <i class="el-icon-edit"></i>
            <span slot="title">提交修改</span>
          </el-menu-item>
          <el-menu-item index="2" @click="goToForgotPassword" style="font-size: 24px;">
            <i class="el-icon-lock"></i>
            <span slot="title">更新密碼</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="form-container">
        <form @submit.prevent="submitForm" class="form">
          <div class="form-group">
            <label for="name">姓名</label>
            <input id="name" v-model="name" type="text" required>
          </div>
          <div class="form-group">
            <label for="email">e-mail</label>
            <input id="email" v-model="email" type="email" required>
          </div>
          <button type="submit" class="confirm-button">確認</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teacher_id: null, // 用於存儲教師ID
      name: '', // 用於存儲教師姓名
      email: '', // 用於存儲教師電子郵件
      pwd: '123', // 設置默認密碼
      status: '在職中', // 設置默認在職狀態
      type: '老師', // 設置默認類型
      club_id: 1 // 設置默認社團ID
    };
  },
  created() {
    // 在組件創建時從 sessionStorage 中獲取 teacher_id
    const account = sessionStorage.getItem('account');
    if (account) {
      this.teacher_id = JSON.parse(account); // 將獲取到的 teacher_id 設置到 data 中
    } else {
      console.error('教師ID未找到，請重登'); // 如果未找到 teacher_id，輸出錯誤信息
    }
  },
  methods: {
    submitForm() {
      // 確保 teacher_id 已從 sessionStorage 獲取到
      if (!this.teacher_id) {
        alert('教師ID未找到，請重登');
        return;
      }

      // 構建請求數據
      const requestData = {
        teacher_id: this.teacher_id,
        pwd: this.pwd,
        name: this.name,
        email: this.email,
        status: this.status,
        type: this.type,
        club_id: this.club_id
      };

      // 打印請求數據以進行調試
      console.log('發送的數據:', requestData);

      // 發送 POST 請求更新教師數據
      fetch('http://localhost:8080/teacherDatabase/createOrUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 設置請求的內容類型為 JSON
        },
        body: JSON.stringify(requestData), // 將請求數據轉換為 JSON 字符串
      })
        .then(response => {
          // 檢查響應是否成功
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // 如果響應不成功，拋出錯誤
          }
          return response.json(); // 將響應轉換為 JSON
        })
        .then(data => {
          alert('修改成功'); // 顯示修改成功的提示信息
          // 跳轉到 TeacherHome.vue 頁面
          this.$router.push('TeacherHome');
        })
        .catch(error => {
          console.error('錯誤:', error); // 如果請求失敗，輸出錯誤信息
        });
    },
    // 新增的跳轉到ForgotPassword.vue的方法
    goToForgotPassword() {
      this.$router.push({ path: "/login/forgotpassword" });
    }
  }
};
</script>

<style scoped lang="scss">
.TeacherAccountManagement {
  text-align: center; /* 文字置中 */
  font-family: Arial, sans-serif;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  .header {
    background-color: #87CEEB; /* 背景顏色 */
    padding: 3%;
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
      display: flex; /* 使用 flex 布局 */
      gap: 20px;

      .current-interface {
        position: relative;
        font-size: 30px;
        font-weight: bold;
        color: white;
      }

      .current-interface::after {
        content: "";
        position: absolute;
        bottom: -5px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: white;
        animation: blink 1.5s infinite;
      }
    }
  }

  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .main-content {
    flex: 1;
    display: flex;
    justify-content: center; /* 主內容居中 */
    align-items: flex-start; /* 垂直對齊 */
    background-color: #D3D3D3;/* 灰色背景 */
    width: 100%;
    color: black;
    padding-top: 2%;

    .sidebar {
      background-color: #2d2d2d;
      padding: 10px 60px 10px 60px; // 依序為 上右下左
    
      color: white;
      font-size: 24px; /* 字體放大 */
      height: calc(100vh - 150px);
      margin-top: 6.4%; /* 頂部沒有距離 */
      margin-left: 0; /* 左邊沒有距離 */
      position: fixed; /* 固定位置 */
      top: 10%; /* 頂部距離 */
      left: 0; /* 左邊距離 */
    }

    .form-container {
      background-color: #F5F5F5;
      padding: 5% 10% 10% 10%;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 60%;
      margin-left: 20%; /* 左邊距離 */
      display: flex;
      flex-direction: column;
      justify-content: center; /* 置中內容 */
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center; /* 置中內容 */
      font-size: 24px;
      width: 100%;
    }

    .form-group {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: center; /* 置中內容 */
     

      label {
        font-weight: bold;
        margin-bottom: 10px;
        white-space: nowrap;
        width: 100px;
      }

      input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 20px;
        flex: 1;
    
        
      }
    }

    .confirm-button {
      align-self: center;
      padding: 15px 30px;
      background-color: #0275d8;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 20px;
      margin-top: 40px;
    }

    .confirm-button:hover {
      background-color: #025aa5;
    }
  }
}
</style>
