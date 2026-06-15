<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/SpineBone.vue
<script lang="ts">
import * as SPINE_PIXI from '@esotericsoftware/spine-pixi-v8';
=======
<template>

</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as SPINE_PIXI from '@esotericsoftware/spine-pixi-v8';
>>>>>>> master:pixi-svelte/src/lib/components/SpineBone.vue

	export type Props = Partial<SPINE_PIXI.Bone> & {
		boneName: Parameters<SPINE_PIXI.Spine['skeleton']['findBone']>[0];
	};
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/SpineBone.vue
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';


	const props = defineProps<Props>();
	const spine = inject<any>('spineContext');
	const bone = spine.skeleton.findBone(props.boneName);

	watchEffect(() => {
		let targetInstance = typeof bone === 'function' ? bone() : bone;
		if (targetInstance) {
			Object.keys(props).filter(key => !['boneName', 'y'].includes(key)).forEach(key => {
				if (props[key] !== undefined) {
					targetInstance[key] = props[key];
				}
			});
		}
	});
	watchEffect(() => {
		if (bone && props.y !== undefined) bone.y = -props.y;
	});
</script>
=======


	import { propsSyncEffect } from '../utils';
	import { getContextSpine } from '../context';

	const props = defineProps<Props>();
	const spine = getContextSpine();
	const bone = spine.skeleton.findBone(props.boneName);

	propsSyncEffect({ props, target: bone, ignore: ['boneName', 'y'] });
	watchEffect(() => {
		if (bone && props.y !== undefined) bone.y = -props.y;
	});

</script>
>>>>>>> master:pixi-svelte/src/lib/components/SpineBone.vue
