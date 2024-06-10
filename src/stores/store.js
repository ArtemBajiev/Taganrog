import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import user from '@/setup/user'

export const useStore = defineStore('store', () => {
  const { getUser, editUser, addImageUser } = user()
  const popupLogin = ref(false)
  const isAuth = ref(false)
  const URL = ref('http://api.taganrog.custom-development-team.su/')
  const isAdmin = ref(0)
  const userData = ref({})
  const file = ref(null)
  function replacePopup() {
    popupLogin.value = !popupLogin.value
  }
  function getUserStore() {
    getUser().then((res) => {
      userData.value = res.data.user
      isAdmin.value = userData.value.admin
    })
  }
  function saveUser() {
    editUser(
      userData.value.name,
      userData.value.surname,
      userData.value.patronymic,
      userData.value.birthday,
      userData.value.gender,
      userData.value.city,
      userData.value.phone
    ).then(() => {
      if (file.value != null) {
        addImageUser(file.value).then(() => {
          location.reload()
        })
      }
    })
  }
  return { popupLogin, replacePopup, isAuth, isAdmin, userData, getUserStore, saveUser, URL, file }
})
