<template>
  <div class="wrapper-place-admin">
    <section class="place-item-admin">
      <form @submit.prevent="save">
        <h2 v-if="route.params.id == 'new'">Создать новое место</h2>
        <h2 v-else>Изменить</h2>
        <label for=""
          >Тип
          <select required class="form-control" v-model="dataPlace.type_id" name="" id="">
            <option v-for="item in types" :value="item.id" :key="item.id">{{ item.name }}</option>
          </select>
        </label>
        <label for=""
          >Название<input required v-model="dataPlace.name" type="text" class="form-control"
        /></label>
        <p>Загруженные изображения</p>
        <ul class="place-item-admin__loadedImage">
          <li class="m-2" v-for="item in parseImage" :key="item.id">
            <button @click="deliteImage(item)" class="btn btn-close"></button>
            <img width="100px" :src="store.URL + item" alt="" />
          </li>
        </ul>
        <p>Добавить изображения</p>
        <ul class="place-item-admin__loadImage">
          <li v-for="(item, index) in filesImage" :key="item">
            <loadImage
              @removeImage="removeImage(index)"
              :img="item"
              @loadImage="onUpload"
            ></loadImage>
          </li>
        </ul>
        <label for=""
          >Описание<Textarea class="textarea" v-model="dataPlace.descr" autoResize />
        </label>
        <label for=""
          >Адрес<input
            required
            v-model="dataPlace.location_address"
            type="text"
            class="form-control"
        /></label>
        <label for=""
          >широта<input required v-model="dataPlace.location_x" type="text" class="form-control"
        /></label>
        <label for=""
          >долгота<input required v-model="dataPlace.location_y" type="text" class="form-control"
        /></label>
        <button class="btn">Сохранить</button>
      </form>
      <div></div>
    </section>
    <section class="admin-review">
      <ul class="reviews">
        <li v-for="item in feedbackData" :key="item.id">
          <button @click="deliteFeed(item.id)" class="btn-close ml-auto"></button>
          <ReviewItem
            :name="item.user.name"
            :surname="item.user.surname"
            :create="item.created_at"
            :scope="item.score"
            :text="item.text"
            :image="item.image"
            :avatar="item.user.avatar"
          ></ReviewItem>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="js" setup>
import { ref, computed } from 'vue'
import loadImage from '@/components/loadImage.vue'
import places from '@/setup/places'
import { useRoute } from 'vue-router'
import feedback from '@/setup/feedback'
import Textarea from 'primevue/textarea'
import ReviewItem from '@/components/ReviewItem.vue'
import { useStore } from '@/stores/store'
import { useToast } from 'vue-toastification'
const toast = useToast()
const store = useStore()
const filesImage = ref([''])
const types = ref([])
const route = useRoute()
const dataPlace = ref({})
const feedbackData = ref([])
const { getType, placeCreate, getPlace, placeEdit, addImage, delImage } = places()
const { getFeedback, delFeedback } = feedback()

function deliteImage(file) {
  delImage(file, route.params.id).then(() => {
    getData()
    toast.success('Картинка удалёна')
  })
}
function deliteFeed(id) {
  if (confirm('Удалить комментарий?')) {
    delFeedback(id).then(() => {
      feedbacks()
      toast.success('Комментарий удалён')
    })
  }
}
const parseImage = computed(() => {
  if (dataPlace.value.image) {
    return JSON.parse(dataPlace.value.image)
  } else {
    return []
  }
})
function feedbacks() {
  getFeedback(route.params.id).then((res) => {
    feedbackData.value = res.data.feedbacks.reverse()
  })
}
feedbacks()
function getData() {
  if (route.params.id != 'new') {
    getPlace(route.params.id).then((res) => {
      dataPlace.value = res.data.place
    })
  }
}
getData()
function onUpload(file) {
  filesImage.value.unshift(file)
}
function removeImage(index) {
  filesImage.value = filesImage.value.toSpliced(index, 1)
}

getType().then((res) => {
  types.value = res.data.types
})

function addImageFunc() {
  filesImage.value.forEach((element) => {
    if (element != '') {
      addImage(element, route.params.id).then(() => {
        getData()
        toast.success('Картинка добавлена')
      })
    } else {
      getData()
    }
  })
}
function save() {
  if (route.params.id != 'new') {
    placeEdit(
      dataPlace.value.name,
      dataPlace.value.descr,
      dataPlace.value.location_x,
      dataPlace.value.location_y,
      dataPlace.value.location_address,
      dataPlace.value.type_id,
      route.params.id
    ).then(() => {
      toast.success('Изменения сохранены')
      addImageFunc()
    })
  } else {
    placeCreate(
      dataPlace.value.name,
      dataPlace.value.descr,
      dataPlace.value.location_x,
      dataPlace.value.location_y,
      dataPlace.value.location_address,
      dataPlace.value.type_id
    ).then(() => {
      toast.success('Место добавлено')
      addImageFunc()
    })
  }
}
</script>

<style lang="scss" scoped>
.wrapper-place-admin {
  display: flex;
  margin-left: 450px;
}
.admin-review {
  margin-top: 10%;
}
form {
  margin: auto;
  display: flex;
  border-radius: 30px;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 214px;
  padding: 70px;
  margin-bottom: 50px;
  max-width: 600px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.343);
  label {
    margin-bottom: 20px;
  }
}
.place-item-admin {
  width: 60%;
}
.place-item-admin__loadImage {
  display: flex;
  flex-wrap: wrap;
}
.textarea {
  width: 100%;
  min-height: 200px;
}
.btn {
  background-color: var(--primary);
  color: white;
  margin-top: 20px;
}
.admin-review {
}
.place-item-admin__loadedImage {
  display: flex;
  flex-wrap: wrap;
  li {
    position: relative;
    button {
      position: absolute;
      right: 5px;
      top: 0;
      background-color: red;
    }
  }
}
</style>
