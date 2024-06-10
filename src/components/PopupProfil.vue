<template>
  <div class="popup-profile">
    <div class="popup-profile__head">
      <button @click="store.replacePopup()" class="popup-profile-cross btn btn-close"></button>
      <h2>Настройки профиля</h2>
      <button @click="logOut()" class="popup-profile__logout btn">
        <Icon width="27px" icon="carbon:logout" />
      </button>
    </div>
    <div class="popup-profile__user-avatar">
      <input @change="saveFile" type="file" /><img
        :src="store.userData.avatar ? store.URL + store.userData.avatar : 'defaultUserjpg.jpg'"
        alt=""
      />
    </div>
    <p class="my-3"><strong>Личная инфомация</strong></p>
    <form @submit.prevent="store.saveUser" action="">
      <input class="form-control" v-model="store.userData.name" type="text" placeholder="Имя" />
      <input
        class="form-control"
        v-model="store.userData.surname"
        type="text"
        placeholder="Фамилия"
      />
      <input
        class="form-control"
        v-model="store.userData.patronymic"
        type="text"
        placeholder="Отчество"
      />

      <label class="d-flex justify-content-xxl-around" for=""
        ><span
          ><input
            v-model="store.userData.gender"
            value="мужской"
            type="radio"
            name="ad"
            id=""
          />&nbsp;Мужчина</span
        >
        <span
          ><input v-model="store.userData.gender" value="женский" type="radio" name="ad" id="" />
          &nbsp;Женщина</span
        ></label
      >
      <label for=""
        >Дата рождения
        <input v-model="store.userData.birthday" class="form-control" type="date" />
      </label>
      <label for=""
        >Город
        <input v-model="store.userData.city" class="form-control" name="" id="" />
      </label>
      <label for=""
        >Контакты <input v-model="store.userData.phone" class="form-control" type="text" />
        <input v-model="store.userData.email" class="form-control" type="text" placeholder="email"
      /></label>
      <button class="btn btn-save">Сохранить</button>
    </form>
  </div>
</template>

<script lang="js" setup>
import { Icon } from '@iconify/vue'
import { useStore } from '@/stores/store'

const store = useStore()

function saveFile(e) {
  store.file = e.target.files[0]
}

function logOut() {
  localStorage.removeItem('Token')
  location.reload()
}
</script>

<style>
.popup-profile {
  position: fixed;
  top: 50px;
  right: 0px;
  bottom: 0px;
  background-color: #f5f5f5;
  padding: 30px 100px;
  border-radius: 30px 0px 0px 0px;
  width: 20%;
  min-width: 500px;
  z-index: 1000;
  @media (max-width: 1600px) {
    width: 100%;
    padding: 10px;
    width: auto;
    min-width: auto;
    border-radius: 0px;
    inset: 0;
  }
  form {
    display: flex;
    flex-direction: column;
    input,
    select {
      margin-bottom: 20px;
      border: 0px;
      border-bottom: 1px solid black;
      border-radius: 0px;
      background-color: #f5f5f5;
    }

    label {
      margin-bottom: 20px;
    }
  }
}
.popup-profile__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  h2 {
    font-size: 19px;
    margin-top: 10px;
  }
}
.popup-profile__user-avatar {
  position: relative;
  img {
    width: 100px;
    height: 100px;
    margin: auto;
    display: block;
    border-radius: 50%;
  }
  input {
    position: absolute;
    cursor: pointer;

    background-color: red;
    inset: 0;
    opacity: 0;
  }
}
.btn-save {
  background-color: var(--primary);
  color: white;
  border-radius: 30px;
}
</style>
