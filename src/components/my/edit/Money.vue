<template>
  <div class="money">
    <div class="money-main">
      <up-skeleton :loading="loading" :rows="6">
        <div class="money-main-personal">
          <div class="money-main-personal-header">个人信息</div>
          <div class="money-main-personal-main">
              <div class="money-main-personal-main-item">
                  <div class="title">身份证姓名</div>
                  <input class="desc" v-model="formData.idCardName" />
              </div>
              <div class="money-main-personal-main-item">
                  <div class="title">身份证号</div>
                  <input class="desc" v-model="formData.idCard" />
              </div>
              <div class="money-main-personal-main-item">
                  <div class="title">身份证有效开始日期</div>
                  <input class="desc" v-model="formData.idCardStartDate" />
              </div>
              <div class="money-main-personal-main-item">
                  <div class="title">身份证有效结束日期</div>
                  <input class="desc" v-model="formData.idCardEndDate" />
              </div>
              <div class="money-main-personal-main-item">
                  <div class="title">身份证地址</div>
                  <input class="desc !w-[440rpx]" v-model="formData.idCardAddress" />
              </div>
              <div class="money-main-personal-main-item">
                  <div class="title">开户行总行编码</div>
                  <input class="desc" v-model="formData.bankCode" />
              </div>
              <div class="money-main-personal-main-item">
                  <div class="title">银行卡号</div>
                  <input class="desc" v-model="formData.bankCardNumber" />
              </div>
          </div>
          <div class="money-main-personal-footer">
            * 上传图片后请务必识别填写内容是否一致
          </div>
      </div>
      <div class="money-main-upload">
          <div class="money-main-upload-header">上传身份证</div>
          <div class="money-main-upload-main">
            <image class="photo" @click="handleUpload('idCard')" :src="formData.idCardFrontUrl || netConfig.picURL + '/static/my/uploadfront.svg' " mode="aspectFill"></image>
            <image class="photo" :src="formData.idCardBackUrl || netConfig.picURL + '/static/my/uploadback.svg' " @click="handleUpload('idCardBack')" mode="aspectFill"></image>
          </div>
      </div>
      <div class="money-main-upload mt-[64rpx] mb-[64rpx]">
          <div class="money-main-upload-header">上传银行卡</div>
          <div class="money-main-upload-main">
            <image class="photo" @click="handleUpload('bankCard')" :src="formData.bankCardFrontUrl || netConfig.picURL + '/static/my/uploadfront.svg'" mode="aspectFill"></image>
          </div>
      </div>
    </up-skeleton>
    </div>
  </div>
  <up-skeleton :loading="loading" :rows="3">
    <div class="money-footer">
      <div class="money-footer-btn" :class="{ 'disabled': registerStatus == 4 || registerStatus == 6 }" @click="handleSubmit">{{ getText() }}</div>
    </div>
  </up-skeleton>
</template>

<script setup lang="ts">
import { subAppOpen, getIdCardOcr, getBankCardOcr, getUserInfo , getListBankCode } from '@/api/my'
import { netConfig } from '@/config/net.config'
import * as AuthApi from '@/api/auth'
import { useUpload } from '@/hooks/useUpload';
import { useNotification } from '@/hooks/useNotification'
import { useUserStore } from '@/pinia/user'
import { UserVO } from '@/api/auth/types'
const { message, modal } = useNotification()
const { userInfo } = useUserStore()
const loading = ref(false)
const bank = ref()
const user = ref<UserVO>()
const registerStatus = ref(3)
const formData = ref({
  userId: userInfo?.userId,
  idCardName: "上传证件自动填写",
  idCard: "",
  idCardFrontUrl: "",
  idCardBackUrl: "",
  idCardStartDate: "",
  idCardEndDate: "",
  idCardAddress: "",
  bankCode: "",
  bankCardNumber: "",
  regionCode: "",
  bankCardFrontUrl: ""
})

const getText = () => {
  if(registerStatus.value === 3) return '提交'
  else if (registerStatus.value === 4 ) return '审核完成'
  else if (registerStatus.value === 5) return '重新审核'
  else if (registerStatus.value === 6) return '审核中'
}

const handleSubmit = async () => {
  modal({ title: '确认提交吗', content: '请检查信息填写无误'}).then(async () => {
    if(registerStatus.value === 4 || registerStatus.value == 6) {
    return
  }
  // 校验是否上传身份证正面
  if (!formData.value.idCardFrontUrl) {
  message({ title: '请上传身份证正面照片' });
  return;
  }

  // 校验是否上传身份证反面
  if (!formData.value.idCardBackUrl) {
    message({ title: '请上传身份证反面照片' });
    return;
  }

  // 校验是否上传银行卡
  if (!formData.value.bankCardFrontUrl) {
    message({ title: '请上传银行卡正面照片' });
    return;
  }
  loading.value = true
  const res = await subAppOpen(formData.value)
  if(!res.data) {
    message({ title: res.msg })
    return
  }
  message({ 'title': '提交成功' })
  loading.value = false
  await getData()
  })

}

const handleUpload = (type: any) => {
  if(user.value?.registerStatus == 4 || user.value?.registerStatus == 6 ) {
    return
  }
  uni.chooseImage({
    count: 1,
    success: async (res: any) => {
      const tempFilePaths = res.tempFilePaths;
      loading.value = true;
      const { uploadFile, getConfig } = useUpload(0)
      let flag = true
      try {
        await Promise.all(
          tempFilePaths.map(async (filePath: any, index: number) => {
            await getConfig()
            const picUrl = await uploadFile(filePath, (progress) => {})
            if(type === 'idCard') {
              const res = await getIdCardOcr({ idcardUrl: picUrl })
              if(!res.data || !JSON.parse(res.data.body.data).data.face) {
                message({ title: '无法识别身份证正面信息' })
                flag = false
                return
              }
              const data = JSON.parse(res.data.body.data).data.face.data
              formData.value.idCardFrontUrl = picUrl as string
              formData.value.idCardAddress = data.address
              formData.value.idCardName = data.name
              formData.value.idCard = data.idNumber
              formData.value.regionCode = data.idNumber.substring(0, 6)
            } else if (type === 'idCardBack') {
              const res = await getIdCardOcr({ idcardUrl: picUrl })
              if(!res.data || !JSON.parse(res.data.body.data).data.back) {
                message({ title: '无法识别身份证反面信息' })
                flag = false
                return
              }
              const data = JSON.parse(res.data.body.data).data.back.data
              formData.value.idCardBackUrl = picUrl as string
              const { validPeriod } = data
              const dates = validPeriod.split('-')
              formData.value.idCardStartDate = dates[0]
              formData.value.idCardEndDate = dates[1]
            } else if (type === 'bankCard') {
              const res = await getBankCardOcr({ bankCardUrl: picUrl })
              if(!res.data || !JSON.parse(res.data.body.data).data) {
                message({ title: '无法识别银行卡正面信息' })
                flag = false
                return
              }
              const data = JSON.parse(res.data.body.data).data
              formData.value.bankCardFrontUrl = picUrl as string
              const { bankName, cardNumber } = data
              formData.value.bankCardNumber = cardNumber
              const bankCode = bank.value.find((item:any) => item.name === bankName).code
              formData.value.bankCode = bankCode
            }
          })
        )
      } catch (error) {
        console.error(error)
      } finally {
        if(flag) {
          message({ title: '更新成功' })
        }
        loading.value = false
      }
    },
  })
}

const getData = async () => {
  loading.value = true
  const res = (await AuthApi.getUserInfo()).data
  registerStatus.value = res.registerStatus
  user.value = (await getUserInfo()).data || ''
  bank.value = (await getListBankCode()).data
  if(registerStatus.value !== 3) { // 初始化信息
    const data = user.value.appPhotographerOpenSubAppReqVO
    formData.value.bankCardNumber = data.bankCardNumber;
    formData.value.bankCode = data.bankCode;
    formData.value.idCard = data.idCard;
    formData.value.idCardAddress = data.idCardAddress;
    formData.value.idCardBackUrl = data.idCardBackUrl;
    formData.value.idCardEndDate = data.idCardEndDate;
    formData.value.idCardFrontUrl = data.idCardFrontUrl;
    formData.value.idCardName = data.idCardName;
    formData.value.idCardStartDate = data.idCardStartDate;
    formData.value.regionCode = formData.value.idCard.substring(6)
    formData.value.userId = data.userId;
  }
  loading.value = false
}
onMounted(async () => {
  await getData()
})
</script>

<style lang="scss" scoped>
.money {
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f6f6;
  padding: 32rpx;

  &-main {
    display: flex;
    flex-direction: column;

    &-personal {
      margin-bottom: 64rpx;

      &-header {
        font-weight: 200;
        margin-bottom: 16rpx;
      }

      &-main {
        display: flex;
        flex-direction: column;
        padding: 32rpx;
        padding-bottom: 0;
        background-color: #fff;
        border-radius: 24rpx;
        &-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 48rpx;
          .title {
            font-weight: 200;
          }

          .desc {
            text-align: end;
            color: rgba(40, 40, 40, 0.30);
            font-size: 28rpx;
            width: 300rpx;
          }
        }
      }

      &-footer {
        margin-top: 12rpx;
      font-size: 24rpx;
      color: #ba2636;
      }
    }

    &-upload {
      &-header {
        font-weight: 200;
        margin-bottom: 16rpx;
      }

      &-main {
        display: flex;
        justify-content: space-between;
        padding: 32rpx;
        border-radius: 24rpx;
        background-color: #fff;

        .photo {
          width: 300rpx;
          height: 268rpx;
        }
      }
    }
  }
}
.money-footer {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40rpx 0;
    &-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 300rpx;
      height: 80rpx;
      border-radius: 12rpx;
      background-color: #ba2636;
      color: #fff;

    }

    .disabled {
        opacity: 0.5;
      }
  }
</style>