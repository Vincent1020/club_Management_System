<script setup>
import adminHeader from '@/components/adminHeader.vue'
import { ref,watch} from 'vue'
import { useRoute } from 'vue-router';

let teacherId = ref()

let accountarr = ref([])

// watch(teacherId, (newValue) => {
//     if (newValue) {
//         debouncedSearch()
//     } else {
//         teacherName.value = ''
//     }

let searchteacheraccount =(() => {
 
    let teacherAccount = {
        teacher_id : teacherId
    }

    fetch("http://localhost:8080/teacherDatabase/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(teacherAccount.value)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            accountarr.value = data.quizList
            console.log(accountarr.value);

        })
        .catch(err => { console.log(err) })
}

    )

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
                    <div class="clubName">
                        <div class="name">
                            <h2>社團名稱</h2>
                            <input type="text" placeholder="請輸入社團名稱">
                        </div>
                        <div class="identity">
                            <h2>社團ID</h2>
                            <input type="text" placeholder="請輸入社團ID">
                        </div>
                    </div>
                    <div class="intro">
                        <h2>介紹</h2>
                        <textarea rows="5" placeholder="請介紹此社團"></textarea>
                    </div>
                    <div class="classinfo">
                        <div class="classroom">
                            <h2>上課地點</h2>
                            <input type="text" placeholder="請輸入上課地點">
                        </div>
                        <div class="max">
                            <h2>名額上限</h2>
                            <input type="text" placeholder="請輸入上線人數">
                        </div>
                    </div>
                    <div class="teacherId">
                        <h2>負責教師教職員編號</h2>
                        <input type="text" v-model="teacherId" @change="searchteacheraccount" placeholder="請輸入教職員編號">                   
                        <span>{{ teacherName }}</span>     <!-- 即時查詢老師姓名 -->
                    </div>
                    <div class="semester">
                        <h2>學期</h2>
                        <input type="text" placeholder="請輸入學期">
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
    .teacherId{
        input{
            width: 25vw;
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
    margin-left: 33vw;
    font-size: 18px;

    &:hover {
        cursor: pointer;
    }
}


</style>