
  <template>
  <div class="create-club">
    <!-- 頁面頭部，包括標題和導航欄 -->
    <header class="header">
      <h1>創建社團</h1>
      <nav class="nav">
        <!-- 帳號管理連結 -->
        <router-link to="/account-management">帳號管理</router-link>
        <!-- 當前頁面指示 -->
        <span class="current-interface">老師介面</span>
      </nav>
    </header>

    <!-- 主內容區域 -->
    <main class="main-content">

      <form action="" method="" > <!-- 這裡你method=""若沒寫，預設會是GET，所以還是寫一嚇post比較好 -->
        <fieldset> <!--    外圍框架 -->
            <legend>創建社團頁面: 請輸入問卷內容</legend> <!--    表單標題 -->
            <h1>創建社團</h1>
        <label for="name">名稱: </label>
        <input id="name" type="text" name="InputName" placeholder="請輸入社團名車" size="50" required><!-- required 必填 -->
        <br><!--  用來強制換行元素 -->
        <br>
        <label>介紹: </label>
        <input type="text" name="clubintroduction" placeholder="請輸入介紹" size="50" required>
        <br>
        <br>
        <label>費用: </label>
        <input type="text" name="clubfees" placeholder="請輸入費用" size="50" required>
        <br>
        <br>
        <label>上課資訊: </label>
        <input type="text" name="clubinformation" placeholder="請輸入上課資訊" size="50" required>
       
        </fieldset>

        <button type="subit">提交社團申請表單</button>
</form>

    </main>
  </div>
</template>



<script>
export default {
    
  }
</script>

<style scoped lang="scss">
.create-club {
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

    .main-content { /* 就是我灰灰的地方，主內容區 */
    flex: 1; /* 使主內容區域填滿剩餘空間 */
    display: flex; 
    justify-content: center; /* 設水平居中 */
    align-items: center; /* 社垂直居中 */
    gap: 8%; /* 調整元素間距用的，如果你內容沒東西，應該是用不到，就把這個刪了 */
    background-color: #D3D3D3; 
    width: 100%;
  }

</style>
