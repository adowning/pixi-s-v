<script setup lang="ts">
import { Button, type ButtonProps } from "components-pixi";
import type { ButtonIcon } from "../types";
import { i18nDerived } from "../i18n/i18nDerived";
import { UI_BASE_FONT_SIZE } from "../constants";
import UiSprite from "./UiSprite.vue";
import { Text } from "vue3-pixi";

type Props = Omit<ButtonProps, "children"> & {
  icon: ButtonIcon;
  sizes: { width: number; height: number };
  active?: boolean;
  children?: any;
  variant?: "dark" | "light";
};

const props = withDefaults(defineProps<Props>(), {
  variant: "dark",
  children: null,
  active: false,
});
</script>

<template>
  <Button v-bind="props">
    <template #children="{ center }">
      <UiSprite
        v-bind="center"
        :anchor="0.5"
        :width="props.sizes.width"
        :height="props.sizes.height"
        :background-color="
          props.disabled
            ? 0xaaaaaa
            : props.variant === 'dark'
              ? 0x000000
              : 0xffffff
        "
        :border-width="props.active ? 10 : 0"
        :border-color="props.variant === 'dark' ? 0xffffff : 0x000000"
      />

      <Text
        v-bind="center"
        :anchor="0.5"
        :text="i18nDerived[props.icon]()"
        :style="{
          align: 'center',
          wordWrap: true,
          wordWrapWidth: 200,
          fontFamily: 'proxima-nova',
          fontWeight: '600',
          fontSize: UI_BASE_FONT_SIZE * 0.9,
          fill: props.variant === 'dark' ? 0xffffff : 0x000000,
        }"
      />

      <slot name="children" />
    </template>
  </Button>
</template>
