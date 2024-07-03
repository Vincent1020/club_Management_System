<script setup>

</script>

<template>
<div class="center">
    <div class="verify">
        <h1>請輸入Email</h1>
        <input type="text">
    </div>
    <input type="button" @click="" value="ForgotPassword">

</div>
</template>

<style scoped lang="scss">
.center{
    width: 40vw;
    height: 50vh;
    background-color: white;
    position: fixed;
    top: 25%;
    left: 30%;
    
    display: flex;
    align-items: center;
    justify-content: center;
    .verify{
        h1{
            margin-bottom: 10%;
        }
        color: black;
        margin-bottom: 10%;
    }
}
</style>
