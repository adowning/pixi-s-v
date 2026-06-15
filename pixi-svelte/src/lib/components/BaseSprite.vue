<template>

</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as PIXI from 'pixi.js';

	import type { OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<PIXI.SpriteOptions> & {
		isMask?: boolean;
	};


	import { propsSyncEffect } from '../utils';
	import { getContextParent } from '../context';

	const props = defineProps<Props>();

	const parentContext = getContextParent();
	const sprite = new PIXI.Sprite(props.texture);

	propsSyncEffect({ props, target: sprite, ignore: ['isMask'] });

	watchEffect(() => {
		if (props.isMask !== undefined) {
			parentContext.parent.mask = props.isMask ? sprite : null;
		}
	});

	parentContext.addToParent(sprite);

</script>