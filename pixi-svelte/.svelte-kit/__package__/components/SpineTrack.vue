<script lang="ts">
import * as SPINE_PIXI from '@esotericsoftware/spine-pixi-v8';

	type SpineState = SPINE_PIXI.Spine['state'];
	type TrackEntry = SPINE_PIXI.TrackEntry;

	export type Props = Partial<TrackEntry> & {
		trackIndex: Parameters<SpineState['setAnimation']>[0];
		animationName: Parameters<SpineState['setAnimation']>[1];
	};
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

	onUnmounted(() => {
		spine.state.setEmptyAnimation(props.trackIndex, 0);
	});
</script>
