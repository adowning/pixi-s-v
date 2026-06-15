<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/SpriteSheet.vue
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
=======
<template>
<template v-if="!isValid">
	{console.error(`SpriteSheet: key "${key}" is not found in loadedAssets`)}
	{console.log('loadedAssets', $state.snapshot(context).stateApp.loadedAssets)}
</template>

<AnimatedSprite v-bind="animateSpriteProps" :textures="isValid ? textures : []" />
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import { type Props as BaseProps } from './AnimatedSprite.vue';

	export type Props = Omit<BaseProps, 'textures'> & { key: string };


	import AnimatedSprite from './AnimatedSprite.vue';
	import { getContextApp } from '../context';
	import type { LoadedSpriteSheet } from '../types';

	const context = getContextApp();

	const props = defineProps<Props>();
	const { key, ...animateSpriteProps  } = toRefs(props);
	const textures = computed(() => context.stateApp.loadedAssets?.[key] as LoadedSpriteSheet);
	const isValid = computed(() => textures && 'length' in textures);

</script>
>>>>>>> master:pixi-svelte/src/lib/components/SpriteSheet.vue
