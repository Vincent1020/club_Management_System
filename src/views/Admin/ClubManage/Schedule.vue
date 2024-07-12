<script setup>
import adminHeader from '@/components/adminHeader.vue'
import { ref } from 'vue'

let draw = ref(false)
let time = ref(false)
</script>

<template>

    <body>
        <adminHeader />
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
                <button v-if="draw == false" @click="draw = true">本學期社團抽籤</button>
                <h1 v-else>已完成本學期社團抽籤</h1>
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
