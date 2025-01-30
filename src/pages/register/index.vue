<template>
  <div class="register relative">
    <div class="register-bgc">
      <image class="shape" :src="netConfig.picURL + '/static/register/shape.svg'" />
      <image class="photographer" :src="netConfig.picURL + '/static/register/photographer.png'" mode="widthFix" />
    </div>
    <div class="register-main">
      <div class="register-main-header">
        <span class="title">和拍约拍</span>
        <span class="desc">和拍，用心做专业约拍平台。诚邀您的加入</span>
      </div>
      <div class="register-main-form">
        <div class="register-main-form-verify">
          <image :src="netConfig.picURL + '/static/register/verify.svg'" class="verify-img" />
          <span class="mr-[16rpx]">认证摄影师</span>
          <span class="desc">官方派单，省时省心</span>
        </div>
        <div class="register-main-form-participate">
          <div class="btn-group">
            <div class="btn" :class="{ 'btn-active': formData.orderType }" @click="formData.orderType = true">
              全职接单
              <div class="btn-dot" v-if="formData.orderType">
                <image class="btn-dot-img" :src="netConfig.picURL +'/static/register/correct.svg'" />
              </div>
            </div>
            <div class="btn" :class="{ 'btn-active': !formData.orderType }" @click="formData.orderType = false">兼职接单
              <div class="btn-dot" v-if="!formData.orderType">
                <image class="btn-dot-img" :src="netConfig.picURL +'/static/register/correct.svg'" />
              </div>
            </div>
          </div>
          <div class="area-input">
            <AreaPicker v-model="formData.area" />
          </div>
          <div class="checkbox-group">
            <up-checkbox-group v-model="formData.agreement">
              <up-checkbox activeColor="#ba2636" :name="1">
                <template #label>
                  同意加入<span class="text-color-[#264fba]" @click="handleProxy(1)">和拍摄影师合作协议</span>
                </template>
              </up-checkbox>
              <up-checkbox activeColor="#ba2636" :name="2">
                <template #label>
                  同意加入<span class="text-color-[#264fba]" @click="handleProxy(2)">和拍约拍支付协议</span>
                </template>
              </up-checkbox>
              <up-checkbox activeColor="#ba2636" :name="3">
                <template #label>
                  同意加入<span class="text-color-[#264fba]" @click="handleProxy(3)">和拍约拍图像AI协议</span>
                </template>
              </up-checkbox>
            </up-checkbox-group>
          </div>
          <div class="btn-confirm-layout">
            <div class="btn-confirm" @click="handleEnter">立即加入</div>
          </div>
        </div>
        <div class="register-main-form-why">
          <div class="register-main-form-why-header">
            <div class="arrow-group mr-[14rpx]">
              <image class="arrow" :src="netConfig.picURL + '/static/register/arrow-left1.svg'" />
              <image class="arrow" :src="netConfig.picURL + '/static/register/arrow-left2.svg'" />
            </div>
            <span>为什么加入和拍</span>
            <div class="arrow-group ml-[14rpx]">
              <image class="arrow" :src="netConfig.picURL + '/static/register/arrow-right1.svg'" />
              <image class="arrow" :src="netConfig.picURL + '/static/register/arrow-right2.svg'" />
            </div>
          </div>
          <div class="register-main-form-why-main">
            <div class="card">
              <div class="card-top">
                <image class="card-icon !w-[49rpx] !h-[49rpx]" :src="netConfig.picURL + '/static/register/card-icon1.svg'" />
                <span class="card-title">精准定位</span>
              </div>
              <div class="card-bottom">精准匹配符合风格的客源</div>
            </div>
            <div class="card">
              <div class="card-top">
                <image class="card-icon" :src="netConfig.picURL + '/static/register/card-icon2.svg'" />
                <span class="card-title">订单无忧</span>
              </div>
              <div class="card-bottom">官方派单，订单无忧</div>
            </div>
            <div class="card">
              <div class="card-top">
                <image class="card-icon !w-[49rpx] !h-[49rpx] !mr-[4rpx]" :src="netConfig.picURL +'/static/register/card-icon3.svg'" />
                <span class="card-title">权益保障</span>
              </div>
              <div class="card-bottom">正规约拍平台权益保障</div>
            </div>
          </div>
        </div>
        <div class="register-main-form-accordin">
          <up-collapse :accordion="true">
            <up-collapse-item>
              <template #title>
                <text class="accordion-title">注册需要资料</text>
              </template>
                <text class="accordion-content">摄影师须年满18周岁，具备较好的构图、曝光、修图技能，拥有全画幅相机、覆盖24-70焦段镜头、闪光灯等设备，具备丰富的作品供平台审核。</text>
            </up-collapse-item>
            <up-collapse-item>
              <template #title>
                <text class="accordion-title">成为和拍摄影师条件</text>
              </template>
                <text class="accordion-content">本人身份证件正反面照片，相机、镜头、闪光灯等摄影设备图片，包括开户行名称、账户号码、账户持有人姓名等银行账户信息，含个人作品的社交媒体平台账号。</text>
            </up-collapse-item>
            <up-collapse-item title="加入须知">
              <template #title>
                <text class="accordion-title">加入须知</text>
              </template>
                <text class="accordion-content">在加入和拍约拍前，请您仔细阅读并同意《摄影师合作协议》、《支付协议》、《图像AI协议》等合作协议。学习和拍摄影师公众号《和拍手册》，了解接单流程。如有投诉，平台将进行调查并采取必要的措施。</text>
            </up-collapse-item>
          </up-collapse>
        </div>
        <div class="register-main-form-tel">
          <span class="title">和拍摄影师招募热线：</span>
          <span class="tel">134 2131 2131</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { netConfig } from '@/config/net.config'
import AreaPicker from '@/components/my/edit/AreaPicker.vue'
import { useRegistrationStore } from '@/pinia/register'
import { useNotification } from '@/hooks/useNotification'
const { message, modal } = useNotification()
const registrationStore = useRegistrationStore()

const handleProxy = (type: any) => {
  let url = ''
  if(type == 1) {
    url = 'https://mp.weixin.qq.com/s/wpiSRROqN74WlfwPnHKsBA'
  }
  else if(type == 2) {
    url = 'https://mp.weixin.qq.com/s/c2Q0W0xwHpptN8JDuXWpoA'
  }
  else {
    url = 'https://mp.weixin.qq.com/s/U1ArW3LCSq4u2CkI1PwUvw'
  }
  uni.navigateTo({
    url: `/components/webview/index?url=`+ url
  })
}

const formData = ref({
  orderType: false,
  agreement: [],
  area: { areaId: '', areaName: '' }
})

const handleEnter = async () => {
  if(formData.value.area.areaId == '') {
    message({ title: '请先选择地区哦' })
    return
  }
  if(formData.value.agreement.length !== 3) {
    message({ title: '需要同意我们所有的协议才能加入平台哦' })
    return
  }
  // 更新数据并保存到 localStorage
  await registrationStore.updateFormData({
  orderType: formData.value.orderType,
  area: formData.value.area,
  agreement: formData.value.agreement
  })


  uni.navigateTo({
    url: '/pages/register/form'
  })
}


</script>

<style lang="scss" scoped>
.register {
  width: 100vw;
  height: 2150rpx;
  background-color: #f5f6f9;
  &-bgc {
    width: 100vw;
    height: 800rpx;
    background: linear-gradient(168deg, #F3F7FA -1.16%, #FBF8EE 32.08%, #F1E3E3 64.53%, #F5F6F9 79.91%);

    .shape {

    }

    .photographer {
      width: 226rpx;
      position: absolute;
      top: 202rpx;
      right: 46rpx;
    }
  }

  &-main {
    position: absolute;
    top: 212rpx;
    &-header {
      display: flex;
      flex-direction: column;
      width: 370rpx;
      margin-left: 64rpx;
      margin-bottom: 56rpx;
      .title {
        font-weight: 200;
        font-size: 56rpx;
        margin-bottom: 24rpx;
      }
      .desc {
        color: rgba(40,40,40,0.80);
        font-size: 28rpx;
      }
    }

    &-form {
      width: 100vw;
      box-sizing: border-box;
      padding: 0 32rpx;
      margin-bottom: 32rpx;
      
      &-verify {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: 128rpx;
        padding: 40rpx 34rpx;
        border-radius: 32rpx 32rpx 0 0;
        border-top: 2rpx solid #FFF;
        border-right: 2rpx solid #FFF;
        border-left: 2rpx solid #FFF;
        background: rgba(255, 255, 255, 0.60);
        backdrop-filter: blur(8rpx);

        .verify-img {
          width: 48rpx;
          height: 48rpx;
          margin-right: 16rpx;
        }

        .desc {
          font-size: 28rpx;
          color: #ba2636;
        }

      }

      &-participate {
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        padding: 32rpx;
        margin-bottom: 48rpx;

        .btn-group {
          width: 100%;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          margin-bottom: 24rpx;
          .btn {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            width: 294rpx;
            height: 80rpx;
            padding: 14rpx 24rpx;
            border-radius: 12rpx;
            border: 2rpx solid rgba(0, 0, 0, 0.30);
            background: rgba(0, 0, 0, 0.06);
            font-weight: 200;
            font-size: 28rpx;

            &-active {
              background-color: #f6e5e6;
              color: #ba2636;
              border: 2rpx solid #BA2636;
            }

            &-dot {
              position: absolute;
              display: flex;
              align-items: center;
              justify-content: center;
              
              right: -2rpx;
              top: 0;
              width: 36rpx;
              height: 28rpx;
              border-radius: 0 12rpx;
              background-color: #ba2636;

              &-img {
                width: 20rpx;
              }
            }
          }
        }

        .area-input {
          display: flex;
          align-items: center;
          border-radius: 12rpx;
          box-sizing: border-box;
          padding-left: 32rpx;
          border: 2rpx solid rgba(0, 0, 0, 0.30);
          width: 100%;
          height: 80rpx;
          margin-bottom: 24rpx;
          color: rgba(40, 40, 40, 0.50);
          font-size: 28rpx !important;
        }

        .checkbox-group {
          margin-bottom: 48rpx;
        }

        .btn-confirm-layout {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .btn-confirm {
            border-radius: 12rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 480rpx;
            height: 80rpx;
            background-color: #ba2636;
            color: #fff;
          }
        }
      }
      &-why {
        width: 100%;
        box-sizing: border-box;
        padding: 48rpx 32rpx;
        border-radius: 32rpx;
        background: #FFF;
        margin-bottom: 32rpx;
        &-header { 
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 48rpx;
          .arrow {
            width: 14rpx;
            height: 14rpx;
          }
        }

        &-main{
          display: flex;
          justify-content: space-between;
          .card {
            width: 192rpx;
            height: 172rpx;
            border-radius: 16rpx;
            border: 2rpx solid #BB2737;
            &-top {
              display: flex;
              align-items: center;
              border-radius: 16rpx 16rpx 0 0;
              height: 66rpx;
              background: #FBF2F3;
              width: 100%;
              box-sizing:border-box;
              padding: 16rpx 14rpx;
              .card-icon {
                width: 40rpx;
                height: 40rpx;
                margin-right: 8rpx;
              }

              .card-title {
                font-size: 24rpx;
                color: #ba2636;
              }
            }

            &-bottom {
              padding: 20rpx;
              font-size: 24rpx;
            }
          }

        }
      }

      &-accordin {
        width: 100%;
        box-sizing: border-box; 
        background-color: #fff;
        border-radius: 16rpx;
        padding: 32rpx;
        background-color: #fff;
        margin-bottom: 48rpx;
        .accordion-title {
          font-size: 28rpx;
          color: rgba(40, 40, 40, 0.80);
        }

        .accordion-content {
          font-size: 24rpx;
          color: rgba(40, 40, 40, 0.50);
        }
      }

      &-tel {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 90rpx;
        .title {
          font-size: 28rpx;
          color: rgba(40, 40, 40, 0.50);
        }

        .tel {
          font-size: 28rpx;
          color: #ba2636;
        }
      }
    }
  }
}


</style>