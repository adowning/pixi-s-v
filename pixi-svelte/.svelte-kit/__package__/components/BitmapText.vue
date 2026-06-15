<script lang="ts">
import * as PIXI from 'pixi.js';

	import type { Sizes, OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<PIXI.TextOptions> & {
		onresize?: (arg0: Sizes) => void;
	};
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';


	const props = defineProps<Props>();
	const parentContext = inject<any>('parentContext');
	const bitmapText = new PIXI.BitmapText({ text: props.text, style: props.style });

	watchEffect(() => {
		let targetInstance = typeof bitmapText === 'function' ? bitmapText() : bitmapText;
		if (targetInstance) {
			Object.keys(props).filter(key => !['onresize'].includes(key)).forEach(key => {
				if (props[key] !== undefined) {
					targetInstance[key] = props[key];
				}
			});
		}
	});

	watchEffect(() => {
		props?.text;
		props?.style;
		props.onresize?.({ width: bitmapText.width, height: bitmapText.height });
	});

	onMounted(() => {
		props.onresize?.({ width: bitmapText.width, height: bitmapText.height });
	});

	parentContext.addToParent(bitmapText);
</script>
