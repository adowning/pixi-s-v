<template>

</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as PIXI from 'pixi.js';

	import type { OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<PIXI.AnimatedSpriteOptions> & {
		animationSpeed?: PIXI.AnimatedSprite['animationSpeed'];
		loop?: PIXI.AnimatedSprite['loop'];
		play?: boolean;
	};


	import { propsSyncEffect } from '../utils';
	import { getContextParent } from '../context';

	const props = defineProps<Props>();

	const parentContext = getContextParent();
	const animatedSprite = new PIXI.AnimatedSprite(props.textures ?? []);

	propsSyncEffect({ props, target: animatedSprite, ignore: ['play'] });

	watchEffect(() => {
		if (props.play) {
			animatedSprite.gotoAndPlay(0);
		} else {
			animatedSprite.gotoAndStop(0);
		}
	});

	parentContext.addToParent(animatedSprite);

</script>