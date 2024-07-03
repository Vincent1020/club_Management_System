<template>
   <div class="student-home">
    <!-- 頁面頭部，包括標題和導航欄 -->
    <header class="header">
      <h1>社團介紹</h1>
      <nav class="nav">
        <!-- 帳號管理連結 -->
        <router-link to="/account-management">帳號管理</router-link>
        <!-- 當前頁面指示 -->
        <span class="current-interface">學生介面</span>
      </nav>
    </header>

     <!-- 同樣，主內容區 -->
<main class="main-content">
  

<!-- 從Elemant ui 抓下來的卡片 -->
  <div class="card">
  <el-row>
<el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
  <el-card :body-style="{ padding: '0px' }">
    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
    <div style="padding: 14px;">
      <span>美食社</span>
      <div class="bottom clearfix">
        <time class="time">{{ currentDate }}</time>
        <el-button type="text" class="button">瞭解更多</el-button>
      </div>
    </div>
  </el-card>
</el-col>
</el-row>

</div>

</main>
</div>


</template>

<script>

export default {

data() {
  return {
    currentDate: new Date(),

  };
}
}
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

  .main-content { /* 就是灰灰的地方，主內容區 */
    flex: 1; /* 使主內容區域填滿剩餘空間 */
    display: flex; /* 使用 flex 布局 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    gap: 20px; /* 元素間距 */
    background-color: #D3D3D3; /* 背景顏色 */
    width: 100%;
  }

.card{
width: 50%;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}




</style>
