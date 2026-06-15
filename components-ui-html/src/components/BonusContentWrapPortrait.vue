<script setup lang="ts">
import { ref, computed } from "vue";
import { getContextLayout } from "utils-layout";
import { type ContentRect, resizeObserver } from "utils-resize-observer";

import BaseContent from "./BaseContent.vue";
import BaseScrollable from "./BaseScrollable.vue";

interface Props {
  maxListLength: number;
}
const props = defineProps<Props>();
const { stateLayoutDerived } = getContextLayout();
const contentRect = ref({
  width: 0,
  height: 0,
  left: 0,
  top: 0,
} as ContentRect);

const horizontalScale = computed(
  () =>
    stateLayoutDerived.canvasSizes().width / (240 * (props.maxListLength || 1)),
);
const verticalScale = computed(
  () =>
    (stateLayoutDerived.canvasSizes().height - 250) /
    (contentRect.value?.height || 1),
);
const scale = computed(() =>
  Math.min(verticalScale.value, horizontalScale.value),
);
const scaled = computed(() => scale.value < 1);
</script>

<template>
  <BaseContent maxWidth="100%">
    <div class="wrap" :class="{ scaled: scaled }">
      <div
        v-resize-observer="(value) => (contentRect = value)"
        class="bonuses"
        :style="`transform: scale(${Math.min(scale, 1)})`"
      >
        <BaseScrollable type="row" noScroll>
          <slot name="bonusCardsActivate" />
        </BaseScrollable>

        <BaseScrollable type="row" noScroll>
          <slot name="bonusCardsBuy" />
        </BaseScrollable>
      </div>

      <template v-if="!scaled">
        <div>
          <slot name="betAmount" />
        </div>
      </template>
    </div>

    <template v-if="scaled">
      <div class="badge-amount-wrap-scaled">
        <slot name="betAmount" />
      </div>
    </template>
  </BaseContent>
</template>

<style lang="scss">
.wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, calc(-50%));

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  &.scaled {
    transform: translate(-50%, calc(-50% - 4rem));
  }
}

.bonuses {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  transform-origin: center center;
}

.badge-amount-wrap-scaled {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -20%);
}
</style>
