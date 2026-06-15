<script setup lang="ts">
import { Text } from "vue3-pixi";

import { WHITE } from "constants-shared/colors";
import { computed, ref, watchEffect } from "vue";

type Props = {
  name: string;
};

const props = defineProps<any>();
// destructured props are read-only in vue or need toRef/toRefs, using props.* instead below if possible
const reactiveDate = new Date();
const clock = $derived(
  reactiveDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }),
);
const textProps = {
  style: {
    fontFamily: "proxima-nova",
    fontSize: REM * 1.5,
    fontWeight: "600",
    lineHeight: REM * 2,
    fill: WHITE,
  },
} as const;

const clockSizes = ref({ width: 0, height: 0 });

watchEffect(() => {
  const interval = setInterval(() => {
    reactiveDate.setTime(Date.now());
  }, 1000);

  return () => {
    clearInterval(interval);
  };
});
</script>

<template>
  <Text
    :text="clock"
    :onresize="(value) => (clockSizes = value)"
    v-bind="textProps"
  />
  <Text :text="props.name" :x="clockSizes.width + 5" v-bind="textProps" />
</template>
