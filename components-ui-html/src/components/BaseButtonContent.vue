<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, useSlots } from "vue";

interface Props {}

const props = defineProps<Props>();
</script>

<template>
  <div class="base-button-content">
    <slot />
  </div>
</template>

<style lang="scss">
.base-button-content {
  position: absolute;
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
