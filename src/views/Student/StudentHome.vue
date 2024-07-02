<template>
  <div class="student-home">
    <header class="header">
      <h1>首頁</h1>
      <nav class="nav">
        <router-link to="/account-management">帳號管理</router-link>
        <span class="current-interface">學生介面</span>
      </nav>
      <!--  <nav> 元素代表一個網頁中提供導航欄連結的區域 -->
      
    </header>

    <main class="main-content">
      <router-link to="/club-introduction" class="option">社團介紹</router-link>
      <router-link to="/club-volunteer" class="option">社團志願</router-link>
      <router-link to="/lottery-results" class="option">抽籤結果</router-link>
    </main>
  </div>
</template>

<script>
export default {
  name: 'StudentHome'
};
</script>

<style scoped>
.student-home {
  text-align: center;
  font-family: Arial, sans-serif;

  .header {
    background-color: #87CEEB;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;

    .nav {
      display: flex;
      gap: 20px;

      a {
        color: white;
        text-decoration: none;
        font-size: 18px;

        &:hover {
          text-decoration: underline;
        }
      }

      .current-interface {
        position: relative;
        font-size: 18px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 50px); /* 減去 header 的高度 */
    gap: 20px;
    background-color: #D3D3D3;

    .option {
      background-color: #F5F5F5;
      padding: 20px 30px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-decoration: none;
      color: black;
      font-size: 24px;
      transition: background-color 0.3s, transform 0.3s;

      &:hover {
        background-color: #e0e0e0;
        transform: translateY(-5px);
      }
    }
  }
}
</style>
