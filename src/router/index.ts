import { createRouter, createWebHistory } from 'vue-router'
import { watch } from 'vue'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'

import { useAuthenticator } from '@/stores/authenticator';

const checkAuthBeforeEnter = async () => {
  const authenticator = useAuthenticator()

  watch(authenticator, () => {
    if (!authenticator.isAuthenticated) router.push('/login')
  }, { immediate: true })
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    beforeEnter: checkAuthBeforeEnter
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async () => {
  const authenticator = useAuthenticator()
  const authToken = localStorage.getItem('authToken')
  await authenticator.checkPermission(authToken)
  console.log('in beforeEach')
})

export default router
