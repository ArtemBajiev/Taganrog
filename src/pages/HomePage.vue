<template>
  <div>
    <section name="top">
      <div class="top__image">
        <div class="top__text">
          Оценивай, сообщай, улучшай — <br />
          вместе сделаем наш город лучше
        </div>
      </div>
    </section>
    <section name="text" class="text">
      <div class="text__wrapper">
        <p>
          Мы хотим, чтобы наш город становился лучше,и для этого нужна ваша помощь! Ваши отзывы о
          состоянии улиц, парков и других мест помогут нам понять, что нужно улучшить. Вместе мы
          можем сделать наш город более приятным для жизни!
        </p>
      </div>
    </section>
  </div>
</template>

<script lang="js" setup></script>

<style scoped lang="scss">
.top__image {
  background-image: url('../assets/TopImage.jpg');
  width: 100%;
  height: 90vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: clamp(16px, 5vw, 45px);
}
.top__text {
  text-align: center;
}
.text {
  background-image: url('../assets/three.png');
  background-size: contain;
  background-position: bottom right;
  background-repeat: no-repeat;
  padding-bottom: 10%;
  position: relative;
  @media (max-width: 500px) {
    background-image: none;
  }
  &::before {
    content: '';
    background-image: url('../assets/Leaves.png');
    position: absolute;
    width: 250px;
    height: 250px;
    bottom: -84px;
    left: 400px;
    background-size: contain;
    background-repeat: no-repeat;
    @media (max-width: 1600px) {
      display: none;
    }
  }
}
.text__wrapper {
  display: flex;
  margin: 0px auto;
  max-width: 850px;
  width: 100%;
  padding-top: 10px;
  font-size: clamp(16px, 2vw, 35px);
  @media (max-width: 1600px) {
    max-width: 60%;
  }
}
</style>
