<template>
  <div class="club-selection">
    <!-- 頁面頭部，就是上面藍色的導覽列，包括標題和導航欄 -->
    <header class="header">
      <h1>
        <!-- 返回首頁的連結 -->
        <router-link to="StudentHome">
          <!-- 標題圖片 -->
          <img src="https://cdn-icons-png.flaticon.com/512/869/869189.png" alt="">
          首頁
        </router-link>
      </h1>
      <nav class="nav">
        <!-- 用來指示當前頁面在哪裡，現在指示在學生介面的社團志願 -->
        <span class="current-interface">學生介面-社團志願</span>
      </nav>
    </header>

    <!-- 主內容區域 -->
    <main class="main-content">
      <!-- 志願選擇表單 -->
      <form @submit.prevent="submitForm" class="form">
        <!-- 第一志願 -->
        <div class="form-group">
          <label for="first-choice">第一志願</label>
          <select id="first-choice" v-model="choices.firstChoice">
            <option value="">選擇志願一</option>
            <option v-for="option in clubs" :key="option.club_id" :value="option.club_id">
              {{ option.club_id }} - {{ option.name }}
            </option>
          </select>
        </div>
        <!-- 第二志願 -->
        <div class="form-group">
          <label for="second-choice">第二志願</label>
          <select id="second-choice" v-model="choices.secondChoice">
            <option value="">選擇志願二</option>
            <option v-for="option in clubs" :key="option.club_id" :value="option.club_id">
              {{ option.club_id }} - {{ option.name }}
            </option>
          </select>
        </div>
        <!-- 第三志願 -->
        <div class="form-group">
          <label for="third-choice">第三志願</label>
          <select id="third-choice" v-model="choices.thirdChoice">
            <option value="">選擇志願三</option>
            <option v-for="option in clubs" :key="option.club_id" :value="option.club_id">
              {{ option.club_id }} - {{ option.name }}
            </option>
          </select>
        </div>
        <!-- 第四志願 -->
        <div class="form-group">
          <label for="fourth-choice">第四志願</label>
          <select id="fourth-choice" v-model="choices.fourthChoice">
            <option value="">選擇志願四</option>
            <option v-for="option in clubs" :key="option.club_id" :value="option.club_id">
              {{ option.club_id }} - {{ option.name }}
            </option>
          </select>
        </div>
        <!-- 第五志願 -->
        <div class="form-group">
          <label for="fifth-choice">第五志願</label>
          <select id="fifth-choice" v-model="choices.fifthChoice">
            <option value="">選擇志願五</option>
            <option v-for="option in clubs" :key="option.club_id" :value="option.club_id">
              {{ option.club_id }} - {{ option.name }}
            </option>
          </select>
        </div>
        <!-- 提交按鈕 -->
        <button type="submit" class="submit-button">確定</button>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 用於儲存所有可選擇的社團數據
      clubs: [],
      // 用於儲存用戶選擇的社團，初始化為空
      choices: {
        firstChoice: null,
        secondChoice: null,
        thirdChoice: null,
        fourthChoice: null,
        fifthChoice: null
      },
      // 用於儲存學生資訊
      student: {
        name: '',
        email: ''
      }
    };
  },
  methods: {
    // 從後端獲取所有社團數據
    async fetchClubs() {
      try {
        const response = await fetch('http://localhost:8080/Club/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // 發送一個空的 club_id 字段以獲取所有社團
          body: JSON.stringify({ club_id: '' })
        });
        const data = await response.json();
        // 將獲取到的社團數據賦值給 clubs 變量
        this.clubs = data.clubList || [];
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    },
    // 從後端獲取學生資訊
    async fetchStudentInfo() {
      const student_id = sessionStorage.getItem('account');
      if (!student_id) {
        alert('無法獲取學生ID');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/student/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // 使用學生ID查詢學生資訊
          body: JSON.stringify({ student_id: Number(student_id) })
        });
        const data = await response.json();
        const studentInfo = data.studentList[0];
        // 將獲取到的學生資訊賦值給 student 變量
        this.student.name = studentInfo.name;
        this.student.email = studentInfo.email;
      } catch (error) {
        console.error('獲取學生資訊時出錯:', error);
      }
    },
    // 提交表單
    submitForm() {
      // 將 choices 對象轉換為數組格式，還要用逗號隔開
      const selectedClubs = [
        this.choices.firstChoice,
        this.choices.secondChoice,
        this.choices.thirdChoice,
        this.choices.fourthChoice,
        this.choices.fifthChoice
      ];
      
      const student_id = sessionStorage.getItem('account');
      if (!student_id) {
        alert('無法獲取學生ID');
        return;
      }

      // 組裝提交的數據，帶入student_id、name、email、choice_list
      const payload = {
        student_id: Number(student_id),
        name: this.student.name,
        email: this.student.email,
        choice_list: selectedClubs
      };

      console.log('Payload:', payload); // 打印 payload 檢查數據格式，印出來就是array有問題

      // 發送 POST 請求到後端
      fetch('http://localhost:8080/student/createOrUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('網路響應不正常');
        }
        return response.json();
      })
      .then(data => {
        alert('提交成功！您的選擇是：' + JSON.stringify(selectedClubs));
      })
      .catch(error => {
        console.error('提交表單時發生錯誤:', error);
        alert('提交失敗：' + error.message);
      });
    }
  },
  // 組件創建時調用，獲取社團和學生資訊
  created() {
    this.fetchClubs();
    this.fetchStudentInfo();
  }
};
</script>

<style scoped lang="scss">
.club-selection {
  text-align: center; /* 文字置中 */
  font-family: Arial, sans-serif; /* 字體 */
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  .header {
    background-color: #87CEEB; 
    padding: 3%;
    display: flex;
    justify-content: space-between; /* 平均分配寬度，第一項和最後一項貼齊邊緣*/
    align-items: center; 
    color: white; /* 文字顏色 */

    img {
      width: 4vw;
      height: 8vh;
      margin-top: 1vh;
      margin-left: 4vw;
    }

    .nav {
      display: flex; 
      gap: 20px;

      a {
        color: white; 
        text-decoration: none; /* 去除下劃線 */
        font-size: 30px; 

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

 /*  -----------以上是藍色導覽列部分，以下是主內容區域-----------------*/
  .main-content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #D3D3D3;
    width: 100%;
    color: black;

    .form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: flex-start;
      background-color: #F5F5F5;
      padding: 5%;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      font-size: 24px;
      width: 60%;
    }

    .form-group {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center; /* 確保 label 和 select 在同一行 */

      label {
        font-weight: bold;
        margin-right: 20px;
        white-space: nowrap; /* 確保 label 不會換行 */
      }

      select {
        width: 100%;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 20px;
      }
    }

    .submit-button {
      align-self: center;
      padding: 15px 30px;
      border: none;
      border-radius: 4px;
      background-color: #5cb85c;
      color: white;
      cursor: pointer;
      font-size: 20px;

      &:hover {
        background-color: #4cae4c;
      }
    }
  }
}
</style>
