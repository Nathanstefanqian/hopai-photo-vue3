<template>
  <div class="auth w-100vw h-100vh relative">
    <div class="auth-main">
      <image :src="netConfig.picURL + '/static/auth/auth-logo.png'" class="auth-main-img"></image>
      <div class="auth-main-btn" @click="handleAuthorize">手机号快捷登录</div>
      <div class="auth-main-btn auth-main-btn2" @click="goBack">不登录，返回</div>
      <div class="auth-main-check" :class="{ shake: shake }">
        <up-checkbox class="mr-[16rpx]" shape="circle" @change="proxy = !proxy" v-model="proxy" usedAlone  />
        <div class="text w-[485rpx]">
          阅读并同意我们的<span class="blue" @click="handleProxy(0)">"服务协议与隐私条款"</span>以及<span class="blue" @click="handleProxy(1)">个人信息保护指引</span>
        </div>
      </div>
    </div>
  </div>
  <up-popup :show="show" @close="show = false" :round="10" closeable class="relative">
    <view class="auth-popup">
        <div class="title">HOPAI申请手机快捷登录</div>
        <div class="desc">您的手机号码将用于登录和注册，不会有其他用途，请您允许手机快捷登录</div>
        <div class="btn-group">
          <button class="btn btn-cancel" @click="show = false">取消</button>
          <button class="btn btn-accept" open-type="getPhoneNumber" @getphonenumber="getUserPhoneNumber">确定</button>
        </div>
    </view>
  </up-popup>
</template>

<script setup lang="ts">
import { useNotification } from '@/hooks/useNotification';
import { netConfig } from '@/config/net.config'
import { useUserStore } from '@/pinia/user'
import { getUserInfo } from '@/api/auth/index'
const userStore = useUserStore() 
const { clearUser } = useUserStore()
const { message, modal } = useNotification()
const proxy = ref(false)
const show = ref(false)
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

const goBack = () => {
  uni.navigateBack({ delta: 1 })
}

const handleProxy = (type: any) => {
  let url = ''
  if(type) {
    url  ='https://mp.weixin.qq.com/s/PhHS3sdbaF_aKfOPj6sZnA'
  } else {
    url = 'https://mp.weixin.qq.com/s/xtWxpJXcm25yieQo5A4zfQ'
  }
  uni.navigateTo({
    url: `/components/webview/index?url=${url}`
  })
}


const getUserPhoneNumber = async (e: any) => {
  if(!e.detail.code) {
    message({ title: '请先授权才能登录噢' })
    return
  } 
  const phoneCode = e.detail.code
  await userStore.login({ phoneCode, loginCode: loginCode.value, userType: 3 })
  const res = (await getUserInfo()).data
  if(res.reviewMark && res.registerStatus == 1) { // 被打回
    modal({ title: '审核不通过', content: '查看不通过的原因'}).then(() => {
      uni.reLaunch({ url: '/pages/register/failure' })
    })
    return
  }
  if(res.registerStatus == 1) { // 需要注册
    modal({ title: '账号未注册', content: '即将前往注册成为摄影师'}).then(() => {
      uni.navigateTo({ url: '/pages/register/index' })
    })
  } else if(res.registerStatus == 2) { // 正在审核中
    clearUser() // 给你退出
    uni.reLaunch({ url: '/pages/register/pending' })
  } else if(res.registerStatus == 3) { // 引导进一步的审核
    modal({ title: '您的审核通过啦', content: '前往个人中心进一步完善信息'} ).then(() => {
      uni.reLaunch({ url: '/pages/my/index' })
    })
  }
  else { // 正常登录
    uni.reLaunch({ url: '/pages/home/index' })
    message({title: '授权成功' })
  }

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

    &-back {
      position: absolute;
      top: 90rpx;
      left: 20rpx;
      width: 40rpx;
      height: 40rpx;
    }

    &-img {
      width: 160rpx;
      height: 160rpx;
      border-radius: 32rpx;
    }
    &-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      margin-top: 550rpx;
      width: 480rpx;
      height: 80rpx;
      border-radius: 12rpx;
      background-color: #ba2636;
    }
    &-btn2 {
      margin-top: 40rpx !important;
      background-color: #000;
      color: #fff;
    }

    &-check {
      display: flex;
      margin-top: 150rpx;
      margin-bottom: 80rpx;
      font-size: 28rpx;
      color: rgba(40, 40, 40, 0.50);

      .blue {
        font-size: 28rpx;
        color: #264FBA !important;
      }

      .text {
        font-size: 28rpx;
      }
    }
  }
}
</style>