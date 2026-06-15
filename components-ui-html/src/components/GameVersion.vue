<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, useSlots } from "vue";
import { PUBLIC_SITE_MODE } from "envs";

interface Props {
  version: string; // "major.feature.patch"
}

const props = defineProps<Props>();
</script>

<template>
  {{ PUBLIC_SITE_MODE }}
  {{ props.version }}
</template>
