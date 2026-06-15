<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/AnimatedSprite.vue
<script lang="ts">
import * as PIXI from 'pixi.js';
=======
<template>

</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as PIXI from 'pixi.js';
>>>>>>> master:pixi-svelte/src/lib/components/AnimatedSprite.vue

	import type { OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<PIXI.AnimatedSpriteOptions> & {
		animationSpeed?: PIXI.AnimatedSprite['animationSpeed'];
		loop?: PIXI.AnimatedSprite['loop'];
		play?: boolean;
	};
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/AnimatedSprite.vue
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';


	const props = defineProps<Props>();

	const parentContext = inject<any>('parentContext');
	const animatedSprite = new PIXI.AnimatedSprite(props.textures ?? []);

	watchEffect(() => {
		let targetInstance = typeof animatedSprite === 'function' ? animatedSprite() : animatedSprite;
		if (targetInstance) {
			Object.keys(props).filter(key => !['play'].includes(key)).forEach(key => {
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
	const animatedSprite = new PIXI.AnimatedSprite(props.textures ?? []);

	propsSyncEffect({ props, target: animatedSprite, ignore: ['play'] });
>>>>>>> master:pixi-svelte/src/lib/components/AnimatedSprite.vue

	watchEffect(() => {
		if (props.play) {
			animatedSprite.gotoAndPlay(0);
		} else {
			animatedSprite.gotoAndStop(0);
		}
	});

	parentContext.addToParent(animatedSprite);
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/AnimatedSprite.vue
</script>
=======

</script>
>>>>>>> master:pixi-svelte/src/lib/components/AnimatedSprite.vue
