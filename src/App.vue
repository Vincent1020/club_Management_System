<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home&nbsp;&nbsp;&nbsp;</RouterLink>
        <RouterLink to="/StudentHome">StudentHome學生首頁&nbsp;&nbsp;&nbsp;</RouterLink>
        <RouterLink to="/adminhomepage">adminHomepage&nbsp;&nbsp;&nbsp;</RouterLink>
        <RouterLink to="/login">login&nbsp;&nbsp;&nbsp;</RouterLink>
        <RouterLink to="/teacherHome">teacherHome</RouterLink>

      </nav>
    </div>

  <RouterView />
</template>

<style scoped lang="scss">
.wrapper {

  position: fixed;
  top:0;
  left:0;
  z-index: 2;
  color: yellowgreen;
  .RouterLink{
    padding: 10px;
    
  }

}
</style>
