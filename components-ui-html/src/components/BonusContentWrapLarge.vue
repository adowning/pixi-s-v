<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, useSlots } from "vue";

import BaseContent from "./BaseContent.vue";
import BaseScrollable from "./BaseScrollable.vue";

interface Props {}

const props = defineProps<Props>();
</script>

<template>
  <BaseContent maxWidth="100%">
    <slot name="betAmount" />

    <BaseScrollable type="column">
      <div class="bonuses-wrap">
        <slot name="bonusCardsActivate" />
        <slot name="bonusCardsBuy" />
      </div>
    </BaseScrollable>
  </BaseContent>
</template>

<style lang="scss">
.bonuses-wrap {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
