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
          <textarea placeholder="具体描述原因" v-model="reason" maxlength="200" class="text-color-[#000] w-full resize-none" />
          <div class="word-count">{{ reason.length }}/200</div>
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
  modal({ title: '确认取消吗', content: '是否确认取消该约拍订单'}).then(async () => {
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
    margin-bottom: 48rpx;
    padding: 32rpx;
    background-color: #fff;
    border-radius: 16rpx;

    &-header {
      font-size: 32rpx;
      font-weight: 500;
      margin-bottom: 24rpx;

      .text-color-\[\#ba2636\] {
        margin-right: 4rpx;
      }
    }

    &-content {
      width: 100%;
      padding: 20rpx;
      font-size: 28rpx;
      color: #282828;
      border: 1rpx solid rgba(0, 0, 0, 0.10);
      border-radius: 12rpx;
      box-sizing: border-box;

      .selector {
        position: relative;
        color: #282828;
        font-size: 28rpx;

        textarea {
          width: 100%;
          height: 300rpx;
          font-size: 28rpx;
          color: #282828;
          padding-bottom: 40rpx;
          &::placeholder {
            color: rgba(40, 40, 40, 0.30);
          }
        }

        .word-count {
          position: absolute;
          right: 20rpx;
          bottom: 10rpx;
          font-size: 24rpx;
          color: #999;
        }
      }
    }
  }
}

.form-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 32rpx;
  background-color: #fff;
  box-sizing: border-box;

  .btn {
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    background-color: #000;
    color: #fff;
    border-radius: 12rpx;
    font-size: 32rpx;
  }
}
</style>