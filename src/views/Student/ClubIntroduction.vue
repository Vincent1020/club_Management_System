<template> 
  <body>
    <div class="ClubIntroduction"> 
      <!-- 頁面頭部，包括標題和導航欄 -->
      <header class="header">
        <h1><router-link to="StudentHome"><img src="https://cdn-icons-png.flaticon.com/512/869/869189.png" alt="">首頁</router-link></h1>
        
        <nav class="nav">
          <!-- 當前頁面指示 -->
          <span class="current-interface">社團介紹</span>
        </nav>
      </header>
  
      <!-- 主內容區 -->
      <main class="main-content">
        <!-- 使用 Element UI 的卡片組件 -->
        <section class="cards-section">
          <el-row :gutter="20">
            <!-- 用 v-for 迭代 cards 陣列生成卡片項目 -->
            <el-col :span="8" v-for="(card, index) in cards" :key="index">
              <el-card :body-style="{ padding: '0px' }" class="card">
                <img :src="card.image" class="image">
                <div style="padding: 10px;">
                  <span>{{ card.name }}</span>
                  <div class="bottom clearfix">
                    <span>{{ card.attendees }}人</span>
                    <el-button type="text" class="button" @click="scrollToClub(card.name)">瞭解更多</el-button>
                  </div>
                  <!-- 社團介紹 -->
                  <div class="club-intro">
                    <p>{{ card.intro }}</p>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </section>
  
        <h2>社團活動集錦</h2>
        <!-- 用 Element UI 的輪播圖組件 -->
        <section class="carousel-section">
          <el-carousel :interval="4000" type="card" height="200px" class="carousel">
            <!-- 用 v-for 迭代 carouselItems 陣列生成輪播圖項目 -->
            <el-carousel-item v-for="(item, index) in carouselItems" :key="index">
              <img :src="item.image" class="carousel-image">
              <h4 class="medium">{{ item.text }}</h4>
            </el-carousel-item>
          </el-carousel>
        </section>
      </main>
  
      <!-- 新增的社團介紹區域 -->
      <section class="club-introduction-section">
        <h3>社團詳細資訊</h3>
        <div class="club-introduction" v-for="(club, index) in clubs" :key="index" :ref="'club-' + club.name">
          <img :src="club.image" alt="Club Image" class="club-image">
          <div class="club-details">
            <h4>{{ club.name }}</h4>
            <p>社團介紹: {{ club.intro }}</p>
            <p>社團費用: {{ club.pay }}</p>
            <p>上課地點: {{ club.classroom }}</p>
            <p>社團人數上限: {{ club.max }}人</p>
            <p>目前參加人數: {{ club.attendees }}人</p>
          </div>
        </div>
      </section>
    </div>
  </body>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // 輪播圖項目數據
        carouselItems: [
          { image: 'https://www.week.mcu.edu.tw/wp-content/uploads/2022/09/1137%E6%9C%9Fshuttlecock%E9%85%8D%E5%9C%96-800x445.jpg', text: '羽球新生錦標賽!' },
          { image: 'https://www.tnfsh.tn.edu.tw/df_ufiles/028/s_e-01.jpg', text: '羽球社' },
          { image: 'https://freshman.cmu.edu.tw/new/sites/default/files/u21/%E7%B1%83%E7%90%83%E7%A4%BE%282%29-1%20-%20105007017%20105a-_0.jpg', text: '籃球社' },
          { image: 'https://www.week.mcu.edu.tw/wp-content/uploads/2023/03/2.jpg', text: '羽球社系羽比賽' },
          { image: 'https://www.nssh.ntpc.edu.tw/var/file/0/1000/pictures/314/m/mczh-tw700x700_large750_895163558067.jpg', text: '社團活動' },
          { image: 'https://www.week.mcu.edu.tw/wp-content/uploads/2023/09/1167%E6%9C%9F%E6%A1%83%E5%9C%92%E7%A4%BE%E5%8D%9A%E9%9B%BB%E5%AD%90%E5%A0%B1%E9%85%8D%E5%9C%96.jpg', text: '社團博覽會' },
        ],
        // 卡片項目數據(社團簡介)
        cards: [],
        // 社團詳細介紹的數據
        clubs: []
      };
    },
    methods: {
      // 滾動到指定社團介紹的方法
      scrollToClub(clubName) {
        const clubElement = this.$refs[`club-${clubName}`][0];
        if (clubElement) {
          clubElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      },
      // 獲取社團數據的方法
      async fetchClubs() {
        try {
          // 發送 POST 請求獲取所有社團數據
          const response = await fetch('http://localhost:8080/Club/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ club_id: '' }) // 傳遞空 club_id 以獲取所有社團數據
          });
  
          if (!response.ok) {
            throw new Error(`HTTP 錯誤！狀態碼：${response.status}`);
          }
  
          const data = await response.json();
          console.log('Club API 返回的資料：', data);
  
          // 設置卡片項目數據
          this.cards = data.clubList.map(club => ({
            name: club.name,
            image: club.image , // 使用後端返回的圖片 URL
            intro: club.intro,
            attendees: club.attendees
          }));
  
          // 設置社團詳細介紹數據
          this.clubs = data.clubList.map(club => ({
            name: club.name,
            image: club.image , // 使用後端返回的圖片 URL
            intro: club.intro,
            pay: club.pay,
            classroom: club.classroom,
            max: club.max,
            attendees: club.attendees
          }));
        } catch (error) {
          console.error(`無法獲取社團數據：${error.message}`);
        }
      }
    },
    // 組件創建時調用獲取數據的方法
    created() {
      this.fetchClubs();
    }
  };
  </script>
  
  <style scoped lang="scss">
  body {
    background-color: #fff;
  }
  .ClubIntroduction {
    text-align: center; /* 文字置中 */
    font-family: Arial, sans-serif; /* 字體 */
    height: 100vh; 
    width: 100%;
    display: flex;
    flex-direction: column;
  
    .header {
      background-color: #87CEEB;
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
          font-size: 30px; /* 設置字體大小 */
  
          &:hover {
            text-decoration: underline; /* 懸停效果 */
          }
        }
  
        .current-interface {
          position: relative; 
          right: 6vw;
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
    
    /* ---------------------以上是上方藍色導覽列部分-------------------------- */
  
    .main-content {
      flex: 1;
      display: flex; 
      flex-direction: column; 
      padding: 20px;
      background-color: #eee;
    }
  
    .carousel-section {
      width: 100%; 
      height: 300%;
      background-color: #0077ff; 
      display: flex;
      justify-content: center;
      padding: 20px 0;
    }
  
    .cards-section {
      width: 100%; 
      background-color: #e8e7e7; /* 設置背景顏色為灰色，雖然看不太出來是灰色*/
      display: flex;
      justify-content: center;
      padding: 20px 0;
    }
  
    .carousel {
      width: 80%; /* 調整輪播圖的寬度 */
    }
  
    .carousel-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  
    .el-col {
      display: flex;
      justify-content: center;
    }
  
    .card {
      width: 75%; /* 調整卡片寬度 */
      margin-bottom: 50px; /* 卡片之間的上下間距 */
    }
  
    .club-intro  {
      text-align: left; /* 左對齊 */
      padding: 10px; /* 內邊距 */
      background-color: #fff; /* 背景顏色 */
      border-top: 1px solid #eee; /* 上邊框 */
      margin-top: 10px; /* 上外邊距 */
    }
  
    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }
  
    .button {
      padding: 1%;
      float: right;
      background-color: #91f4ff;
    }
  
    .image {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }
  
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
  
    .clearfix:after {
      clear: both;
    }
  }
  
  h2 {
    text-align: center;
    font-size: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  h3 {
    text-align: left;
    font-size: 30px;
    margin-bottom: 20px;
  }
  
  .club-introduction-section {
    color: black;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
  
    .club-introduction {
      display: flex;
      align-items: flex-start;
      margin-bottom: 20px;
  
      .club-image {
        width: 200px;
        height: 200px;
        margin-right: 20px;
        object-fit: fill;
      }
  
      .club-details {
        text-align: left;
  
        h4 {
          font-size: 20px;
          margin: 0;
        }
  
        p {
          margin: 5px 0 0;
          font-size: 16px;
        }
      }
    }
  }
  </style>
  