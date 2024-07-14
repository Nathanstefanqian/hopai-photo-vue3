<template>
  <div class="home-main-container">
    <div class="card" v-for="item,index in 4" :key="index">
      <div class="card-header flex-sb">
        <div class="card-header-createtime">
          2024.7.27星期四
        </div>
        <div class="card-header-status">退款中</div>
      </div>
      <div class="card-time flex-sb">
        <div class="card-time-detail">12:00</div>
        <div class="card-time-divider"></div>
        <div class="card-time-detail">14:00</div>
      </div>
      <div class="card-divider"></div>
      <div class="card-tag flex-sb">
        <div class="card-tag-spu">风格写真</div>
        <div class="card-tag-price mr-[8rpx]">￥ 399</div>
      </div>
      <div class="card-info">
        <div class="card-info-item">
          <div class="card-info-item-title">订单号：</div>
          <div class="card-info-item-content">9283999238</div>
        </div>
        <div class="card-info-item">
          <div class="card-info-item-title">客户：</div>
          <div class="card-info-item-content">李先生  1581234271</div>
        </div>
        <div class="card-info-item">
          <div class="card-info-item-title">地点：</div>
          <div class="card-info-item-content">江苏省常州市新北区婚姻登记处</div>
        </div>
        <div class="card-info-item">
          <div class="card-info-item-title">备注：</div>
          <div class="card-info-item-content">摄影师多用85镜头拍，后期修图效果要有电影感。</div>
        </div>
      </div>
      <div class="mb-[40rpx]"></div>
      <div class="card-op">
        <span class="card-op-text">无法接单？</span>
        <div class="card-op-btn" @click="handleTest">
          确认订单
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { sendSms }  from '@/api/auth'
const handleTest = async () => {
  const res = await sendSms({ mobile: '18012858611', scene: 1, userType: 2 })
  console.log(res)
}

</script>

<style lang="scss" scoped>
.home-main-container {
  .card {
  box-sizing: border-box;
  padding: 32rpx;
  border-radius: 24rpx;
  background-color: #fff;
  margin-bottom: 40rpx;

  &-header {
    &-createtime {
      font-size: 32rpx;
      color: #2B4240;
    }

    &-status {
      font-size: 24rpx;
      color: #ba2636;
    }
  }

  &-time {
    padding: 40rpx 0;

    &-divider {
      width: 48rpx;
      height: 6rpx;
      background-color: rgba(40, 40, 40, 0.30);
    }

    &-detail {
      font-size: 72rpx;
      color: #ba2636;
    }
  }

  &-divider {
    height: 4rpx;
    background-color: rgba(40, 40, 40, 0.12);
  }

  &-tag {
    padding: 32rpx 0 16rpx 0;

    &-spu {
      padding: 8rpx 16rpx;
      border-radius: 8rpx;
      background: rgba(249, 233, 132, 0.90);
      font-size: 24rpx;
    }
  }

  &-info {
    display: flex;
    flex-direction: column;
    &-item {
      display: flex;
      color: rgba(40, 40, 40, 0.50);
      font-size: 24rpx;
      &-title {
        width: 120rpx;
        margin-bottom: 8rpx;
      }
    }
  }

  &-op {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 28rpx;

    &-text {
      color: rgba(40, 40, 40, 0.50);
      margin-right: 32rpx;
    }

    &-btn {
      color: #BA2636;
      border-radius: 12rpx;
      border: 0.66rpx solid #BA2636;
      padding: 10rpx 24rpx;
    }
  }
}
}

.flex-sb {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>