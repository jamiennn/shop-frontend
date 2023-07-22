<script setup lang="ts">
import { computed, reactive, ref, provide } from 'vue';
import router from '@/router';
import Header from '@/components/header/Header.vue'
import FormImput from '@/components/form/FormInput.vue'
import TextArea from '@/components/form/TextArea.vue'
import SelectInput from '@/components/form/SelectInput.vue'
import FileInput from '@/components/form/FileInput.vue'
import { createProductApi } from '@/api/product.js'
import Swal from 'sweetalert2'
import { errorToast, successToast } from '@/helper/toast.js'

const status = ref('start')
provide('status', status)

const form = reactive({
  nameInput: '',
  priceInput: null,
  descriptionInput: '',
  imageInput: '',
  stockInput: null,
  categoryInput: ''
})

const handleSubmitForm = async () => {
  status.value = 'submitting'
  Swal.showLoading()

  const response = await createProductApi(form)
  if (!response.success) {
    status.value = 'error'
    errorToast(
      'error',
      response.messages
    )
  } else {
    status.value = 'success'
    successToast(
      'success',
      'Create successfully.'
    )
    router.push(`/products/${response.messages.id}`)
  }
}

const inputInvalid = computed(() => {
  if (status.value === 'start' ||
    form.priceInput > 50000 ||
    status.value === 'submitting') return true
  return false
})

</script>

<template>
  <Header :searchbar="false" />
  <main class="container create-product-container">
    <section class="input-list">
      <div class="create-product-title">新增商品</div>
      <div v-if="status === 'error'" class="invalid-feedback">*紅色項目必填</div>

      <form method="POST" enctype="multipart/form-data" id="form">
        <FormImput name="name" nameCn="商品名稱" type="text" v-model="form.nameInput" customClass="w-25" />

        <FormImput name="price" nameCn="定價" type="number" v-model="form.priceInput" customClass="w-25" />
        <TextArea name="description" nameCn="商品描述" type="text" v-model="form.descriptionInput" />
        <FormImput name="stock" nameCn="庫存" type="number" v-model="form.stockInput" customClass="w-25" />
        <SelectInput name="category" nameCn="分類" v-model="form.categoryInput" />
        <FileInput name="image" nameCn="圖片" type="file" accept="image/*" v-model="form.imageInput" customClass="" />

        <div class="button-wrapper">
          <button type="submit" class="btn-submit" id="submit" @click.stop.prevent="handleSubmitForm"
            :disabled="inputInvalid">新增商品</button>
        </div>
      </form>
    </section>
  </main>
</template>

<style lang="scss">
.create-product-container {
  display: block;
  padding: 0 10px 20px 10px
}

.create-product-title {
  @extend %standard-title;
  display: inline-block;
  margin: 30px 20px 0 0;
}

.input-list {
  margin: 20px auto;
  width: 70%;
  border-radius: 5px;

  .invalid-feedback {
    display: inline-block;
    color: var(--danger)
  }
}

#form {
  margin-top: 20px;

  .button-wrapper {
    width: 20%;

    .btn-submit {
      margin-top: 20px;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      border: 0px;
      background-color: var(--blue);
      color: white;
      font-size: 17px;
      font-weight: 900;
      cursor: pointer;
    }

    .btn-submit:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
}
</style>