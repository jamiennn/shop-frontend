<script setup lang="ts">
import { computed, reactive, ref, provide, watch } from 'vue';
import { RouterLink } from 'vue-router'
import Logo from '@/components/header/Logo.vue'
import FormImput from '@/components/form/FormInput.vue'

import { useAuthenticator } from '@/stores/authenticator'
const authenticator = useAuthenticator()
import { errorToast, successToast } from '@/helper/toast.js'

import Swal from 'sweetalert2'
import router from '@/router';

let status = ref('')
provide('status', status)
const form = reactive({
  accountInput: '',
  passwordInput: ''
})

watch(authenticator, () => {
  if (authenticator.isAuthenticated) {
    router.push('/')
  }
}, { immediate: true })

const handleSubmitForm = async () => {
  try {
    status.value = 'submitting'
    const response = await authenticator.login(form.accountInput, form.passwordInput)

    if (response.success) {
      status.value = 'success'
      successToast(
        'success',
        'Log in successfully.'
      )
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
    form.passwordInput.length < 7 ||
    status.value === 'submitting') return true
  return false
})

</script>

<template>
  <div class="login-container">

    <Logo class="mx-auto" />
    <h3 class="login-title text-center">登入 Shop</h3>

    <form action="/signin" method="POST" id="form">
      <FormImput name="account" nameCn="帳號" type="text" v-model="form.accountInput" />
      <FormImput name="password" nameCn="密碼" type="password" v-model="form.passwordInput" />
      <div class="button-wrapper">
        <button type="submit" class="btn-submit" id="submit" @click.stop.prevent="handleSubmitForm"
          :disabled="inputInvalid">登入</button>
      </div>
    </form>
    <div class="register">
      <RouterLink to="/register" id="register-tag">註冊</RouterLink>
    </div>
  </div>

  <div id="custom-target"></div>
</template>

<style scoped lang="scss">
.login-container {
  max-width: 400px;
  margin: 100px auto 0 auto;

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

  #form+.register {
    text-decoration: none;
    font-size: 15px;
    margin-top: 10px;
    text-align: end;

    #register-tag:visited {
      color: var(--blue)
    }

    #register-tag:hover {
      text-decoration: underline;
    }
  }
}
</style>
