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
      path: '/TeacherHome',
      name: 'TeacherHome',
      component: () => import('../views/Teacher/TeacherHome.vue')
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
    },
    {
      path: '/CreateClub',
      name: 'CreateClub',
      component: () => import('../views/Student/CreateClub.vue') 
    },
    {
      path: '/StudentManage',
      name: 'StudentManage',
      component: () => import('../views/Student/StudentManage.vue') 
    },
    {
      path: '/ApplicationItem',
      name: 'ApplicationItem',
      component: () => import('../views/Student/ApplicationItem.vue') 
    }
  ]
})

export default router
