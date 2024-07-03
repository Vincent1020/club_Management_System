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
      path: '/adminHomepage',
      name: 'AdminHomepage',
      component: () => import('../views/Admin/AdminHomepage.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login/Login.vue'),
    },
    {
      path: '/login/forgot-password',
      name: 'ForgotPassword',
      component: () => import('../views/Login/ForgotPassword.vue')
    },
    {
      path: '/login/verify',
      name: 'Verify',
      component: () => import('../views/Login/Verify.vue')
    },
    {
      path: '/TeacherHomepage',
      name: 'TeacherHomepage',
<<<<<<< HEAD
      component: () => import('../views/Teacher/TeacherHomepage.vue') 
=======
      component: () => import('../views/Teacher/TeacherHomepage.vue')
>>>>>>> Xavier
    },
    {
      path: '/ClubIntroduction',
      name: 'ClubIntroduction',
<<<<<<< HEAD
      component: () => import('../views/Student/ClubIntroduction.vue') 
=======
      component: () => import('../views/Student/ClubIntroduction.vue')
>>>>>>> Xavier
    },
    {
      path: '/ClubSelection',
      name: 'ClubSelection',
<<<<<<< HEAD
      component: () => import('../views/Student/ClubSelection.vue') 
=======
      component: () => import('../views/Student/ClubSelection.vue')
>>>>>>> Xavier
    },
    {
      path: '/LotteryResults',
      name: 'LotteryResults',
<<<<<<< HEAD
      component: () => import('../views/Student/LotteryResults.vue') 
=======
      component: () => import('../views/Student/LotteryResults.vue')
>>>>>>> Xavier
    }
  ]
})

export default router
