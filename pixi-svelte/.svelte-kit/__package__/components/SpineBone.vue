<script lang="ts">
import * as SPINE_PIXI from '@esotericsoftware/spine-pixi-v8';

	export type Props = Partial<SPINE_PIXI.Bone> & {
		boneName: Parameters<SPINE_PIXI.Spine['skeleton']['findBone']>[0];
	};
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
