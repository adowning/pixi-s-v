<script setup lang="ts">
import UiLabel from "./UiLabel.vue";

import { stateUi } from "state-shared";
import { i18nDerived } from "../i18n/i18nDerived";
import { computed } from "vue";

type Props = {
  stacked?: boolean;
};

const props = defineProps<any>();
// destructured props are read-only in vue or need toRef/toRefs, using props.* instead below if possible
const label = computed(() => i18nDerived.freeSpins());
const value = computed(
  () => `${stateUi.freeSpinCounterCurrent} / ${stateUi.freeSpinCounterTotal}`,
);
</script>

<template>
  <UiLabel tiled :label="label" :value="value" :stacked="props.stacked" />
</template>
