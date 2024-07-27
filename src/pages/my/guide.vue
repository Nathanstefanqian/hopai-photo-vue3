<template>
  <div class="guide">
    <div class="guide-item" @click="handleMoney">
      <image class="guide-item-img" :src="netConfig.picURL +'/static/my/moneyGuide.png'" />
      <div class="guide-item-title">
        <span class="title">佣金信息绑定</span>
        <span class="subtitle">{{ msg || '绑定银行账户，并进行实名认证' }}</span>
      </div>
      <div class="guide-item-btn">
        <div class="btn" @click="handleMoney" v-if="!hasMoney">去绑定 > </div>
        <image class="btn-success" :src="netConfig.picURL + '/static/my/done.svg'" v-else />
      </div>
    </div>
    <div class="guide-item mt-[40rpx]" @click="handleOrder">
      <image class="guide-item-img" :src="netConfig.picURL + '/static/my/orderGuide.png'" />
      <div class="guide-item-title">
        <span class="title">接单信息设置</span>
        <span class="subtitle">设置接单城市，并设置接单类型</span>
      </div>
      <div class="guide-item-btn">
        <div class="btn" v-if="!hasOrder" @click="handleOrder">去绑定> </div>
        <image class="btn-success" :src="netConfig.picURL + '/static/my/done.svg'" v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { netConfig } from '@/config/net.config'
import { getUserInfo, getAccountOpenFailureMsg } from '@/api/my'
const hasOrder = ref(false)
const hasMoney = ref(false)
const msg = ref('')
const handleMoney = () => {
  uni.navigateTo({ url: '/components/my/edit/Money'})
}

const handleOrder = () => {
  uni.navigateTo({ url: '/components/my/edit/Order'})
}
onShow(async () => {
  const res = (await getUserInfo()).data
  if(res.bizList.length && res.areaIds.length) {
    hasOrder.value = true
  }
  if(res.bankName !== 'Unknown Bank') { // 有一个银行名代表提交了佣金信息
    if(res.registerStatus == 6) {
      msg.value = '审核中'
    } else if(res.registerStatus == 5) {
      const errorMsg = (await getAccountOpenFailureMsg()).data.failureMsg
      msg.value =  errorMsg
    } else if (res.registerStatus == 4) {
      hasMoney.value = true
      msg.value = '审核成功'
    }
  }
})
</script>

<style lang="scss" scoped>
.guide {
  width: 100vw;
  height: 100vh;
  background-color: #f6f6f6;
  box-sizing: border-box;
  padding: 32rpx;

  &-item {
    display: flex;
    width: 100%;
    height: 292rpx; 
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 16rpx;
    padding: 32rpx;
    align-items: center;

    &-img {
      width: 96rpx;
      height: 96rpx;
      margin-right: 24rpx;
    }

    &-title {
      display: flex;
      flex-direction: column;
      margin-right: 40px;
      flex: 1;
      .title {
        font-size: 28rpx;
        margin-bottom: 8rpx;
      }
      .subtitle {
        display: flex;
        flex-direction: column;
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.30);
      }
    }

    &-btn {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .btn {
        color: #ba2636;
        font-size: 28rpx;
      }

      .btn-success {
        width: 52rpx;
        height: 52rpx;
        margin-right: 10rpx;
      }
    }
  }
}
</style>