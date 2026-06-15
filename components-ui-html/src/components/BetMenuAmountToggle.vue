<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, useSlots } from "vue";
import { stateBet, stateConfig } from "state-shared";
import { Button, OptionsToggle } from "components-shared";
import { getContextEventEmitter } from "utils-event-emitter";
import { numberToCurrencyString } from "utils-shared/amount";

import BaseIcon from "./BaseIcon.vue";
import BaseButtonContent from "./BaseButtonContent.vue";
import type { EmitterEventModal } from "../types";

const { eventEmitter } = getContextEventEmitter<EmitterEventModal>();

const iconSize = "2.5rem";
</script>

<template>
  <OptionsToggle
    :value="stateBet.betAmount"
    :options="stateConfig.betAmountOptions"
    @change="(value) => {
		stateBet.betAmount = value;
		eventEmitter.broadcast({ type: 'soundPressGeneral' });
    }"
  >
    <template #children="{ disabledDown, disabledUp, toggleDown, toggleUp }">
      <div class="toggle-wrap">
        <Button
          data-test="down-button"
          :disabled="disabledDown"
          @click="toggleDown"
        >
          <BaseIcon :width="iconSize" :height="iconSize" />
          <BaseButtonContent>
            <span style="font-size: 2rem">-</span>
          </BaseButtonContent>
        </Button>

        <span class="amount">{{
          numberToCurrencyString(stateBet.betAmount)
        }}</span>

        <Button data-test="up-button" :disabled="disabledUp" @click="toggleUp">
          <BaseIcon :width="iconSize" :height="iconSize" />
          <BaseButtonContent>
            <span style="font-size: 2rem">+</span>
          </BaseButtonContent>
        </Button>
      </div>
    </template>
  </OptionsToggle>
</template>

<style lang="scss">
.toggle-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}
</style>
