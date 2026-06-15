<template>
<template v-if="texture === PIXI.Texture.EMPTY || debug">
	{console.error(`Sprite: key "${key}" is not found in the loadedAssets`)}
	{console.log('loadedAssets', $state.snapshot(context.stateApp).loadedAssets)}
</template>

<BaseSprite v-bind="baseSpriteProps" :texture="texture" />
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as PIXI from 'pixi.js';

	import { type Props as BaseProps } from './BaseSprite.vue';

	export type Props = Omit<BaseProps, 'texture'> & {
		debug?: boolean;
		key: string;
	};


	import BaseSprite from './BaseSprite.vue';
	import { getContextApp } from '../context';
	import type { LoadedSprite } from '../types';

	const props = defineProps<Props>();
	const { debug, key, ...baseSpriteProps  } = toRefs(props);
	const context = getContextApp();
	const texture = computed(() =>
		(context.stateApp.loadedAssets?.[key] || PIXI.Texture.EMPTY) as LoadedSprite,
	);

</script>