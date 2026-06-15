<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/ParticleContainer.vue
<script lang="ts">
import * as PIXI from 'pixi.js';
=======
<template>
<slot />
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as PIXI from 'pixi.js';

>>>>>>> master:pixi-svelte/src/lib/components/ParticleContainer.vue

	import type { OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<PIXI.ParticleContainerOptions> & {
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/ParticleContainer.vue

	};
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';


	const props = defineProps<Props>();
	const parentContext = inject<any>('parentContext');
	const particleContainer = new PIXI.ParticleContainer();

	watchEffect(() => {
		let targetInstance = typeof particleContainer === 'function' ? particleContainer() : particleContainer;
		if (targetInstance) {
			Object.keys(props).filter(key => !['children'].includes(key)).forEach(key => {
				if (props[key] !== undefined) {
					targetInstance[key] = props[key];
				}
			});
		}
	});
	parentContext.addToParent(particleContainer);
	provide('particleParentContext', particleContainer);
</script>

<template>
<slot />
</template>
=======
		;
	};


	import { propsSyncEffect } from '../utils';
	import { getContextParent, setContextParticleParent } from '../context';

	const props = defineProps<Props>();
	const parentContext = getContextParent();
	const particleContainer = new PIXI.ParticleContainer();

	propsSyncEffect({ props, target: particleContainer, ignore: ['children'] });
	parentContext.addToParent(particleContainer);
	setContextParticleParent(particleContainer);

</script>
>>>>>>> master:pixi-svelte/src/lib/components/ParticleContainer.vue
