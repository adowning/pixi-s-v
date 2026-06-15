<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, useSlots } from "vue";

interface Props {
  maxWidth: "100%" | "500px";
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="ui-popup-standard-content-wrap"
    :style="{ '--maxWidth': props.maxWidth, '--zIndex': 100 }"
  >
    <slot />
  </div>
</template>

<style lang="scss">
.ui-popup-standard-content-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: var(--zIndex);
  max-width: var(--maxWidth);
  gap: 1rem;
}
</style>
