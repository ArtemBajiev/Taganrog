<template>
  <div class="popup">
    <div class="popup__cross">
      <button @click="store.replacePopup()" class="btn btn-close"></button>
    </div>
    <div class="popup__switch">
      <button @click="login = true" class="popup__button btn">Вход</button>
      <div class="popup__switch__line"></div>
      <button @click="login = false" class="popup__button btn">Регистрация</button>
    </div>
    <transition name="slide" mode="out-in">
      <form @submit.prevent="loginFunc" action="" v-if="login">
        <input
          type="email"
          v-model="dataInput.email"
          required
          class="form-control"
          placeholder="E-Mail или логин"
        />
        <input
          type="password"
          v-model="dataInput.password"
          required
          class="form-control"
          placeholder="Пароль"
        />
        <p class="text-lg-center text-red-400">{{ error.login[0] }}</p>
        <button class="btn btn-bottom">Войти</button>
      </form>
      <form @submit.prevent="RegistrationFunc" action="" v-else>
        <input
          type="text"
          v-model="dataInput.email"
          required
          class="form-control"
          :class="{ 'is-invalid': error?.email[0] }"
          placeholder="E-Mail или логин"
        />
        <p class="text-lg-center text-red-400">{{ error?.email[0] }}</p>
        <input
          type="text"
          required
          v-model="dataInput.name"
          class="form-control"
          placeholder="Имя"
        />
        <p class="text-lg-center text-red-400">{{ error?.name[0] }}</p>
        <input
          type="text"
          required
          v-model="dataInput.surname"
          class="form-control"
          placeholder="Фамилия"
        />
        <p class="text-lg-center text-red-400">{{ error?.surname[0] }}</p>
        <input
          type="text"
          required
          v-model="dataInput.password"
          class="form-control"
          placeholder="Пароль"
        />
        <p class="text-lg-center text-red-400">{{ error?.password[0] }}</p>

        <button class="btn btn-bottom">Зарегистрироваться</button>
      </form>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import Authentication from '@/setup/Authentication'
import user from '@/setup/user'
const { Registration, Login } = Authentication()
const store = useStore()
const login = ref(true)
const error = ref({
  login: [''],
  email: [''],
  name: [''],
  password: [''],
  surname: ['']
})
const dataInput = ref({
  email: '',
  password: '',
  name: '',
  surname: ''
})

function loginFunc() {
  Login(dataInput.value.email, dataInput.value.password)
    .then((res) => {
      store.isAuth = true
      localStorage.setItem('Token', res.data.token)
      location.reload()
    })
    .catch((err) => {
      error.value.login = err.response.data.message
    })
}
function RegistrationFunc() {
  Registration(
    dataInput.value.email,
    dataInput.value.password,
    dataInput.value.name,
    dataInput.value.surname
  )
    .then((res) => {
      store.isAuth = true
      localStorage.setItem('Token', res.data.token)
      location.reload()
    })
    .catch((err) => {
      error.value.email = err.response.data.errors.email
      error.value.name = err.response.data.errors.name
      error.value.password = err.response.data.errors.password
      error.value.surname = err.response.data.errors.surname
    })
}
</script>

<style scoped>
.popup {
  width: 750px;
  height: 750px;
  background-color: #f5f5f5;
  position: fixed;
  top: 100px;
  right: 130px;
  padding: 192px;
  border-radius: 40px;
  overflow: hidden;
  z-index: 999;
  @media (max-width: 1600px) {
    inset: 0;
    border-radius: 0px;
    height: auto;
    width: auto;
    padding: 5%;
    padding-top: 50%;
  }
}
.popup__cross {
  top: 10%;
  right: 10%;
  position: absolute;
}
.popup__switch {
  display: flex;
  margin-bottom: 10px;
  align-items: stretch;
}
.popup__button {
  font-size: 40px;
}
.popup__switch__line {
  background-color: rgb(0, 0, 0);
  min-width: 1px;
  margin: 15px 0px;
  display: block;
}
.form-control {
  margin-bottom: 10px;
  height: 50px;
  border-radius: 30px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.1);
}
.btn-bottom {
  height: 50px;
  border-radius: 30px;
  text-align: center;
  width: 100%;
  border: 1px solid black;
  width: 60%;
  margin: 0px auto;
  display: block;
  margin-top: 30px;
}
</style>
