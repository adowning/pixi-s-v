<script lang="ts">
import { type Props as BaseProps } from './AnimatedSprite.vue';

	export type Props = Omit<BaseProps, 'textures'> & { key: string };
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';

	import AnimatedSprite from './AnimatedSprite.vue';
		import type { LoadedSpriteSheet } from '../types';

	const context = inject<any>('appContext');

	const props = defineProps<Props>();
	const animateSpriteProps = computed(() => {
		const { key, ...rest } = props;
		return rest;
	});
	const textures = computed(() => context.stateApp.loadedAssets?.[key] as LoadedSpriteSheet);
	const isValid = computed(() => textures.value && "length" in textures.value);
</script>

<template>

<AnimatedSprite v-bind="animateSpriteProps" :textures="isValid ? textures : []" />
</template>
