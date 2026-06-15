<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/AssetsLoader.vue
<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed , ref } from 'vue';

		import * as PIXI from 'pixi.js';

		import { getProcessed } from '../assetLoad';
	import type { LoadedAssets, RawAsset } from '../types';




	const context = inject<any>('appContext');

	let preLoaded = ref(false);

=======
<template>
<template v-if="preLoaded">
	<slot />
</template>
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";


	import * as PIXI from 'pixi.js';

	import { getContextApp } from '../context';
	import { getProcessed } from '../assetLoad';
	import type { LoadedAssets, RawAsset } from '../types';

	type Props = {  };

	const props = defineProps<Props>();
	const context = getContextApp();

	const preLoaded = ref(false);

>>>>>>> master:pixi-svelte/src/lib/components/AssetsLoader.vue
	const assetNameList = computed(() =>
		context.stateApp.assets
			? Object.keys(context.stateApp.assets).filter(
					(key) => Boolean(context.stateApp.assets?.[key].preload) === false,
				)
			: [],
	);

	const preAssetNameList = computed(() =>
		context.stateApp.assets
			? Object.keys(context.stateApp.assets).filter(
					(key) => context.stateApp.assets?.[key].preload === true,
				)
			: [],
	);

	let counter = 0;

	const onProgress = (value: number) => {
		if (preLoaded.value && value === 1) {
			counter = counter + 1;
			const ratio = counter / assetNameList.value.length;
			context.stateApp.loadingProgress = ratio * 100;
		}
	};

	const loadAssets = async (nameList: string[]) => {
		const loadedAssetsArray = await Promise.all(
			nameList.map(async (key) => {
				try {
					const { type, src } = context.stateApp.assets![key];
					const loadSrc =
						type === 'spine' ? Object.values(src).filter((item) => typeof item === 'string') : src;
					const rawAsset = await PIXI.Assets.load<RawAsset>(loadSrc, onProgress);
					const processed = getProcessed({ key, rawAsset, type, src });
					return processed;
				} catch (error) {
					console.error(error);
				}
			}),
		);

		return loadedAssetsArray.reduce(
			(acc, cur) => ({
				...acc,
				...cur,
			}),
			{} as LoadedAssets,
		);
	};

	watchEffect(() => {
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/AssetsLoader.vue
		if (!preLoaded.value) {
=======
		if (!preLoaded) {
>>>>>>> master:pixi-svelte/src/lib/components/AssetsLoader.vue
			(async () => {
				if (preAssetNameList.value.length > 0) {
					const preLoadedAssets = await loadAssets(preAssetNameList.value);
					if (preLoadedAssets) context.stateApp.loadedAssets = preLoadedAssets;
				}
				preLoaded.value = true;
			})();
		}
	});

	watchEffect(() => {
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/AssetsLoader.vue
		if (!context.stateApp.loaded && preLoaded.value) {
=======
		if (!context.stateApp.loaded && preLoaded) {
>>>>>>> master:pixi-svelte/src/lib/components/AssetsLoader.vue
			(async () => {
				if (assetNameList.value.length > 0) {
					const postLoadedAssets = await loadAssets(assetNameList.value);
					if (postLoadedAssets)
						context.stateApp.loadedAssets = {
							...context.stateApp.loadedAssets,
							...postLoadedAssets,
						};
				}
				context.stateApp.loaded = true;
			})();
		}
	});

<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/AssetsLoader.vue
<template>
<template v-if="preLoaded">
	<slot />
</template>
</template>
=======
</script>
>>>>>>> master:pixi-svelte/src/lib/components/AssetsLoader.vue
