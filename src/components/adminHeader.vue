<script setup>

</script>

<template>

    <body>

        <!-- 上面導覽列 -->
        <div class="above">
            <a href="/adminHomepage">管理者介面</a>


        </div>

        <!-- 側邊導覽列 -->
        <div class="side">
            <a href="/adminHomepage"><img src="https://cdn-icons-png.flaticon.com/512/869/869189.png" alt=""></a>

            <hr>

            <!-- 帳號管理選單 -->
            <div class="account management">

                <button class="account dropdown">
                    <span>帳號管理</span>
                    <span class="arrow"></span>

                </button>
                <ul class="content">
                    <li style="--delay:1"><a href="">查詢老師帳號</a></li>
                    <li style="--delay:2"><a href="">新增老師帳號</a></li>
                    <li style="--delay:3"><a href="">查詢學生帳號</a></li>
                    <li style="--delay:4"><a href="">新增學生帳號</a></li>

                </ul>
            </div>

            <!-- 社團管理選單 -->
            <div class="club management">
                <button class="club dropdown">
                    <span>帳號管理</span>
                    <span class="arrow"></span>

                </button>
                <ul class="content">
                    <li style="--delay:1"><a href="">社團查詢</a></li>
                    <li style="--delay:2"><a href="">創建社團</a></li>
                    <li style="--delay:3"><a href="">期程排定</a></li>
                    <li style="--delay:4"><a href="">社團志願抽籤</a></li>

                </ul>
            </div>

        </div>

    </body>
</template>

<style scoped lang="scss">
body {
    background-color: #ffffff;
}

// 上方導覽列
.above {
    position: fixed;
    z-index: 0;
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
    z-index: 1;
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

        }

        .content {
            list-style: none;
            width: 100%;

            // 控制元素可見性
            // visibility: hidden;
            // overflow: hidden;
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
                    padding: 0.7em 2em;
                    color: #ffffff;
                    text-decoration: none;
                }

            }

        }


    }
}
</style>