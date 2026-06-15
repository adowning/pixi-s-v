<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, useSlots } from "vue";

interface Props {}

const props = defineProps<Props>();
</script>

<template>
  <div class="bonus-card-wrap">
    <div class="info">
      <slot name="title" />
      <slot name="description" />
      <slot name="price" />
    </div>
    <slot name="button" />
  </div>
</template>

<style lang="scss">
.bonus-card-wrap {
  padding: 0.5rem;
  flex-direction: column;
  display: flex;
  justify-content: space-between;

  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
  text-align: left;
  min-width: 155px;
  max-width: 180px;
  gap: 0.5rem;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
</style>
