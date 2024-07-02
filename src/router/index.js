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
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
=======
>>>>>>> Xavier
    },
    {
      path: '/StudentHome',
      name: 'StudentHome',
<<<<<<< HEAD
      component: () => import('../views/StudentHome.vue')
=======
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
>>>>>>> Stashed changes
>>>>>>> Xavier
    }
  ]
})

export default router
