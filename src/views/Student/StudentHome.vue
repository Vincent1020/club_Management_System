<template>
  <div class="student-home">
    <!-- 頁面頭部，包括標題和導航欄 -->
    <header class="header">
      <h1>首頁</h1>
      <nav class="nav">
        <!-- 帳號管理連結 -->
        <router-link to="/account-management">帳號管理</router-link>
        <!-- 當前頁面指示 -->
        <span class="current-interface">學生介面</span>
      </nav>
    </header>

    <!-- 主內容區域 -->
    <main class="main-content">
      <!-- 社團介紹連結 -->
      <router-link class="option" to="/ClubIntroduction">社團介紹</router-link>
      <!-- 社團志願連結 -->
      <router-link class="option" to="/ClubSelection">社團志願</router-link>
      <!-- 抽籤結果連結 -->
      <router-link class="option" to="/LotteryResults">抽籤結果</router-link>
    </main>
  </div>
</template>

<script>
export default {
  name: 'StudentHome',
  mounted(){
    let a = '';
    console.log(!a);
  }
};
</script>

<style scoped lang="scss">
.student-home {
  text-align: center; /* 文字置中 */
  font-family: Arial, sans-serif; /* 設置字體 */
  height: 100vh; 
  width: 100%;
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

  .main-content { /* 就是灰灰的地方，主內容區 */
    flex: 1; /* 使主內容區域填滿剩餘空間 */
    display: flex; /* 使用 flex 布局 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    gap: 20px; /* 元素間距 */
    background-color: #D3D3D3; /* 背景顏色 */
    width: 100%;

    .option {
      background-color: #F5F5F5; /* 背景顏色 */
      padding: 20px 30px; /* 內邊距 */
      border-radius: 10px; /* 圓角 */
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 陰影 */
      text-decoration: none; /* 去除下劃線 */
      color: black; /* 文字顏色 */
      font-size: 24px; /* 字體大小 */
      transition: background-color 0.3s, transform 0.3s; /* 過渡效果 */

      &:hover {
        background-color: #f40a0a; /* 懸停背景顏色 */
        transform: translateY(-5px); /* 懸停位移 ，就是往上位移*/
      }
    }
  }
}
</style>
