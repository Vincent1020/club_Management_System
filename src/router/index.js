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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
    }
  ]
})

export default router
