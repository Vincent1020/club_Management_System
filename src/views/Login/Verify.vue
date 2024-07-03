<script setup>

</script>

<template>
    <div class="center">

        <div class="verify">
            <h1>請輸入Email</h1>
            <input type="text" placeholder="XXX@email.com">
        </div>
        <div class="function">
            <input type="button" @click="" onclick="location.href='/login'" value="Back"> <!-- 上一頁 -->
            <input type="button" @click="" value="verify"> <!-- 驗證 -->
        </div>
    </div>
   
</template>

<style scoped lang="scss">
.center {
    width: 40vw;
    height: 50vh;
    background-color: white;
    position: fixed;
    top: 25%;
    left: 30%;
    display: flex;
    flex-direction: column;
    align-items: center ;

    

    .verify {
        margin-top: 14vh;
        input{
            font-size: 2vw;
        }
        h1 {
            margin-bottom: 10%;
        }

        color: black;
        margin-bottom: 10%;
    }
    .function {
        
        input{
            font-size: 22px;
            margin-right: 1vw;
        }
    }
}
</style>
