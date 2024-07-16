<template> 
<body>
  

  <div class="ClubIntroduction"> 
    <!-- 頁面頭部，包括標題和導航欄 -->
    <header class="header">
      <h1><router-link to="StudentHome"><img src="https://cdn-icons-png.flaticon.com/512/869/869189.png" alt="">首頁</router-link></h1>
      
      <nav class="nav">

        <!-- 當前頁面指示 -->
        <span class="current-interface">學生介面-社團介紹</span>
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
              <div style="padding: 10px;"><!-- 這是卡片自己預設的padding -->
                <span>{{ card.name }}</span>
                <div class="bottom clearfix">
                  <span>{{ card.attendees  }}</span>
                  <el-button type="text" class="button" @click="scrollToClub(card.name)">瞭解更多</el-button>
                </div>
                <!-- 社團介紹 -->
                <div class="club-intro ">
                  <p>{{ card.intro  }}</p>
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
          <p>{{ club.intro }}</p>
          <p>{{ club.pay  }}</p>
          <p>{{ club.classroom  }}</p>
          <p>{{ club.max}}</p>
          <p>{{ club.attendees }}</p>

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
      // 當前日期
    
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
      cards: [
        { name: '管樂社', image: 'https://event.culture.tw/userFiles/CKSMH/JpgFile/01/04229/04229_276_175.jpg?20240630', intro : '簡介: 有著優良的師資、悠久的歷史，社課除了管樂合奏，學長學姊還會額外教你功課，讓您不用為學業煩惱 。', attendees : '20人'},
        { name: '田徑社', image: 'https://d9xe416pf8kwg.cloudfront.net/media/gimages/2018/07/253%283%29.jpg', intro : '簡介: 社團宗旨為培養田徑運動人才，提升運動技術能力!' },
        { name: '美術社', image: 'https://shoplineimg.com/655b0f3c9b81d900188b35f1/66404886c18419001f67b38f/800x.jpg?', intro : '簡介: 美術社主要是以動漫繪畫作為教學基礎，所以不會畫圖也無所謂。', attendees : '20人' },
        { name: '籃球社', image: 'https://freshman.cmu.edu.tw/new/sites/default/files/u21/%E7%B1%83%E7%90%83%E7%A4%BE%282%29-1%20-%20105007017%20105a-_0.jpg', intro : '簡介: 《籃球社》是專業的籃球資訊分享社區，每天為廣大的籃球愛好者分享最新的NBA新聞、比賽熱點、比賽影片、籃球技巧教學等精彩資訊。', attendees : '20人' },
        { name: '羽毛球社', image: 'https://static.accupass.com/userupload/810423a7a5e743f98762a9d335305d32.jpg', intro : '簡介: 歡迎所有愛打羽球的朋友一起加入這個社團。我們可以在這裡分享台南地區球隊招募資訊、糾咖打球、球場訊息、相關商品訊息、好康相報！但是拒絕廣告發文哦！' , attendees : '20人'},
        { name: '美食社', image: 'https://www.brain.com.tw/Upload/News/20200226151647.jpg', intro : '簡介: 集合一群對美食有興趣及探索精神的學生，昨天正式成立，成立初衷: "除了知道好吃，還要知道為什麼好吃。"' , attendees : '20人'}
      ],
      // 社團詳細介紹 的數據
      clubs: [
        { name: '管樂社', image: 'https://event.culture.tw/userFiles/CKSMH/JpgFile/01/04229/04229_276_175.jpg?20240630', intro : '簡介: 有著優良的師資、悠久的歷史，社課除了管樂合奏，學長學姊還會額外教你功課，讓您不用為學業煩惱 。',pay :'社團費用: 3000', classroom :'上課地點: 四樓音樂教室',max :'20人',attendees: '10' },
        { name: '田徑社', image: 'https://d9xe416pf8kwg.cloudfront.net/media/gimages/2018/07/253%283%29.jpg', intro : '社團宗旨: 培養田徑運動人才，提升運動技術能力!',pay :'社團費用: 1000', classroom :'上課地點: 學校操場',attendees: '10' },
        { name: '美術社', image: 'https://cdn.shopify.com/s/files/1/0613/7030/2681/products/product_202204131604551_592x839.jpg', intro : '美術社主要是以動漫繪畫作為教學基礎，所以不會畫圖也無所謂。',pay :'社團費用: 1000', classroom :'上課地點: 某間教室' },
        { name: '籃球社', image: 'https://freshman.cmu.edu.tw/new/sites/default/files/u21/%E7%B1%83%E7%90%83%E7%A4%BE%282%29-1%20-%20105007017%20105a-_0.jpg', intro : '《籃球社》是專業的籃球資訊分享社區，每天為廣大的籃球愛好者分享最新的NBA新聞、比賽熱點、比賽影片、籃球技巧教學等精彩資訊。',pay :'社團費用: 1000', classroom :'上課地點: 某間教室',attendees: '10'  },
        { name: '羽毛球社', image: 'https://static.accupass.com/userupload/810423a7a5e743f98762a9d335305d32.jpg', intro : '歡迎所有愛打羽球的朋友一起加入這個社團。我們可以在這裡分享台南地區球隊招募資訊、糾咖打球、球場訊息、相關商品訊息、好康相報！但是拒絕廣告發文哦！',pay :'社團費用: 1000', classroom :'上課地點: 某間教室',attendees: '10'  },
        { name: '美食社', image: 'https://www.brain.com.tw/Upload/News/20200226151647.jpg', intro : '介紹 :集合一群對美食有興趣及探索精神的學生，昨天正式成立，成立初衷: 除了知道好吃，還要知道為什麼好吃。',pay :'社團費用: 300000', classroom :'上課地點: 各地餐廳',attendees: '10'
         }
      ]
    };
  },
  methods: {
    scrollToClub(clubName) {
      // 使用ref找到對應的社團介紹元素(就是點Element UI 的卡片組件的"瞭解更多"的按鈕，並滾動到該社團的詳細介紹)
      const clubElement = this.$refs[`club-${clubName}`][0];
      if (clubElement) {
        clubElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
};
</script>

<style scoped lang="scss">
body{
  background-color:  #fff;
}
.ClubIntroduction {
  text-align: center; /* 文字置中 */
  font-family: Arial, sans-serif; /*字體 */
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
    margin-top:20px;
    margin-bottom: 20px;
  }

h3{
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
  // margin-top: 20px;
  width: 100%;

  
  .club-introduction {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;

    .club-image {
      width: 200px;
      height:200px;
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
}
</style>
