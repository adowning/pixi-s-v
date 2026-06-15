<script lang="ts">
import * as PIXI from 'pixi.js';

	import type { OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<PIXI.SpriteOptions> & {
		isMask?: boolean;
	};
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';


	const props = defineProps<Props>();

	const parentContext = inject<any>('parentContext');
	const sprite = new PIXI.Sprite(props.texture);

	watchEffect(() => {
		let targetInstance = typeof sprite === 'function' ? sprite() : sprite;
		if (targetInstance) {
			Object.keys(props).filter(key => !['isMask'].includes(key)).forEach(key => {
				if (props[key] !== undefined) {
					targetInstance[key] = props[key];
				}
			});
		}
	});

	watchEffect(() => {
		if (props.isMask !== undefined) {
			parentContext.parent.mask = props.isMask ? sprite : null;
		}
	});

	parentContext.addToParent(sprite);
</script>
