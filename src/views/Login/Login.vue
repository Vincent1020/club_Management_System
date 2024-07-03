<script setup>
import { ref, onMounted } from 'vue'





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
                <input type="text" placeholder="A123">
            </div>

            <div class="password user">
                <h1>密碼</h1>
                <input type="text">
            </div>


        </div>

        <!-- 功能選項 -->
        <div class="function">
            <input type="button" value="ForgotPassword">
            <input type="button" value="Login">
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

        button {
            width: 50%;

            &:hover {
                background-color: rgb(132, 219, 190);
                cursor: pointer;
            }
        }
    }

    .userLogintInput {
        margin-top: 7vh;

        .user {
            margin-top: 6vh;

            h1 {
                margin-right: 5vw;
            }

            input {
                font-size: 16px;
                width: 20vw;
            }

            color: black;
            display: flex;
            justify-content: center;
        }
    }
    .function{
        margin: 2vw;
        display: flex;
        justify-content: flex-end;
        input{
            margin-right:3% ;
            font-size: 20px;
            &:hover{
                cursor: pointer;
            }
        }
    }
}
</style>
