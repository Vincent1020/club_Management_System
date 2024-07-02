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
</div>

  </template>
  


  <script setup>

  </script>



<style scoped lang= scss>
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

  </style>
  