<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/StudentHome">StudentHome學生首頁</RouterLink>
        <RouterLink to="/adminHomepage">adminHomepage</RouterLink>
        <RouterLink to="/login">login</RouterLink>
        <RouterLink to="/teacherHomepage">teacherHomepage</RouterLink>

      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
.wrapper {
  position: fixed;
  z-index: 2;
}
</style>