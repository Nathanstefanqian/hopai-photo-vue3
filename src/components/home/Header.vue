<template>
  <div class="home-header absolute">
    <div class="home-header-title">拍摄任务</div>
    <div class="home-header-other">
      <div class="desc">
        <span class="desc-font">HI，{{ name }} 老师，本周您 {{ total }} 次拍摄任务</span>
        <span class="desc-font">其中待确认 {{ pendingTotal }} 个</span>
      </div>
      <div class="scan" @click="scan">
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { useNotification } from '@/hooks/useNotification';
import { getUserOrdersTimeLine } from '@/api/order/index';
import { getUserInfo } from '@/api/my/index'
import { scanQrCode } from '@/api/home/index';
const { message, modal } = useNotification();
const total = ref(0)
const pendingTotal = ref(0)
const name = ref()

const getWeekRange = () => {
  const now = dayjs();
  const startOfWeek = now.startOf('week').valueOf()
  const endOfWeek = now.endOf('week').valueOf()
  return [startOfWeek, endOfWeek];
};

const fetchWeekData = async () => {
  const [start, end] = getWeekRange();
  try {
    const res = (await getUserOrdersTimeLine({ date: [start, end] })).data
    res.map(item => {
      total.value += item.orders.length
      item.orders.map(order => {
        if(order.orderStatus == 2) {
          pendingTotal.value += 1
        }
      })
    })
    name.value = (await getUserInfo()).data.nickname
  } catch (error) {
  }
};

// Function to handle QR code scan
const scan = async () => {
  uni.scanCode({
    success: async res => {
      modal({ title: '确认扫码', content: '您正在扫码，请确认订单无误' }).then(async () => {
        await scanQrCode({ code: res.result });
        await getData(activeStatus[props.active]);
      });
    }
  });
};

onMounted(() => {
  fetchWeekData()
});
</script>


<style lang="scss" scoped>
.home-header {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 100rpx);
  top: 220rpx;
  left: 50rpx;
  
  &-title {
    font-size: 64rpx;
    color: #F8F6E7;
    font-weight: 400;
    margin-bottom: 50rpx;
  }

  &-other {
    display: flex;
    justify-content: space-between;

    .desc {
      display: flex;
      flex-direction: column;
      color: #F8F6E7;

      &-font {
        font-size: 28rpx;
      }
    }

    .scan {
      border-radius: 50%;
      width: 96rpx;
      height: 96rpx;
      background-color: rgba(255,255,255,0.85);
      background-image: url('@/static/home/home-scan.svg');
      background-repeat: no-repeat;
      background-size: 48rpx;
      background-position: center;
    }
  }
}
</style>