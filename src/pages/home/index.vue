<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/pinia/counter';
const count = ref(18)
const counterStore = useCounterStore();
setTimeout(() => {
  count.value = 30
}, 1000);
const doubleCount = counterStore.doubleCount;
const increment = counterStore.increment;
const decrement = counterStore.decrement;
const reset = counterStore.reset;
</script>
