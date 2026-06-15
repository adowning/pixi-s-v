<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/InitialiseApplication.vue
<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed, ref } from 'vue';
import * as PIXI from 'pixi.js';
		const devicePixelRatio = { current: typeof window !== 'undefined' ? window.devicePixelRatio : 1 };

		import { preloadFont } from '../utils.svelte';




	const context = inject<any>('appContext');

	const wrap = ref<HTMLDivElement | null>(null);
	let initialised = ref(false);
=======
<template>
<div bind:this=:wrap="wrap">
	<template v-if="initialised">
		<slot />
	</template>
</div>
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as PIXI from 'pixi.js';

	import { devicePixelRatio } from 'svelte/reactivity/window';

	import { getContextApp } from '../context';
	import { preloadFont } from '../utils';

	type Props = {  };

	const props = defineProps<Props>();
	const context = getContextApp();

	let wrap: HTMLDivElement;
	const initialised = ref(false);
>>>>>>> master:pixi-svelte/src/lib/components/InitialiseApplication.vue

	const initialiseApplication = async () => {
		PIXI.Assets.reset();

		await preloadFont();
		context.stateApp.pixiApplication = new PIXI.Application<PIXI.Renderer<HTMLCanvasElement>>();
		await context.stateApp.pixiApplication.init({
			autoDensity: true,
			backgroundAlpha: 0,
			hello: true,
			multiView: false,
			antialias: true,
			clearBeforeRender: true,
			preference: 'webgpu',
			powerPreference: 'high-performance',
			resolution: (typeof window !== 'undefined' ? window.devicePixelRatio : 1),
			resizeTo: window,
		});

		wrap.value?.appendChild(context.stateApp.pixiApplication.canvas);

		// to prevent that you can't scroll the page with touch on the canvas. https://github.com/pixijs/pixijs/issues/4824
		context.stateApp.pixiApplication.renderer.events.autoPreventDefault = false;
		context.stateApp.pixiApplication.renderer.canvas.style.touchAction = 'auto';
	};

	onMounted(async () => {
		try {
			if (!initialised.value) await initialiseApplication();
			initialised.value = true;
		} catch (error) {
			console.error(error);
		}
	});

	onUnmounted(() => {
		if (context.stateApp.pixiApplication) {
			context.stateApp.pixiApplication.destroy();
		}
	});

<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/InitialiseApplication.vue
<template>
<div ref="wrap">
	<template v-if="initialised">
		<slot />
	</template>
</div>
</template>
=======
</script>
>>>>>>> master:pixi-svelte/src/lib/components/InitialiseApplication.vue
