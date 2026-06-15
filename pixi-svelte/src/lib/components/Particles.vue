<template>
<template v-if="texture === PIXI.Texture.EMPTY">
	{console.error(`Particle: key "${props.key}" is not found in the loadedAssets`)}
	{console.log('loadedAssets', $state.snapshot(context.stateApp).loadedAssets)}
</template>
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as PIXI from 'pixi.js';

	export type Props = {
		key: string;
		size: number;
		init: (particles: PIXI.Particle[]) => void;
		update: (particles: PIXI.Particle[]) => void;
	};


	import type { LoadedSprite } from '../types';
	import { getContextApp, getContextParticleParent } from '../context';

	const props = defineProps<Props>();
	const context = getContextApp();
	const particleContainer = getContextParticleParent();
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

</script>