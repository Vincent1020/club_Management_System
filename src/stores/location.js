// import { defineStore } from "pinia";

// export default defineStore("location", {
//     state: () => ({  // state部分用來宣告一個物件來裝值，後面寫預設資料型態
//         //暫存
//         errmsg:"",
//         loginResponse:null
//     }),
//     getters: {

//     },
//     actions: {  // 方法
//         login(account,password) { // login這個方法裡面要放eclipse中方法Req要求的值，也就是postman body要求的格式
//             let obj ={     
//                 student_id:account,     
//                 password:password, 
//             }
//             if (!account|| !password) {
//                 this.errmsg = "帳號、密碼不得為空"
//                 return
//             }
//             fetch("http://localhost:8080/student/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(obj) // 把obj這個物件轉成Json格式，跟postman一樣
//             })
//                 .then(res => res.json())
//                 .then(data => {
//                     // this.loginResponse = data
//                     console.log(data)  //這邊是在前端網頁中按f12後顯示出data這個值有沒有抓到
//                 })
                
//         },
//         teacherIdGetClubStudent(student_id,grade,name,status){
//             let obj ={     
//                 student_id:student_id,     
//                 grade:grade, 
//                 name:name,
//                 status:status
//             }
//             fetch("http://localhost:8080/teacherDatabase/clubStudentData", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(obj) // 把obj這個物件轉成Json格式，跟postman一樣
//             })
//                 .then(res => res.json())
//                 .then(data => {
//                     // this.loginResponse = data
//                     console.log(data)  //這邊是在前端網頁中按f12後顯示出data這個值有沒有抓到
//                 })   
//         } // 在其他頁面要新增方法，直接從這邊逗點後，接著寫下去  方法名稱{}
//     }
// })