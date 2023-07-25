<script setup lang="ts">
import { inject, ref } from 'vue'

defineProps<{
  name: string,
  nameCn: string,
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])
let status = inject('status')
const isSeller = ref(false)

function handleCheck() {
  status.value = 'typing'
  return emit('update:modelValue', !isSeller.value)
}
</script>

<template>
  <input :id="name" class="form-check-input" type="checkbox" v-model="isSeller" @click="handleCheck"
    :disabled="status === 'submitting'">
  <label :for="name" class="form-label">{{ nameCn }}</label>
</template>

<style scoped lang="scss">
.form-check-input {
  margin-right: 10px;
}

input[type="checkbox"] {
  accent-color: var(--blue);
}

.form-label {
  height: 22px;
  margin: 0 10px 0 0px;
  color: var(--blue);
  font-size: 16px;
}
</style>