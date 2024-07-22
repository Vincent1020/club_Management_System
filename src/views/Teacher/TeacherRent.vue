<script setup>
import { ref, onMounted } from 'vue'
let teacherName = sessionStorage.getItem('teacherName')
let clubName = sessionStorage.getItem('clubName')
let identity = ref("")

let thing = ref([])
let something = {}

let choice = ref({})

function changechoice(index, item) {
  if (choice.value[index]) {
    delete choice.value[index]
  } else {
    choice.value[index] = item.id
  }
}
onMounted(() => {
  // 借用情形
  fetch("http://localhost:8080/Venue/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      thing.value = data.venueList
      console.log(thing.value);
    })
    .catch(err => { console.log(err) })
})

function borrowthing() {
  something = {
    id: identity.value,
    user: teacherName
  }
  console.log(something);

  fetch("http://localhost:8080/Venue/createOrUpdate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(something)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      window.location.reload();

    })
    .catch(err => { console.log(err) })
}

function returnthing() {
  something = {
    id: identity.value,
    user: ""
  }
  console.log(something);

  fetch("http://localhost:8080/Venue/createOrUpdate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(something)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      window.location.reload();

    })
    .catch(err => { console.log(err) })


}
</script>

<template>

  <body>


    <header class="header">
      <!-- 首頁連結和圖標 -->
      <h1>
        <router-link to="teacherhome">
          <img src="https://cdn-icons-png.flaticon.com/512/869/869189.png" alt="">
        </router-link>
        <a href="/teacherhome">首頁</a>
      </h1>
      <!-- 導航欄 -->
      <nav class="nav">
        <!-- 歡迎信息 -->
        <span class="info">{{ clubName }} {{ teacherName }} 老師你好!!</span>
        <!-- 帳號管理連結 -->
        <router-link to="TeacherAccountManagement">帳號管理</router-link>
        <!-- 登出連結 -->
        <router-link to="Login" @click="logout">登出</router-link>
      </nav>
    </header>

    <div class="area">
      <div class="borrow">
        <label v-for="(item, index) in thing" :class="{ selected: identity === item.id }"
          @click="changechoice(index, item)">
          <div class="card">
            <h3>{{ item.id }}</h3>
            <h3 v-if="item.user.length > 0">使用者：{{ item.user }}</h3>
          </div>
          <input type="radio" v-model="identity" :value="item.id" name="a" id="">
        </label>



      </div>

    </div>
    <div class="function">
      <button @click="borrowthing">借用</button>
      <button @click="returnthing">歸還</button>
    </div>
  </body>

</template>

<style scoped lang="scss">
body {
  background-color: #F5F5F5;

}

.header {
  background-color: #87CEEB;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;

  img {
    width: 4vw;
    height: 8vh;
    margin-right: 20px;
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 20px;

    .info {
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
    }

    a {
      color: white;
      text-decoration: none;
      font-size: 24px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.area {
  width: 80vw;
  height: 65vh;
  background-color: #e1eef4b8;
  margin-left: 10vw;
  margin-top: 5vh;
  border-radius: 1em;

  .borrow {
    padding-top: 5vh;
    padding-left: 1vw;
    color: black;
    display: flex;
    flex-wrap: wrap;



    .card {
      width: 12vw;
      height: 16vh;
      font-size: 1.3em;
      margin-left: 3vw;
      margin-bottom: 3vh;
      border-radius: 1em;
      box-shadow: 3px 2px 6px #cacccc;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;


    }

    input {
      display: none;

    }

  }
  .borrow {
  label.selected .card {
    background-color: rgb(129, 139, 149);
    color: #ffffff;
  }
}

}



.function {

  display: flex;
  margin-left: 60vw;
  margin-top: 2vh;

  button {
    height: 5vh;
    width: 10vw;
    margin-left: 3vw;
    font-size: 1.3em;
    cursor: pointer;
  }
}
</style>
