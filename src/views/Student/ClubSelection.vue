<template>
  <div class="club-selection">
    <!-- 頁面頭部，包括標題和導航欄 -->
    <header class="header">

      <h1><router-link to="StudentHome"><img src="https://cdn-icons-png.flaticon.com/512/869/869189.png" alt="">首頁</router-link></h1>
      <nav class="nav">

        <!-- 當前頁面指示 -->
        <span class="current-interface">學生介面-社團志願</span>
      </nav>
    </header>

    <!-- 主內容區域 -->
    <main class="main-content">
<!-- 定義了一個表單，表單中有三個下拉選單，分別對應用戶選擇的第一、第二和第三志願 --> 

      <!-- 志願選擇表單 -->
      <form @submit.prevent="submitForm" class="form">
        <!-- 第一志願 -->
        <div class="form-group">
          <label for="first-choice">第一志願</label>
          <select id="first-choice" v-model="firstChoice">
            <option value="">選擇志願</option>
            <!-- 使用 v-for 迭代可用選項 -->
            <option v-for="option in filteredOptions('firstChoice')" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <!-- 第二志願 -->
        <div class="form-group">
          <label for="second-choice">第二志願</label>
          <select id="second-choice" v-model="secondChoice">
            <option value="">選擇志願</option>
            <!-- 使用 v-for 迭代可用選項 -->
            <option v-for="option in filteredOptions('secondChoice')" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <!-- 第三志願 -->
        <div class="form-group">
          <label for="third-choice">第三志願</label>
          <select id="third-choice" v-model="thirdChoice">
            <option value="">選擇志願</option>
            <!-- 使用 v-for 迭代可用選項 -->
            <option v-for="option in filteredOptions('thirdChoice')" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <!-- 提交按鈕 -->
        <button type="submit" class="submit-button">確定</button>
<!-- 每個下拉選單的選項是通過 filteredOptions()函數過濾後得到的。當表單提交時，會觸發 submitForm 函數 --> 
      </form>
    </main>
  </div>

</template>

<script setup>
import { ref } from 'vue'; // 從 vue 引入 ref 函數

// 定義選項
const allOptions = ['管樂社', '田徑社', '美術社', '籃球社', '羽毛球社'];

// 定義三個志願的 ref 變數，初始值為空字串
const firstChoice = ref('');
const secondChoice = ref('');
const thirdChoice = ref('');

// 過濾選項的函數
function filteredOptions(choice) {
  // 獲取已選擇的志願
  const selectedOptions = [firstChoice.value, secondChoice.value, thirdChoice.value];
  // 返回過濾後的選項，排除已選擇的志願
  return allOptions.filter(option => !selectedOptions.includes(option) || option === eval(choice).value);
}
// 提交表單的函數
function submitForm() {
  // 用alert來顯示提交結果
  alert(`提交成功！您的選擇是：第一志願：${firstChoice.value}，第二志願：${secondChoice.value}，第三志願：${thirdChoice.value}`);
}
</script>

<style scoped lang="scss">
.club-selection {
  text-align: center; /* 文字置中 */
  font-family: Arial, sans-serif; /* 設置字體 */
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

      a {
        color: white; /* 連結文字顏色 */
        text-decoration: none; /* 去除下劃線 */
        font-size: 30px; /* 設置字體大小 */

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
      justify-content: space-between;
      width: 100%; 
      align-items: center; /* 確保 label 和 select 在同一行 */

      label {
        font-weight: bold;
        margin-right: 20px;
        white-space: nowrap; /* 確保 label 不會換行 */
      }

      select {
        width: 100%;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 20px;
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
