<template>
  <div class="album">
    <div class="album-name">
      <div class="album-name-header">作品集名称</div>
      <up-skeleton :rows="3" :loading="loading">
        <div class="album-name-content">
          <input class="title" v-model="title" placeholder="请输入作品集名称" />
        </div>
      </up-skeleton>
    </div>
    <div class="album-photo">
      <div class="album-photo-header">
        <div class="title">作品集</div>
        <div class="btn">
          <div class="btn-add mr-[10rpx]" @click="handleUpload">+ 添加</div>
          <div class="btn-add mr-[10rpx]" @click="del = !del">删除</div>
        </div>
      </div>
      <up-skeleton :rows="6" :loading="loading">
        <div class="album-photo-main" v-if="photo.length">
            <div v-for="item,index in photo" :key="index" class="album-photo-main-item" @click=" add || del ? '' : previewPhoto(item)">
            <image :src="item" class="photo" mode="aspectFill" fade-show="true" />
              <div class="delete" v-if="del" @click="deletePhoto(index)">
                <div class="delete-icon"></div>
              </div>
            </div>
        </div>
        <div class="album-photo-empty" v-else>
          <image src="/static/my/empty-album.svg" />
          <div class="title">快上传优秀的作品吧</div>
        </div>
      </up-skeleton>
    </div>
  </div>
  <div class="album-footer">
    <div class="album-footer-btn" @click="handleCreate">创建相册</div>
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
        <input v-model="title" placeholder="请输入"  />
      </div>
      <div class="btn-group">
        <button class="btn btn-accept" @click="updateTitle">确定</button>
      </div>
    </view>
  </up-popup>
</template>

<script setup lang="ts">
import { createAlbum } from '@/api/my'
import { useUpload } from '@/hooks/useUpload';
import { useNotification } from '@/hooks/useNotification'
import { useUserStore } from '@/pinia/user'
const { getUserInfo } = useUserStore()
const { message, modal } = useNotification()
const photo = ref<any>([])
const loading = ref(false)
const del = ref(false)
const add = ref(false)
const id = ref()
const progressShow = ref(false)
const show = ref(false)
const progressList = ref<any>([])
const title = ref()

const handleCreate = async () => {
  if(!title.value) {
    message({'title': '作品集名称不能为空哦'})
    return
  }
  if(!photo.value.length) {
    message({'title': '至少上传一张照片哦'})
    return
  }
  const data = { userId: getUserInfo?.userId, title: title.value, sortOrder: 1, urlList: photo.value }
  loading.value = true
  try {
    await createAlbum(data)
  } finally {
    loading.value = false
    message({ title: '创建成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateBack()
    }, 1000);
  }
}

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
            photo.value.unshift(picUrl)
            progressShow.value = false
          })
        )
      } finally {
        message({ title: '上传成功' })
        loading.value = false;
      }
    },
  })
}

const deletePhoto = async (id: any) => {
  photo.value.splice(id, 1)
  message({ title: '删除成功' })
}

const updateTitle = async () => {
  message({ title: '设置成功' })
  show.value = false
}

const previewPhoto = (picUrl: string) => {
  const urls = photo.value.map(item => item.url)
  uni.previewImage({
    urls,
    current: picUrl
  })
}
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
.album-footer {
  box-sizing: border-box;
  padding: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  bottom: 0;
  height: 160rpx;
  background-color: #fff;

  &-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ba2636;
    width: 200rpx;
    height: 50rpx;
    color: #fff;
    padding: 16rpx;
    border-radius: 12rpx;
  }
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
      .title {
        font-size: 28rpx !important;
      }
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

    &-empty {
      margin-top: 100rpx;
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      justify-content: center;

      .title {
        margin-top: 80rpx;
        color: rgba(0, 0, 0, 0.30);
        font-size: 32rpx;
      }
    }
  }
}
</style>