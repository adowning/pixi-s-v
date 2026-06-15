<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/Particles.vue
<script lang="ts">
import * as PIXI from 'pixi.js';
=======
<template>
<template v-if="texture === PIXI.Texture.EMPTY">
	{console.error(`Particle: key "${props.key}" is not found in the loadedAssets`)}
	{console.log('loadedAssets', $state.snapshot(context.stateApp).loadedAssets)}
</template>
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as PIXI from 'pixi.js';
>>>>>>> master:pixi-svelte/src/lib/components/Particles.vue

	export type Props = {
		key: string;
		size: number;
		init: (particles: PIXI.Particle[]) => void;
		update: (particles: PIXI.Particle[]) => void;
	};

<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/Particles.vue
<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';

	import type { LoadedSprite } from '../types';

	const props = defineProps<Props>();
	const context = inject<any>('appContext');
	const particleContainer = inject<any>('particleParentContext');
=======

	import type { LoadedSprite } from '../types';
	import { getContextApp, getContextParticleParent } from '../context';

	const props = defineProps<Props>();
	const context = getContextApp();
	const particleContainer = getContextParticleParent();
>>>>>>> master:pixi-svelte/src/lib/components/Particles.vue
	const texture = computed(() =>
		(context.stateApp.loadedAssets?.[props.key] || PIXI.Texture.EMPTY) as LoadedSprite,
	);

	const particles: PIXI.Particle[] = Array.from(
		{ length: props.size },
		() => new PIXI.Particle(texture),
	);
	particleContainer.addParticle(...particles);
	props.init(particles);

	if (context.stateApp.pixiApplication) {
		context.stateApp.pixiApplication.ticker.add(() => {
			props.update(particles);
			particleContainer.update();
		});
	}

<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/Particles.vue
<template>
</template>
=======
</script>
>>>>>>> master:pixi-svelte/src/lib/components/Particles.vue
