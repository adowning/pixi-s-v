<script setup lang="ts">
import { ref, computed } from "vue";
import { getContextLayout } from 'utils-layout';
import { type ContentRect, resizeObserver } from 'utils-resize-observer';

import BaseContent from './BaseContent.vue';
import BaseScrollable from './BaseScrollable.vue';

interface Props {
    maxListLength: number;
}

const props = defineProps<Props>();
const { stateLayoutDerived } = getContextLayout();

const contentRectContainer = ref({ width: 0, height: 0, left: 0, top: 0 } as ContentRect);
const contentRectScrollable = ref({ width: 0, height: 0, left: 0, top: 0 } as ContentRect);

const scaleContainer = computed(() => stateLayoutDerived.canvasSizes().height / (contentRectContainer.value?.height + 150 || 1));
const styleContainer = computed(() => scaleContainer.value < 1 ? `transform: scale(${scaleContainer.value})` : '');

const scaleScrollable = computed(() => stateLayoutDerived.canvasSizes().width / (contentRectScrollable.value?.width + 20 || 1));
const styleScrollable = computed(() => scaleScrollable.value < 1 ? `transform: scale(${scaleScrollable.value})` : '');
</script>

<template>
  <BaseContent maxWidth="100%">
    <div
      v-resize-observer="(value) => (contentRectContainer = value)"
      class="bonuses-wrap"
    >
      <div class="bonuses" :style="`transform: scale(${Math.min(styleContainer)})`">
        <BaseScrollable type="row" noScroll>
          <slot name="bonusCardsActivate" />
        </BaseScrollable>

        <BaseScrollable type="row" noScroll>
          <slot name="bonusCardsBuy" />
        </BaseScrollable>
      </div>
    </div>

    <div class="badge-amount-wrap">
      <slot name="betAmount" />
    </div>
  </BaseContent>
</template>

<style lang="scss">
.bonuses-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(calc(-50% - 7rem), -50%);
}

.bonuses {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  transform-origin: center center;
}

.badge-amount-wrap {
  position: fixed;
  top: calc(50% + 1.2rem);
  right: 1rem;
  transform: translateY(-50%);
}
</style>
