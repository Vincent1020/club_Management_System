<script setup>
import adminHeader from '@/components/adminHeader.vue'
import { ref, onMounted, computed } from 'vue'

let status = ref("")
let identity = ref("")
let pwd = ref("")
let name = ref("")
let email = ref("")

let teacherAccount = ref([{
    status: status,
    identity: identity,
    pwd: pwd,
    name: name,
    email: email,
}])
// 測試用
let test = ref([
    {
        status: "在學",
        identity: "104001",
        pwd: "123",
        name: "王大明",
        email: "D9S9s@example.com",
    },
    {
        status: "在學",
        identity: "104002",
        pwd: "123",
        name: "王小明",
        email: "D9S9s@example.com",
    },
    {
        status: "在學",
        identity: "104003",
        pwd: "123",
        name: "李大明",
        email: "D9S9s@example.com",
    },
    {
        status: "在學",
        identity: "104004",
        pwd: "123",
        name: "李小明",
        email: "D9S9s@example.com",
    },
    {
        status: "在學",
        identity: "104005",
        pwd: "123",
        name: "陳大明",
        email: "D9S9s@example.com",
    },
    {
        status: "在學",
        identity: "104006",
        pwd: "123",
        name: "陳小明",
        email: "D9S9s@example.com",
    },
    {
        status: "在學",
        identity: "104007",
        pwd: "123",
        name: "張大明",
        email: "D9S9s@example.com",
    },
    {
        status: "在學",
        identity: "104008",
        pwd: "123",
        name: "張小明",
        email: "D9S9s@example.com",
    },
    {
        status: "在學",
        identity: "104009",
        pwd: "123",
        name: "林大明",
        email: "D9S9s@example.com",
    },
    {
        status: "在學",
        identity: "104010",
        pwd: "123",
        name: "林小明",
        email: "D9S9s@example.com",
    },
    {
        status: "在學",
        identity: "104011",
        pwd: "123",
        name: "黃大明",
        email: "D9S9s@example.com",
    },
    {
        status: "在學",
        identity: "104012",
        pwd: "123",
        name: "黃小明",
        email: "D9S9s@example.com",
    },
    {
        status: "在學",
        identity: "104013",
        pwd: "123",
        name: "蔡大明",
        email: "D9S9s@example.com",
    },
    {
        status: "在學",
        identity: "104014",
        pwd: "123",
        name: "蔡小明",
        email: "D9S9s@example.com",
    },
    {
        status: "在學",
        identity: "104015",
        pwd: "123",
        name: "謝大明",
        email: "D9S9s@example.com",
    }

])

let currentPage = ref(1)
let row = 10

let pageCount = computed(() =>

    Math.ceil(test.value.length / row)
)

let pagenumber = computed(() => {

    let start = (currentPage.value - 1) * row
    let end = start + row
    return test.value.slice(start, end)
})
function setpage(page) {
    currentPage.value = page
}


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
                <a class="add" href="/adminhomepage/createteacheraccount"><img
                        src="https://cdn-icons-png.flaticon.com/512/2377/2377839.png" alt=""></a>

                <!-- 刪除人員 -->
                <a class="remove" href=""><img src="https://cdn-icons-png.flaticon.com/512/748/748138.png" alt=""></a>

                <!-- 搜尋按鈕 -->
                <input type="text">
                <img class="search" @click="search" src="https://cdn-icons-png.flaticon.com/512/954/954591.png" alt="">
            </div>

            <!-- 顯示列 -->
            <table>
                <thead>
                    <tr>
                        <th class="status">狀態</th>
                        <th class="identity">學號</th>
                        <th class="pwd">密碼</th>
                        <th class="name">姓名</th>
                        <th class="email">Email</th>
                        <th class="revise">修改</th>
                        <th class="remove">刪除</th>

                    </tr>
                </thead>

                <tbody>
                    <tr v-for="item in pagenumber">
                        <td>{{ item.status }}</td>
                        <td>{{ item.identity }}</td>
                        <td>{{ item.pwd }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.email }}</td>
                        <td>
                            <img src="https://cdn-icons-png.flaticon.com/512/1160/1160119.png" alt="">

                        </td>
                        <td><img src="https://cdn-icons-png.flaticon.com/512/3096/3096750.png" alt=""></td>
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
        .remove{
            width: 2vw;
            height: 4vh; 
            margin-left: 2vw;
            margin-right: 50vw;
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
            font-size: 22px;
            background-color: #e6eef6;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            input{
                    height: 4vh;
                    width: 3vw;
                    margin-bottom: 1vh; 
                    background-color: rgb(216, 221, 230);
                    border: none;
                    border-radius: 0.5em;
                    &:hover{
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
