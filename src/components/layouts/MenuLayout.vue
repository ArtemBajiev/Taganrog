<template>
  <transition name="slide__menu-layout">
    <aside class="menu-layout" v-show="mobileMenu">
      <button class="btn-close" @click="mobileMenu = !mobileMenu"></button>
      <button @click="store.replacePopup()" class="btn menu-layout__user">
        <img
          width="60px"
          height="60px"
          :src="store.userData.avatar ? store.URL + store.userData.avatar : 'defaultUserjpg.jpg'"
          alt=""
        />
        <p v-if="store.userData.admin">Админ</p>
        <p v-else-if="store.isAuth">{{ store.userData.name }}</p>
        <p v-else>Гость</p>
      </button>
      <div class="logo">
        <router-link to="/"><Icon icon="bxs:down-arrow" /> Таганрог</router-link>
      </div>
      <ul class="menu-layout__list">
        <li class="menu-layout__list-item" v-if="store.userData.admin">
          <form @submit.prevent="createType" action="">
            <input v-model="newType" type="text" class="form-control" placeholder="Добавить тип" />
            <button class="btn btn-light w-100">Добавить</button>
          </form>
        </li>
        <li
          v-for="item in dataMenu"
          :key="item.id"
          class="menu-layout__list-item"
          :class="{
            'menu-layout__list-item_active': route.params.id == item.id && route.name == 'places'
          }"
        >
          <router-link
            @click.prevent="closeMenu"
            :to="{ name: 'places', params: { id: item.id, type: item.name } }"
            >{{ item.name }}</router-link
          >
        </li>
      </ul>
    </aside>
  </transition>
  <aside class="right-menu">
    <ul class="right-menu__list">
      <!-- <li class="right-menu__item">
        <router-link><Icon width="48px" icon="f7:building-2" /></router-link>
      </li> -->
      <li class="right-menu__item" v-if="store.isAuth">
        <router-link :to="{ name: 'places', params: { id: 'favorite', type: 'Избранные' } }"
          ><Icon width="48px" icon="material-symbols:favorite-outline"
        /></router-link>
      </li>
      <!-- <li class="right-menu__item">
        <router-link><Icon width="48px" icon="ci:user-circle" /></router-link>
      </li> -->
      <li class="right-menu__item right-menu__item_burger">
        <button @click="mobileMenu = !mobileMenu">
          <Icon color="white" width="48px" icon="solar:hamburger-menu-outline" />
        </button>
      </li>
    </ul>
  </aside>
</template>

<script lang="js" setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import places from '@/setup/places'
import { useStore } from '@/stores/store'
const { getType, addType } = places()
const route = useRoute()
const dataMenu = ref([])
const store = useStore()
const newType = ref('')
const mobileMenu = ref(0)
function closeMenu() {
  window.innerWidth < 1600 ? (mobileMenu.value = false) : (mobileMenu.value = true)
}

function getTypeFunc() {
  getType().then((res) => {
    dataMenu.value = res.data.types
  })
}
getTypeFunc()

function createType() {
  addType(newType.value).then(() => {
    location.reload()
  })
}
function resize() {
  if (window.innerWidth < 1600) mobileMenu.value = 0
  else mobileMenu.value = 1
}
onMounted(() => {
  window.addEventListener('resize', () => {
    resize()
  })
  resize()
})
</script>

<style scoped lang="scss">
.menu-layout {
  width: 390px;
  background-color: #f5f5f5;
  position: fixed;
  top: 47px;
  bottom: 0px;
  border-radius: 0px 35px 0px 0px;
  z-index: 700;
}
.btn-close {
  position: absolute;
  right: 20px;
  top: 20px;
  display: none;
  @media (max-width: 1600px) {
    display: block;
  }
}
.menu-layout__burger {
  margin-left: auto;
}
.menu-layout__user {
  display: flex;
  align-items: center;
  margin-top: 46px;
  padding: 21px 46px;
  background-color: #637357;
  margin-right: 83px;
  border-radius: 0px 16px 16px 0px;
  color: white;
  margin-bottom: 52px;
  font-size: 25px;
  img {
    border-radius: 50%;
    margin-right: 28px;
    background-color: rgb(193, 193, 193);
  }
}
.logo {
  text-align: center;
  font-size: 35px;
  padding-right: 46px;
  margin-bottom: 44px;
  a {
    color: black;
  }
}
.menu-layout__list {
  overflow: auto;
  max-height: 65vh;
  direction: rtl;
  margin-top: 30px;
}
.menu-layout__list-item {
  font-size: 30px;
  width: 100%;
  padding: 15px 0px;
  text-align: end;
  margin-bottom: 5px;
  margin-right: auto;
  padding-left: 64px;
  max-width: 75%;
  border-radius: 0px 20px 20px 0px;
  transition: all 0.2s ease-in;
  a {
    color: black;
  }
  input {
    text-align: center;
  }
  &:hover {
    background-color: rgb(240, 240, 240);
  }
}
.menu-layout__list-item_active {
  background-color: rgba(0, 0, 0, 0.1);
}

.right-menu {
  position: absolute;
  top: 78px;
  right: 197px;
  @media (max-width: 1600px) {
    right: 2px;
    top: 2px;
  }
}
.right-menu__list {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  display: flex;
  padding: 15px 15px;
  @media (max-width: 1600px) {
    padding: 2px;
  }
}
.right-menu__item {
  padding: 10px;
}
.right-menu__item_burger {
  display: none;
  button {
    border: 0px;
    background-color: transparent;
  }
  @media (max-width: 1600px) {
    display: block;
  }
}
.slide__menu-layout-enter-active,
.slide__menu-layout-leave-active {
  transition: all 0.5s ease;
}

.slide__menu-layout-enter-from,
.slide__menu-layout-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
