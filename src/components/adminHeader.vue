<script setup>

</script>

<template>
<body>
    

    <div class="above">
<a href="/adminHomepage">管理者介面</a>


</div>
<div class="side">
<a href="/adminHomepage"><img src="https://cdn-icons-png.flaticon.com/512/869/869189.png" alt=""></a>
<hr>
</div>
</body>
</template>

<style>
body{
    background-color: #ffffff;
}
.above{
    position: fixed;
    z-index: 0;
    background-color:#AFD4F6 ;
    width: 85vw;
    height: 10vh;
    margin-left: 15vw;
    display: flex;
    justify-content: flex-end;
    a{  
        color: #ffffff;
        margin-top: 2vh;
        margin-right: 2vw;
        height: 6vh;
        font-size: 28px;
        text-decoration: none;
        background-image:linear-gradient(to right,rgb(255, 255, 255),rgb(255, 255, 255) 50%,rgb(255, 255, 255) 50%); ;
        background-position: left bottom;
        background-size: 0 2.5px;
        background-repeat: no-repeat;
        transition: 0.2s linear;

        &:hover{
            background-size: 100% 2.5px;
        }
    }
    }
.side{
    
    position: fixed;
    z-index: 1;
    background-color: rgb(148, 157, 167);
    width: 15vw;
    height: 100vh;
    img{
        width: 4vw;
        height: 8vh;
        margin-top: 1vh;
        margin-left: 4vw;
    }
}

</style>