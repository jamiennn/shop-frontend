<script setup lang="ts">
import { computed, reactive, ref, provide, watch } from 'vue';
import { RouterLink } from 'vue-router'
import Logo from '@/components/header/Logo.vue'
import FormImput from '@/components/form/FormInput.vue'
import ChecksInput from '@/components/form/ChecksInput.vue'
import Swal from 'sweetalert2'

import { useAuthenticator } from '@/stores/authenticator'
const authenticator = useAuthenticator()
import { errorToast, successToast } from '@/helper/toast.js'

import router from '@/router';

let status = ref('')
provide('status', status)

const form = reactive({
  accountInput: '',
  passwordInput: '',
  emailInput: '',
  checkPasswordInput: '',
  isSellerInput: false
})

watch(authenticator, () => {
  if (authenticator.isAuthenticated) {
    router.push('/')
  }
}, { immediate: true })

const handleRegister = async () => {
  try {
    if (form.passwordInput.length < 7) {
      status.value = 'error'
      return errorToast(
        'error',
        '密碼須為7個字以上'
      )
    }
    if (form.passwordInput !== form.checkPasswordInput) {
      status.value = 'error'
      return errorToast(
        'error',
        '密碼和確認密碼不一致'
      )
    }
    status.value = 'submitting'
    Swal.showLoading()
    const response = await authenticator.register(form.accountInput, form.passwordInput, form.emailInput, form.checkPasswordInput, form.isSellerInput)

    if (response.success) {
      status.value = 'success'
      successToast(
        'success',
        'Register success, please log in.'
      )
      router.push('/login')
    } else {
      status.value = 'error'
      errorToast(
        'error',
        response.messages
      )
    }
  } catch (e) {
    console.error(e)
  }
}

const inputInvalid = computed(() => {
  if (form.accountInput.length === 0 ||
    status.value === 'submitting') return true
  return false
})

</script>

<template>
  <div class="login-container">

    <Logo class="logo" />
    <h3 class="login-title text-center">註冊</h3>

    <form action="/register" method="POST" id="form">
      <FormImput name="account" nameCn="帳號" type="text" v-model="form.accountInput" customClass="" />
      <FormImput name="email" nameCn="email" type="email" v-model="form.emailInput" customClass="" />
      <FormImput name="password" nameCn="密碼" type="password" v-model="form.passwordInput" customClass="" />
      <FormImput name="checkPassword" nameCn="確認密碼" type="password" v-model="form.checkPasswordInput" customClass="" />
      <ChecksInput name="isSeller" nameCn="我要註冊為商家" v-model="form.isSellerInput" />
      <div class="button-wrapper">
        <button type="submit" class="btn-submit" id="submit" @click.stop.prevent="handleRegister"
          :disabled="inputInvalid">註冊</button>
      </div>
    </form>
    <div class="login">
      <RouterLink to="/login" id="login-tag">登入</RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  max-width: 400px;
  margin: 100px auto 0 auto;

  .logo {
    margin: 0 auto;
  }

  .login-title {
    color: var(--blue);
  }

  #form {
    margin-top: 20px;

    .button-wrapper {
      width: 100%;

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

  #form+.login {
    text-decoration: none;
    font-size: 15px;
    margin-top: 10px;
    text-align: end;

    #login-tag:visited {
      color: var(--blue)
    }

    #login-tag:hover {
      text-decoration: underline;
    }
  }
}
</style>
