<script setup>
import { ref } from 'vue'
let open = ref(false)
// 帳號導覽列
function arrowRotate() {
    let arrow = document.querySelector(".arrow1")
    arrow.classList.toggle("arrow-rotate")

    let menu = document.querySelector(".menu")
    menu.classList.toggle("menu-open")

    let dropdown = document.querySelector(".dropdown")
    dropdown.setAttribute("aria-expanded", 
        dropdown.getAttribute("aria-expanded") == "true" ? "false" : "true"
    )

    console.log(arrow);
    console.log(menu);
}   

// 社團導覽列
function arrowRotate2() {
    let arrow = document.querySelector(".arrow2")
    arrow.classList.toggle("arrow-rotate")

    let menu = document.querySelector(".menu2")
    menu.classList.toggle("menu-open")

    let dropdown = document.querySelector(".dropdown2")
    dropdown.setAttribute("aria-expanded", 
        dropdown.getAttribute("aria-expanded") == "true" ? "false" : "true"
    )
    console.dir(arrow);
}




</script>

<template>

    

        <!-- 上面導覽列 -->
        <div class="above">
            <a href="/adminhomepage">管理者介面</a>


        </div>

        <!-- 側邊導覽列 -->
        <div class="side">
            <a href="/adminhomepage"><img src="https://cdn-icons-png.flaticon.com/512/869/869189.png" alt=""></a>

            <hr>

            <!-- 帳號管理選單 -->
            <div class="account management">

                <button class="account dropdown" aria-expanded= "false" @click="arrowRotate">
                    <span>帳號管理</span>
                    <span class="arrow arrow1"></span>

                </button>
                <ul class="content menu">
                    <li style="--delay:1"><a href="/adminhomepage/searchteacheraccount">查詢老師帳號</a></li>
                    <li style="--delay:2"><a href="/adminhomepage/createteacheraccount">新增老師帳號</a></li>
                    <li style="--delay:3"><a href="/adminhomepage/searchstudentaccount">查詢學生帳號</a></li>
                    <li style="--delay:4"><a href="/adminhomepage/createstudentaccount">新增學生帳號</a></li>

                </ul>
            </div>

            <!-- 社團管理選單 -->
            <div class="club management">
                <button class="club dropdown2" @click="arrowRotate2">
                    <span>社團管理</span>
                    <span class="arrow arrow2"></span>

                </button>
                <ul class="content menu2">
                    <li style="--delay:1"><a href="/adminhomepage/searchclub">社團查詢</a></li>
                    <li style="--delay:2"><a href="/adminhomepage/createclub">創建社團</a></li>
                    <li style="--delay:3"><a href="/adminhomepage/schedule">期程排定</a></li>
                    <li style="--delay:4"><a href="/adminhomepage/drawlots">社團志願抽籤</a></li>

                </ul>
            </div>

        </div>

    
</template>

<style scoped lang="scss">


// 上方導覽列
.above {
    position: fixed;
    background-color: #AFD4F6;
    width: 100vw;
    height: 10vh;
    margin-left: 12w;
    display: flex;
    justify-content: flex-end;

    a {
        color: #ffffff;
        margin-top: 2vh;
        margin-right: 2vw;
        height: 6vh;
        font-size: 28px;
        text-decoration: none;
        background-image: linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255) 50%, rgb(255, 255, 255) 50%);
        ;
        background-position: left bottom;
        background-size: 0 2.5px;
        background-repeat: no-repeat;
        transition: 0.2s linear;

        &:hover {
            background-size: 100% 2.5px;
        }
    }
}

// 側邊導覽列
.side {
    position: fixed;
    background-color: rgb(148, 157, 167);
    width: 12vw;
    height: 100vh;

    img {
        width: 4vw;
        height: 8vh;
        margin-top: 1vh;
        margin-left: 4vw;
    }

    .management {
        width: 85%;
        margin-left: 1vw;

        button {
            width: 100%;
            background-color: #1d1f24;
            color: #ffffff;
            font-size: 22px;
            border: none;
            padding-top: 0.8vh;
            padding-bottom: 0.8vh;
            border-radius: 0.5em;
            display: flex;
            justify-content: space-around;
            align-items: center;
            cursor: pointer;

            .arrow {
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 6px solid #ffffff;
                transition: transform ease-in-out 0.3s;

            }

            .arrow-rotate {
                transform: rotate(180deg);
            }

        }

        .content {
            list-style: none;
            width: 100%;
            position: relative;

            // 控制元素可見性
            visibility: hidden;
            overflow: hidden;
          
           

            li {
                margin: 0.2em 0;
                background-color: #2f3238;
                border-radius: 0.5em;
                transition: 0.5s;
                transition-delay: calc(60ms * var(--delay));
                position: relative;
                left: 100%;

                &:hover {
                    background-color: #1d1f24;
                }


                a {
                    font-size: 18px;
                    padding: 0.7em 1em;
                    color: #ffffff;
                    text-decoration: none;
                }

            }

        }
        .menu-open {
              
              visibility: visible;
            
              li{
                  left: 0;
              }
          }

    }
}
</style>