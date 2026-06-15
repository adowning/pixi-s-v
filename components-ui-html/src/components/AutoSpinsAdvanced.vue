<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, useSlots } from "vue";
import { stateBetDerived } from "state-shared";
import { DropdownToggle } from "components-shared";
import { slide } from "svelte/transition";
import { getContextEventEmitter } from "utils-event-emitter";

import AutoSpinsLossLimit from "./AutoSpinsLossLimit.vue";
import AutoSpinsSingleWinLimit from "./AutoSpinsSingleWinLimit.vue";
import type { EmitterEventModal } from "../types";
import { i18nDerived } from "../i18n/i18nDerived";

interface Props {
  ontoggle: (duration: number) => void;
}

const props = defineProps<Props>();
const { eventEmitter } = getContextEventEmitter<EmitterEventModal>();
const SLIDE_DURATION = 100;

const open = ref(false);

watchEffect(() => {
  if (open.value) props.ontoggle(SLIDE_DURATION);
});
</script>

<template>
  <DropdownToggle
    :open="open"
    :disabled="stateBetDerived.activeBetMode().type === 'activate'"
    @change="
      (value) => {
        open = value;
        eventEmitter.broadcast({ type: 'soundPressGeneral' });
      }
    "
  >
    <span>{{ i18nDerived.advanced() }}</span>
  </DropdownToggle>

  <template v-if="open">
    <div style="border: 2px solid white; border-radius: 10px">
      <AutoSpinsLossLimit />
      <AutoSpinsSingleWinLimit />
    </div>
  </template>
</template>
