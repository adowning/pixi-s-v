<script setup lang="ts">
import { computed } from "vue";
import { OptionsGrid } from "components-shared";
import { getContextLayout } from "utils-layout";
import { stateBet, stateBetDerived } from "state-shared";

import BaseButtonContent from "./BaseButtonContent.vue";
import BaseIcon from "./BaseIcon.vue";

const { stateLayoutDerived } = getContextLayout();

const list = computed(() =>
  stateLayoutDerived.layoutType() === "landscape"
    ? stateBetDerived.betAmountGrid()
    : [...stateBetDerived.betAmountGrid()].reverse(),
);
</script>

<template>
  <OptionsGrid
    :value="/* @ts-ignore */
stateBet.betAmount"
    {options}
    @change="(value) => (/* @ts-ignore */
stateBet.betAmount = value)"
  >
    <template #option="{ option }">
      <BaseIcon
        width="100%"
        height="2rem"
        :border="
          option === /* @ts-ignore */
stateBet.betAmount ? '2px white solid' : '2px black solid'
        "
      />
      <BaseButtonContent>
        <span style="font-size: 1rem">{{
          /* @ts-ignore */
isMaxValue(option) ? /* @ts-ignore */
i18nDerived.max() : /* @ts-ignore */
formatValue(option)
        }}</span>
      </BaseButtonContent>
    </template>
  </OptionsGrid>
</template>
