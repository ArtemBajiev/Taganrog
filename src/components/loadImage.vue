<template>
  <div class="load-image__container">
    <div class="load-image" v-if="formatImg == ''">
      <input @change="loadImage" type="file" accept="image/*" />
      <p class="load-image__text">{{ text }}</p>
    </div>
    <div v-else class="loaded-image">
      <button @click="removeImage" class="btn btn-close"></button>

      <img :src="formatImg" alt="" />
    </div>
  </div>
</template>

<script lang="js" setup>
import { ref } from 'vue'
import { computed } from 'vue'
const imageUrl = ref(null)
const emit = defineEmits(['loadImage', 'removeImage'])
const props = defineProps(['img'])
const text = ref('Фото')
const formatImg = computed(() => {
  if (props.img) {
    const reader = new FileReader()
    reader.onload = () => {
      imageUrl.value = reader.result
    }

    reader.readAsDataURL(props.img)
    return imageUrl.value
  } else {
    return ''
  }
})
window.addEventListener('dragover', () => {
  text.value = 'Перетащите сюда файлы'
})
window.addEventListener('dragend', () => {
  text.value = 'Фото'
})
window.addEventListener('dragleave', () => {
  text.value = 'Фото'
})
function loadImage(data) {
  // file.value = data.target.files[0]
  // const reader = new FileReader()

  // reader.onload = () => {
  //   imageUrl.value = reader.result
  // }

  // reader.readAsDataURL(file.value)
  emit('loadImage', data.target.files[0])
}
function removeImage() {
  imageUrl.value = null
  emit('removeImage')
}
</script>

<style scoped lang="scss">
.load-image__container {
  margin: 10px;
}
.load-image {
  background-color: var(--gray);
  height: 110px;
  width: 100px;
  border-radius: 10px;
  position: relative;
  input {
    background-color: red;
    height: 100%;
    width: 100%;
    opacity: 0;
    z-index: 20;
    cursor: pointer;
    position: absolute;
    inset: 0;
  }
}
.load-image__text {
  color: rgb(99, 99, 99);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  padding: 10%;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
}
.loaded-image {
  position: relative;
  margin-bottom: 20px;
  display: inline-block;

  align-items: center;
  img {
    border-radius: 10px;
    height: 110px;
    width: 100px;
  }
  .btn {
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 10px;
    border-radius: 50%;
    &:hover {
      background-color: red;
    }
  }
}
</style>
