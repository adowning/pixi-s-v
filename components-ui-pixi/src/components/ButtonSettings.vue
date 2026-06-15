<script setup lang="ts">
import UiButton from "./UiButton.vue";

import type { ButtonProps } from "components-pixi";
import { stateModal } from "state-shared";
import { UI_BASE_SIZE } from "../constants";
import { getContext } from "../context";

const props: Partial<Omit<ButtonProps, "children">> = defineProps<any>();
const context = getContext();
const sizes = { width: UI_BASE_SIZE * 1.3, height: UI_BASE_SIZE * 1.3 };

const onpress = () => {
  context.eventEmitter.broadcast({ type: "soundPressGeneral" });
  stateModal.modal = { name: "settings" };
};
</script>

<template>
  <UiButton
    v-bind="props"
    :sizes="sizes"
    :onpress="onpress"
    icon="settings"
    variant="light"
  />
</template>
