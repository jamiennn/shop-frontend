import { createRouter, createWebHistory } from 'vue-router'
import { watch } from 'vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import HomePage from '../views/HomePage.vue'
import CreateProductPage from '../views/CreateProductPage.vue'
import CartPage from '@/views/CartPage.vue'
import OrderPage from '@/views/OrderPage.vue'
import UserOrderPage from '@/views/UserOrderPage.vue'
import ProductDetail from '@/views/ProductDetail.vue'

import { useAuthenticator } from '@/stores/authenticator';
import { useQueryStringStore } from '@/stores/queryString'
import { useModeStore } from '@/stores/mode'
import { errorToast } from '@/helper/toast.js'

// 檢查是否已登入
const checkAuthBeforeEnter = async () => {
  const authenticator = useAuthenticator()

  watch(authenticator, () => {
    if (!authenticator.isAuthenticated) return router.push('/login')
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

// 檢查是否為買家
const checkCartAuth = (route) => {
  const authenticator = useAuthenticator()
  const userId = Number(route.params.uid)
  if (authenticator.role !== 'buyer' || authenticator.currentMember.id !== userId) {
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
  const order = route.query['order[]']

  // 因為categories是陣列，另外做處理
  const categories = route.query['categoryId[]']
  const categoryIdArray = categories ? Array.isArray(categories) ? categories : [categories] : ''

  if (shopId) router.replace(`${from.path}${queryStringStore.queryString}`)

  queryStringStore.keyword = keyword
  queryStringStore.priceMin = priceMin
  queryStringStore.priceMax = priceMax
  queryStringStore.page = page

  Object.assign(queryStringStore.order, order)
  // 先把原本 store 中的陣列清空 (改成負1)，再放入 route 拿到的 query 內容
  for (let cat of queryStringStore.categories) cat = '-1'
  Object.assign(queryStringStore.categories, categoryIdArray)
}

// 檢查 query string
const checkQueryBeforeShop = async (route) => {
  const queryStringStore = useQueryStringStore()
  const { keyword, priceMin, priceMax, page } = route.query
  const order = route.query['order[]']
  const categories = route.query['categoryId[]']
  const categoryIdArray = categories ? Array.isArray(categories) ? categories : [categories] : ''

  queryStringStore.shopId = route.params.uid
  queryStringStore.keyword = keyword
  queryStringStore.priceMin = priceMin
  queryStringStore.priceMax = priceMax
  queryStringStore.page = page

  Object.assign(queryStringStore.order, order)
  for (let cat of queryStringStore.categories) cat = '-1'
  Object.assign(queryStringStore.categories, categoryIdArray)
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
    path: '/register',
    name: 'Register',
    component: RegisterPage
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
    path: '/users/:uid/orders',
    name: 'UserOrderPage',
    component: UserOrderPage,
    beforeEnter: [
      checkRoleBeforeEnter,
      checkCartAuth]
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
    path: '/products/:pid/edit',
    name: 'edit',
    component: CreateProductPage,
    beforeEnter: [
      checkRoleBeforeEnter,
      checkSellerAuth]
  },
  {
    path: '/products/:pid',
    name: 'product-detail',
    component: ProductDetail,
    beforeEnter: [
      checkAuthBeforeEnter,
      checkRoleBeforeEnter]
  },
  {
    path: '/orders/:oid',
    name: 'OrderPage',
    component: OrderPage,
    beforeEnter: [
      checkRoleBeforeEnter,
      checkAuthBeforeEnter]
  },
  {
    path: '/carts/:uid',
    name: 'CartPage',
    component: CartPage,
    beforeEnter: [
      checkRoleBeforeEnter,
      checkCartAuth]
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
  if (!authToken) {
    authenticator.isAuthenticated = false
    authenticator.currentMember = null
    authenticator.role = 'guest'
    return
  }
  await authenticator.checkPermission(authToken)

  // 清空下拉式 header 狀態
  const modeStore = useModeStore()
  modeStore.hamChecked = false
})

export default router
