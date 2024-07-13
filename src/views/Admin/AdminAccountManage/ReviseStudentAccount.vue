<script setup>
import adminHeader from '@/components/adminHeader.vue'


</script>

<template>

    <body>
        <adminHeader />

        <div class="breadcrumb">
            <ul>
                <li><a href="/adminhomepage">管理者首頁</a> ></li>
                <li><a href="/adminhomepage/searchstudentaccount">搜尋學生帳號</a> ></li>
                <li>&nbsp;修改學生帳號</li>
            </ul>
        </div>

        <div class="area">
            <div class="information">
                <div class="area2">
                    <!-- <h1>新增教師資料</h1> -->
                    <div class="name">
                        <h2>姓名</h2>

                        <input type="text" placeholder="請輸入學生姓名">
                    </div>
                    <div class="identity">
                        <h2>學號</h2>
                        <input type="text" placeholder="請輸入學號">
                    </div>

                    <div class="pwd">
                        <h2>密碼</h2>
                        <input type="password" placeholder="請輸入密碼">
                    </div>

                    <div class="pwd2">
                        <h2>再次輸入密碼</h2>
                        <input type="password" placeholder="請再次輸入密碼">
                    </div>

                    <div class="email">
                        <h2>E-mail</h2>
                        <input type="text" placeholder="請輸入信箱">
                    </div>
                    <div class="state">
                        <h2>狀態</h2>
                        <select name="" id="">
                            <option value="">請選擇</option>
                            <option value="入學中">入學中</option>
                            <option value="在學">在學</option>
                            <option value="畢業">畢業</option>
                            <option value="">肄業</option>
                            <option value="">轉學</option>
                            <option value="">休學</option>
                            <option value="">退學</option>
                        </select>
                        <span>帳號不得為空</span>
                    </div>
                    <a href="/adminhomepage/searchstudentaccount"><button>提交</button></a>
                </div>
            </div>

        </div>


    </body>
</template>

<style scoped lang="scss">
body {
    background-color: #fff;
}
.breadcrumb {
    width: 30vw;
    position: absolute;
    color: rgb(82, 87, 99);
    left: 15vw;
    top: 5vh;

    ul{
        display: flex;
        list-style: none;
        font-size: 1.1em;
        a{
            text-decoration: none;
            color: rgb(51, 68, 161);
        }
    }
}
.area {
    width: 84vw;
    height: 100vh;
    padding-top: 13vh;
    margin-left: 16vw;
    color: black;

    
        .information {
            width: 50vw;
            height: 85vh;
            margin-left: 15vw;
            border-radius: 1em;
            background-color: rgba(240, 247, 250, 0.863);
            h2{
                margin-top: 1.5vh;
                margin-bottom: 1vh;
            }
            .area2{
               padding-top: 1vh;
               padding-left: 5vw;
               h1{
                margin-left: 13vw;
               }
              
            }
        }

        input {
            font-size: 20px;
            height: 5vh;
            width: 30vw;
            border: 1px solid #585858;
            border-radius: 0.2em;

        }

        select {
            font-size: 18px;
        }

        option {
            font-size: 17px;
        }
        span{
        font-size: 18px;
        color: red;
        margin-left: 20vw;
    }
        button{
            width: 7vw;
            height: 4vh; 
            margin-left: 33vw;
            font-size: 18px;

            &:hover{
                cursor: pointer;
            }
        }
    
}
</style>