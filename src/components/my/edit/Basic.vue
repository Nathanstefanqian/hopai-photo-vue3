<template>
  <div class="basic w-100vw ">
    <div class="basic-card">
      <div class="basic-card-item">
        <span class="basic-card-item-title">头像</span>
        <image class="basic-card-item-image" src="/static/my/avatar.jpg" ></image>
      </div>
      <div class="basic-card-item">
        <span class="basic-card-item-title">昵称</span>
        <span class="content">请填写</span>
      </div>
      <div class="basic-card-item">
        <span class="basic-card-item-title">性别</span>
        <span class="content">请填写</span>
      </div>
      <div class="basic-card-item">
        <span class="basic-card-item-title">电话</span>
        <span class="content">请填写</span>
      </div>
      <div class="basic-card-item">
        <span class="basic-card-item-title">邮箱</span>
        <span class="content">请填写</span>
      </div>
      <div class="basic-card-item">
        <span class="basic-card-item-title">常驻地</span>
        <span class="content">请填写</span>
      </div>
      <div class="basic-card-item">
        <span class="basic-card-item-title">小红书号</span>
        <span class="content">请填写</span>
      </div>
      <div class="basic-card-item no-border">
        <span class="basic-card-item-title">抖音号</span>
        <span class="content">请填写</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.basic {
  background-color: #f6f6f6;
  padding: 32rpx;
  box-sizing: border-box;
  min-height: 100vh;
  &-card {
    box-sizing: border-box;
    width: 100%;
    // min-height: 1100rpx; /* 可选：限制卡片的最大宽度 */
    background-color: #fff;
    padding: 32rpx;
    border-radius: 24rpx;
    
    &-item {
      display: flex;
      justify-content: space-between;
      padding: 40rpx 0;
      border-bottom: 0.3rpx solid rgba(0,0,0,0.1);
      align-items: center;
      .content {
        font-size: 28rpx;
        color: rgba(40, 40, 40, 0.55);
        margin-right: 10rpx;
      }

      &-title {
        font-weight: 200;
      }

      &-image {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
      }
    }
  }
}
.no-border {
  border: 0;
}
</style>