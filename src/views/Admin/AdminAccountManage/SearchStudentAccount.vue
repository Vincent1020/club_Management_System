<script setup>
import adminHeader from '@/components/adminHeader.vue'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router';

let router = useRouter()

let status = ref("在學中")
let identity = ref("")
let name = ref("")
let email = ref("")

let searchAll = ref(false)

let checkedall = ref(false)
// 全選陣列
let checkarr = ref([false, false, false, false, false, false, false, false, false, false])

let accountarr = ref([])

let studentAccount = ref({
    status: status,
    student_id: identity,
    name: name,
    email: email,
})

onMounted(() => {
    accountFetch()
})

// 搜尋功能
function search() {
    accountFetch()
}
let searchall = () => {
    status.value = searchAll.value === false ? "在學中" : "非在學";
}
// 全選
function checkall() {
    console.log(checkedall.value);
    
    checkarr.value = checkedall.value === true ? [false, false, false, false, false, false, false, false, false, false] : [true, true, true, true, true, true, true, true, true, true]
    console.log(checkarr.value);
}
// 傳送帳號資料
function sent(studentId) {
    
    sessionStorage.setItem('studentId', studentId)

    console.log(studentId);

    router.push({path: '/adminhomepage/revisestudentaccount'})
}

function accountFetch() {
    fetch("http://localhost:8080/student/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(studentAccount.value)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            accountarr.value = data.studentList
            console.log(accountarr.value);
        })
        .catch(err => { console.log(err) })

}




// 頁碼
let currentPage = ref(1)
let row = 10

let pageCount = computed(() =>

    Math.ceil(accountarr.value.length / row)
)
let visiblePages = computed(() => {
    let totalVisiblePages = 7 // 顯示的頁碼數量
    let halfVisible = Math.floor(totalVisiblePages / 2)

    let startPage = Math.max(currentPage.value - halfVisible, 1)
    let endPage = startPage + totalVisiblePages - 1

    if (endPage > pageCount.value) {
        endPage = pageCount.value
        startPage = Math.max(endPage - totalVisiblePages + 1, 1)
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
})
let pagenumber = computed(() => {

    let start = (currentPage.value - 1) * row
    let end = start + row
    return accountarr.value.slice(start, end)
})
function setpage(page) {
    currentPage.value = page
}


</script>

<template>

    <body>
        <adminHeader />

        <!-- 麵包屑 -->
        <div class="breadcrumb">
            <ul>
                <li><a href="/adminhomepage">管理者首頁</a> ></li>
                <li>&nbsp;搜尋學生帳號</li>
            </ul>
        </div>

        <div class="area">

            <div class="function">
                <!-- 新增按鈕 -->
                <a class="add" href="/adminhomepage/createstudentaccount"><img
                        src="https://cdn-icons-png.flaticon.com/512/2377/2377839.png" alt=""></a>

                <!-- 畢業學生 -->
                <a class="graduate" href=""><img src="https://cdn-icons-png.flaticon.com/512/4645/4645232.png"
                        alt=""></a>

                <!-- 搜尋非在學 -->
                <div class="notstudying">
                    <span>非在學</span>
                    <input type="checkbox" v-model="searchAll" @change="searchall" value="false">
                </div>
                <!-- 搜尋按鈕 -->
                <input type="text" v-model="name" placeholder="搜尋學生名稱">
                <img class="search" @click="search" src="https://cdn-icons-png.flaticon.com/512/954/954591.png" alt="">
            </div>

            <!-- 顯示列 -->
            <table>
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" v-model="checkedall" @click="checkall">
                                <span>全選</span>
                            </label>
                        </th>
                        <th class="status">狀態</th>
                        <th class="identity">學號</th>
                        <th class="name">姓名</th>
                        <th class="email">Email</th>
                        <th class="revise">修改</th>
                        <th class="remove">畢業</th>


                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item, index) in pagenumber">
                        <td><input type="checkbox" v-model="checkarr[index]"></td>
                        <td>{{ item.status }}</td>
                        <td>{{ item.studentId }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.email }}</td>
                        <td>
                            <img @click="sent(item.studentId)"
                                src="https://cdn-icons-png.flaticon.com/512/1160/1160119.png" alt="">
                        </td>
                        <td>
                            <a href=""> <img src="https://cdn-icons-png.flaticon.com/512/3096/3096750.png" alt=""></a>
                        </td>

                    </tr>

                </tbody>

            </table>

            <div class="pagenumber">
                <ul>
                    <li v-for="page in visiblePages" :key="page" :class="{ active: currentPage === page }"
                        @click="setpage(page)">
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

    ul {
        display: flex;
        list-style: none;
        font-size: 1.1em;

        a {
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

        // 畢業
        .graduate {
            width: 2vw;
            height: 4vh;
            margin-left: 2vw;
            margin-right: 35vw;

            img {
                width: 2.6vw;
                height: 5vh;
            }
        }

        .notstudying {
            display: flex;
            align-items: center;

            input {
                width: 2.5vw;
                height: 2.5vh;
                margin-right: 2vw;
            }
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

            // 全選
            label {
                background-color: rgb(223, 227, 229);
                border-radius: 0.3em;
                padding: 0.1vh 0.5vw;

                span {
                    font-size: 18px;
                }

                input[type="checkbox"] {
                    display: none;
                }

                &:hover {
                    cursor: pointer;
                }

            }

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
        color: black;

        ul {
            font-size: 16px;
            display: flex;
            list-style-type: none;

        }

        li {
            margin: 0.3vh;
            padding: 1vh;
            border-radius: 0.8em;
            transition: all 0.2s ease;
            cursor: pointer;

            &:hover {
                background-color: lighten(#007bff, 35%);
            }

            &.active {
                font-size: 18px;
                background-color: rgb(171, 201, 243);
                color: white;
            }
        }
    }

}
</style>
