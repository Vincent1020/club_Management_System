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
      path: '/StudentHome',
      name: 'StudentHome',
      component: () => import('../views/Student/StudentHome.vue') 
    },
    {
      path: '/AdminHomepage',
      name: 'AdminHomepage',
      component: () => import('../views/Admin/AdminHomepage.vue') 
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/Login/Login.vue') 
    },
    {
      path: '/ForgotPassword',
      name: 'ForgotPassword',
      component: () => import('../views/Login/ForgotPassword.vue') 
    },
    {
      path: '/verify',
      name: 'verify',
      component: () => import('../views/Login/verify.vue') 
    },
    {
      path: '/TeacherHomepage',
      name: 'TeacherHomepage',
      component: () => import('../views/Teacher/TeacherHomepage.vue') 
    },
    {
      path: '/ClubIntroduction',
      name: 'ClubIntroduction',
      component: () => import('../views/Student/ClubIntroduction.vue') 
    },
    {
      path: '/ClubSelection',
      name: 'ClubSelection',
      component: () => import('../views/Student/ClubSelection.vue') 
    },
    {
      path: '/LotteryResults',
      name: 'LotteryResults',
      component: () => import('../views/Student/LotteryResults.vue') 
    }
  ]
})

export default router
