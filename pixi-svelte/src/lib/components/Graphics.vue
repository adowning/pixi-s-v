<template>

</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as PIXI from 'pixi.js';

	import type { OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<PIXI.GraphicsOptions> & {
		isMask?: boolean;
		draw: (graphics: PIXI.Graphics) => void;
	};


	import { propsSyncEffect } from '../utils';
	import { getContextParent } from '../context';

	const props = defineProps<Props>();
	const parentContext = getContextParent();
	const graphics = new PIXI.Graphics();

	propsSyncEffect({ props, target: graphics, ignore: ['isMask', 'draw'] });

	watchEffect(() => {
		if (props.isMask !== undefined) {
			parentContext.parent.mask = props.isMask ? graphics : null;
		}
	});

	watchEffect(() => {
		if (props.draw) {
			graphics.clear();
			props.draw(graphics);
		}
	});

	parentContext.addToParent(graphics);

</script>