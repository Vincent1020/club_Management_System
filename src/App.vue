<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/StudentHome">StudentHome學生首頁</RouterLink>
        <RouterLink to="/adminHomepage">adminHomepage</RouterLink>
        <RouterLink to="/login">login</RouterLink>
        <RouterLink to="/teacherHomepage">teacherHomepage</RouterLink>

      </nav>
    </div>

  <RouterView />
</template>

<style scoped lang="scss">
.wrapper {

  position: fixed;
  z-index: 2;
}
</style>
