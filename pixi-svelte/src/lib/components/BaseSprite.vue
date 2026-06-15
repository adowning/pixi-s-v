<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/BaseSprite.vue
<script lang="ts">
import * as PIXI from 'pixi.js';
=======
<template>

</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as PIXI from 'pixi.js';
>>>>>>> master:pixi-svelte/src/lib/components/BaseSprite.vue

	import type { OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<PIXI.SpriteOptions> & {
		isMask?: boolean;
	};
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/BaseSprite.vue
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';


	const props = defineProps<Props>();

	const parentContext = inject<any>('parentContext');
	const sprite = new PIXI.Sprite(props.texture);

	watchEffect(() => {
		let targetInstance = typeof sprite === 'function' ? sprite() : sprite;
		if (targetInstance) {
			Object.keys(props).filter(key => !['isMask'].includes(key)).forEach(key => {
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
	const sprite = new PIXI.Sprite(props.texture);

	propsSyncEffect({ props, target: sprite, ignore: ['isMask'] });
>>>>>>> master:pixi-svelte/src/lib/components/BaseSprite.vue

	watchEffect(() => {
		if (props.isMask !== undefined) {
			parentContext.parent.mask = props.isMask ? sprite : null;
		}
	});

	parentContext.addToParent(sprite);
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/BaseSprite.vue
</script>
=======

</script>
>>>>>>> master:pixi-svelte/src/lib/components/BaseSprite.vue
