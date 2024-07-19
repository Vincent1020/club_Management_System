<template>
  <div class="student-interface">
    <!-- 頁面頭部，包括標題和導航欄 -->
    <header class="header">
      <h1><router-link to="StudentHome"><img src="https://cdn-icons-png.flaticon.com/512/869/869189.png" alt="">首頁</router-link></h1>
      
      <nav class="nav">
        <!-- 當前頁面指示 -->
        <span class="current-interface">學生介面-帳號管理</span>
      </nav>
    </header>

    <!-- 主內容區域 -->
    <main class="main-content">
      <form @submit.prevent="submitForm" class="form">
        <div class="form-group">
          <label for="name">姓名</label>
          <input id="name" v-model="name" type="text" required>
        </div>
        <div class="form-group">
          <label for="email">e-mail</label>
          <input id="email" v-model="email" type="email" required>
        </div>

        <button type="submit" class="submit-button">提交修改</button>

      </form>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 定義姓名和電子郵件的變量
const name = ref('');
const email = ref('');

// 提交表單的方法
function submitForm() {
  fetch('http://localhost:8080/student/createOrUpdate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name.value, email: email.value }),
  })
    .then(response => response.json())
    .then(data => {
      alert('修改成功');
    })
    .catch(error => {
      console.error('錯誤:', error);
    });
}
</script>

<style scoped lang="scss">
.student-interface {
  text-align: center; /* 文字置中 */
  font-family: Arial, sans-serif; /* 設置字體 */
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
    justify-content: center;
    align-items: center;
    background-color: #D3D3D3;
    width: 100%;
    color: black;
  
    .form {
      display: flex; 
      flex-direction: column;
      gap: 20px;
      align-items: flex-start;
      background-color: #F5F5F5;
      padding: 5%;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      font-size: 24px;
      width: 60%;
    }

    .form-group {
      display: flex; 
      justify-content: flex-start;
      width: 100%; 
      align-items: center;

      label {
        font-weight: bold;
        margin-right: 20px;
        white-space: nowrap;
        flex: 0 0 100px;
        text-align: right;
      }

      input {
        width: 100%;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 20px;
        flex: 1;
      }
    }

    .submit-button {
      align-self: center;
      padding: 15px 30px;
      border: none;
      border-radius: 4px;
      background-color: #5cb85c;
      color: white;
      cursor: pointer;
      font-size: 20px;

      &:hover {
        background-color: #4cae4c;
      }
    }
  }
}
</style>