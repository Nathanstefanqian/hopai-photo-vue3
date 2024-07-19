<template>
  <div class="money">
    <div class="money-main">
      <div class="money-main-personal">
        <div class="money-main-personal-header">个人信息</div>
        <div class="money-main-personal-main">
          <div class="money-main-personal-main-item">
            <div class="title">银行卡号</div>
            <div class="desc">请填写</div>
          </div>
          <div class="money-main-personal-main-item">
            <div class="title">开户行</div>
            <div class="desc">请填写</div>
          </div>
          <div class="money-main-personal-main-item">
            <div class="title">持卡人</div>
            <div class="desc">请填写</div>
          </div>
        </div>
      </div>
      <div class="money-main-upload">
          <div class="money-main-upload-header">上传身份证</div>
          <div class="money-main-upload-main">
            <image class="photo" src="/static/my/uploadfront.svg"></image>
            <image class="photo" src="/static/my/uploadback.svg"></image>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.money {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background-color: #f6f6f6;
  padding: 32rpx;

  &-main {
    display: flex;
    flex-direction: column;

    &-personal {
      margin-bottom: 64rpx;

      &-header {
        font-weight: 200;
        margin-bottom: 16rpx;
      }

      &-main {
        display: flex;
        flex-direction: column;
        padding: 32rpx;
        padding-bottom: 0;
        background-color: #fff;
        border-radius: 24rpx;
        &-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 48rpx;
          .title {
            font-weight: 200;
          }

          .desc {
            color: rgba(40, 40, 40, 0.30);
            font-size: 28rpx;
          }
        }
      }
    }

    &-upload {
      &-header {
        font-weight: 200;
        margin-bottom: 16rpx;
      }

      &-main {
        display: flex;
        justify-content: space-between;
        padding: 32rpx;
        border-radius: 24rpx;
        background-color: #fff;

        .photo {
          width: 300rpx;
          height: 268rpx;
        }
      }
    }
  }
}
</style>