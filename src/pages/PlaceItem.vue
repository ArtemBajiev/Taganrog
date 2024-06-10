<template>
  <section class="place-item">
    <div class="place-item__left">
      <h2>{{ dataPlace?.type.name }}</h2>
      <!-- <div v-for="item in dataPlace?.image" :key="item">
        <img class="w-100 place-item__left__avatar" :src="store.URL + item" alt="" />
      </div> -->
      <div class="place-item__galery">
        <Galleria
          :value="dataPlace?.image"
          :responsiveOptions="responsiveOptions"
          :numVisible="5"
          :circular="true"
          :showItemNavigators="true"
          :showItemNavigatorsOnHover="true"
        >
          <template #item="slotProps">
            <Image
              :width="'100%'"
              class="review__image"
              :src="store.URL + slotProps.item"
              preview
            />
          </template>
          <template #thumbnail="slotProps">
            <img :src="store.URL + slotProps.item" style="display: block" />
          </template>
        </Galleria>
      </div>
      <h1>{{ dataPlace?.name }}</h1>
      <p class="place-item__description">{{ dataPlace?.descr }}</p>
      <p class="place-item__address"><strong>Адрес:</strong>{{ dataPlace?.location_address }}</p>
      <div class="place-item__links">
        <a
          target="_blank"
          :href="`https://yandex.ru/maps/?ll=${center.lng}, ${center.lat}&z=18&l=map`"
          ><icon width="80" color="black" icon="uiw:map"></icon> <span>Посмотреть на карте</span></a
        >
        <label for="coment"
          ><icon color="black" width="80" icon="ant-design:comment-outlined"></icon>
          <span>Оставь свой отзыв</span></label
        >
        <p>Оценка парка</p>
        <ul class="place-item__rating__list">
          <li class="place-item__rating__item">
            <icon
              color="yellow"
              width="30"
              v-for="item in dataPlace?.score"
              :key="item"
              icon="material-symbols:star"
            ></icon>
            <p>
              <span>{{ feedbackData.length }}</span
              >&nbsp;оценок
            </p>
          </li>
        </ul>
      </div>
      <GoogleMap
        api-key="YOUR_GOOGLE_MAPS_API_KEY"
        style="width: 100%; height: 500px"
        :center="center"
        :zoom="15"
        name="map"
      >
        <Marker :options="markerOptions" />
      </GoogleMap>
      <span name="map"></span>
    </div>
    <section class="place-item__right">
      <div class="place-item__right__new-review" v-if="store.isAuth">
        <form @submit.prevent="saveReview" action="">
          <h3>Оставь свой отзыв</h3>
          <Rating class="place-item__rating" :cancel="false" v-model="feedbackData.score">
            <template #onicon>
              <icon color="yellow" width="60" icon="material-symbols:star"></icon>
            </template>
            <template #officon>
              <icon color="var(--gray)" width="60" icon="material-symbols:star"></icon>
            </template>
          </Rating>
          <p class="text-start p-2 mt-3 fs-6">Добавить фото</p>
          <ul class="place-item__loadImage">
            <li v-for="(item, index) in filesImage" :key="item">
              <loadImage
                @removeImage="removeImage(index)"
                :img="item"
                @loadImage="onUpload"
              ></loadImage>
            </li>
          </ul>
          <p class="text-start p-2 mt-3 fs-6">Коментарий</p>
          <Textarea
            class="textarea"
            :placeholder="'Поделись впечатлениями'"
            v-model="feedbackData.text"
            autoResize
            id="coment"
          />
          <button type="submit" class="btn btn-light w-100">Опубликовать</button>
        </form>
      </div>

      <ul class="reviews">
        <ReviewItem
          v-for="item in feedbackData"
          :key="item.id"
          :name="item.user.name"
          :surname="item.user.surname"
          :create="item.created_at"
          :scope="item.score"
          :text="item.text"
          :image="item.image"
          :avatar="item.user.avatar"
        ></ReviewItem>
      </ul>
    </section>
  </section>
</template>

<script lang="js" setup>
import Textarea from 'primevue/textarea'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { GoogleMap, Marker } from 'vue3-google-map'
import Rating from 'primevue/rating'
import places from '@/setup/places'
import { useRoute } from 'vue-router'
import loadImage from '@/components/loadImage.vue'
import ReviewItem from '@/components/ReviewItem.vue'
import feedback from '@/setup/feedback'
import { useStore } from '@/stores/store'
import Image from 'primevue/image'
import Galleria from 'primevue/galleria'
const store = useStore()
const { getFeedback, createFeedback, addImageFid } = feedback()
const route = useRoute()
const feedbackData = ref([])
const { getPlace } = places()
const filesImage = ref([''])

function onUpload(file) {
  filesImage.value.unshift(file)
}

function removeImage(index) {
  filesImage.value = filesImage.value.toSpliced(index, 1)
}

function feedbacks() {
  getFeedback(route.params.id).then((res) => {
    feedbackData.value = res.data.feedbacks.reverse()
  })
}
feedbacks()
function saveReview() {
  createFeedback(feedbackData.value.text, dataPlace.value.id, feedbackData.value.score).then(
    (res) => {
      filesImage.value.forEach((element, index) => {
        if (element != '') {
          addImageFid(element, res.data.feedback.id).then(() => {})
        } else {
          feedbacks()
        }
      })
    }
  )
}
getPlace(route.params.id).then((res) => {
  dataPlace.value = res.data.place
  center.value = {
    lat: Number(dataPlace.value.location_x),
    lng: Number(dataPlace.value.location_y)
  }
  dataPlace.value.image = JSON.parse(dataPlace.value.image)
  dataPlace.value.score = Math.round(dataPlace.value.score)
})
const dataPlace = ref()
const center = ref({ lat: 45.042651, lng: 38.960057 })
const markerOptions = ref({ position: center, label: 'L', title: 'LADY LIBERTY' })
</script>

<style lang="scss">
.place-item__loadImage {
  display: flex;
  flex-wrap: wrap;
}
.place-item__galery {
  border-radius: 15px;
  overflow: hidden;
  width: 100%;
}
.place-item__left__avatar {
  border-radius: 14px;
}
.p-fileupload {
  margin-bottom: 20px;
}
.place-item__right__new-review {
  padding: 20px;
  margin-top: 20px;
  text-align: center;
  background-color: rgb(246, 246, 246);
  h3 {
    font-size: 25px;
  }
  .textarea {
    width: 100%;
    min-height: 10px;
    padding: 10px;
    background-color: var(--gray);
  }
  .btn {
    background-color: var(--primary);
    color: white;
    &:hover {
      background-color: var(--primary-light);
    }
  }
}
.place-item {
  margin-left: 380px;
  display: flex;
  justify-content: space-between;
  margin-top: 214px;
  padding-left: 70px;
  margin-bottom: 50px;
  overflow: hidden;
  @media (max-width: 1600px) {
    margin: auto;
    padding: 0;
    padding: 0px 10px;
    display: block;
  }
}
.place-item__left {
  text-align: center;
  width: 56.5%;
  @media (max-width: 1600px) {
    width: 100%;
  }
  h2 {
    font-size: 35px;
    margin-bottom: 50px;
    @media (max-width: 1600px) {
      margin-top: 65px;
      padding: 5px;
    }
  }
}
.place-item__right {
  width: 43.5%;
  padding-left: 16%;
  @media (max-width: 1600px) {
    width: 100%;
    padding: 0px;
  }
}
.place-item__description {
  text-align: start;
  font-size: clamp(14px, 2vw, 35px);
}
.place-item__address {
  text-align: start;
  margin-top: 30px;
  font-size: clamp(14px, 2vw, 35px);
}
.place-item__links {
  display: flex;
  flex-direction: column;
  font-size: clamp(14px, 2vw, 34px);
  align-items: start;
  margin-top: 20px;
  margin-left: 60px;
  svg {
    width: clamp(34px, 3vw, 50px);
  }
  @media (max-width: 1600px) {
    margin: 0px;
  }
  a {
    margin-left: 20px;
    color: rgb(0, 169, 236);
    margin-bottom: 20px;
  }
  label {
    margin-left: 20px;
    color: rgb(0, 169, 236);
    margin-bottom: 20px;
    cursor: pointer;
  }
  span {
    margin-left: 20px;
  }
}
.place-item__rating {
  display: flex;
  font-size: 15px;
  align-items: center;
  svg {
    width: clamp(30px, 4vw, 50px);
  }
}
.place-item__rating__item {
  display: flex;
  align-items: center;
  width: 500px;
  p {
    font-size: 16px;
  }
  &:not(:first-child) {
    padding-left: 50px;
    justify-content: space-between;
  }
}
.place-item__rating__item__right {
  display: flex;
  align-items: center;
}
.review {
  margin: 0;
}
.reviews {
  border-left: 1px solid var(--gray);
}
.p-image-preview-indicator {
  z-index: 500 !important;
}
.p-galleria-item-container {
  button {
    z-index: 1000;
  }
}
.p-galleria-thumbnail-container {
  background-color: var(--gray);
  button {
    color: black;
  }
}
.p-galleria-thumbnail-item {
  overflow: hidden !important;
}
</style>
