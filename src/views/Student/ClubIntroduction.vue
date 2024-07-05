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

    <!-- 主內容區 -->
    <main class="main-content">
      <!-- 用 Element UI 的輪播圖組件 -->
      <el-carousel :interval="4000" type="card" height="200px" class="carousel">
        <!-- 用 v-for 迭代 carouselItems 陣列生成輪播圖項目 -->
        <el-carousel-item v-for="(item, index) in carouselItems" :key="index">
          <img :src="item.image" class="carousel-image">
          <h3 class="medium">{{ item.text }}</h3>
        </el-carousel-item>
      </el-carousel>

      <!-- 使用 Element UI 的卡片組件 -->
      <el-row :gutter="20">
        <!-- 用 v-for 迭代 cards 陣列生成卡片項目 -->
        <el-col :span="8" v-for="(card, index) in cards" :key="index">
          <el-card :body-style="{ padding: '0px' }" class="card">
            <img :src="card.image" class="image">
            <div style="padding: 10px;">
              <span>{{ card.title }}</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">瞭解更多</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 當前日期
      currentDate: new Date().toLocaleDateString(),
      // Element UI 的輪播圖項目
      carouselItems: [
        { image: 'https://fsv.cmoney.tw/cmstatic/notes/content/1065239/20220822165437743_L.jpg', text: '增加社團經驗!' },
        { image: 'https://i0.wp.com/blog.luckertw.com/wp-content/uploads/2023/09/schoolclub-1.jpg?resize=800%2C450&ssl=1', text: '增加社團經驗!' },
        { image: 'https://ch-image-resizer.cwg.tw/resize/uri/https%3A%2F%2Fas.chdev.tw%2Fclub%2Factivity_slider%2F202405%2Factivity_slider-663e1a2695238.jpg/?w=621', text: '古典社!' },
        { image: 'https://fbgroup.com.tw/wp-content/uploads/2020/09/%E4%BA%92%E5%8B%95%E6%96%87%E7%AB%A0_%E5%B7%A5%E4%BD%9C%E5%8D%80%E5%9F%9F-1-%E8%A4%87%E6%9C%AC.jpg', text: '增加社團經驗!' },
        { image: 'https://i0.wp.com/blog.luckertw.com/wp-content/uploads/2023/08/%E6%96%87%E7%AB%A0%E5%B0%81%E9%9D%A2%E8%A3%BD%E5%9C%96-3.jpg?fit=1920%2C1080&ssl=1', text: '增加社團經驗!' },
        { image: 'https://www.week.mcu.edu.tw/wp-content/uploads/2023/09/1167%E6%9C%9F%E6%A1%83%E5%9C%92%E7%A4%BE%E5%8D%9A%E9%9B%BB%E5%AD%90%E5%A0%B1%E9%85%8D%E5%9C%96.jpg', text: '社團博覽會' },
      ],
      // Element UI 的卡片項目
      cards: [
        { title: '美食社 1', image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { title: '美食社 2', image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { title: '美食社 3', image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { title: '美食社 4', image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { title: '美食社 5', image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { title: '美食社 6', image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { title: '美食社 7', image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { title: '美食社 8', image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { title: '美食社 9', image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { title: '美食社 10', image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { title: '美食社 11', image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { title: '美食社 12', image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.student-home {
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
  .main-content { /* 就是灰灰的地方，主內容區 */
    flex: 1; /* 使主內容區域填滿剩餘空間 */
    display: flex; /* 使用 flex 布局 */
    flex-wrap: wrap; /* 換行 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    gap: 20px; /* 元素間距 */
    background-color: #D3D3D3; /* 背景顏色 */
    width: 100%;
    padding: 20px;
  }

  .carousel {
    margin-bottom: 20px;
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
    width: 75%; /* 讓你調卡片寬度，不過75%差不多了 */
    margin-bottom: 50px; /* 卡片之間的上下間距 */
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
    clear: both;
  }
}
</style>
