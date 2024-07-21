<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';


let msg = ref("")

let router = useRouter()

let account = ref()


let mode = ref(true)
// true = 學生 false = 教師
// 模式選擇



let type = ref("")
// 選擇老師或學生
function changeMode(bool) {
    mode.value = bool
}

function verify() {
    let verify = {}

    let verifyFetch = ""

    if (!account.value) {
        msg.value = "請輸入帳號"
        return
    }
    else if (mode.value == false && account.value.length < 6) {  // 教師       
        verify = {
            teacher_id: account.value
        }
        verifyFetch = "http://localhost:8080/teacherDatabase/pwdValidation"
    }
    else if (mode.value == true && account.value.length >= 5) {  // 學生
        verify = {
            student_id: account.value
        }
        verifyFetch = "http://localhost:8080/student/pwdValidation"
    }
    else {
        msg.value = "請輸入正確帳號"
    }
    console.log(verifyFetch);
    console.log(verify);
    fetch(verifyFetch, {
        method: "POST",     
        headers: {
            "Content-Type": "application/json"            
        },
        body: JSON.stringify(verify)

    })
        .then(res => res.json())
        .then(data => {
            // verifyData.value = data
            console.log(data)

            if (data.statusCode == 200) {
                msg.value = "已傳送驗證碼至您的信箱，將自動跳轉至登入頁面"
                router.push({ path: '/login' })
            }

        })
        .catch(err => {
            console.log(err)
            msg.value = "伺服器錯誤，請稍後再試"

        })
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
                    <input type="button" class="back" onclick="location.href='/login'" value="返回"> <!-- 上一頁 -->
                    <input type="button" @click="verify" value="傳送驗證碼"> <!-- 驗證 -->

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

    .aera {
        color: black;

        margin-top: 6vh;
    }

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
            cursor: pointer;
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

        h2 {
            margin-top: 4vh;
            margin-bottom: 2vh;
        }
    }

    // 提示字
    .verify {
        width: 65%;
        height: 5vh;
        margin-top: 2vh;

        p {
            margin-top: 1vh;
            margin-bottom: 3vh;
            font-size: 20px;
            color: red;
        }



    }

    // 功能按鈕
    .function {
        width: 100%;
        display: flex;
        justify-content: flex-end;


        input {

            width: 9vw;
            height: 6vh;
            font-size: 22px;

            border-radius: 10px;
            cursor: pointer;
        }

        .back {
            // margin-left: 10vw;
            margin-right: 2vw;
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
