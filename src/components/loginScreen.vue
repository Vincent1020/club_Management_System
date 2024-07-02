<script setup>


</script>

<template>
    <div class="center">
        <div class="userLoginChoose">
            <button>學生登入</button>
            <button>老師登入</button>
        </div>
        <div class="userLogintInput"></div>ext
        <input type="button" value="forgotPassword">

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

    .userLoginChoose {
        width: 100%;
        height: 5vw;
        display: flex;
        justify-content: space-around;

        button {
            width: 50%;

            &:hover {
                background-color: rgb(132, 219, 190);
                cursor: pointer;
            }
        }
    }

    .userLogintInput{
        
    }

}
</style>
