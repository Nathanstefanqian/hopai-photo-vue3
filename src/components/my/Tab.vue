<template>
  <scroll-view class="my-main-basic-tab-scrollview"  scroll-x="true">
    <div class="my-main-basic-tab">
      <div class="tab" v-for="item,index in tabList" :key="index" @click="handleNavigate(item.url)">
        <image class="tab-image" :src="item.src" />
        <div class="tab-info">
          <div class="tab-info-title">{{ item.name }}</div>
          <div class="tab-info-edit">{{ item.edit }}</div>
        </div>
      </div>
    </div>
  </scroll-view>

</template>

<script setup lang="ts">
import { useUserStore } from '@/pinia/user'
import { useNotification } from '@/hooks/useNotification'
const { isLoggedIn } = useUserStore()
const { message } = useNotification()
import { netConfig } from '@/config/net.config'

const tabList = ref([
  {
    name: '基本信息',
    edit: '去编辑',
    src:  netConfig.picURL + '/static/my/tab-basic.svg',
    url: '/components/my/edit/Basic'
  },
  {
    name: '设备信息',
    edit: '去编辑',
    src: netConfig.picURL + '/static/my/tab-device.svg',
    url: '/components/my/edit/Device'
  },
  {
    name: '接单信息',
    edit: '去编辑',
    src: netConfig.picURL + '/static/my/tab-order.svg',
    url: '/components/my/edit/Order'
  },
  {
    name: '佣金信息',
    edit: '去编辑',
    src: netConfig.picURL + '/static/my/tab-money.svg',
    url: '/components/my/edit/Money'
  },
])
const handleNavigate = (url: string) => {
  if(!isLoggedIn) {
    message({title: '您还未登录哦'})
    return
  } 
  uni.navigateTo({
    url
  })
}
</script>

<style lang="scss" scoped>
.my-main-basic-tab-scrollview {
  width: 100%;
  white-space: nowrap;
}
.my-main-basic-tab {
  display: flex;
  flex-direction: row;

  .tab {
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 16rpx;
    display: flex;
    width: 192rpx;
    height: 112rpx;
    padding: 20rpx 16rpx;
    margin-right: 16rpx;
    
    &-image {
      width: 32rpx;
      height: 32rpx;
      margin-top: 4rpx;
      margin-right: 16rpx;
    }
    &-info {
      &-title {
        font-size: 28rpx;
        margin-bottom: 4rpx;
      }
      &-edit {
        font-size: 20rpx;
        color: #ba2636;
      }
    }
  }
}
</style>