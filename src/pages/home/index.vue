<template>
  <div class="home  w-100vw relative" ref="home">
    <div class="blank w-100vw h-[1rpx]"></div>
    <div class="home-ball-two"></div>
    <div class="home-ball-one"></div>
    <div class="home-header">
      <Header />
    </div>
    <view class="home-main" ref="homeMain">
      <Tab :isFixed="isFixed" v-model="active" />
      <Container :active="active" />
      <div class="blank w-100vw h-[1rpx]"></div>
    </view>
  </div>
</template>

<script setup lang="ts">
import Container from '@/components/home/Container.vue'
import Header from '@/components/home/Header.vue'
import Tab from '@/components/home/Tab.vue'


const isFixed = ref(false)
// const query = uni.createSelectorQuery();
const active = ref(0)

// const calculateBorderRadius = () => {
//   query.select('.home-main').boundingClientRect((rect) => {
//     if (rect.top < -100) {
//       isFixed.value = true
//     }
//     else {
//       isFixed.value = false
//     }
//   }).exec();
// }

// onPageScroll(() => {
//   calculateBorderRadius()
// })


onShow(() => {

})
</script>

<style lang="scss" scoped>
@import '@/styles/animation.scss';

.home {
  background: linear-gradient(132deg, #E93544 6.08%, #E85446 57.89%, #EA6348 96.78%);
  overflow: hidden;
  &-ball-one {
    position: absolute;
    top: -150rpx;
    right: -200rpx;
    width: 540rpx;
    height: 540rpx;
    border-radius: 50%;
    background: linear-gradient(48deg, #FFF 10.86%, rgba(255, 255, 255, 0.00) 69.25%);
    opacity: 0.1;
    animation: breathe 2.5s ease-in-out infinite alternate;
    animation-delay: 0s; /* Start immediately */
  }

  &-ball-two {
    position: absolute;
    top: -150rpx;
    right: 0rpx;
    width: 540rpx;
    height: 540rpx;
    border-radius: 50%;
    background: linear-gradient(48deg, #FFF 10.86%, rgba(255, 255, 255, 0.00) 69.25%);
    opacity: 0.1;
    animation: breathe 2.5s ease-in-out infinite alternate;
    animation-delay: 1.25s; /* Start after a delay to stagger with ball-one */
  }
  
  &-main {
    box-sizing: border-box;
    margin-top: 558rpx;
    min-height: calc( 100vh - 558rpx );
    width: 100%;
    padding: 0 32rpx;
    border-radius: 48rpx 48rpx 0 0;
    background-color: #f6f6f6;
  }
}
</style>