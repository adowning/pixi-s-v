<script setup lang="ts">
import UiLabel from "./UiLabel.vue";

import { stateBet } from "state-shared";
import { bookEventAmountToCurrencyString } from "utils-shared/amount";
import { i18nDerived } from "../i18n/i18nDerived";
import { computed, watchEffect, ref } from "vue";

type Props = {
  stacked?: boolean;
};

const props = defineProps<any>();
// destructured props are read-only in vue or need toRef/toRefs, using props.* instead below if possible
const winBookEventAmountTween = ref(
  stateBet.winBookEventAmount,
); /* TWEEN REQUIRES MANUAL MIGRATION TO VUE TRANSITION / GSAP */
const label = computed(() => i18nDerived.win());
const value = computed(() =>
  bookEventAmountToCurrencyString(winBookEventAmountTween.value),
);

watchEffect(() => {
  winBookEventAmountTween.value = stateBet.winBookEventAmount;
});
</script>

<template>
  <UiLabel tiled :label="label" :value="value" :stacked="props.stacked" />
</template>
