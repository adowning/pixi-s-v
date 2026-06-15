<script setup lang="ts">
import UiButton from "./UiButton.vue";

import type { ButtonProps } from "components-pixi";
import { stateBet, stateBetDerived, stateConfig } from "state-shared";
import { getContext } from "../context";
import { UI_BASE_SIZE } from "../constants";
import { computed } from "vue";

const props: Partial<Omit<ButtonProps, "children">> = defineProps<any>();
const context = getContext();
const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };
const biggest = computed(
  () => stateConfig.betAmountOptions[stateConfig.betAmountOptions.length - 1],
);
const disabled = computed(
  () =>
    !context.stateXstateDerived.isIdle() ||
    stateBet.betAmount === biggest.value,
);

const onpress = () => {
  context.eventEmitter.broadcast({ type: "soundPressGeneral" });

  const nextBigger = [...stateConfig.betAmountOptions]
    .sort((a, b) => a - b)
    .find((option) => option > stateBet.betAmount);

  stateBetDerived.setBetAmount(nextBigger || biggest);
};
</script>

<template>
  <UiButton
    v-bind="props"
    :sizes="sizes"
    :onpress="onpress"
    :disabled="disabled"
    icon="increase"
  />
</template>
