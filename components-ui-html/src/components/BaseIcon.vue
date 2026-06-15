<script setup lang="ts">
import { ref, computed } from "vue";
import { sharedAssetsHtml as assets } from "constants-shared/assets";

type Icon = keyof typeof assets;

interface Props {
  width?: string;
  height?: string;
  background?: string;
  border?: string;
  icon?: Icon;
  hovered?: Icon;
  pressed?: Icon;
  size?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  background: "black",
  border: "none",
  size: "1rem",
  disabled: false,
});

const defaultUrl = computed(() => assets[props.icon as Icon] as string);
const hoveredUrl = computed(
  () => (props.hovered ? assets[props.hovered] : defaultUrl.value) as string,
);
const pressedUrl = computed(
  () => (props.pressed ? assets[props.pressed] : defaultUrl.value) as string,
);

const hoveredState = ref(false);
const pressedState = ref(false);

const src = computed(() => {
  if (props.disabled) return defaultUrl.value;
  if (hoveredState.value) return hoveredUrl.value;
  if (pressedState.value) return pressedUrl.value;
  return defaultUrl.value;
});
</script>

<template>
  <div
    class="rectangle"
    :style="`
	--width-value: ${props.width};
	--height-value: ${props.height};
	--background-value: ${props.background};
	--border-value: ${props.border};
`"
  />
</template>

<style lang="scss">
.rectangle {
  width: var(--width-value);
  height: var(--height-value);
  background: var(--background-value);
  border: var(--border-value);
  border-radius: 10px;
}
</style>
