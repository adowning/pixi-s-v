<template>

</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as PIXI from 'pixi.js';

	import type { Sizes, OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<PIXI.TextOptions> & {
		onresize?: (arg0: Sizes) => void;
	};




	import { propsSyncEffect } from '../utils';
	import { getContextParent } from '../context';

	const props = defineProps<Props>();
	const parentContext = getContextParent();
	const text = new PIXI.Text({ text: props.text, style: props.style });

	propsSyncEffect({ props, target: text, ignore: ['onresize'] });

	watchEffect(() => {
		props?.text;
		props?.style;
		props.onresize?.({ width: text.width, height: text.height });
	});

	onMounted(() => {
		props.onresize?.({ width: text.width, height: text.height });
	});

	parentContext.addToParent(text);

</script>