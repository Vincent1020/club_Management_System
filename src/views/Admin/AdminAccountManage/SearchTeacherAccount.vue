<script setup>
import adminHeader from '@/components/adminHeader.vue'
import { ref, onMounted } from 'vue'
onMounted(() => {
    function search() {

        fetch("http://localhost:8080/quiz/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(searchObj)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.resArr = data.quizList
                console.log(this.resArr);
            })
            .catch(err => { console.log(err) })


    }
})
</script>

<template>

    <body>
        <adminHeader />

        <div class="area">

            <div class="function">
                <!-- 新增按鈕 -->
                <a href="/adminhomepage/createteacheraccount"><img class="add"
                        src="https://cdn-icons-png.flaticon.com/512/2377/2377839.png" alt=""></a>

                <!-- 搜尋按鈕 -->
                <input type="text">
                <img class="search" @click="search" src="https://cdn-icons-png.flaticon.com/512/954/954591.png" alt="">
            </div>

            <!-- 顯示列 -->
            <table>
                <thead>
                    <tr>
                        <th class="status">狀態</th>
                        <th class="identity">教職員編號</th>
                        <th class="pwd">密碼</th>
                        <th class="name">姓名</th>
                        <th class="email">Email</th>
                        <th class="email">操作</th>

                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>

                </tbody>

            </table>

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
    padding-top: 15vh;
    margin-left: 16vw;
    color: black;

    .function {
        display: flex;
        align-items: center;

        img {
            width: 2vw;
            height: 4vh;

            &:hover {
                cursor: pointer;
            }
        }

        .add {
            margin-left: 4vw;
            margin-right: 55vw;
        }

        .search {
            margin-left: 1vw;
        }
    }

    table {
        width: 80vw;
        margin-top: 2vh;
        text-align: center;
        border-collapse: collapse;
        table-layout: auto;


        thead {
            font-size: 20px;
            background-color: #e6eef6;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        tbody {
            border-bottom: 1px solid #e8eef4;
            font-size: 18px;
            background-color: #fcfcfc;
        }
    }


}
</style>
