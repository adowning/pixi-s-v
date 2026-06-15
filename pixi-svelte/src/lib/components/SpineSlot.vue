<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/SpineSlot.vue
<script lang="ts">
export type Props = { slotName: string; debug?: boolean; container?: any };
</script>

<script setup lang="ts">
import * as PIXI from 'pixi.js';
import { watchEffect, onMounted, onUnmounted, inject, provide, computed , ref } from 'vue';
=======
<template>
<template v-if="show">
	<slot />
</template>
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as PIXI from 'pixi.js';

	export type Props = { slotName: string;  };



>>>>>>> master:pixi-svelte/src/lib/components/SpineSlot.vue

	import {
		getContextSpine,
		createContextParent,
		getContextSpineEventEmitter,
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/SpineSlot.vue
	} from '../context.svelte';


	const props = defineProps<Props>();
	const spine = inject<any>('spineContext');
	const slotContainer = new PIXI.Container();
	const spineEventEmitter = inject<any>('spineEventEmitterContext');

	const show = ref(!Boolean(spineEventEmitter));
=======
	} from '../context';

	const props = defineProps<Props>();
	const spine = getContextSpine();
	const slotContainer = new PIXI.Container();
	const spineEventEmitter = getContextSpineEventEmitter();

	let show = ref(!Boolean(spineEventEmitter));
>>>>>>> master:pixi-svelte/src/lib/components/SpineSlot.vue

	onMounted(() => {
		if (spineEventEmitter) {
			spineEventEmitter.on('beforeUpdateWorldTransforms', () => {
				const slot = spine.skeleton.findSlot(props.slotName);

				if (slot) {
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/SpineSlot.vue
					show.value = Boolean(slot?.attachment);
=======
					show = Boolean(slot?.attachment);
>>>>>>> master:pixi-svelte/src/lib/components/SpineSlot.vue
				}
			});
		}

		spine.addSlotObject(props.slotName, slotContainer);
	});

<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/SpineSlot.vue
	provide('parentContext', { parent: slotContainer, addToParent: (node) => { onMounted(() => { slotContainer.addChild(node); slotContainer.sortChildren(); }); onUnmounted(() => { if(node) node.destroy(); }); } });
</script>

<template>
<template v-if="show">
	<slot />
</template>
</template>
=======
	createContextParent(slotContainer);

</script>
>>>>>>> master:pixi-svelte/src/lib/components/SpineSlot.vue
