<template>
  <div class="device">
    <main class="device-main">
      <div class="device-main-my">
        <div class="device-main-my-header">我的设备</div>
        <div class="device-main-my-main">
          <div class="item">
            <div class="title">相机</div>
            <div class="content">如索尼A7m4</div>
          </div>
          <div class="item">
            <div class="title">变焦镜头</div>
            <div class="content">如索尼A7m4</div>
          </div>
          <div class="item">
            <div class="title">定焦镜头</div>
            <div class="content">如索尼A7m4</div>
          </div>
          <div class="item">
            <div class="title">闪光灯</div>
            <div class="content">如索尼A7m4</div>
          </div>
          <div class="item no-margin">
            <div class="title">道具</div>
            <div class="content">如索尼A7m4</div>
          </div>
        </div>
      </div>
      <div class="device-main-device">
        <div class="device-main-device-header">上传设备图片</div>
        <div class="device-main-device-main">
          <Photo />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Photo from './Photo.vue'
</script>

<style lang="scss" scoped>
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
        font-weight: 200;
        margin-bottom: 32rpx;
      }

      &-main {
        background-color: #fff;
        border-radius: 24rpx;
        padding: 48rpx 32rpx;

        .item {
          font-weight: 200;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 48rpx;
        }

        .content {
          font-size: 24rpx;
          color: rgba(40, 40, 40, 0.30);
        }
      }
    }

    &-device {
      &-header {
        font-size: 32rpx;
        font-weight: 200;
        margin-bottom: 32rpx;
      }

      &-main {
        background-color: #fff;
        border-radius: 24rpx;
        padding: 48rpx 32rpx;
      }
    }
  }
}

.no-margin {
  margin-bottom: 0rpx !important;
}
</style>