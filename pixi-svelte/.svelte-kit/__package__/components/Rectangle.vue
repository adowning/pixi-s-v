<script lang="ts">
import * as PIXI from 'pixi.js';

	import { type Props as BaseProps } from './Graphics.vue';
	import type { PixiPoint } from '../types';

	export type Props = Omit<BaseProps, 'pivot' | 'draw'> & {
		anchor?: PixiPoint;
		// draw
		width: Parameters<PIXI.Graphics['roundRect']>[2];
		height: Parameters<PIXI.Graphics['roundRect']>[3];
		borderRadius?: Parameters<PIXI.Graphics['roundRect']>[4];
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
		const { anchor, width, height, borderRadius, backgroundColor, backgroundAlpha, borderColor, borderWidth, borderAlpha, ...rest} = props;
		return rest;
	});
</script>

<template>
<Graphics
	v-bind="graphicsProps"
	:pivot="anchorToPivot({ anchor: props.anchor, sizes: { width: props.width, height: props.height } })"
	:draw="(graphics) => {
		graphics.roundRect(0, 0, props.width, props.height, props.borderRadius ?? 0);
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
