<script setup>
import adminHeader from '@/components/adminHeader.vue'
import { ref, computed, onUnmounted } from 'vue'

let draw = ref(false)


//進度條
const progress = ref(0)
const subtext = ref('抽籤中...')
const circumference = 2 * Math.PI * 90

const dashOffset = computed(() => {
    return circumference - (progress.value / 100 * circumference)
})

let intervalId

let handleDraw = () => {
    draw.value = true


    // 進度條參數
    const duration = 23000 // 23 seconds
    const interval = 50 // Update every 50ms
    const steps = duration / interval

    intervalId = setInterval(() => {
        progress.value += 100 / steps
        if (progress.value >= 100) {
            progress.value = 100
            subtext.value = '已完成抽籤！'
            clearInterval(intervalId)
        }
    }, interval)

    onUnmounted(() => {
        if (intervalId) clearInterval(intervalId)
    })



    // 抽籤fetch

    let startdraw = {}
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
                <li>&nbsp;社團抽籤</li>
            </ul>
        </div>

        <div class="area">
            <div class="draw">
                <button v-if="draw == false" @click=handleDraw>本學期社團抽籤</button>

                <div v-else-if="draw == true" class="drawing">
                    <div class="progress-ring">
                        <svg class="circle" width="200" height="200">
                            <circle stroke="#e6e6e6" stroke-width="12" fill="transparent" r="90" cx="100" cy="100" />
                            <circle stroke="#6997c2" stroke-width="12" fill="transparent" r="90" cx="100" cy="100"
                                :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset" />
                        </svg>
                        <div class="text">{{ progress.toFixed(0) }}%</div>

                    </div>
                    <div class="subtext">{{ subtext }}</div>
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
    margin-left: 13vw;
    color: black;
    display: flex;
    flex-direction: column;

    align-items: center;

    button {
       
        width: 20vw;
        height: 10vh;
        margin-top: 20vh;
        margin-left: 5vw;
        font-size: 30px;
        border-radius: 1em;
        border: none;
        color: #fff;
        cursor: pointer;
        background-color: rgb(133, 173, 247);
        &:hover {
            background-color: rgb(108, 156, 219);
        }

    }
.drawing{
    width: 30vw;
    height: 40vw;
    margin-top: 10vh;
    margin-left: 17vw;
    .progress-ring {
        position: relative;
        width: 200px;
        height: 200px;

        .circle {
            transform: rotate(-90deg);
            transform-origin: 50% 50%;
        }

        .text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 2em;
            font-weight: bold;
            color: #333;
        }

    }

    .subtext {
        margin-top: 10vh;
        margin-left: 10.5vw;
        transform: translate(-50%, -50%);
        font-size: 2em;
        font-weight: bold;
        color: #333;
    }
}
}
</style>
