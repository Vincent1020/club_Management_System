<script setup>
import adminHeader from '@/components/adminHeader.vue'
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router';

let router = useRouter()

let name = ref("")
let intro = ref("")
let classroom = ref("")
let max = ref()
let semester = ref("")
let pay = ref()


let msg = ref("")
let teacherId = ref()
let clubId = ref()
let teacherName = ref("")
let clubarr = ref([])

let accountarr = ref([])

// 搜尋該社團所有資訊
onMounted(() => {
    clubId = sessionStorage.getItem("clubId")
    console.log(clubId);

    let clubsearch = {
        club_id: clubId
    }
    fetch("http://localhost:8080/Club/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(clubsearch)
    })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            clubarr.value = data.clubList
            

            if (clubarr.value.length > 0) {
                classroom.value = clubarr.value[0].classroom
                name.value = clubarr.value[0].name,
                teacherId.value = clubarr.value[0].teacherId,
                intro.value = clubarr.value[0].intro,
                semester.value = clubarr.value[0].semester
                pay.value = clubarr.value[0].pay
                max.value = clubarr.value[0].max
                clubId.value = clubarr.value[0].clubId             

            }
          
        })
        .catch(err => {
            console.log(err)
         
        })

})

watch(teacherId, (searchId) => {

    if (teacherId.value > 0) {
        let teacherAccount = {
            teacher_id: searchId
        }

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
                accountarr.value = data.quizList
                console.log(accountarr.value);

                if (accountarr.value.length > 0) {
                    teacherName.value = accountarr.value[0].name
                } else {
                    teacherName.value = "未找到教師"
                }
                console.log(teacherName.value)
            })

            .catch(err => {
                console.log(err)
            })

    } else {
        teacherName.value = ""
    }
}, { immediate: true })

// 修改社團
function submit() {

    if (name.value == "") {
        msg.value = "請輸入社團名稱"
        return
    }
    else if (intro.value == "") {
        msg.value = "請輸入社團簡介"
    }
    else if (classroom.value == "") {
        msg.value = "請輸入社團教室"
    }
    else if (max.value == "") {
        msg.value = "請輸入社團人數"
    }
    else if (semester.value == "") {
        msg.value = "請輸入社團學期"
    }  
    else if (teacherId.value == "") {
        msg.value = "請輸入社團教師"
    }
    else {
        msg.value = ""
    }

    let reviseClub = {
        club_id: 0,
        name: name.value,
        intro: intro.value,
        classroom: classroom.value,
        max: max.value,
        semester: semester.value,
        pay: pay.value,
        teacher_id: teacherId.value
    }
    fetch("http://localhost:8080/Club/createOrUpdate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviseClub)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.statusCode == 200) {
                msg.value = "修改成功"
                router.push({ path: '/adminhomepage/searchclub' })
            }
            else {
                msg.value = "修改失敗"
            }
        })
        .catch(err => {
            console.log(err)
            msg.value = ("新增失敗，請稍後再試")
        })
}

</script>

<template>

    <body>
        <adminHeader />
        <div class="breadcrumb">
            <ul>
                <li><a href="/adminhomepage">管理者首頁</a> ></li>
                <li><a href="/adminhomepage/searchclub">社團查詢</a> ></li>
                <li>&nbsp;修改社團</li>
            </ul>
        </div>

        <div class="area">
            <div class="information">
                <div class="area2">
                    <div class="clubName">
                        <div class="name">
                            <h2>社團名稱</h2>
                            <input type="text" v-model="name" placeholder="請輸入社團名稱">
                        </div>
                    </div>
                    <div class="intro">
                        <h2>介紹</h2>
                        <textarea rows="5" v-model="intro" placeholder="請介紹此社團"></textarea>
                    </div>
                    <div class="classinfo">
                        <div class="classroom">
                            <h2>上課地點</h2>
                            <input type="text" v-model="classroom" placeholder="請輸入上課地點">
                        </div>
                        <div class="max">
                            <h2>名額上限</h2>
                            <input type="text" v-model="max" placeholder="請輸入上線人數">
                        </div>
                    </div>

                    <div class="otherinfo">
                        <div class="semester">
                            <h2>學期</h2>
                            <input type="text" v-model="semester" placeholder="請輸入學期">
                        </div>
                        <div class="pay">
                            <h2>社費</h2>
                            <input type="text" v-model="pay" placeholder="如不需要社費請打0">
                        </div>
                    </div>

                    <div class="teacherId">
                        <h2>負責教師教職員編號</h2>
                        <input type="text" v-model.number="teacherId" @change="searchteacheraccount"
                            placeholder="請輸入教職員編號">
                        <span>{{ teacherName }}</span> <!-- 即時查詢老師姓名 -->
                        <span class="msg">{{ msg }}</span>
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
    margin-left: 15vw;
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

    // all input
    input {
        font-size: 20px;
        height: 5vh;
        border: 1px solid #585858;
        border-radius: 0.2em;

    }

    // 設定社團名稱&ID 
    .clubName {
        display: flex;

        .name {
            input {
                width: 28vw;
            }
        }

        .identity {
            margin-left: 3VW;

            input {
                width: 10vw;
            }
        }
    }

    // 介紹
    .intro {
        textarea {
            font-size: 1.5em;
            width: 41vw;
            height: 15vh;
        }
    }

    // 設定上課地點&名額上限
    .classinfo {
        display: flex;

        .classroom {
            input {
                width: 28vw;
            }
        }

        .max {
            margin-left: 3vw;

            input {
                width: 10vw;
            }
        }
    }

    // 老師編號
    .teacherId {
        input {
            width: 20vw;
        }

        span {
            margin: 4vw;
            font-size: 1.5em;
            color: rgb(86, 86, 87);
        }

        .msg {
            margin: 1vw;
            color: red;
        }
    }

    .otherinfo {
        display: flex;

        .pay {
            margin-left: 3vw;
        }
    }

}

select {
    font-size: 18px;
}

option {
    font-size: 17px;
}

button {
    width: 7vw;
    height: 4vh;
    margin-top: 1vh;
    margin-left: 33vw;
    font-size: 18px;

    &:hover {
        cursor: pointer;
    }
}
</style>