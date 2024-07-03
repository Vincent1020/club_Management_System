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
      path: '/TeacherHomepage',
      name: 'TeacherHomepage',
      component: () => import('../views/Teacher/TeacherHomepage.vue') 
    }
  ]
})

export default router
