<template>
  <div class="teacher-interface">
    <!-- 頁面的頭部，包括標題-->
    <header class="header">
      <h1>老師介面</h1>
    </header>

    <!-- 主內容區 -->
    <main class="main-content">
      <!-- 使用 Element UI 的表格組件 -->
      <el-table :data="tableData" style="width: 100%">
        <!-- 表格列的配置 -->
        <el-table-column prop="class" label="班級"></el-table-column>
        <el-table-column prop="student_id" label="學號"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="attendance" label="出席">
          <template v-slot="scope">
            <!-- 根據出席狀況顯示不同的標籤 -->
            <el-tag v-if="scope.row.attendance" type="success">✔️</el-tag>
            <el-tag v-else type="danger">❌</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="狀態">
          <template v-slot="scope">
            <!-- 按鈕用於改變狀態 -->
            <el-button type="text" @click="handleStatusChange(scope.row)">
              <el-icon :name="scope.row.status ? 'coin' : 'setting'"></el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tableData: [], // 初始化表格數據為空
    };
  },
  methods: {
    //定義一個方法來獲取表格數據
    async fetchTableData() {
      try {
        // 使用 fetch API 發送 POST 請求到后端
        const response = await fetch('http://localhost:8080/quiz/search', {
          method: 'POST', // 使用 POST 方法
          headers: {
            'Content-Type': 'application/json' // 設置請求頭
          },
          // 發送的請求體，這裡是一個空值的 JSON 對象
          body: JSON.stringify({ id: '', start_date: '', end_date: '' }) 
        });

        // 檢查響應是否成功
        if (!response.ok) {
          //如果響應不成功，丟一個錯誤
          throw new Error(`HTTP 錯誤！狀態馬：${response.status}`);
        }

        // 將響應轉換為 JSON 格式
        const data = await response.json();
        // 設置 tableData 為返回的數據
        this.tableData = data.quizList || [];
      } catch (error) {
        // 捕捉錯誤並在控制台輸出
        console.error(`无法获取数据：${error.message}`);
      }
    },
    // 定義一個方法處理狀態變化
    handleStatusChange(row) {
      // 改變當行的狀態
      row.status = !row.status;
    }
  },
  // 組件創建時，調用 fetchTableData 方法獲取數據
  created() {
    this.fetchTableData();
  },
};
</script>


<style scoped lang="scss">
.teacher-interface {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;

  .header {
    background-color: #87CEEB; 
    padding: 10px; /* 內邊距 */
    color: white; /* 文字顏色 */
    text-align: right; /* 文字置右 */
  }

  .main-content {
    flex: 1; /* 填滿剩餘空間 */
    padding: 20px; /* 內邊距 */
    background-color: #F5F5F5;
  }
}
</style>
