<template>
  <div class="my w-100vw h-100vh relative">
    <div class="redball"></div>
    <div class="my-main">
      <div class="my-main-header">
        <image src="@/static/my/avatar.jpg" class="header-image"></image>
        <div class="header-userinfo">
          <div class="name">钱卢骏老师</div>
          <div class="desc">上海大学上海电影学院电子信息博士</div>
        </div>
      </div>
      <div class="my-main-basic">
        <div class="my-main-basic-header">
          我的资料
        </div>
        <div class="my-main-basic-tab">
          <Tab />
        </div>
      </div>
      <div class="my-main-album">
        <div class="my-main-album-header">
          <div class="header-title">我的代表作</div>
          <div class="header-create">+ 创建</div>
        </div>
        <div class="my-main-album-main">
          <Album />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tab from '@/components/my/Tab.vue'
import Album from '@/components/my/Album.vue'
</script>

<style lang="scss" scoped>
@import '@/styles/animation.scss';

.my {
  display: flex;
  background-color: #f6f6f6;

  .redball {
    position: absolute;
    z-index: 0;
    top: 248rpx;
    left: 122rpx;
    width: 266rpx;
    height: 160rpx;
    background-color: #ba2636;
    opacity: 0.2;
    filter: blur(70rpx);
    transform: scale(1); /* 初始大小为1 */
    animation: breathe 2.5s ease-in-out infinite alternate; /* 使用呼吸效果的动画 */
  }

  &-main {
    box-sizing: border-box;
    position: absolute;
    z-index: 1;
    top: 204rpx;
    padding: 0 40rpx;
    width: 100%;

    &-header {
      display: flex;
      margin-bottom: 60rpx;
      .header-image {
        width: 140rpx;
        height: 140rpx;
        border-radius: 50%;
        margin-right: 60rpx;
      }

      .header-userinfo {
        display: flex;
        flex-direction: column;

        .name {
          font-size: 40rpx;
          margin-bottom: 24rpx;
        }

        .desc {
          font-size: 28rpx;
          color: rgba(0, 0, 0, 0.55);
        }
      }
    }

    &-basic {
      margin-bottom: 64rpx;
      &-header {
        font-size: 36rpx;
        font-weight: 300;
        margin-bottom: 24rpx;
      }
    }

    &-album {
      &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .header-title {
          font-size: 36rpx;
          font-weight: 300;
        }
        .header-create {
          font-size: 28rpx;
          padding: 8rpx 16rpx;
          color: #ba2636;
          border-radius: 12rpx;
          border: 0.66rpx solid #ba2636;
        }
      }
    }
  }
}
</style>
