<template>
  <div class="home-main-container">
    <div class="overlay" v-if="loading">
      <up-loading-icon mode="semicircle" :show="loading"></up-loading-icon>
    </div>
    <div class="card" v-if="order.length" v-for="item,index in order" :key="index">
      <div class="card-header flex-sb">
        <div class="card-header-createtime">
          {{ formatDateWeek(item.appointmentEndTime) }}
        </div>
        <div class="card-header-status">{{ getStatus(item.orderStatus) }}</div>
      </div>
      <div class="card-time flex-sb">
        <div class="card-time-detail">{{  formatTime(item.appointmentStartTime) }}</div>
        <div class="card-time-divider"></div>
        <div class="card-time-detail">{{ formatTime(item.appointmentEndTime) }}</div>
      </div>
      <div class="card-divider"></div>
      <div class="card-tag flex-sb">
        <div class="card-tag-spu">{{ item.spuDescribe }}</div>
        <div class="card-tag-price mr-[8rpx]">￥ {{ item.orderAmt / 100 }}</div>
      </div>
      <div class="card-info">
        <div class="card-info-item">
          <div class="card-info-item-title">订单号：</div>
          <div class="card-info-item-content">{{ item.id }}</div>
        </div>
        <div class="card-info-item">
          <div class="card-info-item-title">客户：</div>
          <div class="card-info-item-content">{{ item.memberName }}  {{ item.memberPhone }}</div>
        </div>
        <div class="card-info-item">
          <div class="card-info-item-title">地点：</div>
          <div class="card-info-item-content">{{ item.location }}</div>
        </div>
        <div class="card-info-item">
          <div class="card-info-item-title">备注：</div>
          <div class="card-info-item-content">{{ item.remark }}</div>
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
    <div class="container-empty" v-else>
      <image src="@/static/my/empty.svg" />
      <span class="title">暂无任务</span>
    </div>
  </div>

</template>

<script setup lang="ts">
import { getUserOrders } from '@/api/order/index'
import { orderVO } from '@/api/order/types'
import { formatTime, formatDateWeek, getStatus } from '@/utils/tools'
import { useNotification } from '@/hooks/useNotification'
import { useUserStore } from '@/pinia/user'
const { isLoggedIn } = useUserStore()
const { message, modal } = useNotification()
const props = defineProps<{ active: number }>()
const loading = ref(false)
const order = ref<orderVO[]>([])

watch(() => props.active, () => {
  loading.value = true
  setTimeout(() => loading.value = false , 1000)
})
const getData = async () => {
  if(!isLoggedIn) {
    modal({ title: '您还没登录哦!', content: '登录即可使用小程序功能' }).then(() => {
      uni.navigateTo({ url: '/pages/auth/index'})
    })
    return
  }
  order.value = (await getUserOrders({ pageNo: 1, pageSize: 50 })).data.list

}

onShow(async () => {
  await getData()
})
</script>

<style lang="scss" scoped>
.home-main-container {
  position: relative;
  min-height: calc(100vh - 660rpx);
  .overlay {
    position: absolute; 
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5); 
    backdrop-filter: blur(5px); 
    display: flex; /* 居中加载指示器 */
    justify-content: center;
    align-items: center;
    z-index: 9999; /* 确保覆盖在最上层 */
  }

  .container-empty {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {     
      font-weight: 400;
      color: rgba(0,0,0,0.3);
      font-size: 28rpx;
      margin-top: 20rpx;
    }

  }
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
      font-weight: 200;
    }
  }

  &-info {
    display: flex;
    flex-direction: column;
    &-item {
      display: flex;
      color: rgba(40, 40, 40, 0.50);
      font-size: 24rpx !important;
      &-title {
        width: 120rpx;
        margin-bottom: 8rpx;
        font-size: 24rpx !important;
      }
      &-content {
        font-size: 24rpx !important;
      }
    }
  }

  &-op {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &-text {
      color: rgba(40, 40, 40, 0.50);
      margin-right: 32rpx;
      font-size: 24rpx;
    }

    &-btn {
      color: #BA2636;
      border-radius: 12rpx;
      border: 0.66rpx solid #BA2636;
      padding: 10rpx 24rpx;
      font-size: 28rpx;

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