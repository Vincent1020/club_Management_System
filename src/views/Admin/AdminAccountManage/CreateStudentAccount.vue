<script setup>
import adminHeader from '@/components/adminHeader.vue'
import { ref } from 'vue'


let name = ref("")
let identity = ref()
let pwd = "123"
let semester = ref("")
let email = ref("")
let status = ref("")
let grade = ref("")
let errmsg = ref("")
let choice_list = ""

let accountarr = ref([])
let teacherAccount = {}

let clearForm = () => {
    name.value = ""
    semester.value = ""
    identity.value = ""
    email.value = ""
    status.value = ""
    grade.value = ""

}
function submit() {
    teacherAccount = {
        student_id: identity.value,
        name: name.value,
        semester: semester.value,
        grade: grade.value,
        pwd: pwd,
        email: email.value,
        status: status.value,
        choice_list: choice_list
    }

console.log(teacherAccount);

    if (name.value == "") {
        errmsg.value = ("請輸入姓名")
        return
    }
    else if (isNaN(identity.value)) {
        errmsg.value = ("請輸入正確學號")
        return
    }
    else if (!isNaN(name.value)) {
        errmsg.value = ("請輸入文字")
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
    console.log(teacherAccount.value)
    fetch("http://localhost:8080/student/createOrUpdate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(teacherAccount)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            accountarr.value = data.quizList
            console.log(accountarr.value);
            errmsg.value = ("新增成功")

            clearForm()

        })
        .catch(err => {
            console.log(err)
            errmsg.value = ("新增失敗")
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
                <li>&nbsp;新增學生帳號</li>
            </ul>
        </div>

        <div class="area">
            <div class="information">
                <div class="area2">
                    <div class="name">
                        <h2>姓名</h2>
                        <input type="text" v-model="name" placeholder="請輸入學生姓名">
                    </div>
                    <div class="semesterGrade">
                        <div class="semester">
                        <h2>學年度</h2>
                        <input type="text" v-model="semester" placeholder="請輸入學年度">
                    </div>
                    <div class="grade">
                        <h2>班級</h2>
                        <input type="text" v-model="grade" placeholder="請輸入學年度">
                    </div>
                    </div>
               
                    <div class="identity">
                        <h2>學號</h2>
                        <input type="text" v-model="identity" placeholder="請輸入學號">
                    </div>
                    <div class="email">
                        <h2>E-mail</h2>
                        <input type="text" v-model="email" placeholder="請輸入信箱">
                    </div>
                    <div class="state">
                        <h2>狀態</h2>
                        <select v-model="status">
                            <option value="">請選擇</option>
                            <option value="入學中">入學中</option>
                            <option value="在學中">在學</option>
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
        height: 80vh;
        margin-top: 2vh;
        margin-left: 15vw;
        border-radius: 1em;
        background-color: rgba(240, 247, 250, 0.863);

        h2 {
            margin-top: 3vh;
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
        font-size: 1.3em;
    }

    option {
        font-size: 0.9em;
    }

    button {
        width: 7vw;
        height: 4vh;
        margin-top: 3vh;
        margin-left: 33vw;
        font-size: 1.3em;

        &:hover {
            cursor: pointer;
        }
    }

    .state {
        span {
            font-size: 1.3em;
            color: red;
            margin-left: 18vw;

        }
    }
    .semesterGrade{
        display: flex;
        input {
        font-size:1.2em;
        height: 5vh;
        width: 20vw;
        }
        .grade{
            margin-left: 3vw;
            input {
                width: 15vw;
                }
        }
    }

}
</style>