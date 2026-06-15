<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/Graphics.vue
<script lang="ts">
import * as PIXI from 'pixi.js';
=======
<template>

</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as PIXI from 'pixi.js';
>>>>>>> master:pixi-svelte/src/lib/components/Graphics.vue

	import type { OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<PIXI.GraphicsOptions> & {
		isMask?: boolean;
		draw: (graphics: PIXI.Graphics) => void;
	};
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/Graphics.vue
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';


	const props = defineProps<Props>();
	const parentContext = inject<any>('parentContext');
	const graphics = new PIXI.Graphics();

	watchEffect(() => {
		let targetInstance = typeof graphics === 'function' ? graphics() : graphics;
		if (targetInstance) {
			Object.keys(props).filter(key => !['isMask', 'draw'].includes(key)).forEach(key => {
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
	const graphics = new PIXI.Graphics();

	propsSyncEffect({ props, target: graphics, ignore: ['isMask', 'draw'] });
>>>>>>> master:pixi-svelte/src/lib/components/Graphics.vue

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
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/Graphics.vue
</script>
=======

</script>
>>>>>>> master:pixi-svelte/src/lib/components/Graphics.vue
