<script setup lang="ts">
import ButtonBetAutoSpinsCounter from "./ButtonBetAutoSpinsCounter.vue";
import { Container } from "vue3-pixi";
import UiButton from "./UiButton.vue";

import type { ButtonProps } from "components-pixi";
import { stateBet, stateBetDerived, stateModal } from "state-shared";
import { getContext } from "../context";
import { UI_BASE_SIZE } from "../constants";
import { computed } from "vue";

const props: Partial<Omit<ButtonProps, "children">> = defineProps<any>();
const context = getContext();
const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };
const active = computed(() => stateBetDerived.hasAutoBetCounter());
const disabled = computed(() => {
  if (stateBet.isSpaceHold) return true;
  if (
    !context.stateXstateDerived.isIdle() &&
    !stateBetDerived.hasAutoBetCounter()
  )
    return true;
  if (!stateBetDerived.isBetCostAvailable()) return true;
  return false;
});

const stopAutoSpin = () => (stateBet.autoSpinsCounter = 0);
const openModal = () => (stateModal.modal = { name: "autoSpin" });
const onpress = () => {
  context.eventEmitter.broadcast({ type: "soundPressGeneral" });
  stateBetDerived.hasAutoBetCounter() ? stopAutoSpin() : openModal();
};
</script>

<template>
  <UiButton
    v-bind="props"
    :sizes="sizes"
    :active="active"
    :onpress="onpress"
    :disabled="disabled"
    icon="autoSpin"
  >
    <Container :x="sizes.width * 0.5" :y="sizes.height * 0.5">
      <ButtonBetAutoSpinsCounter />
    </Container>
  </UiButton>
</template>
