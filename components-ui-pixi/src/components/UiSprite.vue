<script setup lang="ts">
import type { RectangleProps } from "vue3-pixi";
import type { sharedAssetsPixi } from "constants-shared/assets";
import { Rectangle } from "vue3-pixi";

export type Props = RectangleProps & {
  spriteKey?: keyof typeof sharedAssetsPixi;
  backgroundColor?: number;
  borderWidth?: number;
  borderColor?: number;
};

const props = defineProps<Props>();
</script>

<template>
  <Rectangle :border-radius="50" v-bind="props" />
</template>
