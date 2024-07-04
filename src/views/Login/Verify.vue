<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';


let msg = ref("")

let router = useRouter()

let account = ref("")

let email = ref("")

let emailres = ref({})

function verify() {
    if (!email.value || !account.value) {
        msg.value = "請輸入Account或Email"
        return
    }
    else {
        fetch("http://localhost:8080/quiz/create_update/{}", {
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
                    router.push({ path: '/login/forgotpassword'})
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
        <div class="identity">
            <h2>我是</h2>

        </div>
        <div class="center">

            <div class="account">
                <h2>請輸入帳號</h2>
                <input type="text" v-model="account" placeholder="A123">
            </div>
            <div class="verify">
                <h2>請輸入Email</h2>
                <input type="email" v-model="email" placeholder="XXX@email.com">
                <p>{{ msg }}</p>
            </div>
            <div class="function">
                <input type="button" onclick="location.href='/login'" value="Back"> <!-- 上一頁 -->
                <input type="button" @click="verify" value="Verify"> <!-- 驗證 -->

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

    // 帳號輸入框
    .account {
        width: 65%;
        margin-top: 5vh;
        color: black;

        input {
            font-size: 2vw;
        }
    }

    // Email輸入框
    .verify {
        width: 65%;
        height: 40%;
        margin-top: 3vh;
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
