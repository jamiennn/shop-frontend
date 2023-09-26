<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()
import Header from '@/components/header/Header.vue'
import ProductList from '@/components/product/ProductList.vue'
import SideBar from '@/components/form/SideBar.vue'
import Store from '@/assets/images/Store.vue'
import { getUserApi } from '@/api/user.js'
import { useModeStore } from '@/stores/mode'
const modeStore = useModeStore()
const route = useRoute()
const uid = ref()
const sellerAccount = ref()

watch(route, async () => {
  uid.value = Number(route.params.uid)
  if (uid.value) {

    const data = await getUserApi(uid.value)
    if (data.success) {
      sellerAccount.value = data.messages.user.account
    } else if (!data.success) {
      console.error(data.messages)
    }
  }
}, { immediate: true })

watch(width, () => {
  if (width.value > 480) {
    modeStore.hamChecked = false
  }
})

</script>

<template>
  <div style="position: relative;">
    <Header :searchbar="true" :userId="uid" />
    <main class="container">
      <section class="side-bar">
        <SideBar />
      </section>
      <section class="product-list">
        <Store class="store-icon" v-if="uid" />
        <div class="seller-title" v-if="uid">{{ sellerAccount }}的商品</div>
        <ProductList :sellerId="uid" />
      </section>
    </main>
    <div v-if="modeStore.hamChecked" class="dark"></div>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-bottom: 20px;
}

.dark {
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 375px;
  background-color: gray;
  opacity: .5;
}

.side-bar {
  margin-bottom: 10px;
  width: 100%;
}

.seller-title {
  @extend %standard-title;
  display: inline-block;
  margin: 30px 10px;
}

.store-icon {
  width: 20px;
  height: 20px;
  margin-left: 40px;
}

.product-list {
  width: 100%;
  background-color: white;
  border-radius: 5px;
}

@media screen and (min-width: 480px) {
  .side-bar {
    width: 20%;
  }

  .product-list {
    width: 70%
  }
}
</style>