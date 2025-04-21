<template>
  <div class="contact w-100vw h-100vh">
    <div class="contact-box">
      <div class="contact-box-title">猜你想问</div>
      <div class="divider"></div>
      <div class="contact-box-content">
        <div class="contact-box-content-list">
          <div class="contact-box-content-item" v-for="item in questionList" :key="item" @click="handleQuestionClick(item)">{{ item }}</div>
        </div>
      </div>
    </div>
    <div class="contact-footer">
      <button class="contact-footer-btn btn-white" open-type="contact">在线客服</button>
      <div class="contact-footer-btn btn-black" @click="handleCallService">客服热线</div>
    </div>
    <div class="contact-footer-blank"></div>
  </div>
</template>

<script setup lang="ts">
const questionList = [
  '取消订单',
  '修改时间',
  '修改地点',
  '换摄影师',
  '拍摄超时',
  '下载照片',
  '质量问题',
  '退款问题',
  '装造问题',
  '拍摄流程'
]

const questionTypeMap: any = {
  '取消订单': 1,
  '修改时间': 2,
  '修改地点': 2,
  '换摄影师': 3,
  '拍摄超时': 4,
  '下载照片': 5,
  '质量问题': 6,
  '退款问题': 7,
  '装造问题': 8,
  '拍摄流程': 9
}

const handleQuestionClick = (type: string) => {
  uni.navigateTo({
    url: `/components/my/edit/CustomerDetail?type=${encodeURIComponent(type)}&typeId=${questionTypeMap[type]}`
  })
}

const handleCallService = () => {
  uni.showModal({
    title: '提示',
    content: '是否拨打客服电话？',
    success: (res) => {
      if (res.confirm) {
        uni.makePhoneCall({
          phoneNumber: '15605225608'
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.contact {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  background-color: #f6f6f6;
  padding: 32rpx;

  &-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #fff;
    border-radius: 12rpx;
    box-sizing: border-box;
    padding: 32rpx;

    .contact-box-title {
      padding: 16rpx 0;
      color: #ba2636;
      font-weight: 700;
      font-size: 34rpx;
    }
    .divider {
      height: 4rpx;
      width: 100%;
      background-color: #f6f6f6;
      margin-bottom: 16rpx;
    }
    &-content {
      width: 100%;
      &-list {
        display: flex;
        flex-wrap: wrap;
        gap: 20rpx;
        justify-content: flex-start;
        margin-top: 20rpx;
      }
      &-item {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 180rpx;
        box-sizing: border-box;
        padding: 8rpx;
        height: 80rpx;
        border-radius: 32rpx;
        border: 2rpx solid #00000066;
        font-size: 28rpx;
        color: #333;
        margin-bottom: 20rpx;
      }
    }
  }
  &-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 200rpx;
    padding: 32rpx;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 10;
    &-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300rpx;
      height: 80rpx;
      border-radius: 32rpx;
      border: 2rpx solid #000;
      font-size: 29rpx;
    }
    .btn-black {
      background-color: #000;
      color: #fff;
    }
    .btn-white {
      margin: 0 !important;
    }
    &-blank {
      height: 150rpx;
    }
  }
}
</style>