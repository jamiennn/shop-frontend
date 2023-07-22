<script setup lang="ts">
import { inject, computed } from 'vue'

defineProps<{
  name: string,
  nameCn: string,
  type: string,
  modelValue: string,
  customClass: string
}>()
const emit = defineEmits(['update:modelValue'])
let status = inject('status')

const handleInput = (e) => {
  status.value = 'typing'
  return emit('update:modelValue', e.target.value)
}

const inputClass = computed(() => {
  return {
    "form-input": true,
    "form-input-invalid": status.value === 'error'
  }
})

</script>

<template>
  <div :class="`bg-form-gray ${customClass}`">
    <label :for="name" class="form-label">{{ nameCn }}</label>
    <input :type="type" :id="name" :name="name" :placeholder="`請輸入${nameCn}`" :class="inputClass" :value="modelValue"
      @input="handleInput" required :disabled="status === 'submitting'">
  </div>

  <div class="input-minmax"></div>
</template>

<style scoped lang="scss">
input:focus {
  outline-width: 0;
}

input:valid {
  background-color: var(--form-gray);
}

.bg-form-gray {
  position: relative;
  margin-bottom: 32px;
  border-radius: 2px;
  background-color: var(--form-gray);
}

.w-25 {
  width: 25%;
}

.form-label {
  height: 22px;
  width: 100%;
  margin: 0 0 0 10px;
  color: #696974;
  font-size: 14px;
}

.form-input {
  @extend %input-style
}

.form-input-invalid {
  border-bottom: 2px solid var(--danger);
}

.btn-submit {
  margin-top: 8px;
  width: 100%;
}

.btn-cancel {
  margin-top: 22px;
}
</style>