<template>
  <scroll-view class="home-main-tab-scrollview" scroll-x="true" :class="{'fixed': props.isFixed }">
    <div class="home-main-tab">
      <div class="home-main-tab-item" v-for="item, index in ['待确认', '待拍摄', '进行中','已完成','退款售后']" 
           @click="handleClick(index)" :key="index">
        <span class="mb-[10rpx]">{{ item }}</span>
        <div class="svg-icon" v-if="active === index" />
      </div>
    </div>
  </scroll-view>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: number; isFixed: boolean }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>();

const active = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  active.value = newVal;
});

const handleClick = (index: number) => {
  active.value = index;
  emit('update:modelValue', index);
};
</script>

<style lang="scss" scoped>
.fixed {
  position: fixed;
  z-index: 111;
  top: 0rpx;
  left: 0rpx;
  width: calc(100vw - 64rpx) !important;
  padding-top: 116rpx !important;
  backdrop-filter: blur(30px); /* 背景模糊 */
  transition: all ease 0.5s;
  padding: 0 32rpx;
}

.home-main-tab-scrollview {
  width: 100%;
  white-space: nowrap;
}
.home-main-tab {
  display: flex;
  flex-direction: row;
  color: rgba(40, 40, 40, 0.80);
  font-size: 32rpx;
  padding: 32rpx 0;
  font-weight: 400;
   
  &-item {
    display: flex;
    height: 60rpx;
    flex-direction: column;
    padding: 22rpx 16rpx;
    padding-bottom: 0;
    margin-right: 24rpx;
    align-items: center;
    .svg-icon {
      height: 4rpx;
      width: 70rpx;
      background-color: #ba2636;
    }
  }
}
</style>
