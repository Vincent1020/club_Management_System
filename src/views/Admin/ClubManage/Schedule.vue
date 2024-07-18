<script setup>
import adminHeader from '@/components/adminHeader.vue'
import { ref,onBeforeUpdate } from 'vue'

let draw = ref(false)
let time = ref(false)
let msg = ref("")

let handleDraw =()=>{
    
    let startdraw = {

    }
    fetch("http://localhost:8080/Club/random", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(startdraw)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.statusCode == 200) {
                draw.value = true
                msg.value = "已完成本學期社團抽籤"
                
            }
        }).catch(err => {
            console.log(err)
            errmsg.value = ("發生錯誤")
        })
}



</script>

<template>

    <body>
        <adminHeader />


        <div class="breadcrumb">
            <ul>
                <li><a href="/adminhomepage">管理者首頁</a> ></li>
                <li>&nbsp;期程&抽籤</li>
            </ul>
        </div>

        <div class="area">
            <div v-if="time == false" class="schedule">
                <h2>學生選社團開始時間</h2>
                <div class="choisetime">
                    <input type="date">
                    <h2>到</h2>
                    <input type="date">
                    <button @click="time = true">確認</button>
                </div>
            </div>
            <div v-else class="conflrm">

                <h2>開始時間為</h2>
            </div>
            <div class="draw">
                <button v-if="draw == false" @click=handleDraw>本學期社團抽籤</button>
                <h1 v-else>{{ msg }}</h1>
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
    margin-left: 13vw;
    color: black;
    display: flex;
    flex-direction: column;

    align-items: center;

    button {
        font-size: 30px;
        width: 20vw;
        height: 10vh;

        &:hover {
            cursor: pointer;
        }

    }

    h2 {
        margin: 4vh;
        margin-left: 11vw;

    }

    .choisetime {
        display: flex;
        margin: 5vh;

        input {
            margin: 2vh;
        }

        h2 {
            margin: 2vh;
        }

        button {
            width: 5vw;
            height: 5vh;
            margin: 2vh;
            margin-left: 3vw;
            font-size: 18px;

        }
    }

    .conflrm {
        h2 {
            margin-left: 1vw;
        }
    }

    h1 {

        font-size: 30px;
    }
}
</style>
