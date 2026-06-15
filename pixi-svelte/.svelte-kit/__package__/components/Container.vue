<script lang="ts">
import * as PIXI from 'pixi.js';

	import type { OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<Omit<PIXI.ContainerOptions, 'children'>> & {

	};
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';


	const props = defineProps<Props>();
	const parentContext = inject<any>('parentContext');
	const container = new PIXI.Container();

	watchEffect(() => {
		let targetInstance = typeof container === 'function' ? container() : container;
		if (targetInstance) {
			Object.keys(props).filter(key => !['children'].includes(key)).forEach(key => {
				if (props[key] !== undefined) {
					targetInstance[key] = props[key];
				}
			});
		}
	});
	parentContext.addToParent(container);
	provide('parentContext', { parent: container, addToParent: (node) => { onMounted(() => { container.addChild(node); container.sortChildren(); }); onUnmounted(() => { if(node) node.destroy(); }); } });
</script>

<template>
<slot />
</template>
