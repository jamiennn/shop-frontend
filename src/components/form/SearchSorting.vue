<script setup lang="ts">
import { onMounted, provide, ref, watch } from 'vue'
import SelectInput from '@/components/form/SelectInput.vue'
import { useQueryStringStore } from '@/stores/queryString'
const queryStringStore = useQueryStringStore()

const status = ref('start')
provide('status', status)
const selectedOrder = ref(0)
const options = [
  { 'id': '0', 'name': '上架日期：最新', 'query': ['createdAt', 'desc'] },
  { 'id': '1', 'name': '上架日期：最舊', 'query': ['createdAt', 'asc'] },
  { 'id': '2', 'name': '價格：最高', 'query': ['price', 'desc'] },
  { 'id': '3', 'name': '價格：最低', 'query': ['price', 'asc'] }
]
onMounted(() => {
  options.forEach((option, i) => {
    if (option.query[0] === queryStringStore.order[0] &&
      option.query[1] === queryStringStore.order[1]) {
      return selectedOrder.value = i
    }
  })
})
watch(selectedOrder, () => {
  queryStringStore.handleOrder(options[selectedOrder.value].query)
})
</script>
<template>
  <div class="sorting-wrapper">
    <SelectInput name="sorting" name-cn="排序" :options="options" v-model="selectedOrder"
      :selected-input="`${selectedOrder}`" />
  </div>
</template>

<style scoped lang="scss">
.sorting-wrapper {
  margin: 20px 0 0 20px;
}
</style>