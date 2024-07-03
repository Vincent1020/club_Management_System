<template>
    <div>
      <h1>社團介紹</h1>
      <p>這是社團介紹頁面。</p>
      
    </div>

<div class="one">
    <el-carousel height="150px">
      <el-carousel-item v-for="item in 4" :key="item">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
</div>






    <div class="two">
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


  </template>
  
  <script>

  export default {

  data() {
    return {
      currentDate: new Date(),
      carousel:[
      require('@/assets/imgs/club1.jpg'),
      require('@/assets/imgs/club2.jpg')
        
      ]

    };
  }
  }
  </script>
  
  <style scoped>


.two{
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
  