<template>
  <div class="result relative">
    <div class="result-main">
      <image class="result-main-img" src="@/static/register/success.svg" mode="widthFix" />
      <div class="result-main-title">提交成功</div>
      <div class="result-main-subtitle">
        <span>您已提交成功，工作人员将在1个工作日内</span>
        <span>完成审核,请耐心等待！</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.result {
  width: 100vw;
  height: 100vh;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  &-main {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 216rpx;
    width: 100vw;
    box-sizing: border-box;
    padding: 0 64rpx;
    height: 560rpx;

    &-title {
      margin-top: 64rpx;
      margin-bottom: 64rpx;
      font-size: 48rpx;
    }

    &-subtitle {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 600rpx;
      opacity: 0.5;
    }
  }
}
</style>