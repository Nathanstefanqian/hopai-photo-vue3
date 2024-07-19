<template>
  <div class="album">
    <div class="album-name">
      <div class="album-name-header">作品集名称</div>
      <up-skeleton :rows="3" :loading="loading">
        <div class="album-name-content" v-if="album">{{ album.title }}</div>
      </up-skeleton>
    </div>
    <div class="album-photo">
      <div class="album-photo-header">
        <div class="title">作品集</div>
        <div class="btn">
          <div class="btn-add mr-[10rpx]" @click="handleUpload">+ 添加</div>
          <div class="btn-add" @click="del = !del"> 删除</div>
        </div>
      </div>
      <div class="album-photo-main">
        <up-skeleton :rows="6" :loading="loading">
          <div v-for="item,index in photo" :key="index" class="album-photo-main-item" @click="previewPhoto(item.url)">
          <image :src="item.url" class="photo" mode="widthFix" fade-show="true" />
            <div class="delete" v-if="del">
              <div class="delete-icon"></div>
            </div>
          </div>
        </up-skeleton>
      </div>
    </div>
  </div>
  <up-popup :show="progressShow"  mode="center" :round="10" >
    <view class="popup-progress">
      <div v-for="(progress,index) in progressList" :key="index">
        <span>上传进度： {{ progress }}%</span>
        <progress :percent="progress" show-info stroke-width="3" />
      </div>
    </view>
  </up-popup>
  <up-popup :show="show" @close="show = false" :round="10" closeable class="relative">
    <view class="popup">
      <div class="title">作品集名称</div>
      <div class="desc">
        <input v-model="album.title" placeholder="请输入"  />
      </div>
      <div class="btn-group">
        <button class="btn btn-accept" @click="updateTitle">确定</button>
      </div>
    </view>
  </up-popup>
</template>

<script setup lang="ts">
import { getPhotoPage, getAlbum } from '@/api/my'
import { useUpload } from '@/hooks/useUpload';
import { useNotification } from '@/hooks/useNotification'
const { getConfig, uploadFile } = useUpload(0)
const { message } = useNotification()
const photo = ref<any>([])
const album = ref()
const loading = ref(false)
const del = ref(false)
const id = ref()
const progressShow = ref(false)
const show = ref(false)
const progressList = ref<any>([])

const handleUpload = () => {
  uni.chooseImage({
    count: 9,
    success: async (res) => {
      const tempFilePaths:any = res.tempFilePaths;
      loading.value = true;
      progressShow.value = true
      const { uploadFile, getConfig } = useUpload(0)
      try {
        progressList.value = tempFilePaths.map(() => 0)
        await Promise.all(
          tempFilePaths.map(async (filePath:any, index: number) => {
            await getConfig()
            const picUrl = await uploadFile(filePath, progress => {
              progressList.value[index] = progress
            })
            progressShow.value = false
            await getData()
          })
        );
      } finally {
        message({ title: '更新成功' })
        loading.value = false;
      }
    },
  })
}

const updateTitle = async () => {

}

const previewPhoto = (picUrl: string) => {
  const urls = photo.value.map(item => item.url)
  uni.previewImage({
    urls,
    current: picUrl
  })
}

const getData = async () => {
  loading.value = true
  try {
    photo.value = (await getPhotoPage({ pageNo: 1, pageSize: 100, albumId: id.value })).data?.list || []
    album.value = (await getAlbum(id.value)).data
  } finally {
    loading.value = false
  }
}

onLoad(async options => {
  id.value = options?.id
  await getData()
})
</script>

<style lang="scss" scoped>
.popup-progress {
  width: 500rpx;
  border-radius: 32rpx;
  padding: 32rpx;
}
.album {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background-color: #f6f6f6;
  padding: 32rpx;

  &-name {
    margin-bottom: 66rpx;
    font-weight: 200;

    &-header {
      margin-bottom: 32rpx;
    }

    &-content {
      background-color: #fff;
      padding: 32rpx;
      border-radius: 12rpx;
    }
  }

  &-photo {
    &-header {
      display: flex;
      justify-content: space-between;
      margin-top: 32rpx;

      .title {
        font-weight: 200;
      }
      .btn {
        display: flex;

        &-add {
          padding: 8rpx 16rpx;
          border-radius: 12rpx;
          border: 0.66rpx solid #ba2636;
          color: #ba2636;
          font-size: 24rpx;
        }
      }
    }

    &-main {
      margin-top: 36rpx;
      column-count: 3;
      column-gap: 6rpx;
      &-item {
        position: relative;
        break-inside: avoid;
      }
      
      .photo {
        width: 100%;
        margin-bottom: 6rpx;
      }

      .delete {
        z-index: 1;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 2rpx; 
        right: 2rpx;
        width: 50rpx;
        height: 50rpx;
        background-color: #e1dede;
        border-radius: 50%;
        &-icon {
          width: 25rpx;
          background-color: #ba2636;
          height: 5rpx;
        }
      }
    }
  }
}
</style>