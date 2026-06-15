<template>
<Graphics
	v-bind="graphicsProps"
	:pivot="anchorToPivot({ anchor, sizes: { width: width, height: height " })}
	:draw="(graphics) => {
		graphics.roundRect(0, 0, width, height, borderRadius ?? 0);
		graphics.fill({
			color: backgroundColor ?? 0x000000,
			alpha: backgroundAlpha ?? 1,
		" as PIXI.FillStyle);
		graphics.stroke({
			color: borderColor ?? 0x000000,
			width: borderWidth ?? 0,
			alpha: borderAlpha ?? 1,
		} as PIXI.StrokeStyle);
	}}
/>
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

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


	import Graphics from './Graphics.vue';
	import { anchorToPivot } from '../utils';

	const props = defineProps<Props>();
	const { anchor,
		width,
		height,
		borderRadius,
		backgroundColor,
		backgroundAlpha,
		borderColor,
		borderWidth,
		borderAlpha,
		...graphicsProps
	 } = toRefs(props);

</script>