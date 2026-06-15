<script lang="ts">
import * as PIXI from 'pixi.js';

	export type Props = {
		key: string;
		size: number;
		init: (particles: PIXI.Particle[]) => void;
		update: (particles: PIXI.Particle[]) => void;
	};
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';

	import type { LoadedSprite } from '../types';

	const props = defineProps<Props>();
	const context = inject<any>('appContext');
	const particleContainer = inject<any>('particleParentContext');
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

<template>
</template>
