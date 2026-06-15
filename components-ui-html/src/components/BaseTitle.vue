<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, useSlots } from "vue";

interface Props {}

const props = defineProps<Props>();
</script>

<template>
  <div class="ui-modal-title-wrap">
    <slot />
  </div>
</template>

<style lang="scss">
.ui-modal-title-wrap {
  text-align: center;
}
</style>
