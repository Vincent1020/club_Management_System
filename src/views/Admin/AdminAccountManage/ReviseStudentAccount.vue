<script setup>
import adminHeader from '@/components/adminHeader.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';

let router = useRouter()

let name = ref("")
let identity = ref(0)
let pwd = ref("")
let pwd2 = ref("")
let email = ref("")
let status = ref("")

// 其他資訊
let semester = ref("")
let grade = ref("")
let clubId = ref()
let choiceList = ref("")


let errmsg = ref("")

let accountarr = ref([])

onMounted(() => {
    let studentId = sessionStorage.getItem("studentId")
    console.log(studentId);

    let studentAccount = ref({
        student_id: studentId
    })
    console.log(studentAccount.value);

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

            if (accountarr.value.length > 0) {
                name.value = accountarr.value[0].name,
                    identity.value = accountarr.value[0].studentId,
                    email.value = accountarr.value[0].email,
                    status.value = accountarr.value[0].status
                    // 其他資訊
                    grade.value = accountarr.value[0].grade
                    clubId.value = accountarr.value[0].clubId
                    choiceList.value = accountarr.value[0].choiceList  
                    semester.value = accountarr.value[0].semester
            }
            console.log(accountarr.value);
        })
        .catch(err => { console.log(err) })
})

// 驗證
function submit() {
    if (pwd.value != pwd2.value) {
        errmsg.value = ("密碼不一致")
        return
    }
    else if (name.value == "") {
        errmsg.value = ("請輸入姓名")
        return
    }
    else if (!isNaN(name.value)) {
        errmsg.value = ("姓名請輸入文字")
        return
    }
    else if (pwd.value == "") {
        errmsg.value = ("請輸入密碼")
        return
    }
    else if (pwd2.value == "") {
        errmsg.value = ("請再次輸入密碼")
        return
    }
    else if (email.value == "" || !email.value.includes("@")) {
        errmsg.value = ("請輸入有效的電子信箱")
        return
    }
    else if (status.value == "") {
        errmsg.value = ("請選擇狀態")
        return
    }

    let reviseAccount = {
        student_id: identity.value,
        name: name.value,
        pwd: pwd.value,
        email: email.value,
        status: status.value,
        grade : grade.value,
        club_id : clubId.value,
        choice_list : choiceList.value,
        semester: semester.value
    }


    console.log(reviseAccount)
    fetch("http://localhost:8080/student/createOrUpdate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviseAccount)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
     
            if(data.status== 400){
                errmsg.value = ("修改失敗")
            }
            else if(data.statusCode== 200){
                errmsg.value = ("修改成功")
                router.push({ path: '/adminhomepage/searchstudentaccount' })
            }         

        })
        .catch(err => {
            console.log(err)

            errmsg.value = ("修改失敗")
        })


}

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
                <!-- 讓方框內的資料對齊 -->
                <div class="area2">
                <div class="name">
                    <h2>姓名</h2>
                    <input type="text" v-model="name" placeholder="請輸入學生姓名">
                </div>
                <div class="identity">
                    <h2>學號</h2>
                    <input type="text" v-model="identity" placeholder="請輸入學號">
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
                <div class="state">
                    <h2>狀態</h2>
                    <select v-model="status">
                        <option value="">請選擇</option>
                        <option value="在學中">在學</option>
                        <option value="非在學">非在學</option>

                    </select>
                    <span>{{ errmsg }}</span>
                </div>
                <button @click="submit">提交</button>
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
        height: 85vh;
        margin-left: 15vw;
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