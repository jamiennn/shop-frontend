<script setup lang="ts">
import { reactive, ref, watch, onBeforeMount } from 'vue'
import ChecksInput from '@/components/form/ChecksInput.vue'
import { getCategoriesApi } from '@/api/category.js'
import { useQueryStringStore } from '@/stores/queryString'
const queryStringStore = useQueryStringStore()

defineProps({
  checked: Array
})
const emit = defineEmits(['update:checked'])
const checkStatus: any[] = reactive([])

// 勾選框有變的時候向父元件更新
watch(checkStatus, () => {
  emit('update:checked', checkStatus)
})

const productListKey = ref('')

// 監控 query string store，若有變化要重新 render 此面板
watch(queryStringStore, async () => {
  const queryCheck = queryStringStore.categories

  for (let i = 0; i < checkStatus.length; i++) {
    // 已勾選的標記起來
    if (queryCheck.includes(`${checkStatus[i].id}`)) {
      checkStatus[i].isChecked = true
    } else {
      checkStatus[i].isChecked = false
    }
  }
  productListKey.value = queryStringStore.getProductListKey()
}, { immediate: true })

// 第一次渲染頁面，查詢所有分類
onBeforeMount(async () => {
  const data = await getCategoriesApi()
  const allCategories = data.messages.categories
  const queryCheck = queryStringStore.categories

  if (data.success) {

    // 將查詢到的所有分類放進陣列
    for (let i = 0; i < allCategories.length; i++) {
      checkStatus[i] = allCategories[i]

      // 已勾選的標記起來
      if (queryCheck.includes(`${allCategories[i].id}`)) {
        checkStatus[i].isChecked = true
      } else {
        checkStatus[i].isChecked = false
      }
    }
  } else {
    console.error(data)
  }
})

</script>
<template>
  <div class="search-category-wrapper">
    <div class="search-category-title">分類</div>
    <div class="search-category-input-wrapper" :key="productListKey">
      <div v-for="(category, i) in checkStatus" :key="i">
        <ChecksInput :name="category['id']" :name-cn="category['name']" textSize="s" v-model="category['isChecked']" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-category-wrapper {
  width: 100%;
  margin-top: 10px;
}

.search-category-title {
  margin-left: 15px;
}

.search-category-input-wrapper {
  text-align: center
}


@media screen and (min-width: 480px) {

  .search-category-title {
    margin-left: 0px;
  }

  .search-category-input-wrapper {
    text-align: start
  }

  .btn-search-category {
    width: 100%
  }

}
</style>