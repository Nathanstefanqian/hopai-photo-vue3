<template>
  <up-skeleton :loading="loading" :rows="6">
    <div class="form">
    <div class="form-item mt-[32rpx] !mb-[0rpx]">
      <div class="form-item-header">个人信息</div>
      <div class="form-item-content">
        <div class="form-item-content-input">
          <span class="title">姓名</span>
          <input v-model="formData.nickname" class="form-input" placeholder="请输入姓名" />
        </div>
        <div class="form-item-content-input">
          <span class="title">电话</span>
          <input v-model="formData.mobile" class="form-input" placeholder="请输入电话" />
        </div>
        <div class="form-item-content-input no-margin">
          <span class="title">微信号</span>
          <input v-model="formData.wechatId" class="form-input" placeholder="请输入微信号" />
        </div>
      </div>
    </div>
    <div class="form-item-footer !mb-[32rpx]">*电话是您与顾客联系的常用联系电话，与登录的手机号可以不相同</div>
    <div class="form-item mt-[32rpx] !mb-[0rpx]">
      <div class="form-item-header">我的设备</div>
      <div class="form-item-content">
        <div class="form-item-content-input">
          <span class="title">相机</span>
          <input v-model="formData.camera" class="form-input" placeholder="请输入相机品牌及型号" />
        </div>
        <div class="form-item-content-input">
          <span class="title">灯光信息</span>
          <input v-model="formData.lightingEquipment" class="form-input" placeholder="请输入灯光信息" />
        </div>
        <div class="form-item-content-input">
          <span class="title">定焦镜头</span>
          <input v-model="formData.fixedFocalLengthLens" class="form-input" placeholder="请输入定焦镜头" />
        </div>
        <div class="form-item-content-input no-margin">
          <span class="title">变焦镜头</span>
          <input v-model="formData.zoomLens" class="form-input" placeholder="请输入变焦镜头" />
        </div>
      </div>
    </div>
    <div class="form-item-footer !mb-[32rpx]">*如果没有则填 “无”，多个设备使用”;“隔开</div>
    <div class="form-item mt-[32rpx] !mb-[0rpx]">
      <div class="form-item-header">我的作品</div>
      <div class="form-item-content">
        <div class="form-item-content-input">
          <span class="title">小红书号</span>
          <input v-model="formData.littleRedBookId" class="form-input" placeholder="请输入小红书号" />
        </div>
        <div class="form-item-content-input no-margin">
          <span class="title">抖音号</span>
          <input v-model="formData.douYinId" class="form-input" placeholder="请输入抖音号" />
        </div>
      </div>
    </div>
    <div class="form-item-footer !mb-[32rpx]">*我们将基于您的作品和设备信息，评定摄影师等级</div>
    <div class="form-item mt-[32rpx]">
      <div class="form-item-header form-item-header-flex">
        <span>上传设备图片</span>
        <span class="delete" @click="del = !del">删除</span>
      </div>
      <div class="form-item-content">
        <Photo @update:device="handleDeviceUpdate" :device.sync="formData.photoList" :del="del" />
      </div>
      <div class="form-item-footer">*您可以上传多张设备图片，详细完善的图片信息，可以帮助我们完成审核工作</div>
    </div>
  </div>
  </up-skeleton>

  <div class="form-confirm">
    <div class="btn" @click="handleSubmit">提交申请</div>
  </div>
</template>

<script lang="ts" setup>
import Photo from './photo.vue'
import { register } from '@/api/auth'
import { getUserInfo } from '@/api/my'
import { useRegistrationStore } from '@/pinia/register'
import { useUserStore } from '@/pinia/user'
import { useNotification} from '@/hooks/useNotification'
const { clearUser } = useUserStore()
const { message,modal } = useNotification()
const registrationStore = useRegistrationStore()
const del = ref(false)
const id = ref(false)
const loading = ref(false)
const formData = ref({
  mobile: '',
  nickname: '',
  wechatId: '',
  camera: '',
  lightingEquipment: '',
  zoomLens: '',
  fixedFocalLengthLens: '',
  littleRedBookId: '',
  douYinId: '',
  photoList: []
})

const handleDeviceUpdate = (device: any) => {
  formData.value.photoList = device
}


const handleSubmit = async () => {
  modal({ title: '确认提交吗', content: '请检查信息填写无误' }).then(async () => {
    const validationResult = validateFormData(formData.value);

if (validationResult.isValid) {
  await registrationStore.updateFormData({
    mobile: formData.value.mobile,
    nickname: formData.value.nickname,
    wechatId: formData.value.wechatId,
    camera: formData.value.camera,
    lightingEquipment: formData.value.lightingEquipment,
    zoomLens: formData.value.zoomLens,
    fixedFocalLengthLens: formData.value.fixedFocalLengthLens,
    littleRedBookId: formData.value.littleRedBookId,
    douYinId: formData.value.douYinId,
    photoList: formData.value.photoList
  }) // 先存储
  await registrationStore.loadFromLocalStorage() // 再读
  const temp = registrationStore.formData
  // 组织为接口所需要的形式
  const devicesPics = temp.photoList.map((item:any) => {
    return item.picUrl
  })
  const data = {
    phone: formData.value.mobile, // 从 formData 中提取手机号码
    areaId: temp.area.areaId, // 保持地区信息不变
    nickname: formData.value.nickname, // 从 formData 中提取昵称
    appPhotographerInfoRegisterVO: {
    littleRedBookId: formData.value.littleRedBookId, // 从 formData 中提取小红书ID
    douYinId: formData.value.douYinId, // 从 formData 中提取抖音ID
    wechatId: formData.value.wechatId, // 从 formData 中提取微信ID
    hopaiAgreement: true, // 保持为 true
    paymentAgreement: true, // 保持为 true
    imageAgreement: true, // 保持为 true
    camera: formData.value.camera, // 从 formData 中提取相机信息
    lightingEquipment: formData.value.lightingEquipment, // 从 formData 中提取灯光设备信息
    fixedFocalLengthLens: formData.value.fixedFocalLengthLens, // 从 formData 中提取定焦镜头信息
    zoomLens: formData.value.zoomLens, // 从 formData 中提取变焦镜头信息
    orderType: temp.orderType // 保持接单类型不变
  },
    devicesPics
  }
  const res = await register(data)
  if(!res.data) {
    message({ title: res.msg })
    return
  }
    uni.showToast({
      title: '提交成功',
      icon: 'success'
    })
    clearUser() // 给你退出
    setTimeout(() => {
      uni.reLaunch({
      url: '/pages/register/pending'
    }) }, 2000)
} else {
  uni.showToast({
    title: validationResult.errorMessage,
    icon: 'none'
  });
}
  })

};

// 验证函数
const validateFormData = (data: any) => {
  const errors: string[] = [];

  // 检查每个字段是否为空
  if (!data.nickname) errors.push('姓名');
  if (!data.mobile) errors.push('电话');
  if (!data.wechatId) errors.push('微信号');
  if (!data.camera) errors.push('相机');
  if (!data.lightingEquipment) errors.push('灯光信息');
  if (!data.fixedFocalLengthLens) errors.push('定焦镜头');
  if (!data.zoomLens) errors.push('变焦镜头');
  if (!data.littleRedBookId) errors.push('小红书号');
  if (!data.douYinId) errors.push('抖音号');
  if (data.photoList.length === 0) errors.push('设备图片');

  // 验证手机号格式
  const phoneRegex = /^[1][3-9][0-9]{9}$/;
  if (data.mobile && !phoneRegex.test(data.mobile)) errors.push('电话格式不正确');

  return {
    isValid: errors.length === 0,
    errorMessage: errors.length > 0 ? `请填写以下信息: ${errors.join(', ')}` : ''
  };
};
onLoad(async (e: any) => {
  if(e.id) {  // 如果是重新来验证的
    loading.value = true
    const user = (await getUserInfo()).data
    formData.value = {
    mobile: user.mobile || '',
    nickname: user.nickname || '',
    wechatId: user.appPhotographerInfoBaseVO.wechatId || '',
    camera: user.appPhotographerInfoBaseVO.camera || '',
    lightingEquipment: user.appPhotographerInfoBaseVO.lightingEquipment || '',
    zoomLens: user.appPhotographerInfoBaseVO.zoomLens || '',
    fixedFocalLengthLens: user.appPhotographerInfoBaseVO.fixedFocalLengthLens || '',
    littleRedBookId: user.appPhotographerInfoBaseVO.littleRedBookId || '',
    douYinId: user.appPhotographerInfoBaseVO.douYinId || '',
    photoList: formData.value.photoList
    };
    loading.value = false
  }
  id.value = e.id
})

</script>

<style lang="scss" scoped>
.no-margin {
  margin-bottom: 0 !important;
}
.form {
  width: 100vw;
  padding: 32rpx;
  padding-bottom: 20rpx;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #f6f6f6;
  font-weight: 400 !important;
  &-item {
    width: 100%;
    margin-bottom: 64rpx;
    &-header {
      padding: 0 0 16rpx 0;
      &-flex {
        display: flex;
        justify-content: space-between;

        .delete {
          font-weight: 400;
          font-size: 24rpx;
          padding: 8rpx 16rpx;
          color: #ba2636;
          border-radius: 12rpx;
          border: 2rpx solid #ba2636;
        }
      }
    }
    &-content {
      width: 100%;
      box-sizing: border-box;
      padding: 48rpx 32rpx;
      border-radius: 24rpx;
      background: #fff;

      &-input {
        display: flex;
        align-items: center;
        margin-bottom: 24rpx;

        .title {
          width: 128rpx;
          font-size: 28rpx;
          margin-right: 48rpx;
        }

        .form-input {
          font-size: 28rpx;
        }
      }
    }
    &-footer {
      margin-top: 12rpx;
      font-size: 24rpx;
      color: rgba(40, 40, 40, 0.30);
    }
  }
}

.form-confirm {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180rpx;

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 296rpx;
    height: 80rpx;
    background-color: #ba2636;
    color: #fff;
    border-radius: 16rpx;
  }
}
</style>