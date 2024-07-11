<script setup>
import adminHeader from '@/components/adminHeader.vue'


</script>

<template>

    <body>
        <adminHeader />
        <div class="area">
            <div class="information">
                <div class="area2">
                    <h1>新增教師資料</h1>
                    <div class="name">
                        <h2>姓名</h2>

                        <input type="text" placeholder="請輸入老師姓名">
                    </div>
                    <div class="identity">
                        <h2>教職員編號</h2>
                        <input type="text" placeholder="請輸入教職員編號">
                    </div>

                    <div class="pwd">
                        <h2>密碼</h2>
                        <input type="text" placeholder="請輸入密碼">
                    </div>

                    <div class="pwd2">
                        <h2>再次輸入密碼</h2>
                        <input type="text" placeholder="請再次輸入密碼">
                    </div>

                    <div class="email">
                        <h2>E-mail</h2>
                        <input type="text" placeholder="請輸入信箱">
                    </div>
                    <div class="state">
                        <h2>狀態</h2>
                        <select name="" id="">
                            <option value="">請選擇</option>
                            <option value="未到職">未到職</option>
                            <option value="在職">在職</option>
                        </select>
                    </div>
                </div>
            </div>

        </div>


    </body>
</template>

<style scoped lang="scss">
body {
    background-color: #fff;
}

.area {
    width: 84vw;
    height: 100vh;
    padding-top: 13vh;
    margin-left: 16vw;
    color: black;


        .information {
            width: 50vw;
            height: 80vh;
            margin-left: 20vw;
            background-color: aliceblue;
            // .area2{
            //    padding: 10vh 10vw;
              
            // }
        }

        input {
            font-size: 20px;

        }

        select {
            font-size: 18px;
        }

        option {
            font-size: 18px;
        }
    
}
</style>