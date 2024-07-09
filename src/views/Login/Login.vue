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

    <body>


        <div class="center">

            <!-- 學生or老師登入選項 -->
            <div class="userLoginChoose">

                <label>
                    <input type="radio" class="choice" name="login" input:checked><span class="button">學生登入</span>
                </label>

                <label>
                    <input type="radio" class="choice" name="login" input:checked><span class="button">老師登入</span>
                </label>
                <!-- <label for="stu"> <input type="radio" value="學生登入" id="stu" >學生登入</label>
                <label for="tea"> <input type="radio" value="老師登入" id="tea">老師登入</label> -->
            </div>

            <!-- 帳號密碼輸入框 -->
            <div class="userLogintInput">

                <div class="account user">
                    <h1>帳號</h1>
                    <input type="text" v-model="account" placeholder="A123" required>
                </div>

                <div class="password user">
                    <h1>密碼</h1>
                    <input type="password" v-model="password" required>
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
    </body>
</template>

<style scoped lang="scss">
body {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #cce3f5
}

.center {
    width: 40vw;
    height: 50vh;
    background-color: white;
    position: fixed;
    top: 25%;
    left: 30%;

    // 學生or老師登入按鈕
    .userLoginChoose {
        width: 100%;
        height: 5vw;
        color: black;
        display: flex;
        justify-content: space-around;

        label {
            width: 50%;
            height: 12vh;
            border: 1px solid rgb(105, 105, 105);
            
            .choice {
                display: none;

                &:hover+.button {
                    background-color: rgb(170, 226, 208);
                    cursor: pointer;
                }

            }

            .button {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 28px;
                // margin: 0 5px 10px 0;
                // padding: 5px 10px;
                background: #f7f7f7;
                color: #333;
                cursor: pointer;
            }

            input:checked+.button {
                background-color:  rgb(170, 226, 208);
                color: #fff;
                cursor: default;
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
        margin: 1vw;
        display: flex;
        justify-content: flex-end;

        input {
            height: 6vh;
            width: 12vw;
            margin-right: 3%;
            font-size: 20px;
            border-radius: 10px;

            &:hover {
                cursor: pointer;
            }

        }
    }
}

</style>
