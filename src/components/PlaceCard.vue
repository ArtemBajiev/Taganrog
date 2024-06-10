<template>
  <li class="place-card">
    <div class="place-card__is-favorite" v-if="store.isAuth">
      <transition name="opacity" mode="out-in">
        <Icon
          @click="delFavoriteAndGetUser()"
          v-if="props.isFavorite"
          width="27px"
          icon="twemoji:red-heart"
        />
        <Icon
          @click="AddFavoriteAndGetUser()"
          color="white"
          v-else
          width="27px"
          icon="ph:heart-thin"
        />
      </transition>
    </div>
    <router-link :to="{ name: props.linkName, params: { id: props.id } }">
      <div class="place-card__image" :style="{ 'background-image': `url(${props.img})` }">
        <div class="place-card__rating">
          <Icon width="27px" icon="fluent-emoji-flat:star" />
          <span v-if="props.rating">{{ props.rating }}</span>
        </div>
      </div>
    </router-link>
    <p class="place-card__text">{{ props.name }}</p>
  </li>
</template>

<script lang="js" setup>
import { Icon } from '@iconify/vue'
import user from '@/setup/user'
import { ref } from 'vue'
import { useStore } from '@/stores/store'
const isFavoriteD = ref('')

const store = useStore()
const { addFavorite, delFavorite } = user()

function AddFavoriteAndGetUser() {
  addFavorite(props.id).then(() => {
    store.getUserStore()
    location.reload()
    isFavoriteD.value = true
  })
}
function delFavoriteAndGetUser() {
  delFavorite(props.id).then(() => {
    store.getUserStore()
    location.reload()
    isFavoriteD.value = false
  })
}

const props = defineProps({
  linkName: String,
  name: String,
  img: String,
  rating: Number,
  isFavorite: Boolean,
  id: Number
})

isFavoriteD.value = props.isFavorite
</script>

<style scoped>
.place-card {
  width: 249px;
  position: relative;
  margin: auto;
}
.place-card__image {
  width: 249px;
  height: 268px;
  border-radius: 10px;

  background-size: auto 100%;
  background-repeat: no-repeat;
  margin-bottom: 0px;
  position: relative;
}
.place-card__text {
  font-size: 22px;
  min-height: 63px;
}
.place-card__rating {
  position: absolute;
  top: 10px;
  right: 15px;
  display: flex;
  flex-direction: column;
  font-size: 15px;
}
.place-card__is-favorite {
  position: absolute;
  height: 25px;
  top: 12px;
  left: 20px;
  z-index: 20;
  cursor: pointer;
}
</style>
