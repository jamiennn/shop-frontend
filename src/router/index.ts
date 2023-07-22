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

const checkRoleBeforeEnter = async () => {
  const authenticator = useAuthenticator()

  watch(authenticator, () => {
    if (!authenticator.currentMember) {
      authenticator.role = 'guest'
    } else if (authenticator.currentMember.isSeller) {
      authenticator.role = 'seller'
    } else {
      authenticator.role = 'buyer'
    }
  }, { immediate: true })
}

const checkQueryBeforeHome = async (route, from) => {
  const queryStringStore = useQueryStringStore()
  const { keyword, priceMin, priceMax, page, shopId } = route.query

  if (shopId) router.replace(`${from.path}${queryStringStore.queryString}`)

  queryStringStore.keyword = keyword
  queryStringStore.priceMin = priceMin
  queryStringStore.priceMax = priceMax
  queryStringStore.page = page
}

const checkQueryBeforeShop = async (route) => {
  const queryStringStore = useQueryStringStore()
  const { keyword, priceMin, priceMax, page } = route.query

  queryStringStore.shopId = route.params.uid
  queryStringStore.keyword = keyword
  queryStringStore.priceMin = priceMin
  queryStringStore.priceMax = priceMax
  queryStringStore.page = page
}

const clearAllQuery = () => {
  const queryStringStore = useQueryStringStore()
  queryStringStore.handleClearAll()
  router.push('/')
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/users/:uid/products',
    name: 'SellerPage',
    component: HomePage,
    beforeEnter: [
      checkRoleBeforeEnter,
      checkQueryBeforeShop]
  },
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    beforeEnter: [checkQueryBeforeHome, checkRoleBeforeEnter]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'OtherPages',
    beforeEnter: [checkRoleBeforeEnter, clearAllQuery]
  },
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
