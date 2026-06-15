<script setup lang="ts">
import { stateUi } from "state-shared";
import { computed } from "vue";

type Props = {
  gameName: any;
  logo: any;
};

const props = defineProps<any>();
// destructured props are read-only in vue or need toRef/toRefs, using * instead below if possible

const UI_COMPONENT_MAP = {
  default: UIDefault,
  replay: UIReplay,
};

const UIComponent = computed(() => UI_COMPONENT_MAP[stateUi.config.mode]);
</script>

<template>
  <UIComponent>
    <template #gameName="">
      <slot name="gameName" />
    </template>

    <template #logo="">
      <slot name="logo" />
    </template>
  </UIComponent>
</template>
