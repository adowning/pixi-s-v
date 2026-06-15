<template>
<Rectangle
	v-bind="props"
	:width="context.stateLayoutDerived.canvasSizes().width"
	:height="context.stateLayoutDerived.canvasSizes().height"
/>
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import { Rectangle, type RectangleProps } from 'pixi-svelte';
	import { getContextLayout } from 'utils-layout';

	type Props = Omit<RectangleProps, 'width' | 'height'>;

	const props = defineProps<Props>();
	const context = getContextLayout();

</script>