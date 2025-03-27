<template>
  <div class="device">
    <main class="device-main">
      <div class="device-main-my">
        <div class="device-main-my-header">我的设备</div>
        <up-skeleton rows="3" :loading="loading">
          <div class="device-main-my-main" v-if="user.appPhotographerInfoBaseVO">
            <div class="item" @click="openPopup('camera', user.appPhotographerInfoBaseVO.camera)">
              <div class="title">相机</div>
              <div class="content">{{ user.appPhotographerInfoBaseVO.camera }}</div>
            </div>
            <div class="item" @click="openPopup('zoomLens', user.appPhotographerInfoBaseVO.zoomLens)">
              <div class="title">变焦镜头</div>
              <div class="content">{{ user.appPhotographerInfoBaseVO.zoomLens }}</div>
            </div>
            <div class="item" @click="openPopup('fixedFocalLengthLens', user.appPhotographerInfoBaseVO.fixedFocalLengthLens)">
              <div class="title">定焦镜头</div>
              <div class="content">{{ user.appPhotographerInfoBaseVO.fixedFocalLengthLens }}</div>
            </div>
            <div class="item no-margin" @click="openPopup('lightingEquipment', user.appPhotographerInfoBaseVO.lightingEquipment)">
              <div class="title">闪光灯</div>
              <div class="content">{{ user.appPhotographerInfoBaseVO.lightingEquipment }}</div>
            </div>
          </div>
        </up-skeleton>
      </div>
      <div class="device-main-device">
        <div class="device-main-device-header">
          <span>上传设备图片</span>
          <span class="delete" @click="del = !del">删除</span>
        </div>
        <div class="device-main-device-main">
          <Photo :del="del" />
        </div>
      </div>
    </main>
  </div>
  <up-popup :show="show" @close="show = false" :round="10" closeable class="relative">
    <view class="popup">
      <div class="title">{{ popupTitle }}</div>
      <input class="desc" v-model="popupContent" placeholder="请输入" />
      <div class="btn-group">
        <button class="btn btn-accept" @click="updateInfo">确定</button>
      </div>
    </view>
  </up-popup>
</template>

<script setup lang="ts">
import Photo from './Photo.vue'
import { getUserInfo, updateUserInfo } from '@/api/my/index'
import { useNotification } from '@/hooks/useNotification'
import { UserVO } from '@/api/auth/types';
const { message } = useNotification()
const user = ref<UserVO>({} as UserVO)
const loading = ref(false)
const del = ref(false)
const show = ref(false)
const popupTitle = ref('')
const popupContent = ref('')
const currentField = ref('')

const openPopup = (field: string, content: string) => {
  currentField.value = field
  popupTitle.value = getTitle(field)
  popupContent.value = content
  show.value = true
}

const getTitle = (field: string) => {
  switch (field) {
    case 'camera':
      return '相机'
    case 'zoomLens':
      return '变焦镜头'
    case 'fixedFocalLengthLens':
      return '定焦镜头'
    case 'lightingEquipment':
      return '闪光灯'
    default:
      return ''
  }
}

const updateInfo = async () => {
  if(!popupContent.value) {
    message({"title": "该信息不能为空哦！"})
    return
  }
  if (user.value.appPhotographerInfoBaseVO) {
    (user.value.appPhotographerInfoBaseVO as any)[currentField.value] = popupContent.value // 类型断言
    await updateUserInfo(user.value.appPhotographerInfoBaseVO)
    await getData()
    message({'title': '更新成功', 'icon': 'success'})
    show.value = false
  }
}

const getData = async () => {
  loading.value = true
  try {
    user.value = (await getUserInfo()).data
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await getData()
})
</script>

<style lang="scss" scoped>
.popup {
  display: flex;
  flex-direction: column;
  margin-top: 28rpx;
  padding: 54rpx;

  .title {
    font-size: 36rpx;
    font-weight: 500;
    margin-bottom: 49rpx;
  }

  .desc {
    background-color: #f6f6f6;
    height: 20rpx;
    font-size: 28rpx;
    padding: 32rpx 32rpx;
    border-radius: 32rpx;
    color: rgba(40, 40, 40, 0.5);
  }

  .btn-group {
    display: flex;
    justify-content: space-around;
    margin-top: 49rpx;
    padding: 0rpx 96rpx;

    .btn {
      font-size: 32rpx;
      padding: 0 96rpx;
      border-radius: 32rpx;

      &-accept {
        color: #fff;
        background-color: #ba2636;
      }
    }
  }
}
.device {
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f6f6;

  &-main {
    padding: 32rpx;

    &-my {
      margin-bottom: 64rpx;
      &-header {
        font-size: 32rpx;
        font-weight: 400 !important;
        margin-bottom: 32rpx;
      }

      &-main {
        background-color: #fff;
        border-radius: 24rpx;
        padding: 48rpx 32rpx;

        .item {
          font-weight: 400 !important;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 48rpx;
        }

        .content {
          font-weight: 400;
          font-size: 24rpx;
        }
      }
    }

    &-device {
      &-header {
        display: flex;
        justify-content: space-between;
        font-weight: 400 !important;
        margin-bottom: 32rpx;

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
  }
}

.no-margin {
  margin-bottom: 0rpx !important;
}
</style>
