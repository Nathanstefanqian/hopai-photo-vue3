<template>
  <div>
    <p>Count: {{ counterStore.count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/pinia/counter';
import { ref } from 'vue'
const counterStore = useCounterStore();

const count = ref(counterStore.count);
const doubleCount = counterStore.doubleCount;
const increment = counterStore.increment;
const decrement = counterStore.decrement;
const reset = counterStore.reset;
</script>
