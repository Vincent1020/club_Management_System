<script setup>
import { ref } from 'vue'

let pw1 =ref("")
let pw2 =ref("")
let errmsg = ref("")
function reset (){
    if (!pw1.value || !wp2.value) {
        errmsg.value = "帳號、密碼不得為空"
        return
    }
    else if(pw1.value != wp2.value){
        errmsg.value = "密碼不一致"
        return
    }
}

</script>

<template>
 <body>
    
    <div class="center">
        <!-- 輸入密碼 -->
        <div class="pwd1 pw">
            <h1>請輸入新密碼</h1>
            <input type="text" v-model="pw1" required>
        </div>

        <!-- 再次輸入密碼 -->
        <div class="pwd2 pw">
            <h1>再次輸入新密碼</h1>
            <input type="text" v-model="pw2" required>
            <p>{{errmsg}}</p>
        </div>
      
        <!-- 功能選項 -->
        <div class="function">

            <input type="button" @click="reset" value="Reset Password">

        </div>


    </div>
    </body>
</template>

<style scoped lang="scss">
body{width: 100%;height: 100%;position: relative;background-color: #cce3f5}
.center {
    width: 40vw;
    height: 50vh;
    background-color: white;
    position: fixed;
    top: 25%;
    left: 30%;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
  

   
    .pw{

        width: 60%;
        height: 35%;
        input{
            font-size: 20px;
            margin-top: 1vh;
            height: 6vh;
            width: 20vw;
        }
        p{
        font-size: 20px;
    
        color: red;
        }
    } 
  .pwd1{
    margin-top: 5vh;
    height: 30%;

  }
    
    .function{
     
        margin-top: 2vh;
        margin-left: 22vw;
        input{
            width: 12vw;
            height: 6vh; 
            font-size: 20px;    
               
        }
    }
   
}
</style>