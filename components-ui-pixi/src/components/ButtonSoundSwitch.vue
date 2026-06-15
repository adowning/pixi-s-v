<script setup lang="ts">
import UiButton from "./UiButton.vue";

import type { ButtonProps } from "components-pixi";
import { stateSound } from "state-shared";
import { UI_BASE_SIZE } from "../constants";
import { getContext } from "../context";
import { computed } from "vue";

const props: Partial<Omit<ButtonProps, "children">> = defineProps<any>();
const context = getContext();
const sizes = { width: UI_BASE_SIZE * 1.3, height: UI_BASE_SIZE * 1.3 };

const onpress = () => {
  context.eventEmitter.broadcast({ type: "soundPressGeneral" });

  if (stateSound.volumeValueMaster === 0) {
    stateSound.volumeValueMaster = 50;
  } else {
    stateSound.volumeValueMaster = 0;
  }
};

const icon = computed(() =>
  stateSound.volumeValueMaster === 0
    ? ("soundOff" as const)
    : ("soundOn" as const),
);
</script>

<template>
  <UiButton
    v-bind="props"
    :sizes="sizes"
    :onpress="onpress"
    :icon="icon"
    variant="light"
  />
</template>
