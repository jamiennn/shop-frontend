<script setup lang="ts">
import Logout from '@/components/button/Logout.vue'
import { useQueryStringStore } from '@/stores/queryString'
const queryStringStore = useQueryStringStore()
import router from '@/router';
import Create from '@/assets/images/Create.vue'
import ListIcon from '@/assets/images/List.vue'
import Cart from '@/assets/images/Cart.vue'

defineProps<{
  role: string,
  user: object
}>()
const wrapperClass = "nav-list d-flex flex-row"
</script>

<template>
  <div v-if="user && role === 'buyer'" :class="wrapperClass">
    <li class="cart">
      <router-link class="nav-list-icon" :to="`/carts/${user.id}`">
        <Cart class="btn-product btn-add-product" id="btn-add-product" />
        <span class="tooltip tooltip-cart">瀏覽購物車</span>
      </router-link>
    </li>
    <li class="product">
      <router-link class="nav-list-icon" :to="`/users/${user.id}/orders`">
        <ListIcon class="btn-product btn-list" />
        <span class="tooltip tooltip-product-list">我的訂單</span>
      </router-link>
    </li>
    <Logout />
  </div>
  <div v-else-if="user && role === 'seller'" :class="wrapperClass">
    <li class="create">
      <router-link class="nav-list-icon" to="/products/new">
        <Create class="btn-product btn-create" />
        <span class="tooltip tooltip-create">新增商品</span>
      </router-link>
    </li>
    <li class="product">
      <router-link class="nav-list-icon" :to="`/users/${user.id}/products`" @click="() => {
        // 清除搜尋條件
        queryStringStore.handleClearAll()
        // 重新提供shopId

        queryStringStore.shopId = user.id
        // 強制 re-render
        router.push(`/users/${user.id}/products`)
      }">
        <ListIcon class="btn-product btn-list" />
        <span class="tooltip tooltip-product-list">商品清單</span>
      </router-link>
    </li>
    <Logout />
  </div>
  <div v-else-if="role === 'guest'" :class="wrapperClass">
    <li class="create">
      <router-link class="nav-list-item login" to="/login">
        login
      </router-link>
    </li>
  </div>
  <div class="nav-list-item" v-if="user">{{ user.account }}</div>
</template>

<style lang="scss">
.nav-list {
  flex-direction: column;
  opacity: 0;
}

.nav-toggle:checked~.nav-list-wrapper>.nav-list,
.nav-toggle:checked~.nav-list-wrapper>.nav-list~.nav-list-item {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.nav-list-item {
  @extend %standard-href;
  cursor: pointer;
  margin: 0 10px;
  opacity: 0;
}

.login {
  opacity: 1;
}

li {
  height: 100%;
  display: flex;
  align-items: center;
}


.nav-list-icon {
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: var(--light-blue);
  fill: var(--dark-blue);
  border-radius: 50%;
  width: 30px;
  height: 30px;

  .btn-product {
    width: 20px;
    height: 20px;
  }

  .tooltip-create,
  .tooltip-product-list {
    width: 60px;
  }

  .tooltip-cart {
    width: 70px;
  }

  &:hover .tooltip {
    opacity: 1;
    transition: all .4s ease-out;
  }
}

.tooltip {
  @extend %standard-tooltip
}

/////////////////電腦版/////////////////
@media screen and (min-width: 480px) {
  .nav-list {
    height: 100%;
    width: 120px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    opacity: 1;
  }

  .nav-list-item {
    opacity: 1;
  }

  .tooltip-create,
  .tooltip-product-list,
  .nav-toggle:checked~.nav-list-wrapper>.nav-list .tooltip-create,
  .nav-toggle:checked~.nav-list-wrapper>.nav-list .tooltip-product-list {
    opacity: 0;
    top: 35px;
    right: -15px;
  }

  .tooltip-cart,
  .nav-toggle:checked~.nav-list-wrapper>.nav-list .tooltip-cart {
    opacity: 0;
    top: 40px;
    right: -20px;
  }

  .nav-toggle:checked~.nav-list-wrapper>.nav-list .nav-list-icon:hover .tooltip,
  .nav-toggle:checked~.nav-list-wrapper>.nav-list .nav-list-icon:hover #tooltip-logout {
    opacity: 1;
    transition: all .4s ease-out;
  }
}
</style>