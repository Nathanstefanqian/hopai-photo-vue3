<template>
  <div class="form">
    <div class="form-item">
      <div class="form-item-header">
        <span class="text-color-[#ba2636]">*</span>
        无法接单的原因？
      </div>
      <div class="form-item-content">
        <div class="selector" @click="show = true">{{ type || '点击选择原因' }}</div>
      </div>
    </div>
    <div class="form-item">
      <div class="form-item-header">
        <span class="text-color-[#ba2636]">*</span>
        具体描述
      </div>
      <div class="form-item-content">
        <div class="selector">
          <input placeholder="具体描述原因" v-model="reason" class="text-color-[#000]" />
        </div>
      </div>
    </div>
    <div class="form-footer">
      <div class="btn" @click="handleSubmit">提交</div>
    </div>
  </div>
	<up-picker :show="show" :columns="columns" confirm-color="#ba2636" @close="show = false" @confirm="confirm"></up-picker>
</template>

<script setup lang="ts">
import { cancelOrder } from '@/api/home/index'
import { useNotification } from '@/hooks/useNotification'
const { message, modal } = useNotification() 
const show = ref(false)
const columns =[[
  '时间不合适', '地点不合适', '业务不合适', '其他'
]]
const confirm = (e: any) => {
  type.value = e.value[0]
  show.value = false  
}
const type = ref(false)
const reason = ref('')
const handleSubmit = async () => {
  modal({ title: '确认提交吗', content: '提交后该订单将被其他摄影师接手'}).then(async () => {
    if(!type.value) {
      message({ title: '请选择无法接单的原因 '})
      return
    }
    if(!reason.value) {
      message({ title: '请描述具体的原因 '})
      return
    }
    const data = {
      id: id.value,
      cancellationReason: type.value + ":" + reason.value
    }
    const res = await cancelOrder(data)
    if(res.data) {
      message({ title: '取消成功' })
      uni.reLaunch({ url: '/pages/home/success' })
    }
  })
}


const id = ref('')
onLoad((e: any) => {
  id.value = e.id
})
</script>

<style lang="scss" scoped>
.form {
  width: 100vw;
  height: 100vh;
  padding: 32rpx;
  background-color: #f6f6f6;
  box-sizing: border-box;

  &-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 60rpx;

    &-header {
      margin-bottom: 20rpx;
    }

    &-content {
      width: 100%;
      border-radius: 12rpx;
      box-sizing: border-box;
      border: 0.3rpx solid rgba(0, 0, 0, 0.30);
      padding: 32rpx;
      .selector {
      }
    }
  }
}
.form-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background-color: #fff;
  height: 180rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300rpx;
    height: 80rpx;
    background-color: #ba2636;
    color: #fff;
    border-radius: 16rpx;
  }
}
</style>