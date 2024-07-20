<template>
  <div class="date-picker">
    <div class="selected-date" @click="showCalendar = !showCalendar">
      {{ formatDate(modelValue, "YYYY-MM-DD") }}
    </div>
    <up-datetime-picker
      :show="showCalendar"
      confirmColor="#ba2636"
      @confirm="confirmDate"
      v-model="internalValue"
      :min-date="-631180800000"
      mode="date"
    ></up-datetime-picker>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '@/utils/tools'
const props = defineProps<{
  modelValue: number;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const showCalendar = ref(false);
const internalValue = ref(props.modelValue);

const confirmDate = (e: any) => {
  showCalendar.value = false;
  internalValue.value = e.value;
  emits('update:modelValue', e.value);
};

watch(() => props.modelValue, (newVal) => {
  internalValue.value = newVal;
});


</script>

<style scoped>

</style>
