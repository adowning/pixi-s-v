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
const smallest = computed(() => stateConfig.betAmountOptions[0]);
const disabled = $derived(
  !context.stateXstateDerived.isIdle() || stateBet.betAmount === smallest.value,
);

const onpress = () => {
  context.eventEmitter.broadcast({ type: "soundPressGeneral" });

  const nextSmaller = [...stateConfig.betAmountOptions]
    .sort((a, b) => b - a)
    .find((option) => option < stateBet.betAmount);

  stateBetDerived.setBetAmount(nextSmaller || smallest);
};
</script>

<template>
  <UiButton
    v-bind="props"
    :sizes="sizes"
    :onpress="onpress"
    :disabled="disabled"
    icon="decrease"
  />
</template>
