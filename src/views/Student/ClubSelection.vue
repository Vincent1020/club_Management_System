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
            <option value="">選擇志願</option>
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
      // 在此處添加表單提交邏輯
      alert(`提交成功！您的選擇是：第一志願：${this.firstChoice}，第二志願：${this.secondChoice}，第三志願：${this.thirdChoice}`);
    }
  }
};
</script>

<style scoped lang="scss">
.club-volunteer {
  text-align: center; /* 文字置中 */
  font-family: Arial, sans-serif; /* 設置字體 */
  height: 100vh; /* 滿版高度 */
  display: flex;
  flex-direction: column;

  .header {
    background-color: #87CEEB; /* 背景顏色 */
    padding: 10px; /* 內邊距 */
    display: flex; /* 使用 flex 布局 */
    justify-content: space-between; /* 兩端對齊 */
    align-items: center; /* 垂直置中 */
    color: white; /* 文字顏色 */

    .nav {
      display: flex; /* 使用 flex 布局 */
      gap: 20px; /* 元素間距 */

      a {
        color: white; /* 連結文字顏色 */
        text-decoration: none; /* 去除下劃線 */
        font-size: 18px; /* 字體大小 */

        &:hover {
          text-decoration: underline; /* 懸停效果 */
        }
      }

      .current-interface {
        position: relative; /* 相對定位 */
        font-size: 18px; /* 字體大小 */
        font-weight: bold; /* 字體加粗 */
        color: white; /* 文字顏色 */
      }

      .current-interface::after {
        content: ""; /* 內容為空 */
        position: absolute; /* 絕對定位 */
        bottom: -5px; /* 底部距離 */
        left: 0;
        right: 0;
        height: 2px; /* 高度 */
        background-color: white; /* 背景顏色 */
        animation: blink 1.5s infinite; /* 應用 blink 動畫 */
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
    display: flex; /* 使用 flex 布局 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    background-color: #D3D3D3; /* 背景顏色 */
  }

  .form {
    display: flex; /* 使用 flex 布局 */
    flex-direction: column; /* 垂直排列 */
    gap: 20px; /* 元素間距 */
    align-items: flex-start; /* 左對齊 */
    background-color: #F5F5F5; /* 背景顏色 */
    padding: 20px; /* 內邊距 */
    border-radius: 10px; /* 圓角 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 陰影 */
  }

  .form-group {
    display: flex; /* 使用 flex 布局 */
    justify-content: space-between; /* 兩端對齊 */
    width: 100%; /* 寬度為 100% */

    label {
      font-weight: bold; /* 字體加粗 */
      margin-right: 10px; /* 右邊距 */
    }

    select {
      width: 70%; /* 下拉框寬度 */
      padding: 5px; /* 內邊距 */
      border: 1px solid #ccc; /* 邊框 */
      border-radius: 4px; /* 圓角 */
    }
  }

  .submit-button {
    align-self: center; /* 水平置中 */
    padding: 10px 20px; /* 內邊距 */
    border: none; /* 無邊框 */
    border-radius: 4px; /* 圓角 */
    background-color: #8B4513; /* 背景顏色 */
    color: white; /* 文字顏色 */
    cursor: pointer; /* 滑鼠指標 */
    font-size: 16px; /* 字體大小 */

    &:hover {
      background-color: #A0522D; /* 懸停背景顏色 */
    }
  }
}
</style>
