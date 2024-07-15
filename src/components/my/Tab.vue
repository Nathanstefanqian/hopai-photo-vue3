<template>
  <scroll-view class="my-main-basic-tab-scrollview"  scroll-x="true">
    <div class="my-main-basic-tab">
      <div class="tab" v-for="item,index in tabList" :key="index">
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
const tabList = ref([
  {
    name: '基本信息',
    edit: '去编辑',
    src: '/static/my/tab-basic.svg'
  },
  {
    name: '设备信息',
    edit: '去编辑',
    src: '/static/my/tab-device.svg'
  },
  {
    name: '接单信息',
    edit: '去编辑',
    src: '/static/my/tab-order.svg'
  },
  {
    name: '佣金信息',
    edit: '去编辑',
    src: '/static/my/tab-money.svg'
  },
])
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