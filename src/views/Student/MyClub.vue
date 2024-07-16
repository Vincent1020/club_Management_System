<template>
  <div class="MyClub">
    <!-- 頁面頭部，包括標題和導航欄 -->
    <header class="header">
      <h1><router-link to="StudentHome"><img src="https://cdn-icons-png.flaticon.com/512/869/869189.png" alt="">首頁</router-link></h1>
      <nav class="nav">
        <!-- 當前頁面指示 -->
        <span class="current-interface">學生介面</span>
      </nav>
    </header>

    <!-- 主內容區，同樣使用element 的表格組件 -->
    <main class="main-content">
      <el-table :data="myClub" style="width: 80%">
        <el-table-column prop="name" label="學生姓名"></el-table-column> 
        <el-table-column prop="clubId" label="學生所屬社團"></el-table-column>
        <el-table-column prop="pay" label="社團費用 "></el-table-column>
        <el-table-column prop="classroom" label="社團教室 "></el-table-column>
      </el-table>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myClub: [] ,// 初始化抽籤結果數據為空
      studentobj: {
        student_id: null
         
      },

    };
  },
  methods: {
    // 獲取抽籤結果數據的方法
    async fetchMyClub() {
      try {
        this.studentobj.student_id = JSON.parse(sessionStorage.getItem('account'));
        console.log(this.studentobj);

        const response = await fetch('http://localhost:8080/student/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.studentobj)
        });

        if (!response.ok) {
          throw new Error(`HTTP 錯誤！狀態碼：${response.status}`);
        }

        const data = await response.json();
        console.log('API 返回的資料：', data);

        this.myClub = data.studentList || [];
      } catch (error) {
        console.error(`無法獲取數據：${error.message}`);
      }
    },
  created() {
    // 組件創建時調用獲取數據的方法
    this.fetchMyClub();
  }
}
};
</script>

<style scoped lang="scss">
.MyClub {
  text-align: center; /* 文字置中 */
  font-family: Arial, sans-serif; /* 字體 */
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
      gap: 20px; /* 元素間距 */

      a {
        color: white; /* 連結文字顏色 */
        text-decoration: none; /* 去除下劃線 */
        font-size: 30px; /* 字體大小 */

        &:hover {
          text-decoration: underline; /* 懸停效果 */
        }
      }

      .current-interface {
        position: relative; 
        font-size: 30px; 
        font-weight: bold; /* 字體加粗 */
        color: white; 
      }

      .current-interface::after {
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

  @keyframes blink { 
    0%, 100% {
      opacity: 1; /* 完全不透明 */
    }
    50% {
      opacity: 0.5; /* 半透明 */
    }
  }

  //-----------------------以上是藍色導覽列區域--------------------------------------
  .main-content {
    flex: 1; /* 使主內容區域填滿剩餘空間 */
    display: flex; 
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    gap: 8%; /* 調整元素間距 */
    background-color: #D3D3D3; 
    width: 100%;
    padding: 30px;
  }
}
</style>
