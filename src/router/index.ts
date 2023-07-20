import { createRouter, createWebHistory } from 'vue-router'
import { watch } from 'vue'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'

import { useAuthenticator } from '@/stores/authenticator';
import { useQueryStringStore } from '@/stores/queryString'

const checkAuthBeforeEnter = async () => {
  const authenticator = useAuthenticator()

  watch(authenticator, () => {
    if (!authenticator.isAuthenticated) router.push('/login')
  }, { immediate: true })
}

const checkQueryBeforeEnter = async (route) => {
  const queryStringStore = useQueryStringStore()
  const { keyword, priceMin, priceMax, page } = route.query
  queryStringStore.keyword = keyword
  queryStringStore.priceMin = priceMin
  queryStringStore.priceMax = priceMax
  queryStringStore.page = page
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
    beforeEnter: checkQueryBeforeEnter
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async () => {
  const authenticator = useAuthenticator()
  const authToken = localStorage.getItem('authToken')
  authToken ? await authenticator.checkPermission(authToken) : false
  console.log('in beforeEach')
})

export default router
