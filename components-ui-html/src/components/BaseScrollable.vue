<script setup lang="ts">
import { ref } from "vue";
/* eslint-disable-next-line no-undef */
type Element = null | HTMLDivElement;

interface Props {
  type: "column" | "row";
  noScroll?: boolean;
}

const element = ref(null as Element);
const props = defineProps<Props>();
</script>

<template>
  <div
    ref="element"
    :class="['content', props.type, { scrollX: !props.noScroll && props.type === 'row', scrollY: !props.noScroll && props.type === 'column' }]"
  >
    <slot name="children" :data="{ element }" />
  </div>
</template>

<style lang="scss">
.content {
  position: relative;
  text-align: center;
  display: flex;
  gap: 1rem;

  &.column {
    flex-direction: column;
    align-items: center;
    max-height: 100%;
  }

  &.row {
    flex-direction: row;
    justify-content: center;
    max-width: 100%;
  }
}
</style>
