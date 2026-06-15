<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, useSlots } from "vue";

interface Props {
  type: "full-width" | "max-width";
}

const props = defineProps<Props>();
</script>

<template>
  <div class="ui-modal-button-wrap">
    <div :class="props.type">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.ui-modal-button-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
}

.full-width {
  width: 100%;
}

.max-width {
  width: 100%;
  max-width: 250px;
}
</style>
