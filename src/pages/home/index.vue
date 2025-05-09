<template>
  <div class="home  w-100vw relative" ref="home">
    <div class="blank w-100vw h-[1rpx]"></div>
    <div class="home-ball-two"></div>
    <div class="home-ball-one"></div>
    <div class="home-header">
      <Header :active="active" />
    </div>
    <view class="home-main" ref="homeMain">
      <up-sticky offset-top="0">
        <div class="home-tab">
          <up-tabs :list="tabList" v-model:current="active" @change="handleChange" lineColor="#ba2636" :activeStyle="{
            color: '#ba2636',
            fontWeight: 'bold',
            transform: 'scale(1.05)'
          }" />
        </div>
      </up-sticky>
      <Container ref="container" :active="active" />
      <div class="blank w-100vw h-[1rpx]"></div>
    </view>
  </div>
</template>

<script setup lang="ts">
import Container from '@/components/home/Container.vue'
import Header from '@/components/home/Header.vue'
import { useUserStore } from '@/pinia/user'
import { useNotification } from '@/hooks/useNotification'

import { activeStatus } from '@/utils/tools'
import { getUserInfo, getAccountOpenFailureMsg } from '@/api/my/index'
const { logout, isLoggedIn } = useUserStore()
const { message, modal } = useNotification()

const handleChange = (e: any) => {
  active.value = e.index
}
const tabList = [
  { name: '待确认' },
  { name: '待拍摄' },
  { name: '进行中' },
  { name: '已结束' },
  { name: '退款售后' }
]
const isFixed = ref(false)
// const query = uni.createSelectorQuery();
const active = ref(0)
const container = ref()

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

onShow(async () => {
  const res = await getUserInfo()
  if(res.data?.status) {
    modal({
      title: '您已被管理员禁用',
      content: '请联系客服',
      showCancelButton: true,
      confirmText: '退出登录',
      cancelText: '联系客服'
    }).then(() => {
      logout(true)
    }).catch(() => {
      uni.navigateTo({ url: '/components/my/edit/Customer' })
    })
  }
})

onPullDownRefresh(async () => {
  // try {
  //   await getData(activeStatus[active.value])
  //   uni.stopPullDownRefresh()
  // } catch (error) {
  //   uni.stopPullDownRefresh()
  // }
  active.value = 0
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
    position: relative;
  }

  &-tab {
    padding: 32rpx 0;
  }
}
</style>