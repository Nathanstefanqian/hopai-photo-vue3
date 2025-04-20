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
        <div class="card-header-status">{{ getStatus(item.orderStatus, item.appointmentStartTime) }}</div>
      </div>
      <div class="card-time flex-sb">
        <div class="card-time-detail">{{ formatTime(item.appointmentStartTime) }}</div>
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
          <div class="card-info-item-content" @click="handleCopyId(item.id)">
            {{ item.id }}
            <span class="copy">复制</span>
          </div>
        </div>
        <div class="card-info-item">
          <div class="card-info-item-title">客户：</div>
          <div class="card-info-item-content" @click="handleCopy(item.memberPhone, item.id)">{{ item.memberName }}  {{ maskPhone(item.memberPhone) }} <span class="copy">拨打电话</span></div>
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
        <span class="card-op-text" v-if="item.orderStatus == 1" @click="handleRefuse(item.id)">无法接单？</span>
        <div class="card-op-btn" :class="{'disabled': item.orderStatus === 1 && dayjs().isAfter(dayjs(item.appointmentStartTime))}" @click="handleBtn(item.id, item.orderStatus)">
          {{ getStatusBtn(item.orderStatus, item.appointmentStartTime) }}
        </div>
      </div>
    </div>
    
    <div class="container-empty" v-else-if="!order.length && !loading">
      <image :src="netConfig.picURL + '/static/my/empty.svg'" />
      <span class="title">暂无任务</span>
    </div>
  </div>

</template>

<script setup lang="ts">
import { getUserOrders, updateOrderStatus, scanQrCode } from '@/api/home/index'
import { getTmpPhone } from '@/api/order/index'
import { orderVO } from '@/api/order/types'
import { formatTime, formatDateWeek, getStatus, activeStatus, getStatusBtn, maskPhone } from '@/utils/tools'
import { useNotification } from '@/hooks/useNotification'
import { useUserStore } from '@/pinia/user'
import * as AuthApi from '@/api/auth'
import { netConfig } from '@/config/net.config'
import dayjs from 'dayjs'
const { isLoggedIn, logout } = useUserStore()
const { message, modal } = useNotification()
const props = defineProps<{ active: number }>()
const emit = defineEmits<{ (e: 'update:active', value: number): void }>()
const loading = ref(false)
const order = ref<orderVO[]>([])

const handleRefuse = (id: any) => {
  uni.navigateTo({
    url: `/pages/home/form?id=${id}`
  })
}

const handleCopy = async (number: any, id: any) => {
  try {
    const { data } = await getTmpPhone(id)
    uni.makePhoneCall({
      phoneNumber: data,
      fail: () => {
        message({ title: '拨打电话失败' })
      }
    })
  } catch (error) {
    message({ title: '获取临时电话失败' })
  }
}


const handleBtn = async (id: any, status: any) => {
  if(status == 1) {
    modal({ title: '确认订单', content: '确认订单后,请及时与顾客电话沟通拍摄任务' }).then(async () => {
      await updateOrderStatus({ orderId: id, status: 2 })
      emit('update:active', props.active + 1)
      await getData(activeStatus[props.active])
      message({ title: '确认成功'})
  })
  } else if(status == 3) {
        modal({ 
          title: '上传底图', 
          content: '摄影师传图端网址 https://photographer.hopai.cn',
          cancelText: '返回',
          confirmText: '复制网址'
        }).then(async () => {
          uni.setClipboardData({ 
            data: 'https://photographer.hopai.cn',
            success: () => {
              message({ title: '已复制' })
            }
          })
        })
  } else if(status == 5) {
      modal({ title: '等待修图', content: '请前往摄影师PC端上传精修图 https://photographer.hopai.cn' }).then(async () => {
        uni.setClipboardData({ data: 'https://photographer.hopai.cn'})
        message({ title: '摄影师PC端网址已复制' })
      })
    } else if(status == 2) {
        uni.scanCode({
          success: async res => {
            modal({ title: '开始拍摄', content: '拍摄完成后, 请及时上传底图' }).then(async () => {
              await scanQrCode({ code: res.result });
              message({ title: '核劵成功'})
              emit('update:active', props.active + 1)
              await getData(activeStatus[props.active + 1])
            });
          }
        });
  } else if(status == 6) {
    message({ title: '联系用户确认交付哦'})
  } else if(status == 7){
    message({ title: '联系用户进行评价哦'})
  } else if(status == 100) {
    message({ title: '该订单已经完成啦！'})
  } else if(status == 20) {
    message({ title: '等待退款中！'})
  } else if(status == 30) {
    message({ title: '该订单退款完成啦！'})
  } else if(status == 10) {
    message({ title: '该订单已经被关闭啦！'})
  } else if(status ==4) {
    message({ title: '等待客户选图中' })
  }
}

watch(() => props.active, async () => {
  await getData(activeStatus[props.active])
  emit('update:active', props.active)
})

const getData = async (status: any) => {
  if(!isLoggedIn) {
    // modal({ title: '您还没登录哦!', content: '登录即可使用小程序功能' }).then(() => {
    //   uni.navigateTo({ url: '/pages/auth/index'})
    // }).catch(() => {})
    message({ title: '您还没登录噢！'})
    return
  }
  const { registerStatus } = (await AuthApi.getUserInfo()).data
  if(registerStatus < 3) { // 当没完成注册的用户误触回到桌面
    logout(true)
    return
  }
  order.value = []
  loading.value = true
  order.value = (await getUserOrders({ pageNo: 1, pageSize: 50, status })).data.list
  loading.value = false
}

onLoad(async () => {
  await getData(activeStatus[0])
})

const handleCopyId = (id: any) => {
  uni.setClipboardData({
    data: id,
    success: () => {
      message({ title: '订单号已复制' })
    }
  })
}
</script>

<style lang="scss" scoped>
.copy {
  font-size: 24rpx;
  color: #ba2636;
  margin-left: 12rpx;
}
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
    // backdrop-filter: blur(5px); 
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
      font-size: 32rpx;
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
      font-size: 28rpx;
      font-weight: 400 !important;
    }
  }

  &-info {
    display: flex;
    flex-direction: column;
    &-item {
      display: flex;
      color: rgba(40, 40, 40, 0.50);
      font-size: 28rpx !important;
      &-title {
        width: 120rpx;
        margin-bottom: 8rpx;
        font-size: 28rpx !important;
      }
      &-content {
        display: flex;
        align-items: center;
        flex: 1;
        font-size: 28rpx !important;
      }
    }
  }

  &-op {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .disabled {
      border-color: #ccc;
      color: #666;
      pointer-events: none;
    }

    &-text {
      color: rgba(40, 40, 40, 0.50);
      margin-right: 32rpx;
      font-size: 24rpx;
    }

    &-btn {
      color: #BA2636;
      border-radius: 12rpx;
      border: 2rpx solid #BA2636;
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