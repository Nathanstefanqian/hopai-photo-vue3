<template>
  <div class="result relative">
    <div class="result-main">
      <image class="result-main-img" :src=" netConfig.picURL +'/static/my/empty.svg'" mode="widthFix" />
      <div class="result-main-title">审核失败</div>
      <div class="result-main-subtitle">
        <span>失败理由：{{ reviewMark }}</span>
      </div>
      <div class="result-main-btn">
        <div class="btn" @click="verify">重新填写审核</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { netConfig } from '@/config/net.config'
import { useUserStore } from '@/pinia/user'
import * as AuthApi from '@/api/auth'
const reviewMark = ref('')
const verify = () => {
  uni.reLaunch({
    url: `/pages/register/form?id=${true}`
  })
}
onMounted(async () => {
  const res = (await AuthApi.getUserInfo()).data
  reviewMark.value = res.reviewMark
})
</script>

<style lang="scss" scoped>
.result {
  width: 100vw;
  height: 100vh;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  &-main {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 216rpx;
    width: 100vw;
    box-sizing: border-box;
    padding: 0 64rpx;
    height: 560rpx;

    &-title {
      margin-top: 64rpx;
      margin-bottom: 64rpx;
      font-size: 48rpx;
    }

    &-subtitle {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 600rpx;
      opacity: 0.5;
      margin-bottom: 64rpx;
    }
    &-btn {
      width: 300rpx;
      height: 160rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 16rpx;
      background-color: #ba2636;
      color: #fff;
    }
  }
}
</style>