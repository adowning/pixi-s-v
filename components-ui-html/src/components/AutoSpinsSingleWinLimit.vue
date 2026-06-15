<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, useSlots } from "vue";
import { stateUi, SINGLE_WIN_LIMIT_TEXT_OPTIONS } from "state-shared";
import { OptionsGrid } from "components-shared";

import BaseIcon from "./BaseIcon.vue";
import BaseButtonContent from "./BaseButtonContent.vue";
import { i18nDerived } from "../i18n/i18nDerived";
</script>

<template>
  <span class="title">{{ i18nDerived.singleWinLimit() }}</span>

  <OptionsGrid
    miniSize
    :value="stateUi.autoSpinsSingleWinLimitText"
    :options="SINGLE_WIN_LIMIT_TEXT_OPTIONS"
    @change="(value) => (stateUi.autoSpinsSingleWinLimitText = value)"
  >
    <template #option="{ option }">
      <BaseIcon
        width="100%"
        height="2rem"
        :border="
          option === stateUi.autoSpinsSingleWinLimitText
            ? '2px white solid'
            : '2px black solid'
        "
      />
      <BaseButtonContent>
        <span
          style="font-size: 1rem"
          :class="{ infinity: option === '∞' }"
          class="option-wrap"
          data-test="single-win-limit-options"
        >
          {{ option }}
        </span>
      </BaseButtonContent>
    </template>
  </OptionsGrid>
</template>

<style lang="scss">
.title {
  line-height: 2rem;
}

.option-wrap {
  white-space: nowrap;
}

.infinity {
  font-size: 1.5rem;
  line-height: 1rem;
  margin-top: 0.3rem;
  vertical-align: middle;
}
</style>
