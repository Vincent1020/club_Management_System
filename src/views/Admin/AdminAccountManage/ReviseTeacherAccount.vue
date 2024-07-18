<script setup>
import adminHeader from '@/components/adminHeader.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';

let router = useRouter()

let name = ref("")
let pwd = ref("")
let pwd2 = ref("")
let email = ref("")
let status = ref("")
let errmsg = ref("")


let accountarr = ref([])
const submit = () => {

    if (name.value == "") {
        errmsg.value = "請輸入姓名"
    }
}


// 搜尋該老師帳號所有資訊
onMounted(() => {
    let teacherId = sessionStorage.getItem("teacherId")
    console.log(teacherId);

    let teacherAccount = ref({
        teacher_id: teacherId
    })
    fetch("http://localhost:8080/teacherDatabase/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(teacherAccount.value)
    })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            accountarr.value = data.quizList
            console.log(accountarr.value)

            if(accountarr.value.length>0){
                name.value= accountarr.value[0].name,                
                email.value= accountarr.value[0].email,
                status.value = accountarr.value[0].status
            }
       
        })
        .catch(err => {
            console.log(err)
            errmsg.value = ("修改失敗")
        })

})


</script>

<template>

    <body>
        <adminHeader />
        <!-- 麵包屑 -->
        <div class="breadcrumb">
            <ul>
                <li><a href="/adminhomepage">管理者首頁</a> ></li>
                <li><a href="/adminhomepage/searchteacheraccount">搜尋老師帳號</a> ></li>
                <li>&nbsp;修改老師帳號</li>
            </ul>
        </div>

        <div class="area">
            <div class="information">
                <div class="area2">
                    <!-- <h1>新增教師資料</h1> -->
                    <div class="name">
                        <h2>姓名</h2>
                        <input type="text" v-model="name" placeholder="請輸入老師姓名">
                    </div>
                    <div class="pwd">
                        <h2>密碼</h2>
                        <input type="password" v-model="pwd" placeholder="請輸入密碼">
                    </div>

                    <div class="pwd2">
                        <h2>再次輸入密碼</h2>
                        <input type="password" v-model="pwd2" placeholder="請再次輸入密碼">
                    </div>

                    <div class="email">
                        <h2>E-mail</h2>
                        <input type="text" v-model="email" placeholder="請輸入信箱">
                    </div>

                    <!-- 狀態選擇&錯誤訊息顯示 -->

                    <div class="state">
                        <h2>狀態</h2>
                        <select v-model="status">
                            <option value="">請選擇</option>
                            <option value="未到職">未到職</option>
                            <option value="在職中">在職</option>
                            <option value="在職">在職</option>
                            <option value="離職">離職</option>
                            <option value="退休">退休</option>
                        </select>

                        <!-- 錯誤訊息 -->
                        <span>{{ errmsg }}</span>
                    </div>
                    <a href="/adminhomepage/searchteacheraccount"><button @click="submit">修改</button></a>
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
    width: 40vw;
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


    .information {
        width: 50vw;
        height: 70vh;
        margin-left: 15vw;
        margin-top: 7vh;
        border-radius: 1em;
        background-color: rgba(240, 247, 250, 0.863);

        h2 {
            margin-top: 1.5vh;
            margin-bottom: 1vh;
        }

        .area2 {
            padding-top: 1vh;
            padding-left: 5vw;

            h1 {
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

    span {
        font-size: 18px;
        color: red;
        margin-left: 20vw;
    }

    button {
        width: 7vw;
        height: 4vh;
        margin-left: 33vw;
        font-size: 18px;

        &:hover {
            cursor: pointer;
        }
    }

}
</style>