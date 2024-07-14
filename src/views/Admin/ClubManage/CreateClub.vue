<script setup>
import adminHeader from '@/components/adminHeader.vue'


</script>

<template>

    <body>
        <adminHeader />


        <div class="breadcrumb">
            <ul>
                <li><a href="/adminhomepage">管理者首頁</a> ></li>
                <li><a href="/adminhomepage/searchclub">社團查詢</a> ></li>
                <li>&nbsp;新增社團</li>
            </ul>
        </div>
        
        <div class="area">
            <div class="information">
                <div class="area2">
                  
                    <div class="name">
                        <h2>社團名稱</h2>

                        <input type="text" placeholder="請輸入社團名稱">
                    </div>
                    <div class="identity">
                        <h2>社團ID</h2>
                        <input type="text" placeholder="請輸入社團ID">
                    </div>

                    <div class="intro">
                        <h2>介紹</h2>
                        <input type="text" placeholder="請介紹此社團">
                    </div>

                    <div class="teacherId">
                        <h2>負責教師教職員編號</h2>
                        <input type="text" placeholder="請輸入教職員編號">
                    </div>

                    <div class="classroom">
                        <h2>上課地點</h2>
                        <input type="text" placeholder="請輸入上課地點">
                    </div>
                    <div class="max">
                        <h2>名額上限</h2>
                        <input type="text" placeholder="請輸入上線人數">
                    </div>
                    <div class="state">
                        <h2>狀態</h2>
                        <select name="" id="">
                            <option value="">請選擇</option>
                            <option value="未到職">未到職</option>
                            <option value="在職">在職</option>
                        </select>
                    </div>
                    <button>提交</button>
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