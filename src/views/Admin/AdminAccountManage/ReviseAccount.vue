<script setup>
import { ref ,defineProps,defineEmits} from 'vue'

const props = defineProps({
    accountType:{
        type:String,
        required:true,
        validator:(value)=>["student","teacher"].includes(value)
            
        

    }
})

const emit = defineEmits(["submit"])


let name = ref("")
let identity = ref()
let pwd = ref("")
let pwd2 = ref("")
let email = ref("")
let status = ref("")
let errmsg = ref("")

const submit = () => {

    if (name.value == "") {
        errmsg.value = "請輸入姓名"
    }
  

}

</script>

<template>

    <body>
 
        <!-- 麵包屑 -->
        <div class="breadcrumb">
            <ul>
                <li><a href="/adminhomepage">管理者首頁</a> ></li>
                <li><a href="/adminhomepage/searchstudentaccount">搜尋老師帳號</a> ></li>
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
                    <div class="identity">
                        <h2>教職員編號</h2>
                        <input type="text" v-model="identity" placeholder="請輸入教職員編號">
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