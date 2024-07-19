<template>
  <up-skeleton rows="3" :loading="loading">
    <div class="photo-layout">
      <scroll-view class="photo-scrollview" scroll-x="true">
        <div class="photo">
          <div class="photo-add" @click="handleUpload()"></div>
          <div class="relative" v-for="item,index in device" :key="index">
            <image v-if="!loading && !show" class="photo-item"  @click="previewPhoto(item.picUrl)"  mode="aspectFill" :src="item.picUrl"   />
            <div class="delete" @click="handleDelete(item.id)" v-if="del">
              <div class="delete-icon"></div>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
  </up-skeleton>
  <up-popup :show="show"  mode="center" :round="10" >
    <view class="popup">
      <div v-for="(progress,index) in progressList" :key="index">
        <span>上传进度： {{ progress }}%</span>
        <progress :percent="progress" show-info stroke-width="3" />
      </div>
    </view>
  </up-popup>
</template>

<script setup lang="ts">
import { getDeviceList, createDevicePic, deleteDevicePic } from '@/api/my/index'
import { useNotification } from '@/hooks/useNotification'
import { DeviceVO } from '@/api/my/types'
import { useUserStore } from '@/pinia/user'
import { useSts } from '@/hooks/useSts'
import { useUpload } from '@/hooks/useUpload'
const { getStsToken, signatrueUrl } = useSts()
const { getConfig, uploadFile   } = useUpload(0)
const userId = useUserStore().getUserInfo?.userId
const device = ref<DeviceVO[]>([])
const loading = ref(false)
const show = ref(false)
const { message, modal } = useNotification()
const progressList = ref<any>([])

defineProps<{ del: boolean}>()

const previewPhoto = (picUrl: string) => {
  const urls = device.value.map(item => item.picUrl)
  uni.previewImage({
    urls,
    current: picUrl
  })
}

const handleDelete = async (id: string) => {
  modal({ title: '即将删除', content: '删除后无法撤回噢' }).then(async () => {
    await deleteDevicePic(id)
    await getData()
    message({ title: '删除成功' })
  }).catch(() => message({ title: '取消删除' }))


}

const handleUpload = () => {
  uni.chooseImage({
    count: 9, // 最大可选数量
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: async (res) => {
      const tempFilePaths:any = res.tempFilePaths;
      loading.value = true;
      show.value = true
      try {
        progressList.value = tempFilePaths.map(() => 0)
        await Promise.all(
          tempFilePaths.map(async (filePath:any, index: number) => {
            await getConfig()
            const picUrl = await uploadFile(filePath, progress => {
              progressList.value[index] = progress
            })
            await createDevicePic({ userId, picUrl })
            await getData()
          })
        );
      } finally {
        message({ title: '新增成功' })
        loading.value = false;
        show.value = false
      }
    },
  })
}

const getData = async () => {
  loading.value = true
  try {
    await getStsToken()
    device.value = (await getDeviceList(userId)).data
    await Promise.all(device.value.map(async item => {
      const url = item.picUrl.split('.com/')[1]
      item.picUrl = await signatrueUrl(url)
    }))
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
  width: 500rpx;
  border-radius: 32rpx;
  padding: 32rpx;
}
.photo-scrollview {
  width: 100%;
  white-space: nowrap;
}
.photo-layout {
  background-color: #fff;
  border-radius: 24rpx;
  padding: 48rpx 32rpx;
}
.photo {
  display: flex;
  &-add {
    position: relative;
    min-width: 192rpx;
    height: 192rpx;
    border-radius: 16rpx;
    border: 1px solid rgba(0, 0, 0, 0.12);
    margin-right: 24rpx;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 56rpx;
      height: 6rpx;
      background-color: rgba(0,0,0,0.12);
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &::before {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
  &-item {
    min-width: 192rpx;
    width: 192rpx;
    height: 192rpx;
    border-radius: 16rpx;
    border: 1px solid rgba(0, 0, 0, 0.12);
    margin-right: 24rpx;
  }
}
.delete {
  z-index: 1;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 7rpx; 
  left: 6rpx;
  width: 35rpx;
  height: 35rpx;
  background-color: #e1dede;
  border-radius: 50%;
  &-icon {
    width: 15rpx;
    background-color: #ba2636;
    height: 1rpx;
  }
}
</style>
