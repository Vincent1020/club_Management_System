<script setup>
import adminHeader from '@/components/adminHeader.vue'
import { onMounted, ref } from 'vue'

let teachers = ref()
let students = ref()
let clubs = ref()
let thing = ref([])

onMounted(() => {
    // 老師總人數
    fetch("http://localhost:8080/teacherDatabase/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            teachers.value = data.quizList.length
            console.log(teachers.value);
        })
        .catch(err => { console.log(err) })

        // 學生總數
        fetch("http://localhost:8080/student/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            students.value = data.studentList.length
            console.log(testudentsachers.value);
        })
        .catch(err => { console.log(err) })

        // 社團總數
        fetch("http://localhost:8080/Club/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            clubs.value = data.clubList.length
            console.log(clubs.value);
        })
        .catch(err => { console.log(err) })

        // 借用情形
        fetch("http://localhost:8080/Venue/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            thing.value = data.venueList
            console.log(thing.value);
        })
        .catch(err => { console.log(err) })

        
})




</script>

<template>

    <body>
        <adminHeader />
        <div class="area">
            <div class="area2">
                <div class="topinfo">
                    <div class="teacherTotal">
                        <h1>全校教師總數</h1>
                        <h1>{{teachers}}人</h1>
                    </div>
                    <div class="studentTotal">
                        <h1>全校學生總數</h1>
                        <h1>{{students}}人</h1>
                    </div>
                    <div class="clubTotal">
                        <h1>全校社團總數</h1>
                        <h1>{{clubs}}個</h1>
                    </div>

                </div>
                <h2>場地、器材使用狀態</h2>

                <div class="borrow">
                    <div v-for="item in thing" class="card">
                        <h3>{{ item.id}}</h3>
                        <h3 v-if ="item.user.length > 0">使用者：{{ item.user}}</h3>
                        <!-- <h3 v-if ="item.user.length > 0">使用中</h3> -->
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
    color: black;
    padding-top: 15vh;
    margin-left: 15vw;


    .topinfo {
        display: flex;

        .teacherTotal {
            width: 20vw;
            height: 20vh;
            margin-left: 7vw;
            border-radius: 1em;
            box-shadow: 3px 2px 6px #cacccc;
            background-color: #f1f1f170;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;          

            &:hover {
                transform: translateY(-5px);
            }

        }

        .studentTotal {
            width: 20vw;
            height: 20vh;
            margin-left: 4vw;
            box-shadow: 3px 2px 6px #cacccc;
            background-color:#f1f1f170;
            border-radius: 1em;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;         
            &:hover {
                transform: translateY(-5px);
            }
        }

        .clubTotal {
            width: 20vw;
            height: 20vh;
            margin-left: 4vw;
            box-shadow: 3px 2px 6px #cacccc;
            background-color: #f1f1f170;
            border-radius: 1em;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          

            &:hover {
                transform: translateY(-5px);
            }
        }

    }
h2{
    font-size: 2em;
    margin-left: 35vw;
    margin-top: 6vh;
}
    .borrow{
        width: 75vw;
        height: 40vh;
        margin-top: 3vh;
        margin-left: 4vw;
       
        display: flex;
        flex-wrap: wrap;
       .card{
           width: 12vw;
           height: 16vh;  
           font-size: 1.3em;  
           margin-left: 3vw;       
           border-radius: 1em;
           box-shadow: 3px 2px 6px #cacccc;
           display: flex;
           flex-direction: column;
           justify-content: center;
           align-items: center;


              &:hover {
                transform: translateY(-5px);
            }
       }
    }
}
</style>