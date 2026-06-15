<script lang="ts">
	import * as SPINE_PIXI from '@esotericsoftware/spine-pixi-v8';

	import type { OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<Omit<SPINE_PIXI.SpineOptions, 'children'>> & {
		spineData: SPINE_PIXI.SkeletonData;

	};
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';


	const props = defineProps<Props>();
	const parentContext = inject<any>('parentContext');
	const spine = new SPINE_PIXI.Spine(props.spineData);

	watchEffect(() => {
		let targetInstance = typeof spine === 'function' ? spine() : spine;
		if (targetInstance) {
			Object.keys(props).filter(key => !['children'].includes(key)).forEach(key => {
				if (props[key] !== undefined) {
					targetInstance[key] = props[key];
				}
			});
		}
	});

	parentContext.addToParent(spine);
	provide('spineContext', spine);
</script>

<template>
<slot />
</template>
