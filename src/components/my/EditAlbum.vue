<template>
  <div class="album">
    <div class="album-name">
      <div class="album-name-header">
        <span>作品集名称</span>
        <div class="btn-del" @click="deleteAlbumHandler">删除相册</div>
      </div>
      <up-skeleton :rows="3" :loading="loading">
        <div class="album-name-content" v-if="album" @click="show = true">
          <span>{{ album.title }}</span>
        </div>
      </up-skeleton>
    </div>
    <div class="album-photo">
      <div class="album-photo-header">
        <div class="title">作品集</div>
        <div class="btn">
          <div class="btn-add mr-[10rpx]" @click="handleUpload">+ 添加</div>
          <div class="btn-add mr-[10rpx]" @click="del = !del, add = false">删除</div>
          <div class="btn-add" @click="add = !add, del = false">设置封面</div>

        </div>
      </div>
      <up-skeleton :rows="6" :loading="loading">
        <div class="album-photo-main">
            <div v-for="item,index in photo" :key="index" class="album-photo-main-item" @click=" add || del ? '' : previewPhoto(item.url)">
            <image :src="item.url" class="photo" mode="aspectFill" fade-show="true" />
              <div class="delete" v-if="del" @click="deletePhoto(item.id)">
                <div class="delete-icon"></div>
              </div>
              <div class="add" v-if="add" @click="setCover(item.id)">
                <div class="add-icon">+</div>
              </div>
            </div>
        </div>
      </up-skeleton>
    </div>
  </div>
  <up-popup :show="progressShow"  mode="center" :round="10" >
    <view class="popup-progress">
      <div v-for="(progress,index) in progressList" :key="index">
        <span>上传进度： {{ progress }}%</span>
        <progress :percent="progress" activeColor="#ba2636" show-info stroke-width="3" />
      </div>
    </view>
  </up-popup>
  <up-popup :show="show" @close="show = false" :round="10" closeable class="relative">
    <view class="popup">
      <div class="title">作品集名称</div>
      <div class="desc" v-if="album">
        <input v-model="title" placeholder="请输入"  />
      </div>
      <div class="btn-group">
        <button class="btn btn-accept" @click="updateTitle">确定</button>
      </div>
    </view>
  </up-popup>
</template>

<script setup lang="ts">
import { getPhotoPage, getAlbum, updateAlbum, deleteAlbumPhoto, updateAlbumPhoto, deleteAlbum } from '@/api/my'
import { useUpload } from '@/hooks/useUpload';
import { useNotification } from '@/hooks/useNotification'
import { useUserStore } from '@/pinia/user'
const { getUserInfo } = useUserStore()
const { message, modal } = useNotification()
const photo = ref<any>([])
const album = ref()
const loading = ref(false)
const del = ref(false)
const add = ref(false)
const id = ref()
const progressShow = ref(false)
const show = ref(false)
const progressList = ref<any>([])
const title = ref()

const handleUpload = () => {
  uni.chooseImage({
    count: 9,
    success: async (res) => {
      const tempFilePaths:any = res.tempFilePaths;
      loading.value = true;
      progressShow.value = true
      const { uploadFile, getConfig } = useUpload(0)
      const urlList = ref<any>([])
      try {
        progressList.value = tempFilePaths.map(() => 0)
        await Promise.all(
          tempFilePaths.map(async (filePath:any, index: number) => {
            await getConfig()
            const picUrl = await uploadFile(filePath, progress => {
              progressList.value[index] = progress
            })
            urlList.value.push(picUrl)
            progressShow.value = false
          })
        )
      } finally {
        await updateAlbumPhoto({ albumId: id.value, urlList: urlList.value })
        await getData()
        message({ title: '更新成功' })
        loading.value = false;
      }
    },
  })
}

const deleteAlbumHandler = async () => {
  modal({ title: '确认删除该相册吗', content: '删除后无法撤销'}).then(async () => {
    loading.value = true
    await deleteAlbum(id.value)
    message({ title: '删除成功' })
    setTimeout(() => {
      loading.value = false
      uni.reLaunch({ url: '/pages/my/index' })
    }, 2000);
  })
}

const deletePhoto = async (id: any) => {
  if(id == album.value.coverPhotoId) {
    message({ title: '该照片为封面，无法删除' })
    return
  }
  modal({ title: '确认删除吗', content: '删除后无法撤销'}).then(async () => {
    loading.value = true
    await deleteAlbumPhoto(id)
    message({ title: '删除成功' })
    await getData()
    loading.value = false
  })
}

const setCover = (photoId: any) => {
  modal({ title: '确认设置吗', content: '设置这张照片为封面'}).then(async () => {
    loading.value = true
    const updateData = { userId: getUserInfo?.userId, title: title.value, sortOrder: 1, id: id.value, coverPhotoId: photoId  }
    await updateAlbum(updateData)
    message({ title: '设置成功' })
    await getData()
    loading.value = false
    setTimeout(() => {
      uni.reLaunch({ url: '/pages/my/index' })
    }, 2000);
  })
}

const updateTitle = async () => {
  if(!title.value) {
    message({ title: '作品集名称不能为空' })
    return
  }
  loading.value = true
  const updateData = { userId: getUserInfo?.userId, title: title.value, sortOrder: 1, id: id.value }
  await updateAlbum(updateData)
  await getData()
  message({ title: '更新成功' })
  loading.value = false
  show.value = false
  setTimeout(() => {
      uni.reLaunch({ url: '/pages/my/index' })
    }, 2000);
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
    title.value = album.value.title
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
    font-size: 28rpx;
    padding: 32rpx 32rpx;
    border-radius: 32rpx;
    color: rgba(40, 40, 40, 0.5);
    word-wrap: break-word;
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
.popup-progress {
  width: 500rpx;
  border-radius: 32rpx;
  padding: 32rpx;
}
.album {
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f6f6;
  padding: 32rpx;

  &-name {
    margin-bottom: 66rpx;
    font-weight: 400 !important;

    &-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 32rpx;

      .btn-del {
        font-weight: 400;
        padding: 8rpx 16rpx;
        border-radius: 12rpx;
        border: 2rpx solid #ba2636;
        color: #ba2636;
        font-size: 24rpx;
      }
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
        font-weight: 400 !important;
      }
      .btn {
        display: flex;

        &-add {
          padding: 8rpx 16rpx;
          border-radius: 12rpx;
          border: 2rpx solid #ba2636;
          color: #ba2636;
          font-size: 24rpx;
        }
      }
    }

    &-main {
      display: flex;
      width: 100%;
      margin-top: 36rpx;
      flex-wrap: wrap;

      &-item {
        position: relative;
        width: 210rpx;
        height: 280rpx;
        border-radius: 12rpx;
        margin-bottom: 28rpx;
        margin-right: 20rpx;

      }
      
      .photo {
        width: 210rpx;
        height: 280rpx;
        border-radius: 12rpx;
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

      .add {
        z-index: 1;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 7rpx; 
        right: 6rpx;
        width: 35rpx;
        height: 35rpx;
        background-color: #e1dede;
        border-radius: 50%;
        &-icon {
          font-size: 32rpx;
          color: #ba2636;
        }
}

    }
  }
}
</style>