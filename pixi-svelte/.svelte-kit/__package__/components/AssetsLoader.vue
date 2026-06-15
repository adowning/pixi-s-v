<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed , ref } from 'vue';

		import * as PIXI from 'pixi.js';

		import { getProcessed } from '../assetLoad';
	import type { LoadedAssets, RawAsset } from '../types';




	const context = inject<any>('appContext');

	let preLoaded = ref(false);

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
		if (!preLoaded.value) {
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
		if (!context.stateApp.loaded && preLoaded.value) {
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
</script>

<template>
<template v-if="preLoaded">
	<slot />
</template>
</template>
