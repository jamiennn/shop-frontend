<script setup lang="ts">
import { computed, reactive, ref, provide, watch } from 'vue';
import router from '@/router';
import Header from '@/components/header/Header.vue'
import FormImput from '@/components/form/FormInput.vue'
import TextArea from '@/components/form/TextArea.vue'
import SelectInput from '@/components/form/SelectInput.vue'
import FileInput from '@/components/form/FileInput.vue'
import { searchOneProductApi, createProductApi, editProductApi } from '@/api/product.js'
import Swal from 'sweetalert2'
import { errorToast, successToast } from '@/helper/toast.js'
import { useAuthenticator } from '@/stores/authenticator'
const authenticator = useAuthenticator()
import { useRoute } from 'vue-router'

const route = useRoute()
const pid = ref(Number(route.params.pid))
const routeName = ref('')
const status = ref('start')
provide('status', status)


// 表單限制條件設定
const PRODUCT_NAME_LENGTH = 50
const PRICE_MAX = 50000
const PRODUCT_DESCRIPTION_LENGTH = 10000
const STOCK_MAX = 999999

// reactive props for v-model
const initialForm = {
  nameInput: '',
  priceInput: null,
  descriptionInput: '',
  imageInput: '',
  stockInput: null,
  categoryInput: ''
}
const form = reactive({ ...initialForm })

// 監控路由、獲取資料
watch(route, async () => {
  pid.value = Number(route.params.pid)
  // 如果是編輯頁
  if (route.name === 'edit') {
    routeName.value = '編輯'
    const data = await searchOneProductApi(pid.value)

    if (data.success) {
      const product = data.messages.product

      // 檢查身份
      if (product.userId !== authenticator.currentMember.id) {
        router.push('/')
        errorToast('error', 'Forbidden')
      }

      form.nameInput = product.name
      form.priceInput = product.price
      form.imageInput = product.image
      form.descriptionInput = product.description
      form.stockInput = product.stock
      form.categoryInput = product.categoryId
    } else {
      console.error(data)
      errorToast('error', data.messages)
    }

    // 如果是新增頁
  } else if (route.name === 'create') {
    routeName.value = '新增'
    Object.assign(form, initialForm)
  }
}, { immediate: true })

// 送出前檢查表單
const checkBeforeSubmit = async (nextStep) => {
  const authToken = localStorage.getItem('authToken')
  await authenticator.checkPermission(authToken)
  if (!authToken || !authenticator.isAuthenticated) {
    router.push('/login')
    return errorToast('error', 'Forbidden')
  }

  if (!form.nameInput || !form.priceInput || !form.stockInput || !form.categoryInput) {
    status.value = 'error'
    return errorToast(
      'error',
      '請確認必填項目都有填寫：名稱、定價、庫存、分類'
    )
  }
  if (!form.nameInput || form.nameInput.length > PRODUCT_NAME_LENGTH) {
    status.value = 'error'
    return errorToast(
      'error',
      `商品名稱限制${PRODUCT_NAME_LENGTH}字以內`
    )
  }
  if (!form.priceInput || form.priceInput > PRICE_MAX || form.priceInput <= 0) {
    status.value = 'error'
    return errorToast(
      'error',
      `定價限制為0～${PRICE_MAX}之間`
    )
  }
  if (form.descriptionInput.length > PRODUCT_DESCRIPTION_LENGTH) {
    status.value = 'error'
    return errorToast(
      'error',
      `商品描述限制${PRODUCT_DESCRIPTION_LENGTH}字以內`
    )
  }
  if (!form.stockInput || form.stockInput > STOCK_MAX || form.stockInput <= 0) {
    status.value = 'error'
    return errorToast(
      'error',
      `庫存限制為0～${STOCK_MAX}之間`
    )
  }

  if (nextStep === 'create') {
    handleCreate()
  } else {
    handleEdit()
  }
}

// 如果是 create 功能
const handleCreate = async () => {
  if (status.value === 'error') return

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
      `${routeName.value}成功`
    )
    router.push(`/products/${response.messages.id}`)
  }
}

// 如果是 edit 功能
const handleEdit = async () => {
  if (status.value === 'error') return

  status.value = 'submitting'
  Swal.showLoading()

  const response = await editProductApi(pid.value, form)
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
      `${routeName.value}成功`
    )
    router.push(`/products/${pid.value}`)
  }
}

// 根據表單狀態計算樣式
const inputInvalid = computed(() => {
  if (status.value === 'start' ||
    status.value === 'submitting') return true
  return false
})

</script>

<template>
  <Header :searchbar="false" />
  <main class="container create-product-container">
    <section class="input-list">
      <div class="create-product-title">{{ routeName }}商品</div>
      <div v-if="status === 'error'" class="invalid-feedback">*紅色項目必填</div>

      <form method="POST" enctype="multipart/form-data" id="form">
        <FormImput name="name" nameCn="商品名稱" type="text" v-model="form.nameInput" customClass="w-25" />

        <FormImput name="price" nameCn="定價" type="number" v-model="form.priceInput" customClass="w-25" />
        <TextArea name="description" nameCn="商品描述" type="text" v-model="form.descriptionInput" />
        <FormImput name="stock" nameCn="庫存" type="number" v-model="form.stockInput" customClass="w-25" />
        <SelectInput name="category" nameCn="分類" v-model="form.categoryInput" :categoryInput="form.categoryInput" />
        <FileInput name="image" nameCn="圖片" type="file" accept="image/*" v-model="form.imageInput"
          :imageInput="form.imageInput" />

        <div v-if="route.name === 'create'" class="button-wrapper">
          <button type="submit" class="btn-submit" id="submit" @click.stop.prevent="() => {
            checkBeforeSubmit('create')
          }" :disabled="inputInvalid">新增商品</button>
        </div>
        <div v-if="route.name === 'edit'" class="button-wrapper">
          <button type="submit" class="btn-submit" id="submit" @click.stop.prevent="() => {
            checkBeforeSubmit('edit')
          }" :disabled="inputInvalid">編輯商品</button>
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
  margin: 0 20px 0 0;
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