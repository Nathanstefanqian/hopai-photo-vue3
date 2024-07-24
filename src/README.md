```vue
<template>
  <view>
    <image v-if="avatar" class="avatar" :src="avatar" />
    <button v-else @click="chooseAvatar">选择图片</button>
    <img-crop 
        v-if="chooseAvatarUrl"
        :url="chooseAvatarUrl"
        :width="200"
        :height="200"
        @cancel="chooseAvatarUrl = ''"
        @success="updateAvatar"
    />
  </view>
</template>

<script lang="ts" setup>
import ImgCrop from '@/components/img-crop/img-crop.vue';
import { ref } from 'vue';

const avatar = ref('');
const chooseAvatarUrl = ref('');

async function chooseAvatar() {
  // #ifdef MP-WEIXIN
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success({ tempFiles }) {
      chooseAvatarUrl.value = tempFiles[0].tempFilePath;
    },
  });
  // #endif
  // #ifndef MP-WEIXIN
  const { tempFilePaths } = await uni.chooseImage({ count: 1 });
  chooseAvatarUrl.value = tempFilePaths[0];
  // #endif
}

async function updateAvatar(filePath: string) {
  chooseAvatarUrl.value = '';

  const { data } = await uni.uploadFile({
    url: `${import.meta.env.VITE_BASE_URL}/api/resources/upload`,
    header: {
      Authorization: `Bearer Token`,
    },
    formData: { type: 'avatar' },
    name: 'file',
    filePath,
  });

  const res = JSON.parse(data);

  avatar.value = res.data.url;
}
</script>
```