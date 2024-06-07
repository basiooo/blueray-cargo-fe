import { createRouter,createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import RegistrationPage from '../pages/RegistrationPage.vue'
import CalculationPage from '../pages/CalculationPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      beforeEnter: ()=>{
        const token = localStorage.getItem('access')
        if (token != null) {
          return window.location.href = '/'
        }
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationPage,
      beforeEnter: ()=>{
        const token = localStorage.getItem('access')
        if (token != null) {
          return window.location.href = '/'
        }
      }
    },
    {
      path: '/',
      name: 'calculation',
      component: CalculationPage,
      beforeEnter: ()=>{
        const token = localStorage.getItem('access')
        if (token === null) {
          return window.location.href = '/login'
        }
      }
    },
  ]
})

export default router
