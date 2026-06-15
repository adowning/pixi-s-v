<script setup lang="ts">
import { Text } from "vue3-pixi";
import UiSprite from "./UiSprite.vue";

import { stateUi } from "state-shared";
import { Button, type ButtonProps } from "components-pixi";
import { UI_BASE_FONT_SIZE, UI_BASE_SIZE } from "../constants";
import { getContext } from "../context";
import { computed, ref } from "vue";

const props: Partial<Omit<ButtonProps, "children">> = defineProps<any>();
const context = getContext();
const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };

const degreesToRads = (degrees: number) => (degrees * Math.PI) / 180.0;

const DRAWER_ROTATION = {
  up: degreesToRads(-180),
  down: degreesToRads(0),
};

const rotationTween = ref(
  stateUi.drawerFold ? DRAWER_ROTATION.up : DRAWER_ROTATION.down,
);

let moving = ref(false);
const disabled = computed(() => props.disabled || moving);

const onpress = async () => {
  if (stateUi.drawerFold) {
    await context.eventEmitter.broadcastAsync({ type: "drawerUnfold" });
  } else {
    await context.eventEmitter.broadcastAsync({ type: "drawerFold" });
  }
};

context.eventEmitter.subscribeOnMount({
  drawerUnfold: async () => {
    if (stateUi.drawerFold) {
      moving.value = true;
      rotationTween.value = DRAWER_ROTATION.down;
      stateUi.drawerFold = false;
      moving.value = false;
    }
  },
  drawerFold: async () => {
    if (!stateUi.drawerFold) {
      moving.value = true;
      rotationTween.value = DRAWER_ROTATION.up;
      stateUi.drawerFold = true;
      moving.value = false;
    }
  },
});
</script>

<template>
  <Button
    v-bind="props"
    :sizes="sizes"
    :onpress="onpress"
    :disabled="disabled"
    :alpha="disabled ? 0.5 : 1"
  >
    <template #children="{ center }">
      <UiSprite
        sprite-key="base_mobile_drawer"
        v-bind="center"
        :anchor="0.5"
        :width="sizes.width"
        :height="sizes.height"
      />
      <Text
        v-bind="center"
        :anchor="0.5"
        text="↓"
        :style="{
          align: 'center',
          wordWrap: true,
          wordWrapWidth: 200,
          fontFamily: 'proxima-nova',
          fontWeight: '600',
          fontSize: UI_BASE_FONT_SIZE * 0.9,
          fill: 0xffffff,
        }"
        :rotation="rotationTween"
      />
    </template>
  </Button>
</template>
