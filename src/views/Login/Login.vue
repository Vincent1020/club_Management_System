<script setup>
import { ref, onMounted } from 'vue'

let account = ref("")
let password = ref("")
let loginResponse = ref({})
let errmsg = ref(null)
// sessionStorage.setItem('account', JSON.stringify(this.questionList));
const loginRequest = () => {

    if (!account.value || !password.value) {
        errmsg.value = "帳號、密碼不得為空"
        return
    }

    fetch("http://localhost:8080/quiz/create_update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(account.value)
    })
        .then(res => res.json())
        .then(data => {
            loginResponse.value = data
            console.log(data)
        })
        .catch(err => { console.log(err) })
}



</script>

<template>
    <div class="center">

        <!-- 學生or老師登入選項 -->
        <div class="userLoginChoose">
            <button>學生登入</button>
            <button>老師登入</button>
        </div>

        <!-- 帳號密碼輸入框 -->
        <div class="userLogintInput">

            <div class="account user">
                <h1>帳號</h1>
                <input type="text" v-model="account" placeholder="A123"required>
            </div>

            <div class="password user">
                <h1>密碼</h1>
                <input type="text" v-model="password" required>
            </div>
            <p>{{ errmsg }}</p>

        </div>

        <!-- 功能選項 -->
        <div class="function">

            <input type="button" onclick="location.href='/login/verify'" value="ForgotPassword">

            <input type="button" @click="loginRequest" value="Login">

            <!-- 暫放 完成後移除 -->
             <a href="/login/forgotpassword">Forgotpassword</a>
        </div>

    </div>

</template>

<style scoped lang="scss">
.center {
    width: 40vw;
    height: 50vh;
    background-color: white;
    position: fixed;
    top: 25%;
    left: 30%;

    .userLoginChoose {
        width: 100%;
        height: 5vw;
        display: flex;
        justify-content: space-around;

        // 學生or老師登入按鈕
        button {
            width: 50%;

            &:hover {
                background-color: rgb(132, 219, 190);
                cursor: pointer;
            }
        }
    }

    // 帳密輸入框
    .userLogintInput {
        height: 40%;
        margin-top: 6vh;
        color: black;

        .user {
            display: flex;
            justify-content: center;
            margin-top: 4vh;

            h1 {
                margin-right: 5vw;
            }

            input {
                font-size: 20px;
                width: 20vw;
            }
           
        }

        p {
            color: red;
            font-size: 20px;
           margin-left: 20vw;
           
        }
    }

    // 功能選項
    .function {
        margin: 2vw;
        display: flex;
        justify-content: flex-end;

        input {
            margin-right: 3%;
            font-size: 20px;

            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>
