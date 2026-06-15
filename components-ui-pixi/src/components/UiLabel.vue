<script setup lang="ts">
import UiSprite from "./UiSprite.vue";

import { WHITE } from "constants-shared/colors";
import { UI_BASE_FONT_SIZE } from "../constants";

type Props = {
  label: string;
  value: string;
  tiled?: boolean;
  stacked?: boolean;
};

const props = defineProps<any>();
// destructured props are read-only in vue or need toRef/toRefs, using props.* instead below if possible

const labelStyle = {
  fontFamily: "proxima-nova",
  fontSize: UI_BASE_FONT_SIZE,
  fill: WHITE,
} as const;

const valueStyle = {
  fontFamily: "proxima-nova",
  fontSize: UI_BASE_FONT_SIZE,
  fill: WHITE,
} as const;
</script>

<template>
  <template v-if="props.stacked">
    <template v-if="props.tiled">
      <UiSprite
        sprite-key="base_ticker"
        :y="-20"
        :anchor="{ x: 0.5, y: 0 }"
        :width="UI_BASE_FONT_SIZE * 3 * (326 / 73)"
        :height="UI_BASE_FONT_SIZE * 3"
        :border-radius="35"
      />
    </template>
    <Text :anchor="{ x: 0.5, y: 0 }" :text="props.label" :style="labelStyle" />
    <Text
      :anchor="{ x: 0.5, y: 0 }"
      :text="props.value"
      :style="valueStyle"
      :y="UI_BASE_FONT_SIZE"
    /> </template
  ><template v-else>
    <template v-if="props.tiled">
      <UiSprite
        sprite-key="base_ticker"
        :x="-90"
        :anchor="{ x: 0, y: 0.5 }"
        :width="UI_BASE_FONT_SIZE * 3 * (326 / 73)"
        :height="UI_BASE_FONT_SIZE * 3"
        :border-radius="35"
      />
    </template>
    <Text :anchor="{ x: 0, y: 0.5 }" :text="props.label" :style="labelStyle" />
    <Text
      :anchor="{ x: 1, y: 0.5 }"
      :text="props.value"
      :style="valueStyle"
      :x="UI_BASE_FONT_SIZE * 10"
    />
  </template>
</template>
