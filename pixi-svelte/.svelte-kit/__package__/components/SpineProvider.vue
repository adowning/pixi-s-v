<script lang="ts">
import { type Props as BaseProps } from './BaseSpineProvider.vue';
	import type { PixiPoint } from '../types';

	export type Props = Omit<BaseProps, 'spineData' | 'pivot' | 'scale'> & {
		debug?: boolean;
		key: string;
		anchor?: PixiPoint;
		scale?: PixiPoint;
	};
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';

	import * as SPINE_PIXI from '@esotericsoftware/spine-pixi-v8';

	import BaseSpineProvider from './BaseSpineProvider.vue';
	import { anchorToPivot } from '../utils.svelte';

	const props = defineProps<Props>();
	const baseSpineProps = computed(() => {
		const { debug, key, anchor, children, scale: scaleProp, ...rest} = props;
		return rest;
	});
	const context = inject<any>('appContext');
	const spineData = computed(() => context.stateApp.loadedAssets?.[props.key] as SPINE_PIXI.SkeletonData);

	const SCALE_BASE = { x: 1, y: 1 };

	const scaleSize = computed(() => {
		if (!spineData.value) return SCALE_BASE;
		if (!spineData.value?.width || !spineData.value?.height) return SCALE_BASE;
		if (!baseSpineProps.value.width && !baseSpineProps.value.height) return SCALE_BASE;
		if (!baseSpineProps.value.width && baseSpineProps.value.height) {
			const scaleHeight = baseSpineProps.value.height / spineData.value.height;
			return { x: scaleHeight, y: scaleHeight };
		}
		if (baseSpineProps.value.width && !baseSpineProps.value.height) {
			const scaleWidth = baseSpineProps.value.width / spineData.value.width;
			return { x: scaleWidth, y: scaleWidth };
		}
		if (baseSpineProps.value.width && baseSpineProps.value.height) {
			return {
				x: baseSpineProps.value.width / spineData.value.width,
				y: baseSpineProps.value.height / spineData.value.height,
			};
		}

		return SCALE_BASE;
	});

	const scale = computed(() => {
		if (typeof scaleProp === 'number')
			return { x: scaleSize.x * scaleProp, y: scaleSize.y * scaleProp };
		return { x: scaleSize.x * (scaleProp?.x || 1), y: scaleSize.y * (scaleProp?.y || 1) };
	});

	const pivot = computed(() => {
		if (!spineData.value) return 0;
		if (!spineData.value?.width || !spineData.value?.height) return 0;
		const factWidth = baseSpineProps.value.width || spineData.value.width;
		const factHeight = baseSpineProps.value.height || spineData.value.height;

		return anchorToPivot({ anchor: props.anchor, sizes: { width: factWidth, height: factHeight } });
	});
</script>

<template>


<template :key="spineData">
	<BaseSpineProvider v-bind="baseSpineProps" :scale="scale" :pivot="pivot" :spineData="spineData">
		<slot />
	</BaseSpineProvider>
</template>
</template>
