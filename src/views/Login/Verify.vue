<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';


let msg = ref("")

let router = useRouter()

let account = ref("")

let email = ref("")

let emailres = ref({})

let mode = ref(true)
// true = 學生 false = 教師
// 模式選擇

let type = ref("")
// 選擇老師或學生
function changeMode(bool) {
    mode.value = bool
}

function verify() {
    let fetchWeb = "http://localhost:8080/quiz/create_update/{}";
    if (mode.value == false) {
        fetchWeb = ("http://localhost:8080/quiz/update/{}")
    }
    if (!account.value) {
        msg.value = "請輸入帳號"
        return
    }
    else {
        console.log(fetchWeb);

        fetch(fetchWeb, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }

        })
            .then(res => res.json())
            .then(data => {
                emailres.value = data
                console.log(data)
                if (email.value == emailres.value) {
                    router.push({ path: '/login/forgotpassword' })
                }
                else {
                    msg.value = "Email輸入錯誤"
                }
            })
            .catch(err => {
                console.log(err)
                msg.value = "伺服器錯誤，請稍後再試"

            })

    }
}





</script>

<template>

    <body>

        <div class="center">
            <div class="aera">
                <div class="choice">
                    <h1>我是</h1>
                    <button type="button" @click="changeMode(true)" :class="{ now: mode }">學生</button>
                    <button type="button" @click="changeMode(false)" :class="{ now: !mode }">老師</button>

                </div>
                <div class="account">
                    <h2>請輸入帳號</h2>
                    <input type="text" v-model="account" placeholder="A123">
                </div>
                <div class="verify">

                    <p>{{ msg }}</p>
                </div>
                <div class="function">
                    <input type="button" onclick="location.href='/login'" value="Back"> <!-- 上一頁 -->
                    <input type="button" @click="verify" value="Verify"> <!-- 驗證 -->

                </div>
            </div>
        </div>
    </body>
</template>

<style scoped lang="scss">

.center {

    width: 40vw;
    height: 50vh;
    background-color: white;
    position: fixed;
    top: 25%;
    left: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
// .area{
// color: black;
// background-color: aqua;
// margin-top: 5vh;
// }
    // 選擇身分
    .choice {
        height: 5vh;
        margin: 2vh;
        display: flex;
        justify-content: center;
        align-items: center;

        h1 {
            margin-right: 1vw;
            color: black;
            font-size: 25px;
        }

        // 沒有查看時的預設樣式
        button {
            padding: 1vh;
            font-size: 25px;
            background-color: #fff;
            border: 1px solid rgb(208, 208, 208);
        }

        // 正在查看的頁面樣式
        .now {
            color: rgb(255, 255, 255);
            background-color: rgb(140, 236, 186);
        }
    }

    // 帳號輸入框
    .account {
        width: 65%;

        color: black;

        input {
            font-size: 2vw;
        }
    }

    // Email輸入框
    .verify {
        width: 65%;
        height: 37%;
        margin-top: 2vh;
        // margin-bottom: 1vh;
        color: black;

        input {
            font-size: 2vw;
        }

        h2 {

            margin-bottom: 3%;
        }

        p {
            margin-top: 1vh;
            margin-bottom: 3vh;
            font-size: 20px;
            color: red;
        }



    }

    // 功能按鈕
    .function {
        width: 80%;
        display: flex;
        justify-content: flex-end;


        input {
            width: 10vw;
            height: 6vh;
            font-size: 22px;
            margin-right: 2vw;
            border-radius: 10px;
        }
    }

}

body {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #cce3f5
}
</style>
