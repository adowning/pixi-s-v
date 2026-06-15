<template>
<template v-if="show">
	<slot />
</template>
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as PIXI from 'pixi.js';

	export type Props = { slotName: string;  };




	import {
		getContextSpine,
		createContextParent,
		getContextSpineEventEmitter,
	} from '../context';

	const props = defineProps<Props>();
	const spine = getContextSpine();
	const slotContainer = new PIXI.Container();
	const spineEventEmitter = getContextSpineEventEmitter();

	let show = ref(!Boolean(spineEventEmitter));

	onMounted(() => {
		if (spineEventEmitter) {
			spineEventEmitter.on('beforeUpdateWorldTransforms', () => {
				const slot = spine.skeleton.findSlot(props.slotName);

				if (slot) {
					show = Boolean(slot?.attachment);
				}
			});
		}

		spine.addSlotObject(props.slotName, slotContainer);
	});

	createContextParent(slotContainer);

</script>