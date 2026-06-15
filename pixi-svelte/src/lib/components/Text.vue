<<<<<<< HEAD
<script lang="ts">
import * as PIXI from 'pixi.js';
=======
<template>

</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as PIXI from 'pixi.js';
>>>>>>> master

	import type { Sizes, OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<PIXI.TextOptions> & {
		onresize?: (arg0: Sizes) => void;
	};
<<<<<<< HEAD
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';


	const props = defineProps<Props>();
	const parentContext = inject<any>('parentContext');
	const text = new PIXI.Text({ text: props.text, style: props.style });

	watchEffect(() => {
		let targetInstance = typeof text === 'function' ? text() : text;
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
	const text = new PIXI.Text({ text: props.text, style: props.style });

	propsSyncEffect({ props, target: text, ignore: ['onresize'] });
>>>>>>> master

	watchEffect(() => {
		props?.text;
		props?.style;
		props.onresize?.({ width: text.width, height: text.height });
	});

	onMounted(() => {
		props.onresize?.({ width: text.width, height: text.height });
	});

	parentContext.addToParent(text);
<<<<<<< HEAD
</script>
=======

</script>
>>>>>>> master
