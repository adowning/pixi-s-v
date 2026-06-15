<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/ParticleEmitter.vue
<script lang="ts">
import {
=======
<template>

</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import {
>>>>>>> master:pixi-svelte/src/lib/components/ParticleEmitter.vue
		Emitter,
		upgradeConfig,
		type EmitterConfigV3,
		type EmitterConfigV2,
		type EmitterConfigV1,
	} from '@barvynkoa/particle-emitter';

	import type { LoadedSpriteSheet } from '../types';

	export type Props = Partial<Emitter> & {
		key: string;
		emitSpeed?: number;
		config: EmitterConfigV3 | EmitterConfigV2 | EmitterConfigV1;
	};
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/ParticleEmitter.vue
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';

	const props = defineProps<Props>();
	const context = inject<any>('appContext');
	const parentContext = inject<any>('parentContext');
	const textures = computed(() => context.stateApp.loadedAssets?.[props.key] as LoadedSpriteSheet);
	const updatedConfig = computed(() => upgradeConfig(props.config, textures.value));
		const emitter = new Emitter(parentContext.parent, updatedConfig.value);

	watchEffect(() => {
		let targetInstance = typeof emitter === 'function' ? emitter() : emitter;
		if (targetInstance) {
			Object.keys(props).filter(key => !['emit'].includes(key)).forEach(key => {
				if (props[key] !== undefined) {
					targetInstance[key] = props[key];
				}
			});
		}
	});

	watchEffect(() => {
		if (props.emit) emitter.init(updatedConfig.value);
=======



	import { getContextApp, getContextParent } from '../context';
	import { propsSyncEffect } from '../utils';

	const props = defineProps<Props>();
	const context = getContextApp();
	const parentContext = getContextParent();
	const textures = computed(() => context.stateApp.loadedAssets?.[props.key] as LoadedSpriteSheet);
	const updatedConfig = computed(() => upgradeConfig(props.config, textures));
	// svelte-ignore state_referenced_locally
	const emitter = new Emitter(parentContext.parent, updatedConfig);

	propsSyncEffect({ props, target: emitter, ignore: ['emit'] });

	watchEffect(() => {
		if (props.emit) emitter.init(updatedConfig);
>>>>>>> master:pixi-svelte/src/lib/components/ParticleEmitter.vue
	});

	if (context.stateApp.pixiApplication) {
		context.stateApp.pixiApplication.ticker.add(() => {
			if (context.stateApp.pixiApplication) {
				const deltaUpdate =
					context.stateApp.pixiApplication.ticker.deltaMS * (props.emitSpeed || 0.00234);
				emitter.update(deltaUpdate);
			}
		});
	}

	onUnmounted(() => {
		emitter.emit = false;
		emitter.destroy();
	});
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/ParticleEmitter.vue
</script>
=======

</script>
>>>>>>> master:pixi-svelte/src/lib/components/ParticleEmitter.vue
