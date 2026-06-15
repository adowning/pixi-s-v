<script setup lang="ts">
import UiLabel from "./UiLabel.vue";
import { Container } from "vue3-pixi";

import { stateBetDerived, stateModal } from "state-shared";
import { numberToCurrencyString } from "utils-shared/amount";
import { getContext } from "../context";
import { i18nDerived } from "../i18n/i18nDerived";
import { computed } from "vue";

type Props = {
  stacked?: boolean;
};

const props = defineProps<any>();
// destructured props are read-only in vue or need toRef/toRefs, using props.* instead below if possible
const context = getContext();
const label = computed(
  () =>
    stateBetDerived.activeBetMode()?.text.betAmountLabel || i18nDerived.bet(),
);
const value = computed(() => numberToCurrencyString(stateBetDerived.betCost()));
const disabled = computed(() => !context.stateXstateDerived.isIdle());

const onpress = () => {
  if (disabled.value) return;
  context.eventEmitter.broadcast({ type: "soundPressGeneral" });
  stateModal.modal = { name: "betAmountMenu" };
};
</script>

<template>
  <Container
    event-mode="static"
    :cursor="disabled ? 'not-allowed' : 'pointer'"
    :onpointerup="onpress"
  >
    <UiLabel tiled :label="label" :value="value" :stacked="props.stacked" />
  </Container>
</template>
