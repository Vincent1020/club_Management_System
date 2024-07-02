<template>
<div class="student-home">
    <!-- 頁面頭部，包括標題和導航欄 -->
    <header class="header">
      <h1>首頁</h1>
      <nav class="nav">
        <!-- 帳號管理連結 -->
        <router-link to="/account-management">帳號管理</router-link>
        <!-- 當前頁面指示 -->
        <span class="current-interface">學生介面</span>
      </nav>
    </header>



    <div class="m-4">
      <p>default</p>
      <el-select
        v-model="value1"
        multiple
        placeholder="Select"
        style="width: 240px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="m-4">
      <p>use collapse-tags</p>
      <el-select
        v-model="value2"
        multiple
        collapse-tags
        placeholder="Select"
        style="width: 240px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="m-4">
      <p>use collapse-tags-tooltip</p>
      <el-select
        v-model="value3"
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="Select"
        style="width: 240px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="m-4">
      <p>use max-collapse-tags</p>
      <el-select
        v-model="value4"
        multiple
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="3"
        placeholder="Select"
        style="width: 240px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const value1 = ref([])
  const value2 = ref([])
  const value3 = ref([])
  const value4 = ref([])
  const options = [
    {
      value: 'Option1',
      label: 'Option1',
    },
    {
      value: 'Option2',
      label: 'Option2',
    },
    {
      value: 'Option3',
      label: 'Option3',
    },
    {
      value: 'Option4',
      label: 'Option4',
    },
    {
      value: 'Option5',
      label: 'Option5',
    },
  ]
  </script>

  <style scoped>
  .student-home {
  text-align: center; /* 文字置中 */
  font-family: Arial, sans-serif; /* 設置字體 */

  .header {
    background-color: #87CEEB; /* 背景顏色 */
    padding: 10px; /* 內邊距 */
    display: flex; /* 使用 flex 布局 */
    justify-content: space-between; /* 兩端對齊 */
    align-items: center; /* 垂直置中 */
    color: white; /* 文字顏色 */

    .nav {
      display: flex; /* 使用 flex 布局 */
      gap: 20px; /* 元素間距 */
    }
}
}
  </style>
  