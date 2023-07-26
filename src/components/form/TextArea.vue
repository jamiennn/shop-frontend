<script setup lang="ts">
import { inject } from 'vue'

defineProps<{
  name: string,
  nameCn: string,
  type: string,
  modelValue: string,
}>()

const emit = defineEmits(['update:modelValue'])
let status = inject('status')

const handleInput = (e) => {
  status.value = 'typing'
  emit('update:modelValue', e.target.value)
}

</script>
 
<template>
  <div class="text-area-wrapper">
    <div class="bg-form-gray bg-form-gray-textarea">
      <label :for="name" class="form-label">{{ nameCn }}</label>
      <textarea id="intro" name="introduction" :placeholder="`請輸入${nameCn}`" class="form-textarea" :value="modelValue"
        @input="handleInput" required :disabled="status === 'submitting'"></textarea>
      <div class="textarea-minmax"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
input:focus {
  outline-width: 0;
}

input:valid {
  background-color: var(--form-gray);
}

.text-area-wrapper {
  margin-bottom: 55px;
  height: 130px;
}

.bg-form-gray {
  position: relative;
  border-radius: 2px;
  background-color: var(--form-gray);
}

.bg-form-gray-textarea {
  height: 100%;

  .form-textarea {
    @extend %input-style;
    height: 130px;
    resize: none;
    font-family: Arial, Helvetica, sans-serif;
  }
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
</style>