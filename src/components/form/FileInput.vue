<script setup lang="ts">
import { inject, ref } from 'vue'
import Placeholder from '@/assets/images/MixerIcon-placeholder.vue'

defineProps<{
  name: string,
  nameCn: string,
  type: string,
  modelValue: string,
  imageInput: string
}>()

let status = inject('status')
const emit = defineEmits(['update:modelValue'])
const previewImage = ref(null)

const handleLoad = (e) => {
  status.value = 'typing'

  const image = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = e => {
    previewImage.value = e.target.result;
  };
  return emit('update:modelValue', image)
}
</script>

<template>
  <div class="file-input-wrapper">
    <div class="bg-form-gray">
      <label :for="name" class="form-label">請上傳{{ nameCn }}：</label>
      <input :type="type" :id="name" :name="name" @change="handleLoad" :disabled="status.value === 'submitting'">
    </div>
    <div class="product-preview-wrapper">
      <div class="form-label">圖片預覽：</div>
      <div class="product-image-wrapper">
        <Placeholder v-show="!previewImage && !imageInput" class="product-image placeholder" />
        <img v-show="previewImage || imageInput" :src="previewImage || imageInput" class="product-image " />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.file-input-wrapper {

  .bg-form-gray {
    display: inline-block;
    position: relative;
    margin-bottom: 32px;
    border-radius: 2px;
    width: 230px;
  }

  .form-label {
    height: 22px;
    margin: 0 10px 10px 0px;
    color: var(--blue);
    font-size: 16px;
  }

  .product-preview-wrapper {
    margin-bottom: 20px;
  }

  .product-image-wrapper {
    position: relative;
    outline: 2px solid black;
    width: 150px;
    height: 125px;
    display: flex;
    justify-content: center;
    align-items: center;

    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .placeholder {
      width: 20%;
      height: 20%;
    }
  }
}

/////////////////電腦版/////////////////
@media screen and (min-width: 720px) {
  .file-input-wrapper {
    display: flex;

  }
}
</style>