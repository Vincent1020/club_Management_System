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
      name: 'adminHomepage',
      component: () => import('../views/admin/aHomepage.vue') 
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login.vue') 
    },
    {
      path: '/teacherHomepage',
      name: 'teacherHomepage',
      component: () => import('../views/teacher/teacherHomepage.vue') 

    }
  ]
})

export default router
