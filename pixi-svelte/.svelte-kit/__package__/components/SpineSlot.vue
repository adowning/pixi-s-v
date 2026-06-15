<script lang="ts">
export type Props = { slotName: string; debug?: boolean; container?: any };
</script>

<script setup lang="ts">
import * as PIXI from 'pixi.js';
import { watchEffect, onMounted, onUnmounted, inject, provide, computed , ref } from 'vue';

	import {
		getContextSpine,
		createContextParent,
		getContextSpineEventEmitter,
	} from '../context.svelte';


	const props = defineProps<Props>();
	const spine = inject<any>('spineContext');
	const slotContainer = new PIXI.Container();
	const spineEventEmitter = inject<any>('spineEventEmitterContext');

	const show = ref(!Boolean(spineEventEmitter));

	onMounted(() => {
		if (spineEventEmitter) {
			spineEventEmitter.on('beforeUpdateWorldTransforms', () => {
				const slot = spine.skeleton.findSlot(props.slotName);

				if (slot) {
					show.value = Boolean(slot?.attachment);
				}
			});
		}

		spine.addSlotObject(props.slotName, slotContainer);
	});

	provide('parentContext', { parent: slotContainer, addToParent: (node) => { onMounted(() => { slotContainer.addChild(node); slotContainer.sortChildren(); }); onUnmounted(() => { if(node) node.destroy(); }); } });
</script>

<template>
<template v-if="show">
	<slot />
</template>
</template>
