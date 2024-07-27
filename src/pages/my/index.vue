<template>
  <div class="my w-100vw  relative">
    <div class="redball"></div>
    <div class="my-main relative">
      <div class="my-main-alert">
        <up-alert center v-if="!hasVerify" type = "error" description = "你的账号暂时无法接单，请遵守和拍规则。"></up-alert>
      </div>
      <div class="my-main-header">
        <image :src="user?.avatar || netConfig.picURL + '/static/my/avatar.jpg'" class="header-image" @click="previewAvatar" mode="aspectFill"></image>
        <div class="header-userinfo" @click="handleUserInfoClick">
          <div class="name">
            <span class="title">{{ user?.nickname || '未登录' }}</span>
            <div class="tag" v-if="isLoggedIn">{{ user.levelName }}</div>
          </div>
          <div class="desc">{{ isLoggedIn ? user?.appPhotographerInfoBaseVO?.introduction || '点我完善简介信息' : '登录体验更多功能' }}</div>
        </div>
      </div>
      <div class="my-main-basic">
        <div class="my-main-basic-header">
          我的资料
        </div>
        <div class="my-main-basic-tab">
          <Tab />
          <div class="guide relative" v-if="!hasVerify">
            <div class="red">待处理</div>
            <div class="guide-main">
              <div class="guide-main-left">
                <div class="guide-main-left-top">
                  <div class="dot"></div>
                  <span class="title">请尽快上传资料认证摄影师</span>
                </div>
                <div class="guide-main-left-bottom">
                  <span class="title">{{ msg || '认证摄影师即可享受系统推单' }}</span>
                </div>
              </div>
              <div class="guide-main-right">
                <div class="btn" @click="handleVerify">完成步骤</div>
              </div>                
            </div>
          </div>
        </div>
      </div>
      <div class="my-main-album">
        <div class="my-main-album-header">
          <div class="header-title">我的代表作</div>
          <div class="header-create" @click="handleCreate">+ 创建</div>
        </div>
        <div class="my-main-album-main">
          <Album />
        </div>
      </div>
      <div class="my-main-logout" @click="handleLogClick">{{ isLoggedIn ? '退出登录' : '立即登录' }} </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tab from '@/components/my/Tab.vue'
import Album from '@/components/my/Album.vue'
import { getUserInfo, getAccountOpenFailureMsg } from '@/api/my/index'
import { useUserStore } from '@/pinia/user'
import { useNotification } from '@/hooks/useNotification'
import * as AuthApi from '@/api/auth'
const user = ref<any>({})
const { logout, isLoggedIn } = useUserStore()
const { message, modal } = useNotification()
const hasVerify = ref(true)
const verify = ref('')
const msg = ref('')
const login = () => {
  uni.navigateTo({ url: '/pages/auth/index'})
}

const handleUserInfoClick = () => {
  if(isLoggedIn) {
    uni.navigateTo({
    url: '/components/my/edit/Basic'
  })
  }
}

const handleVerify = () => {
  uni.navigateTo({ url: '/pages/my/guide' })
}

const handleLogClick = () => {
  if(isLoggedIn) logout()
  else login()
}

const previewAvatar = () => {
  const urls = ref<any>([])
  urls.value.push(user.value.avatar)
  uni.previewImage({
    urls: urls.value,
    current: netConfig.picURL + '/static/my/avatar.jpg'
  });
}

const handleCreate = () => {
  if(!isLoggedIn) {
    message({title: '您还未登录哦'})
    return
  } 
  uni.navigateTo({
    url: '/components/my/CreateAlbum'
  })
}

const getData = async () => {
  if(!isLoggedIn) {
    modal({ title: '您还没登录哦!', content: '登录即可使用小程序功能' }).then(() => {
      uni.navigateTo({ url: '/pages/auth/index'})
    }).catch(() => {})
    return
  }
  const { registerStatus } = (await AuthApi.getUserInfo()).data
  if(registerStatus < 3) { // 当没完成注册的用户误触回到桌面
    logout(true)
    return
  }
  const res = await getUserInfo()
  user.value = res.data
  hasVerify.value = false
  if(!user.value.bizList.length || !user.value.areaIds.length || user.value.bankName=='Unknown Bank' ) {
    return
  } // 如果没填写信息
  // 如果正在审核中
  if(registerStatus == 6) {
    msg.value =  '佣金信息正在审核中'
    return
  }
  else if(registerStatus == 5) { // 如果审核失败
    const data = (await getAccountOpenFailureMsg()).data
    if(data) {
      msg.value = '佣金审核失败：点击查看原因'
    }
    return
  }
  hasVerify.value = true
}

onShow(async () => {
  await getData()
})

</script>

<style lang="scss" scoped>
@import '@/styles/animation.scss';

.my {
  display: flex;
  background-color: #f6f6f6;
  min-height: 100vh;
  .redball {
    position: absolute;
    z-index: 0;
    top: 248rpx;
    left: 122rpx;
    width: 266rpx;
    height: 160rpx;
    background-color: #ba2636;
    opacity: 0.2;
    filter: blur(70rpx);
    transform: scale(1); /* 初始大小为1 */
    animation: breathe-out 5s ease-in-out infinite alternate; /* 使用呼吸效果的动画 */
  }

  &-main {
    z-index: 1;
    margin-top: 204rpx;
    padding: 0 40rpx;
    width: 100%;
    box-sizing: border-box;
    &-alert {
      position: absolute;
      top: -84rpx;
      left: 0;
      width: 100vw;
    }

    &-header {
      display: flex;
      margin-bottom: 60rpx;
      
      .header-image {
        width: 140rpx;
        height: 140rpx;
        border-radius: 50%;
        margin-right: 60rpx;
      }

      .header-userinfo {
        flex: 1;
        display: flex;
        flex-direction: column;

        .name {
          display: flex;
          align-items: center;
          margin-bottom: 24rpx;
          .title {
            font-size: 40rpx;
          }

          .tag {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8rpx 8rpx;
            margin-left: 16rpx;
            background-color: #ba2636;
            color: #fff;
            font-size: 24rpx;
            border-radius: 16rpx
          }
        }

        .desc {
          font-size: 28rpx;
          color: rgba(0, 0, 0, 0.55);
        }
      }
    }

    &-basic {
      margin-bottom: 35rpx;
      &-header {
        font-size: 36rpx;
        font-weight: 300;
        margin-bottom: 24rpx;
      }

      &-tab {
        .guide {
          margin-top: 32rpx;
          width: 100%;
          box-sizing: border-box;
          padding: 60rpx 30rpx;
          background-color: #fff;
          border-radius: 16rpx;

          .red {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 120rpx;
            height: 44rpx;
            border-radius: 16rpx 0;
            background-color: #ba2636;
            color: #fff;
            font-size: 28rpx;
          }

          &-main {
            display: flex;
            align-items: center;
            &-left {
              display: flex;
              flex-direction: column;
              &-top {
                display: flex;
                align-items: center;
                margin-bottom: 8rpx;
                .dot {
                  width: 8rpx;
                  height: 8rpx;
                  background-color: #ba2636;
                  border-radius: 50%;
                  margin-right: 8rpx;
                }
                .title {
                  font-size: 28rpx;
                }
              }
              &-bottom {
                margin-left: 16rpx;
                .title {
                  font-size: 24rpx;
                  color: rgba(0, 0, 0, 0.55);
                }
              }
            }
            &-right {
              margin-left: 102rpx;
              .btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 176rpx;
                height: 80rpx;
                box-sizing: border-box;
                padding: 14rpx 24rpx;
                background-color: #F8E98F;
                color: #000;
                font-size: 28rpx;
                border-radius: 16rpx;
              }
            }
          }
        }
      }
    }

    &-album {
      &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24rpx;

        .header-title {
          font-size: 36rpx;
          font-weight: 300;
        }
        .header-create {
          font-size: 24rpx;
          padding: 8rpx 16rpx;
          color: #ba2636;
          border-radius: 12rpx;
          border: 0.66rpx solid #ba2636;
        }
      }
    }

    &-logout {
      padding: 80rpx 0;
      display: flex;
      font-weight: 200;
      color: rgba(0, 0, 0, 0.55);
      justify-content: center;
    }
  }
}
</style>
