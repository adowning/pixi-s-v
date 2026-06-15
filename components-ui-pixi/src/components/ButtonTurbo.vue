<script setup lang="ts">
import UiButton from "./UiButton.vue";

import type { ButtonProps } from "components-pixi";
import { stateBet, stateBetDerived } from "state-shared";
import { UI_BASE_SIZE } from "../constants";
import { getContext } from "../context";
import { computed } from "vue";

const props: Partial<Omit<ButtonProps, "children">> = defineProps<any>();
const context = getContext();
const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };
const active = computed(() => stateBet.isTurbo);
const disabled = computed(() => stateBet.isSpaceHold);

const onpress = () => {
  context.eventEmitter.broadcast({ type: "soundPressGeneral" });
  stateBetDerived.updateIsTurbo(!stateBet.isTurbo, { persistent: true });
};

context.eventEmitter.subscribeOnMount({
  stopButtonClick: () =>
    stateBetDerived.updateIsTurbo(true, { persistent: false }),
  stopButtonEnable: () =>
    stateBetDerived.updateIsTurbo(false, { persistent: false }),
});
</script>

<template>
  <UiButton
    v-bind="props"
    :sizes="sizes"
    :active="active"
    :onpress="onpress"
    :disabled="disabled"
    icon="turbo"
  />
</template>
