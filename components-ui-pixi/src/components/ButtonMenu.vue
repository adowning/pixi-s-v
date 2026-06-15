<script setup lang="ts">
import UiButton from "./UiButton.vue";

import type { ButtonProps } from "components-pixi";
import { stateUi } from "state-shared";
import { UI_BASE_SIZE } from "../constants";
import { getContext } from "../context";

const props: Partial<Omit<ButtonProps, "children">> = defineProps<any>();
const context = getContext();
const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };

const onpress = () => {
  context.eventEmitter.broadcast({ type: "soundPressGeneral" });
  stateUi.menuOpen = true;
};
</script>

<template>
  <UiButton v-bind="props" :sizes="sizes" :onpress="onpress" icon="menu" />
</template>
