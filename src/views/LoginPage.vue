<script setup lang="ts">
import { computed, reactive, ref, provide } from 'vue';
import { RouterLink } from 'vue-router'
import MixerIcon from '@/assets/images/MixerIcon.vue'
import formImport from '@/components/formInput.vue'
import { login } from '@/api/user.js'
import Swal from 'sweetalert2'

let status = ref('')
provide('status', status)
const form = reactive({
  accountInput: '',
  passwordInput: ''
})

const errorToast = Swal.mixin({
  target: '#custom-target',
  position: 'top-end',
  toast: true,
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const handleSubmitForm = async () => {
  status.value = 'submitting'
  const response = await login(form.accountInput, form.passwordInput)

  if (response.success) {
    localStorage.setItem('authToken', response.token)
    status.value = 'success'
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Log in successfully.',
      showConfirmButton: false,
      timer: 1500
    })
  } else {
    status.value = 'error'
    errorToast.fire({
      icon: 'error',
      title: response.messages
    })
  }
}

const inputInvalid = computed(() => {
  if (form.accountInput.length === 0 ||
    form.passwordInput.length < 7 ||
    status.value === 'submitting') return true
  // if (form.passwordInput.length < 7) return true
  // if (status === 'submitting') return true
  return false
})

</script>

<template>
  <div class="container">
    <div class="logo-container text-center">
      <MixerIcon class="logo" alt="logo" />
    </div>

    <h3 class="login-title text-center">登入 Shop</h3>

    <form action="/signin" method="POST" id="form">
      <formImport name="account" nameCn="帳號" type="text" v-model="form.accountInput" />
      <formImport name="password" nameCn="密碼" type="password" v-model="form.passwordInput" />
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

<style scoped>
.container {
  max-width: 400px;
  margin: 100px auto 0 auto;
}

.logo-container {
  height: 40px;
  margin-bottom: 29px
}

.logo {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.logo-container .logo {
  height: 40px;
  width: 40px;
  object-fit: unset;
}

.login-title {
  color: var(--blue);
}

#form {
  margin-top: 20px
}

.button-wrapper {
  width: 100%;
}

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

#form+.register {
  text-decoration: none;
  font-size: 15px;
  margin-top: 10px;
  text-align: end;
}

#register-tag:visited {
  color: var(--blue)
}

#register-tag:hover {
  text-decoration: underline;
}
</style>
