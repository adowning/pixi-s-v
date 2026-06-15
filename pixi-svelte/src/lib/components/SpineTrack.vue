<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/SpineTrack.vue
<script lang="ts">
import * as SPINE_PIXI from '@esotericsoftware/spine-pixi-v8';
=======
<template>

</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as SPINE_PIXI from '@esotericsoftware/spine-pixi-v8';
>>>>>>> master:pixi-svelte/src/lib/components/SpineTrack.vue

	type SpineState = SPINE_PIXI.Spine['state'];
	type TrackEntry = SPINE_PIXI.TrackEntry;

	export type Props = Partial<TrackEntry> & {
		trackIndex: Parameters<SpineState['setAnimation']>[0];
		animationName: Parameters<SpineState['setAnimation']>[1];
	};
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/SpineTrack.vue
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed , ref } from 'vue';


	const props = defineProps<Props>();
	const spine = inject<any>('spineContext');

	let track = ref(spine.state.tracks[props.trackIndex]);

	watchEffect(() => {
		if (props.trackIndex !== track.value?.trackIndex || props.animationName !== track.value?.animation?.name) {
			if (track.value) spine.state.setEmptyAnimation(track.value.trackIndex, 0);
			try {
				track.value = spine.state.setAnimation(props.trackIndex, props.animationName, props.loop);
=======




	import { propsSyncEffect } from '../utils';
	import { getContextSpine } from '../context';

	const props = defineProps<Props>();
	const spine = getContextSpine();

	const track = ref(spine.state.tracks[props.trackIndex]);

	watchEffect(() => {
		if (props.trackIndex !== track?.trackIndex || props.animationName !== track?.animation?.name) {
			if (track) spine.state.setEmptyAnimation(track.trackIndex, 0);
			try {
				track = spine.state.setAnimation(props.trackIndex, props.animationName, props.loop);
>>>>>>> master:pixi-svelte/src/lib/components/SpineTrack.vue
			} catch (error) {
				console.error(error);
				const animations = spine?.state?.data?.skeletonData?.animations;
				if (animations) {
					console.log(
						'Available animation names:',
						animations.map((animation) => animation.name),
					);
				}
			}
		}
	});

<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/SpineTrack.vue
	watchEffect(() => {
		let targetInstance = track.value;
		if (targetInstance) {
			Object.keys(props).filter(key => !['trackIndex', 'animationName'].includes(key)).forEach(key => {
				if (props[key] !== undefined) {
					targetInstance[key] = props[key];
				}
			});
		}
	});
=======
	propsSyncEffect({ props, target: () => track, ignore: ['trackIndex', 'animationName'] });
>>>>>>> master:pixi-svelte/src/lib/components/SpineTrack.vue

	onUnmounted(() => {
		spine.state.setEmptyAnimation(props.trackIndex, 0);
	});
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/SpineTrack.vue
</script>
=======

</script>
>>>>>>> master:pixi-svelte/src/lib/components/SpineTrack.vue
