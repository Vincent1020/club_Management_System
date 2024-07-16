<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

let router = useRouter()
let account = ref("")
let password = ref("")

let errmsg = ref(null)
let loginfetch = ref("")
let loginType = ref("")
let login = ref({})
const loginRequest = () => {

    // 基本驗證
    if (!account.value || !password.value) {
        errmsg.value = ("帳號、密碼不得為空")
        return
    }
    else if (loginType.value == "") {
        errmsg.value =("請選擇登入身份")
        return
    }

    // 判斷身分別
    if (loginType.value == "student") {
        login= {
            student_id: account.value,
            password: password.value
        }
        loginfetch = ("http://localhost:8080/student/login")
    }
    else if(loginType.value == "teacher" && account.value == 6666) {
        login = {
            teacher_id: account.value,
            password: password.value
        }
        loginfetch = ("http://localhost:8080/teacherDatabase/login")
    }
    else if (loginType.value == "teacher") {
        login = {
            teacher_id: account.value,
            password: password.value
        }
        loginfetch = ("http://localhost:8080/teacherDatabase/login")
    }

    console.log(login);

    fetch(loginfetch, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(login)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data) 
            if(data.statusCode==404){
                errmsg.value = ("帳號或密碼錯誤")
            }
            else if(data.statusCode==200 && loginType.value=="student"){
                router.push({path:'/StudentHome'})
                
            }
            else if(data.statusCode==200 && loginType.value=="teacher"&& account.value == 6666){
                router.push({path:'/adminhomepage'})
            }
            else if(data.statusCode==200 && loginType.value=="teacher"){
                router.push({path:'/TeacherHome'})
            }
            sessionStorage.setItem('account', JSON.stringify(account.value))

        })
        .catch(err => {
            console.log(err)
            errmsg.value =("登入失敗，請稍後再試")

        })
}


</script>

<template>

    <body>


        <div class="center">

            <!-- 學生or老師登入選項 -->
            <div class="userLoginChoose">

                <label>
                    <input type="radio" class="choice" name="login" v-model="loginType" value="student"><span
                        class="button">學生登入</span>
                </label>

                <label>
                    <input type="radio" class="choice" name="login" v-model="loginType" value="teacher" ><span
                        class="button">老師登入</span>
                </label>

            </div>

            <!-- 帳號密碼輸入框 -->
            <div class="userLogintInput">

                <div class="account user">
                    <h1>帳號</h1>
                    <input type="text" v-model.number="account" placeholder="A123" required>
                </div>

                <div class="password user">
                    <h1>密碼</h1>
                    <input type="password" v-model="password" required>
                </div>
                <p >{{ errmsg }}</p>
        

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
                background-color: rgb(170, 226, 208);
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
