<template>
  <div class="wrapper">
    <h2>{{ route.params.type }}</h2>
    <ul class="list-places">
      <li v-if="store.userData.admin" class="place-card">
        <router-link :to="{ name: 'admin-place', params: { id: 'new' } }">
          <div class="place-card__image">
            <Icon height="80" icon="simple-line-icons:plus"></Icon>
          </div>
        </router-link>
        <p class="place-card__text">Добавить</p>
      </li>

      <PlaceCard
        v-for="place in placesData"
        :key="place.id"
        :linkName="store.userData.admin ? 'admin-place' : 'place'"
        :img="store.URL + place.avatar"
        :name="place.name"
        :isFavorite="place.isFavorite"
        :rating="place.score"
        :id="place.id"
      ></PlaceCard>
    </ul>
  </div>
</template>

<script lang="js" setup>
import PlaceCard from '@/components/PlaceCard.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import places from '@/setup/places'
import { Icon } from '@iconify/vue'
import { useStore } from '@/stores/store'
import user from '@/setup/user'

const { getUser } = user()
const store = useStore()
const { getTypePlaces } = places()
const route = useRoute()
const placesData = ref([])

if (route.params.id != 'favorite') {
  getTypePlaces(route.params.id).then((res) => {
    placesData.value = res.data.places
    if (localStorage.getItem('Token') != null) {
      getUser().then((res) => {
        const favorites = res.data.user.favorites
        placesData.value.forEach((item) => {
          favorites.forEach((favorite) => {
            if (item.id == favorite.id) {
              item.isFavorite = true
            }
          })
        })
      })
    }
  })
} else {
  placesData.value = store.userData.favorites
  if (placesData.value) {
    placesData.value.forEach((item) => (item.isFavorite = true))
  }
}
</script>

<style scoped lang="scss">
.place-card {
  width: 249px;
}
.place-card__image {
  width: 249px;
  height: 268px;
  border-radius: 10px;
  background-color: var(--primary);
  background-size: auto 100%;
  background-repeat: no-repeat;
  margin-bottom: 0px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: var(--primary-light);
  }
}
.place-card__text {
  font-size: 26px;
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
  top: 10px;
  left: 15px;
}

.list-places__add-place__img {
  background-color: rgb(222, 222, 222);
  height: 100%;
  border-radius: 12px;
  padding-bottom: 20px;
}
.list-places__add-place {
  width: 249px;
  height: 268px;
  p {
    font-size: 25px;
  }
}
h2 {
  text-align: center;
  font-size: 45px;
  margin-top: 50px;
  padding-right: 20%;
  @media (max-width: 1600px) {
    padding: 0;
    margin-top: 65px;
  }
}
.wrapper {
  margin-left: 400px;
  @media (max-width: 1600px) {
    margin: auto;
  }
}
.list-places {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 300px));
  grid-gap: 20px;
  padding: 0px 20px;
  padding-top: 40px;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  margin-bottom: 100px;
}
</style>
