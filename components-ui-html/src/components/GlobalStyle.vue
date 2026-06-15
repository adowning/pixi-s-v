<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, useSlots } from "vue";

import "./global.scss";

interface Props {}

const props = defineProps<Props>();
</script>

<template>
  <slot />
</template>
