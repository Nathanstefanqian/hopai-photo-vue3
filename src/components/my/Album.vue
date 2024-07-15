<template>
 <scroll-view class="my-main-basic-album-scrollview" scroll-x="true">
  <div class="my-main-basic-album">
    <div class="album" v-for="item,index in 4" :key="index" scroll-y="true">
      <image class="album-image" src="/static/my/gf5.jpg" mode="aspectFill" />
      <div class="album-desc">
        <div class="title">居家写真</div>
        <div class="op">
          <span class="number">32</span>
          <span class="edit">编辑</span>
        </div>
      </div>
    </div>
  </div>
 </scroll-view>
</template>

<script setup lang="ts">

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
}
</style>