<template>
  <up-skeleton :rows="3" :loading="loading">
    <scroll-view class="my-main-basic-album-scrollview" scroll-x="true">
      <div class="my-main-basic-album">
        <div class="album" v-for="item,index in album" :key="index" scroll-y="true" v-if="album.length" @click="editAlbum(item.id)">
          <image class="album-image" :src="item.picUrl || netConfig.picURL + '/static/my/gf5.jpg'" mode="aspectFill" />
          <div class="album-desc">
            <div class="title">{{ item.title }}</div>
            <div class="op">
              <span class="number">{{ item.photoNum }}</span>
              <span class="edit">编辑</span>
            </div>
          </div>
        </div>
        <div class="album-empty" v-else>
          <image :src="netConfig.picURL + '/static/my/empty.svg'" />
          <span class="title">什么也没有</span>
        </div>
      </div>
    </scroll-view>
  </up-skeleton>

</template>

<script setup lang="ts">
import { getAlbumPage, getPhoto } from '@/api/my';
import { useUserStore } from '@/pinia/user'
const album = ref<any>([])
const { getUserInfo } = useUserStore()
const userId = getUserInfo?.userId
const loading = ref(false)
import { netConfig } from '@/config/net.config'

const editAlbum = (id: any) => {
  uni.navigateTo({
    url: `/components/my/EditAlbum?id=${id}`
  })
}

const getData = async () => {
  loading.value = true
  try {
    album.value= (await getAlbumPage({ pageNo:1 , pageSize: 50, userId })).data?.list || []
    await Promise.all(album.value.map(async item => {
      item.picUrl = (await getPhoto(item.coverPhotoId)).data.url || ''
    }))
  } finally {
    loading.value = false
  }
}
onLoad(async () => {
  await getData()
})

</script>

<style lang="scss" scoped>
.my-main-basic-album-scrollview {
  width: 100%;
  white-space: nowrap;
}

.my-main-basic-album {
  display: flex;
  flex-direction: row;

  .album {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-radius: 16rpx;
    width: 320rpx;
    height: 564rpx;
    padding: 24rpx;
    background-color: #fff;
    margin-right: 24rpx;

    &-image {
      width: 272rpx;
      height: 388rpx;
      border-radius: 12rpx;
      margin-bottom: 24rpx;
    }

    .title {
      margin-bottom: 24rpx;
      font-weight: 400;
      font-size: 28rpx;
    }

    .op {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .number {
        color: rgba(0, 0, 0, 0.30);
      }

      .edit {
        font-size: 24rpx;
        color: #ba2636;
      }
    }
  }

  .album-empty {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 40rpx;

    .title {
      color: rgba(0,0,0,0.3);
      font-size: 28rpx;
    }
  }
}
</style>


