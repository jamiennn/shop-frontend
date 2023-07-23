<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { searchProductApi } from '@/api/product.js'
import { errorToast } from '@/helper/toast.js'

defineProps<{
  name: string,
  nameCn: string,
  modelValue: string,
  categoryInput: number
}>()
const emit = defineEmits(['update:modelValue'])
const categories = ref()
let status = inject('status')

onMounted(async () => {
  const data = await searchProductApi('')
  if (data.success) {
    categories.value = data.messages.categories
  } else {
    console.error(data)
  }
})

function handleSelect(e) {
  status.value = 'typing'
  return emit('update:modelValue', e.target.value)
}
</script>

<template>
  <label :for="name" class="form-label">{{ nameCn }}：</label>
  <select class="form-select" :id="name" @change="handleSelect">
    <option disabled selected>選擇{{ nameCn }}</option>
    <option v-for="(category, index) in categories" :key="index" :value="category.id" :disabled="status === 'submitting'"
      :selected="category.id === categoryInput">
      {{ category.name }}</option>
  </select>
</template>

<style scoped lang="scss">
.form-select {
  margin-bottom: 55px;
  height: 30px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  background-color: var(--blue);
  color: white;
  font-weight: 500;
}


.form-label {
  height: 22px;
  margin: 0 10px 0 0px;
  color: var(--blue);
  font-size: 16px;
}
</style>