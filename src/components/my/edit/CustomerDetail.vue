<template>
  <div class="detail">
    <div class="detail-blank"></div>
    <image :src="imageUrl" mode="widthFix" class="detail-image"  />
  </div>
</template>

<script setup lang="ts">
import { netConfig } from '@/config/net.config';
import { ref } from 'vue';

const imageUrl = ref('');

onLoad((options: any) => {
  const { typeId } = options;
  imageUrl.value = `${netConfig.picURL}/client/static/question/${typeId}.jpg`;
});
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #ba2636;
  &-blank {
    width: 100vw;
    height: 10vh;
  }

  &-image {
    width: 100vw;
  }
}
</style>