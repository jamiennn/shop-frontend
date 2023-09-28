<script setup lang="ts">
import { inject, computed } from 'vue'

defineProps<{
  name: string,
  nameCn: string,
  options: Array<any>,
  modelValue: string,
  selectedInput: number
}>()
const emit = defineEmits(['update:modelValue'])
let status: any = inject('status')

function handleSelect(e: any) {
  status.value = 'typing'
  return emit('update:modelValue', e.target.value)
}

// 計算要套用的樣式
const selectClass = computed(() => {
  return {
    "form-select": true,
    "form-select-invalid": status.value === 'error'
  }
})
</script>

<template>
  <label :for="name" class="form-label">{{ nameCn }}：</label>
  <select :class="selectClass" :id="name" @change="handleSelect" :disabled="status === 'submitting'">
    <option disabled selected>選擇{{ nameCn }}</option>
    <option v-for="(option, index) in options" :key="index" :value="option.id" :selected="option.id === selectedInput">
      {{ option.name }}</option>
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

.form-select-invalid {
  border: 2px solid var(--danger);
}

.form-label {
  height: 22px;
  margin: 0 10px 0 0px;
  color: var(--blue);
  font-size: 16px;
}
</style>