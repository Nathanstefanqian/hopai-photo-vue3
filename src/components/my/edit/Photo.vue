<template>
  <div>
    <scroll-view class="photo-scrollview" scroll-x="true">
      <div class="photo">
        <div class="photo-add"></div>
        <image class="photo-item" mode="aspectFill" src="/static/my/gf1.jpg" v-for="item,index in 4" :key="index" />
      </div>
    </scroll-view>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.photo-scrollview {
  width: 100%;
  white-space: nowrap;
}

.photo {
  display: flex;
  &-add {
    position: relative;
    min-width: 192rpx;
    height: 192rpx;
    border-radius: 16rpx;
    border: 1px solid rgba(0, 0, 0, 0.12);
    margin-right: 24rpx;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 56rpx;
      height: 6rpx;
      background-color: rgba(0,0,0,0.12);
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &::before {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
  &-item {
    min-width: 192rpx;
    height: 192rpx;
    border-radius: 16rpx;
    border: 1px solid rgba(0, 0, 0, 0.12);
    margin-right: 24rpx;
  }
}
</style>
