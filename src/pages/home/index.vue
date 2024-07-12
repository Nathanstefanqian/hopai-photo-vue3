<template>
<div class="bg-[blue]">
  <button @click="sendSms">发送</button>
</div>
</template>

<script setup lang="ts">
import { sendSms } from '@/api/home'
import { ref } from 'vue'
const title = ref('Hello world!')
</script>

<style>

</style>