<template>

    <MenuLayout></MenuLayout>

  <transition name="slide">
    <PopupLogin v-if="store.popupLogin && !store.isAuth"></PopupLogin>
  </transition>
  <div class="wrapper">
    <div class="page-container">
      <router-view v-slot="{ Component, route }">
        <transition name="opacity">
          <component :key="route.fullPath" :is="Component" />
        </transition>
      </router-view>
    </div>
    <FooterLayout></FooterLayout>
    <transition name="slide">
      <PopupProfil v-if="store.popupLogin && store.isAuth"></PopupProfil>
    </transition>
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router'
import MenuLayout from './components/layouts/MenuLayout.vue'
import FooterLayout from './components/layouts/FooterLayout.vue'
import { useRoute } from 'vue-router'
import PopupLogin from '@/components/PopupLogin.vue'
import { useStore } from './stores/store'
import PopupProfil from './components/PopupProfil.vue'
import { onMounted } from 'vue'
const store = useStore()

const route = useRoute()

onMounted(() => {
  if (localStorage.getItem('Token') != null) {
    ;(store.isAuth = true), store.getUserStore()
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
* {
  text-decoration: none;
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: roboto;
}
:root {
  --primary: rgba(99, 115, 87, 1);
  --primary-light: rgb(116, 134, 102);
  --gray: rgb(239, 239, 239);
}
.btn:hover {
  background-color: var(--primary-light);
  color: white;
}
ul {
  padding-left: 0px;
}
p {
  margin: 0px;
  padding: 0px;
}
a {
  color: white;
  text-decoration: none;
}
.wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: start;
}
.page-container {
  flex: 0 0 auto;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.opacity-enter-active,
.opacity-leave-active {
  transition: all 0.5s ease !important;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0 !important;
}
*::-webkit-scrollbar {
  width: 5px;
}

*::-webkit-scrollbar-track {
  background: #dedede;
}

*::-webkit-scrollbar-thumb {
  background-color: var(--primary-light);
  border-radius: 5px;
}
</style>
