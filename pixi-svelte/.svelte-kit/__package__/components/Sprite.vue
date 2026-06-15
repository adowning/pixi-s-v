<script lang="ts">
import * as PIXI from 'pixi.js';

	import { type Props as BaseProps } from './BaseSprite.vue';

	export type Props = Omit<BaseProps, 'texture'> & {
		debug?: boolean;
		key: string;
	};
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';

	import BaseSprite from './BaseSprite.vue';
		import type { LoadedSprite } from '../types';

	const props = defineProps<Props>();
	const baseSpriteProps = computed(() => {
		const { debug, key, ...rest } = props;
		return rest;
	});
	const context = inject<any>('appContext');
	const texture = computed(() =>
		(context.stateApp.loadedAssets?.[key] || PIXI.Texture.EMPTY) as LoadedSprite,
	);
</script>

<template>

<BaseSprite v-bind="baseSpriteProps" :texture="texture" />
</template>
