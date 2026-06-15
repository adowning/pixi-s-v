<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/BitmapText.vue
<script lang="ts">
import * as PIXI from 'pixi.js';
=======
<template>

</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as PIXI from 'pixi.js';
>>>>>>> master:pixi-svelte/src/lib/components/BitmapText.vue

	import type { Sizes, OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<PIXI.TextOptions> & {
		onresize?: (arg0: Sizes) => void;
	};
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/BitmapText.vue
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';


	const props = defineProps<Props>();
	const parentContext = inject<any>('parentContext');
	const bitmapText = new PIXI.BitmapText({ text: props.text, style: props.style });

	watchEffect(() => {
		let targetInstance = typeof bitmapText === 'function' ? bitmapText() : bitmapText;
		if (targetInstance) {
			Object.keys(props).filter(key => !['onresize'].includes(key)).forEach(key => {
				if (props[key] !== undefined) {
					targetInstance[key] = props[key];
				}
			});
		}
	});
=======




	import { propsSyncEffect } from '../utils';
	import { getContextParent } from '../context';

	const props = defineProps<Props>();
	const parentContext = getContextParent();
	const bitmapText = new PIXI.BitmapText({ text: props.text, style: props.style });

	propsSyncEffect({ props, target: bitmapText, ignore: ['onresize'] });
>>>>>>> master:pixi-svelte/src/lib/components/BitmapText.vue

	watchEffect(() => {
		props?.text;
		props?.style;
		props.onresize?.({ width: bitmapText.width, height: bitmapText.height });
	});

	onMounted(() => {
		props.onresize?.({ width: bitmapText.width, height: bitmapText.height });
	});

	parentContext.addToParent(bitmapText);
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/BitmapText.vue
</script>
=======

</script>
>>>>>>> master:pixi-svelte/src/lib/components/BitmapText.vue
