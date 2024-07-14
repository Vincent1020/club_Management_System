<script setup>
import adminHeader from '@/components/adminHeader.vue'
import { ref, onMounted, computed } from 'vue'

let status = ref("")
let identity = ref("")
let pwd = ref("")
let name = ref("")
let email = ref("")

let accountarr = ref([])

let teacherAccount = ref([{
    status: status,
    teacher_id: identity,
    pwd: pwd,
    name: name,
    email: email,
}])


// 頁碼
let currentPage = ref(1)
let row = 10

let pageCount = computed(() =>

    Math.ceil(teacherAccount.value.length / row)
)

let pagenumber = computed(() => {

    let start = (currentPage.value - 1) * row
    let end = start + row
    return teacherAccount.value.slice(start, end)
})
function setpage(page) {
    currentPage.value = page
}


onMounted(() => {
        fetch("http://localhost:8080/teacherDatabase/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(teacherAccount)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                accountarr = data.quizList
                console.log(accountarr);
            })
            .catch(err => { console.log(err) })
    
})

// function search(){
//     fetch("http://localhost:8080/teacherDatabase/search", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(teacherAccount)
//         })
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data)
//                 accountarr = data.quizList
//                 console.log(accountarr);
//             })
//             .catch(err => { console.log(err) })
// }
</script>

<template>

    <body>
        <adminHeader />
        <div class="breadcrumb">
            <ul>
                <li><a href="/adminhomepage">管理者首頁</a> ></li>
                <li>&nbsp;搜尋老師帳號</li>
            </ul>
        </div>

        <div class="area">

            <div class="function">
                <!-- 新增按鈕 -->
                <a class="add" href="/adminhomepage/createteacheraccount"><img
                        src="https://cdn-icons-png.flaticon.com/512/2377/2377839.png" alt=""></a>

                <!-- 刪除人員 -->
                <a class="remove" href=""><img src="https://cdn-icons-png.flaticon.com/512/748/748138.png" alt=""></a>

                <!-- 搜尋按鈕 -->
                <input type="text" placeholder="搜尋老師名稱">
                <img class="search" @click="search" src="https://cdn-icons-png.flaticon.com/512/954/954591.png" alt="">
            </div>

            <!-- 顯示列 -->
            <table>
                <thead>
                    <tr>
                        <th><input type="button" value="全選"></th>
                        <th class="status">狀態</th>
                        <th class="identity">教職員編號</th>
                        <th class="pwd">密碼</th>
                        <th class="name">姓名</th>
                        <th class="email">Email</th>
                        <th class="revise">修改</th>
                        <th class="remove">離職</th>

                    </tr>
                </thead>

                <tbody>
                    <tr v-for="item in accountarr">
                        <td><input type="checkbox"></td>
                        <td>{{ item.status }}</td>
                        <td>{{ item.teacherId}}</td>
                        <td>{{ item.pwd }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.email }}</td>
                        <td>
                            <a href="/adminhomepage/reviseteacheraccount"><img
                                    src="https://cdn-icons-png.flaticon.com/512/1160/1160119.png" alt=""></a>

                        </td>
                        <td>
                            <a href=""> <img src="https://cdn-icons-png.flaticon.com/512/3096/3096750.png" alt=""></a>
                        </td>
                    </tr>

                </tbody>

            </table>

            <div class="pagenumber">
                <ul>
                    <li v-for="page in pageCount" :class="{ active: currentPage == page }" @click="setpage(page)">
                        {{ page }}
                    </li>


                </ul>
            </div>
        </div>

    </body>
</template>

<style scoped lang="scss">
body {
    background-color: #fff;
}

.breadcrumb {
    width: 20vw;
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
            width: 2vw;
            height: 4vh;
            margin-left: 4vw;

        }

        .remove {
            width: 2vw;
            height: 4vh;
            margin-left: 2vw;
            margin-right: 50vw;
        }

        .search {
            margin-left: 1vw;
        }

        input {

            font-size: 18px;
        }
    }

    table {
        width: 80vw;
        margin-top: 2vh;
        text-align: center;
        border-collapse: collapse;
        table-layout: auto;


        thead {
            font-size: 22px;
            background-color: #e6eef6;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

            input {
                height: 4vh;
                width: 3vw;
                margin-bottom: 1vh;
                background-color: rgb(216, 221, 230);
                border: none;
                border-radius: 0.5em;

                &:hover {
                    cursor: pointer;
                }
            }
        }

        tbody {
            border-bottom: 1px solid #e8eef4;
            font-size: 20px;
            background-color: #fcfcfc;

            tr {

                &:hover {
                    background-color: #f3f7fb;
                }
            }

            td {
                padding: 0.8vh;
                border-bottom: 1px solid #e8eef4;

                input {
                    height: 2.5vh;
                    width: 1.5vw;

                }

                img {

                    height: 3.3vh;
                    width: 1.7vw;

                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }

    .pagenumber {
        position: absolute;
        bottom: 5vh;
        left: 50vw;

        ul {
            width: 5vw;
            font-size: 16px;

            display: flex;
            list-style: none;

            &:hover {
                cursor: pointer;
            }

            li {
                padding: 0.5vh 0.5vw;
                border-radius: 1em;
            }
        }

        .active {
            background-color: rgb(171, 201, 243);
            font-size: 18px;
            color: #fff;
        }

        color: black;
    }

}
</style>
