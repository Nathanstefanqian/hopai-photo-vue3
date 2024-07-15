<template>
  <div class="home-header absolute">
    <div class="home-header-title">拍摄任务</div>
    <div class="home-header-other">
      <div class="desc">
        <span>HI，钱老师，本周您 6 次拍摄任务</span>
        <span>其中待确认 1 个</span>
      </div>
      <div class="scan">
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.home-header {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 100rpx);
  top: 220rpx;
  left: 50rpx;
  
  &-title {
    font-size: 64rpx;
    color: #F8F6E7;
    font-weight: 400;
    margin-bottom: 50rpx;
  }

  &-other {
    display: flex;
    justify-content: space-between;

    .desc {
      display: flex;
      flex-direction: column;
      font-size: 28rpx;
      color: #F8F6E7;
    }

    .scan {
      border-radius: 50%;
      width: 96rpx;
      height: 96rpx;
      background-color: rgba(255,255,255,0.85);
      background-image: url('@/static/home/home-scan.svg');
      background-repeat: no-repeat;
      background-size: 48rpx;
      background-position: center;
    }
  }
}
</style>