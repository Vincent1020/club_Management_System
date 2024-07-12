import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/StudentHome',//學生首頁
      name: 'StudentHome',
      component: () => import('../views/Student/StudentHome.vue')
    },
    {
      path: '/adminhomepage',
      name: 'AdminHomepage',
      component: () => import('../views/Admin/AdminHomepage.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login/Login.vue'),
    },
    {
      path: '/login/forgotpassword',
      name: 'ForgotPassword',
      component: () => import('../views/Login/ForgotPassword.vue')
    },
    {
      path: '/login/verify',
      name: 'Verify',
      component: () => import('../views/Login/Verify.vue')
    },
    {
      path: '/TeacherHome',//老師首頁
      name: 'TeacherHome',
      component: () => import('../views/Teacher/TeacherHome.vue')
    },
    {
      path: '/ClubIntroduction',//社團介紹
      name: 'ClubIntroduction',
      component: () => import('../views/Student/ClubIntroduction.vue')
    },
    {
      path: '/ClubSelection',//社團志願選擇
      name: 'ClubSelection',
      component: () => import('../views/Student/ClubSelection.vue')
    },
    {
      path: '/MyClub',//我的社團
      name: 'MyClub',
      component: () => import('../views/Student/MyClub.vue')
    },
    {
      path: '/CreateClub',//創立社團
      name: 'CreateClub',
      component: () => import('../views/CreateClub.vue')
    },

    //學生管理
    {
      path:'/StudentManage',
      name:'StudentManage',
      component: () => import('../views/Teacher/StudentManage.vue') 
    },

    // 搜尋老師帳號
    {
      path:'/adminhomepage/searchteacheraccount',
      name:'SearchTeacherAccount',
      component: () => import('../views/Admin/AdminAccountManage/SearchTeacherAccount.vue') 
    },
    // 修改老師帳號
    {
      path:'/adminhomepage/reviseteacheraccount',
      name:'ReviseTeacherAccount',
      component: () => import('../views/Admin/AdminAccountManage/ReviseTeacherAccount.vue') 
    },
    // 創建老師帳號
    {
      path:'/adminhomepage/createteacheraccount',
      name:'CreateTeacherAccount',
      component: () => import('../views/Admin/AdminAccountManage/CreateTeacherAccount.vue') 
    },
    // 搜尋學生帳號
    {
      path:'/adminhomepage/searchstudentaccount',
      name:'SearchStudentAccount',
      component: () => import('../views/Admin/AdminAccountManage/SearchStudentAccount.vue') 
    },
    // 修改學生帳號
    {
      path:'/adminhomepage/revisestudentaccount',
      name:'ReviseStudentAccount',
      component: () => import('../views/Admin/AdminAccountManage/ReviseStudentAccount.vue') 
    },
    // 創建學生帳號
    {
      path:'/adminhomepage/createstudentaccount',
      name:'CreateStudentAccount',
      component: () => import('../views/Admin/AdminAccountManage/CreateStudentAccount.vue') 
    },
    
  
  ]
})

export default router
