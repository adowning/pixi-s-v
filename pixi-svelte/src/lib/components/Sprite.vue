<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/Sprite.vue
<script lang="ts">
import * as PIXI from 'pixi.js';
=======
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
>>>>>>> master:pixi-svelte/src/lib/components/Sprite.vue

	import { type Props as BaseProps } from './BaseSprite.vue';

	export type Props = Omit<BaseProps, 'texture'> & {
		debug?: boolean;
		key: string;
	};
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/Sprite.vue
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
=======


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
>>>>>>> master:pixi-svelte/src/lib/components/Sprite.vue
