<template>
  <div class="club-volunteer">
    <!-- 頁面頭部，包括標題和導航欄 -->
    <header class="header">
      <h1>社團志願</h1>
      <nav class="nav">
        <router-link to="/account-management">帳號管理</router-link>
        <span class="current-interface">學生介面</span>
      </nav>
    </header>

    <!-- 主內容區域 -->
    <main class="main-content">
      <form @submit.prevent="submitForm" class="form">
        <div class="form-group">
          <label for="first-choice">第一志願</label>
          <select id="first-choice" v-model="firstChoice">
            <option value="">選擇志願</option><!-- 選項我大概隨便寫一寫 -->
            <option value="1">志願 1</option>
            <option value="2">志願 2</option>
            <option value="3">志願 3</option>
          </select>
        </div>
        <div class="form-group">
          <label for="second-choice">第二志願</label>
          <select id="second-choice" v-model="secondChoice">
            <option value="">選擇志願</option>
            <option value="1">志願 1</option>
            <option value="2">志願 2</option>
            <option value="3">志願 3</option>
          </select>
        </div>
        <div class="form-group">
          <label for="third-choice">第三志願</label>
          <select id="third-choice" v-model="thirdChoice">
            <option value="">選擇志願</option>
            <option value="1">志願 1</option>
            <option value="2">志願 2</option>
            <option value="3">志願 3</option>
          </select>
        </div>
        <button type="submit" class="submit-button">確定</button>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstChoice: '',
      secondChoice: '',
      thirdChoice: ''
    };
  },
  methods: {
    submitForm() {
      // 在此處添加表單提交邏輯，但應該不用了
      alert(`提交成功！您的選擇是：第一志願：${this.firstChoice}，第二志願：${this.secondChoice}，第三志願：${this.thirdChoice}`);
    }
  }
};
</script>

<style scoped lang="scss">
.club-volunteer {
  text-align: center; /* 文字置中 */
  font-family: Arial, sans-serif; /* GPT給我的字體，我也不知這是什麼字體 */
  height: 100vh; 
  width: 100%;
  display: flex;
  flex-direction: column;
  

  .header {
    background-color: #87CEEB;
    padding: 3%; /* 內邊距 ，如果你想加寬導覽列的畫，直接在這裡加數字就好了*/
    display: flex; 
    justify-content: space-between; /* 兩端對齊 */
    align-items: center; /* 垂直置中 */
    color: white; /* 文字顏色 */

    .nav {
      display: flex;
      gap: 20px; /* 元素間距 */

      a {
        color: white; /* 連結文字顏色 */
        text-decoration: none; /* 去除下劃線 */
       font-size: 30px; /*帳號管理的字，還是要跟介面的字同大小比較好 */

        &:hover {
          text-decoration: underline; /* 懸停效果 */
        }
      }

      .current-interface {/*介面的字，只是要拿來顯示現在在哪個頁面而已，實際沒有功用 */
        position: relative; 
        font-size: 30px; 
        font-weight: bold; /* 字體加粗 */
        color: white; 
      }

      .current-interface::after {/*介面的字，只是要拿來顯示現在在哪個頁面而已，實際沒有功用 */
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

  
  /* @keyframes blink 動畫效果，就是顯示現在位於學生介面的動畫效果 */
  @keyframes blink { 
    0%, 100% {
      opacity: 1; /* 完全不透明 */
    }
    50% {
      opacity: 0.5; /* 半透明 */
    }
  }

  .main-content { /* 就是我灰灰的地方，主內容區 */
    flex: 1; /* 使主內容區域填滿剩餘空間 */
    display: flex; 
    justify-content: center; /* 設水平居中 */
    align-items: center; /* 社垂直居中 */
    gap: 8%; /* 調整元素間距用的 */
    background-color: #D3D3D3; 
    width: 100%;
  

  .form {
    display: flex; 
    flex-direction: column; /* 設垂直排列 */
    gap: 20px; /* 元素間距 */
    align-items: flex-start; /* 左對齊 */
    background-color: #F5F5F5; 
    padding: 10% 20%;; /* 內邊距 */
    border-radius: 10px; /* 圓角 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 陰影 */
    font-size: 20px;
  }

  .form-group {
    display: flex; 
    justify-content: space-between; /* 兩端對齊 */
    width: 100%; 

    label {
      font-weight: bold; /* 字體加粗 */
      margin-right: 20px; /* 右邊距 */
    }

    select {
      width: 100%; /* 下拉框寬度 */
      padding: 20px; /* 內邊距 */
      border: 1px solid #ccc; /* 邊框 */
      border-radius: 4px; /* 圓角 */
    }
  }

  .submit-button {
    align-self: center; /* 水平置中 */
    padding: 10px 20px; /* 內邊距 */
    border: none; /* 無邊框 */
    border-radius: 4px; /* 圓角 */
    background-color: #8B4513; 
    color: white; /* 文字顏色 */
    cursor: pointer; /* 滑鼠指標 */
    font-size: 16px; 

    &:hover {
      background-color: #A0522D; /* 懸停背景顏色 */
    }
  }
}
}
</style>
