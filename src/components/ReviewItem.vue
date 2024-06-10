<template>
  <li class="review">
    <div class="review__head">
      <div class="d-flex">
        <img width="80" :src="store.URL + props.avatar" class="avatar" alt="" />
        <div class="mx-3">
          <div class="review__name">{{ props.name }}</div>
          <span class="review__date">
            {{
              date.getDate(props.create) +
              1 +
              '/' +
              (date.getMonth(props.create) + 1) +
              '/' +
              date.getFullYear(props.create)
            }}
          </span>
        </div>
      </div>
      <div>
        <icon
          color="yellow"
          width="20"
          v-for="item in props.scope"
          :key="item"
          icon="material-symbols:star"
        ></icon>
      </div>
    </div>

    <div class="review__images">
      <Galleria
        :value="parceImage"
        :responsiveOptions="responsiveOptions"
        :numVisible="5"
        :circular="true"
        containerStyle="max-width: 640px"
        :showItemNavigators="true"
        :showItemNavigatorsOnHover="true"
      >
        <template #item="slotProps">
          <Image :width="'100%'" class="review__image" :src="store.URL + slotProps.item" preview />
        </template>
        <template #thumbnail="slotProps">
          <img :src="store.URL + slotProps.item" style="display: block" />
        </template>
      </Galleria>
    </div>
    <p v-if="props.text">Коментарий: {{ props.text }}</p>
  </li>
</template>

<script lang="js" setup>
import { Icon } from '@iconify/vue'
import { useStore } from '@/stores/store'
import { computed, onMounted } from 'vue'
import { ref } from 'vue'
import Image from 'primevue/image'
import Galleria from 'primevue/galleria'
const store = useStore()
const date = new Date()
const props = defineProps({
  name: String,
  surname: String,
  create: String,
  scope: Number,
  text: String,
  image: String,
  avatar: String
})
const images = ref([])
const parceImage = computed(() => {
  return JSON.parse(props.image)
})

const responsiveOptions = ref([
  {
    breakpoint: '1300px',
    numVisible: 4
  },
  {
    breakpoint: '575px',
    numVisible: 1
  }
])
</script>

<style lang="scss">
.review__image {
  width: 100%;
}
.review {
  padding: 20px;
  border-bottom: 1px solid var(--gray);
  margin-bottom: 20px;
  margin-left: 20px;
  overflow: hidden;
}
.review__images {
  border-radius: 10px;
  overflow: hidden;
  margin: 20px 0px;
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
  position: relative !important;
  button {
    color: black;
  }
}

.p-galleria-thumbnail-item-content {
  img {
    height: 90px;
  }
}
.avatar {
  border-radius: 50%;
  width: 60px;
  height: 60px;
}
.review__head {
  display: flex;
  justify-content: space-between;
}
.reward__photo__list {
  display: flex;
  height: 400px;
}
.review__date {
  color: rgb(211, 211, 211);
}
.reward__photo__img {
  height: 340px;
  border-radius: 20px;
}
</style>
