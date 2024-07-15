<template>
  <div class="auth w-100vw h-100vh relative">
    <div class="auth-main">
      <image src="/static/auth/auth-login.svg"></image>
      <div class="auth-main-btn" @click="handleAuthorize">微信授权用户信息</div>
      <div class="auth-main-check" :class="{ shake: shake }">
        <up-checkbox class="mr-[16rpx]" shape="circle" @change="proxy = !proxy" v-model="proxy" usedAlone  />
        <div class="text w-[485rpx]">
          阅读并同意我们的<span class="blue">"服务协议与隐私条款"</span>以及<span class="blue">个人信息保护指引</span>
        </div>
      </div>
    </div>
  </div>
  <up-popup :show="show" @close="show = false" :round="10" closeable class="relative">
    <view class="auth-popup">
        <div class="title">HOPAI申请绑定您的手机号码</div>
        <div class="desc">您的手机号码将用于登录和注册，不会有其他用途，请您允许授权</div>
        <div class="btn-group">
          <button class="btn btn-cancel" @click="show = false">取消</button>
          <button class="btn btn-accept" open-type="getPhoneNumber" @getphonenumber="getUserPhoneNumber">确定</button>
        </div>
    </view>
  </up-popup>
</template>

<script setup lang="ts">
import { useNotification } from '@/hooks/useNotification';
import { useUserStore } from '@/pinia/user'
const userStore = useUserStore()
const { message } = useNotification()
const proxy = ref(false)
const show = ref(true)
const shake = ref(false)
const loginCode = ref('')
const handleAuthorize = () => {
  if(!proxy.value) {
    message({ title: '请先阅读并同意平台协议' })
    shake.value = true
    setTimeout(() => {
      shake.value = false
    }, 1000);
  } else {
    show.value = true
  }
}


const getUserPhoneNumber = async (e: any) => {
  if(!e.detail.code) {
    message({ title: '请先授权才能登录噢' })
    return
  } 
  const phoneCode = e.detail.code
  await userStore.login({ phoneCode, loginCode: loginCode.value, userType: 3 })
  uni.reLaunch({ url: '/pages/home/index' })
  message({title: '授权成功' })
}

const getAppCode = async () => {
  const res = await uni.login({ provider: "weixin" })
  return res.code
}
onMounted(async () => {
  loginCode.value = await getAppCode()
})
</script>

<style lang="scss" scoped>
@import '@/styles/animation.scss';

.auth-popup {
  display: flex;
  flex-direction: column;
  margin-top: 28rpx;
  padding: 54rpx;

  .title {
    font-size: 36rpx;
    font-weight: 500;
    margin-bottom: 80rpx;
  }

  .desc {
    font-size: 28rpx;
    color: rgba(40, 40, 40, 0.50);
  }

  .btn-group {
    display: flex;
    justify-content: space-around;
    margin-top: 90rpx;

    .btn {
      font-size: 32rpx;
      padding: 0 96rpx;
      border-radius: 10rpx;

      &-cancel {
        color: #ba2636;
        background-color: #f8f8f8;
      }

      &-accept {
        color: #fff;
        background-color: #ba2636;
      }
    }


  }
}

.auth {
  display: flex;
  flex-direction: column;

  &-main {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    position: absolute;
    top: 368rpx;

    &-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      margin-top: 380rpx;
      width: 480rpx;
      height: 80rpx;
      border-radius: 12rpx;
      background-color: #ba2636;
    }

    &-check {
      display: flex;
      margin-top: 192rpx;
      font-size: 28rpx;
      color: rgba(40, 40, 40, 0.50);

      .blue {
        color: #264FBA !important;
      }
    }
  }
}
</style>