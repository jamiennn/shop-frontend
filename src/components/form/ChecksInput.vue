<script setup lang="ts">
import { inject, ref } from 'vue'

const props = defineProps<{
  name: any,
  nameCn: string,
  textSize: string,
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])
let status = inject('status')
const isSeller = ref(props.modelValue)
const style = {
  "form-label": true,
  "text-s": props.textSize === 's',
  "text-m": props.textSize === 'm',
  "text-l": props.textSize === 'l'
}

function handleCheck() {
  emit('update:modelValue', !isSeller.value)
}
</script>

<template>
  <input :id="name" class="form-check-input" type="checkbox" v-model="isSeller" @click="handleCheck"
    :disabled="status === 'submitting'">
  <label :for="name" :class="style">{{ nameCn }}</label>
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
}

.text-s {
  font-size: 14px;
}

.text-m {
  font-size: 16px;
}

.text-l {
  font-size: 20px;
}
</style>