<script lang="ts">
import * as PIXI from 'pixi.js';

	import type { OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<PIXI.ParticleContainerOptions> & {

	};
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';


	const props = defineProps<Props>();
	const parentContext = inject<any>('parentContext');
	const particleContainer = new PIXI.ParticleContainer();

	watchEffect(() => {
		let targetInstance = typeof particleContainer === 'function' ? particleContainer() : particleContainer;
		if (targetInstance) {
			Object.keys(props).filter(key => !['children'].includes(key)).forEach(key => {
				if (props[key] !== undefined) {
					targetInstance[key] = props[key];
				}
			});
		}
	});
	parentContext.addToParent(particleContainer);
	provide('particleParentContext', particleContainer);
</script>

<template>
<slot />
</template>
