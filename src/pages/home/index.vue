<template>
  <div class="home h-648rpx  w-100vw relative">
    <div class="home-header">
      <Header />
    </div>
    <div class="home-main">
      <Tab />
      <Container />
    </div>
  </div>
</template>

<script setup lang="ts">
import Container from '@/components/home/Container.vue'
import Header from '@/components/home/Header.vue'
import Tab from '@/components/home/Tab.vue'
</script>

<style lang="scss" scoped>
.home {
  background-image: url('@/static/home/home-bg.svg');
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