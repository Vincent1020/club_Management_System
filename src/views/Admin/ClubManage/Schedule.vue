<script setup>
import adminHeader from '@/components/adminHeader.vue'
import {ref} from 'vue'

let draw=ref(false)

</script>

<template>
    <body>
        <adminHeader />
        <div class="area">
            <div class="schedule">
                <h2>學生選社團開始時間</h2>
                <div class="choisetime">
                <input type="date">
                <h2>到</h2>
                <input type="date">
            </div>
            </div>
            <div class="draw">
            <button v-if="draw==false" @click="draw=true">本學期社團抽籤</button>
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
    margin-left: 16vw;
    color: black;
    button{
        font-size: 30px;
        width: 20vw;
        height: 10vh;
        &:hover{
            cursor: pointer;
        }

    }

    h1{
        font-size: 30px;
        }
}
</style>
