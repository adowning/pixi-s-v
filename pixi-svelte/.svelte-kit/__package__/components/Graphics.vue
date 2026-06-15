<script lang="ts">
import * as PIXI from 'pixi.js';

	import type { OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<PIXI.GraphicsOptions> & {
		isMask?: boolean;
		draw: (graphics: PIXI.Graphics) => void;
	};
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';


	const props = defineProps<Props>();
	const parentContext = inject<any>('parentContext');
	const graphics = new PIXI.Graphics();

	watchEffect(() => {
		let targetInstance = typeof graphics === 'function' ? graphics() : graphics;
		if (targetInstance) {
			Object.keys(props).filter(key => !['isMask', 'draw'].includes(key)).forEach(key => {
				if (props[key] !== undefined) {
					targetInstance[key] = props[key];
				}
			});
		}
	});

	watchEffect(() => {
		if (props.isMask !== undefined) {
			parentContext.parent.mask = props.isMask ? graphics : null;
		}
	});

	watchEffect(() => {
		if (props.draw) {
			graphics.clear();
			props.draw(graphics);
		}
	});

	parentContext.addToParent(graphics);
</script>
