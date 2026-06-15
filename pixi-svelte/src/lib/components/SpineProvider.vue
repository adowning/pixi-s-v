<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/SpineProvider.vue
<script lang="ts">
import { type Props as BaseProps } from './BaseSpineProvider.vue';
=======
<template>
<template v-if="!spineData">
	{console.error(`Spine: key "${key}" is not found in loadedAssets`)}
</template>

<template v-if="!spineData || debug">
	{console.log('loadedAssets', $state.snapshot(context.stateApp).loadedAssets)}
</template>

{#key spineData}
	<BaseSpineProvider v-bind="baseSpineProps" :scale="scale" :pivot="pivot" :spineData="spineData">
		<slot />
	</BaseSpineProvider>
{/key}
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import { type Props as BaseProps } from './BaseSpineProvider.vue';
>>>>>>> master:pixi-svelte/src/lib/components/SpineProvider.vue
	import type { PixiPoint } from '../types';

	export type Props = Omit<BaseProps, 'spineData' | 'pivot' | 'scale'> & {
		debug?: boolean;
		key: string;
		anchor?: PixiPoint;
		scale?: PixiPoint;
	};
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/SpineProvider.vue
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';
=======

>>>>>>> master:pixi-svelte/src/lib/components/SpineProvider.vue

	import * as SPINE_PIXI from '@esotericsoftware/spine-pixi-v8';

	import BaseSpineProvider from './BaseSpineProvider.vue';
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/SpineProvider.vue
	import { anchorToPivot } from '../utils.svelte';

	const props = defineProps<Props>();
	const baseSpineProps = computed(() => {
		const { debug, key, anchor, children, scale: scaleProp, ...rest} = props;
		return rest;
	});
	const context = inject<any>('appContext');
	const spineData = computed(() => context.stateApp.loadedAssets?.[props.key] as SPINE_PIXI.SkeletonData);
=======
	import { anchorToPivot } from '../utils';
	import { getContextApp } from '../context';

	const props = defineProps<Props>();
	const { debug, key, anchor, children, scale: scaleProp, ...baseSpineProps  } = toRefs(props);
	const context = getContextApp();
	const spineData = computed(() => context.stateApp.loadedAssets?.[key] as SPINE_PIXI.SkeletonData);
>>>>>>> master:pixi-svelte/src/lib/components/SpineProvider.vue

	const SCALE_BASE = { x: 1, y: 1 };

	const scaleSize = computed(() => {
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/SpineProvider.vue
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
=======
		if (!spineData) return SCALE_BASE;
		if (!spineData?.width || !spineData?.height) return SCALE_BASE;
		if (!baseSpineProps.width && !baseSpineProps.height) return SCALE_BASE;
		if (!baseSpineProps.width && baseSpineProps.height) {
			const scaleHeight = baseSpineProps.height / spineData.height;
			return { x: scaleHeight, y: scaleHeight };
		}
		if (baseSpineProps.width && !baseSpineProps.height) {
			const scaleWidth = baseSpineProps.width / spineData.width;
			return { x: scaleWidth, y: scaleWidth };
		}
		if (baseSpineProps.width && baseSpineProps.height) {
			return {
				x: baseSpineProps.width / spineData.width,
				y: baseSpineProps.height / spineData.height,
>>>>>>> master:pixi-svelte/src/lib/components/SpineProvider.vue
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
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/SpineProvider.vue
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
=======
		if (!spineData) return 0;
		if (!spineData?.width || !spineData?.height) return 0;
		const factWidth = baseSpineProps.width || spineData.width;
		const factHeight = baseSpineProps.height || spineData.height;

		return anchorToPivot({ anchor, sizes: { width: factWidth, height: factHeight } });
	});

</script>
>>>>>>> master:pixi-svelte/src/lib/components/SpineProvider.vue
