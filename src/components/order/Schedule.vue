<template>
  <div class="schedule">
    <div class="schedule-header">
      <div class="schedule-header-time">时间</div>
      <div class="schedule-header-order">订单</div>
    </div>
    <div class="schedule-main relative">
      <div class="overlay" v-if="loading">
        <up-loading-icon mode="semicircle" :show="loading"></up-loading-icon>
      </div>
      <div class="flex" v-if="order.length">
        <div class="schedule-main-time">
          <div class="time" v-for="item, index in order" :key="index">
            <div class="time-start">{{ formatTime(item.appointmentStartTime) }}</div>
            <div class="time-divider"></div>
            <div class="time-end">{{ formatTime(item.appointmentEndTime) }}</div>
          </div>
        </div>
        <div class="schedule-main-divider"></div>
        <div class="schedule-main-order">
          <div class="order" v-for="item, index in order" :key="index">
            <div class="order-title">
              <span>{{ item.spuDescribe }}</span>
              <span class="order-title-status">{{ getStatus(item.orderStatus) }}</span>
            </div>
            <div class="order-id">订单号：{{ item.id }}</div>
            <div class="order-location">
              <image class="order-location-img" src="@/static/order/location.svg" />
              <span class="order-location-desc">{{ item.location }}</span>
            </div>
            <div class="order-people">
              <image class="order-people-img" :src="item.memberAvatar ? item.memberAvatar : '@/static/my/avatar.jpg' " mode="aspectFill" />
              <span class="order-people-desc">{{ item.memberName }} {{ item.memberPhone }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="schedule-main-empty">
        <image src="@/static/my/empty.svg" class="mb-[64rpx]" />
        <span class="title">当天没有任务哦</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUserOrdersTimeLine } from '@/api/order/index'
import { orderVO } from '@/api/order/types'
import { formatTime } from '@/utils/tools'
import { getStatus } from '@/utils/tools'
import dayjs from 'dayjs';

const props = defineProps<{
  chooseDate: string;
  loading: boolean;
}>()
const order = ref<orderVO[]>([])

const getDayOrderData = async () => {
  const time = dayjs(props.chooseDate).valueOf()
  const res = (await getUserOrdersTimeLine({ date: [time] }))
  if(res.data[0]) {
    order.value = res.data[0].orders
  }
  else {
    order.value = []
  }
}

watch(() => props.chooseDate, async (newDate) => {
  await getDayOrderData()
})
onMounted(async () => {
  await getDayOrderData()
})
</script>

<style lang="scss" scoped>
.schedule {
  position: relative;
  .overlay {
    position: absolute; /* 固定定位以覆盖整个屏幕 */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5); /* 半透明背景 */
    backdrop-filter: blur(5px); /* 毛玻璃效果 */
    display: flex; /* 居中加载指示器 */
    justify-content: center;
    align-items: center;
    z-index: 9999; /* 确保覆盖在最上层 */
  }
  &-header {
    display: flex;
    margin: 32rpx 0;

    &-time {
      display: flex;
      width: 144rpx;
      align-items: center;
      justify-content: center;
      color: rgba(40, 40, 40, 0.55);
      font-size: 28rpx;
    }

    &-order {
      margin-left: 32rpx;
      color: rgba(40, 40, 40, 0.55);
      font-size: 28rpx;
    }
  }

  &-main {
    display: flex;

    .blur {
      filter: blur(70rpx);

      transition: all ease 0.5s;
    }

    .title {
      color: rgba(0,0,0,0.3);
    }

    &-empty {
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    &-time {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 188rpx;
      .time {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 320rpx;

        &-divider {
          width: 2rpx;
          height: 16rpx;
          background: rgba(0, 0, 0, 0.30);
          margin: 8rpx 0;
        }
      }
    }

    &-divider {
      width: 2rpx;
      background: rgba(0, 0, 0, 0.12);
    }

    &-order {
      padding: 0 32rpx;
      width: 100%;

      .order {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 32rpx;
        border-radius: 24rpx;
        width: 100%;
        margin-bottom: 40rpx;
        background-color: #f6f6f5;

        &-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10rpx;
          font-weight: 200;

          &-status {
            color: #ba2636;
            font-size: 28rpx;
            font-weight: 400;
          }
        }

        &-id {
          font-weight: 200;
          margin-bottom: 32rpx;
          font-size: 28rpx;
        }

        &-location {
          display: flex;
          align-items: center;
          margin-bottom: 26rpx;

          &-img {
            width: 40rpx;
            height: 40rpx;
            margin-right: 26rpx;
          }
          
          &-desc {
            flex: 1;
            font-size: 28rpx;
            color: rgba(0, 0, 0, 0.55);
          }
        }

        &-people {
          display: flex;
          align-items: center;
          margin-bottom: 26rpx;

          &-img {
            width: 36rpx;
            height: 36rpx;
            margin-right: 28rpx;
            border-radius: 50%;
          }

          &-desc {
            flex: 1;
            font-size: 28rpx;
            color: rgba(0, 0, 0, 0.55);
          }
        }

      }
    }
  }
}
</style>