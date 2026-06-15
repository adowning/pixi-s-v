<script setup lang="ts">
import { ref, watchEffect, onUnmounted } from "vue";

type Props = {
  onpressSingle: () => void;
  onpressDouble: () => void;
};

const props = defineProps<any>();

const DOUBLE_PRESS_TIMEOUT = 150;

const pressingTimes = ref(0);
let timeout: number = 0;

const increasePressTimes = () => {
  pressingTimes.value++;
};

const clearPressTimes = () => {
  pressingTimes.value = 0;
};

const onpress = async () => {
  clearTimeout(timeout as number);
  props.onpressSingle();
  increasePressTimes();
  timeout = setTimeout(clearPressTimes, DOUBLE_PRESS_TIMEOUT);
};

watchEffect(() => {
  if (pressingTimes.value >= 2) {
    props.onpressDouble();
    clearPressTimes();
    clearTimeout(timeout as number);
  }
});

onUnmounted(() => {
  clearTimeout(timeout as number);
});
</script>

<template>
  <slot name="children" v-bind="{ onpress }" />
</template>
