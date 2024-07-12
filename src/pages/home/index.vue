<template>
  <div class="home h-648rpx  w-100vw relative">
    <div class="home-header">
      <Header />
    </div>
    <div class="home-main">
      <div class="home-main-tab">
        <Tab />
      </div>
      <div class="home-main-container" >
        <Card v-for="item,index in 4" :key="index" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/home/Card.vue'
import Header from '@/components/home/Header.vue'
import Tab from '@/components/home/Tab.vue'
</script>

<style lang="scss" scoped>
.home {
  background-image: url('@/assets/home/home-bg.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  
  &-main {
    box-sizing: border-box;
    position: absolute;
    left:0;
    top: 558rpx;
    width: 100%;
    padding: 0 32rpx;
    border-radius: 48rpx 48rpx 0 0;
    background-color: #f6f6f6;
  }
}
</style>