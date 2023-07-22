import { createRouter, createWebHistory } from 'vue-router'
import { watch } from 'vue'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'
import CreateProductPage from '../views/CreateProductPage.vue'

import { useAuthenticator } from '@/stores/authenticator';
import { useQueryStringStore } from '@/stores/queryString'
import { errorToast } from '@/helper/toast.js'

// 檢查是否已登入
const checkAuthBeforeEnter = async () => {
  const authenticator = useAuthenticator()

  watch(authenticator, () => {
    if (!authenticator.isAuthenticated) router.push('/login')
  }, { immediate: true })
}

// 檢查角色，方便條件判斷使用
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

// 檢查是否為賣家
const checkSellerAuth = () => {
  const authenticator = useAuthenticator()
  if (authenticator.role !== 'seller') {
    errorToast(
      'error',
      'Unauthorized'
    )
    router.push('/')
  }
}

// 檢查 query string
const checkQueryBeforeHome = async (route, from) => {
  const queryStringStore = useQueryStringStore()
  const { keyword, priceMin, priceMax, page, shopId } = route.query

  if (shopId) router.replace(`${from.path}${queryStringStore.queryString}`)

  queryStringStore.keyword = keyword
  queryStringStore.priceMin = priceMin
  queryStringStore.priceMax = priceMax
  queryStringStore.page = page
}

// 檢查 query string
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
    path: '/products/new',
    name: 'create',
    component: CreateProductPage,
    beforeEnter: [
      checkRoleBeforeEnter,
      checkSellerAuth]
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
