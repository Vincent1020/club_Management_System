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
        <span class="current-interface">學生介面-帳號管理</span>
      </nav>
    </header>

    <!-- 主內容區域 -->
    <main class="main-content">
      <div class="sidebar">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo textword"
          background-color="#fcf5f5"
          text-color="#fff"
          active-text-color="#051dfa"> 
          <!-- 上方文字黃色 -->
          <el-menu-item class="word" index="1" style="font-size:29px">
            <i class="el-icon-edit"></i>
            <span slot="title">更新帳號</span>
          </el-menu-item>
          <el-menu-item class="word2" index="2" @click="goToForgotPassword" style="font-size: 29px;">
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
          <button type="submit" class="confirm-button">提交修改</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      student_id: null, // 用於存儲學生ID
      name: '', // 用於存儲學生姓名
      email: '', // 用於存儲學生電子郵件
    };
  },
  created() {
    // 在組件創建時從 sessionStorage 中獲取 student_id
    const account = sessionStorage.getItem('account');
    if (account) {
      this.student_id = JSON.parse(account); // 將獲取到的 student_id 設置到 data 中
    } else {
      console.error('學生ID未找到，請重新登入'); // 如果未找到 student_id，輸出錯誤信息
    }
  },
  methods: {
    submitForm() {
      // 確保 student_id 已從 sessionStorage 獲取到
      if (!this.student_id) {
        alert('學生ID未找到，請重新登入');
        return;
      }

      // 構建請求數據
      const requestData = {
        student_id: this.student_id,
        name: this.name,
        email: this.email,
        
      };

      // 打印請求數據以進行調試
      console.log('發送的數據:', requestData);

      // 發送 POST 請求更新學生數據
      fetch('http://localhost:8080/student/createOrUpdate', {
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
          // 跳轉到 StudentHome.vue 頁面
          this.$router.push('StudentHome');
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
     padding: 20px;
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
      background-color:rgba(174, 189, 204, 0.3);
      padding: 0px 0px 0px 0px; // 依序為 上右下左
      font-size: 24px; /* 字體放大 */
      height: calc(100vh - 100px);
      margin-top:46px; /* 頂部沒有距離 */
      margin-left: 0; /* 左邊沒有距離 */
      position: fixed; /* 固定位置 */
      top: 10%; /* 頂部距離 */
      left: 0; /* 左邊距離 */
      .textword{
        display: flex;
        flex-direction: column;
        align-content: center;
        background-color: #b0b9c000;
        .word{
          color: #050505;
        }
        .word2{
          color: #050505;
        }
      }
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

    .confirm-button {/*按鈕樣式 */
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

    .confirm-button:hover {/*按鈕樣式 */
      background-color: #025aa5;
    }
  }
}
</style>