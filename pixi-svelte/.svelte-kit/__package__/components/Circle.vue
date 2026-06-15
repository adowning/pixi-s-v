<script lang="ts">
import * as PIXI from 'pixi.js';

	import { type Props as BaseProps } from './Graphics.vue';
	import type { PixiPoint } from '../types';

	export type Props = Omit<BaseProps, 'pivot' | 'draw'> & {
		anchor?: PixiPoint;
		// draw
		diameter: number;
		backgroundColor?: PIXI.FillStyle['color'];
		backgroundAlpha?: PIXI.FillStyle['alpha'];
		borderColor?: PIXI.StrokeStyle['color'];
		borderWidth?: PIXI.StrokeStyle['width'];
		borderAlpha?: PIXI.StrokeStyle['alpha'];
	};
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';

	import Graphics from './Graphics.vue';
	import { anchorToPivot } from '../utils.svelte';

	const props = defineProps<Props>();
	const graphicsProps = computed(() => {
		const { anchor, diameter, backgroundColor, backgroundAlpha, borderColor, borderWidth, borderAlpha, ...rest} = props;
		return rest;
	});
</script>

<template>
<Graphics
	v-bind="graphicsProps"
	:pivot="anchorToPivot({ anchor: props.anchor, sizes: { width: props.diameter, height: props.diameter } })"
	:draw="(graphics) => {
		const radius = props.diameter * 0.5;
		graphics.circle(props.diameter * 0.5, props.diameter * 0.5, radius);
		graphics.fill({
			color: props.backgroundColor ?? 0x000000,
			alpha: props.backgroundAlpha ?? 1,
		});
		graphics.stroke({
			color: props.borderColor ?? 0x000000,
			width: props.borderWidth ?? 0,
			alpha: props.borderAlpha ?? 1,
		});
	}"/>
</template>
