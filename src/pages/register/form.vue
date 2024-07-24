<template>
  <div class="form">
    <div class="form-item mt-[32rpx]">
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
    <div class="form-item mt-[32rpx]">
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
    <div class="form-item mt-[32rpx]">
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
    <div class="form-item mt-[32rpx]">
      <div class="form-item-header">上传设备图片</div>
      <div class="form-item-content">
        <Photo />
      </div>
      <div class="form-item-footer">*您可以上传多张设备图片，详细完善的图片信息，可以帮助我们完成审核工作</div>
    </div>
  </div>
  <div class="form-confirm">
      <div class="btn">提交申请</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Photo from './photo.vue'

const formData = ref({
  mobile: '',
  nickname: '',
  wechatId: '',
  camera: '',
  lightingEquipment: '',
  zoomLens: '',
  fixedFocalLengthLens: '',
  littleRedBookId: '',
  douYinId: ''
})

const photoList = ref([])
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
  font-weight: 200;
  &-item {
    width: 100%;
    margin-bottom: 64rpx;
    &-header {
      padding: 0 0 16rpx 0;
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
          font-size: 24rpx;
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