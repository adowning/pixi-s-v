<script setup lang="ts">
import { waitForResolve } from "utils-shared/wait";
import { FadeContainer } from "components-pixi";
import { getContext } from "../context";
import { ref } from "vue";

const context = getContext();

const show = ref(true);
const oncomplete = ref<((value?: unknown) => void) | undefined>();

context.eventEmitter.subscribeOnMount({
  uiShow: async () => {
    if (!show.value) {
      show.value = true;
      await waitForResolve((resolve: any) => (oncomplete.value = resolve));
    }
  },
  uiHide: async () => {
    if (show.value) {
      show.value = false;
      await waitForResolve((resolve: any) => (oncomplete.value = resolve));
    }
  },
});
</script>

<template>
  <FadeContainer persistent :show="show" :oncomplete="oncomplete">
    <slot name="children" />
  </FadeContainer>
</template>
