<template>
  <scroll-view class="home-main-tab-scrollview" scroll-x="true">
    <div class="home-main-tab">
      <div class="home-main-tab-item" v-for="item,index in ['待拍摄', '待确认', '进行中','已完成','已取消','退款售后']" @click="active = index" :key="index">
        <span class="mb-[10rpx]">{{ item }}</span>
        <div class="svg-icon" v-if="active == index" />
      </div>
    </div>
  </scroll-view>
</template>

<script setup lang="ts">
const active = ref(0)
</script>

<style lang="scss" scoped>
.home-main-tab-scrollview {
  width: 100%;
  white-space: nowrap;

}
.home-main-tab {
  display: flex;
  flex-direction: row;
  color: rgba(40, 40, 40, 0.80);
  font-size: 32rpx;
  padding: 32rpx 0;
  font-weight: 400;
   
  &-item {
    display: flex;
    height: 60rpx;
    flex-direction: column;
    padding: 22rpx 16rpx;
    padding-bottom: 0;
    margin-right: 24rpx;
    align-items: center;
    .svg-icon {
      height: 4rpx;
      width: 70rpx;
      background-color: #ba2636;
    }
  }
}
</style>