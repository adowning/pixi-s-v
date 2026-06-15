<script lang="ts">
import * as PIXI from 'pixi.js';

	import type { OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<PIXI.AnimatedSpriteOptions> & {
		animationSpeed?: PIXI.AnimatedSprite['animationSpeed'];
		loop?: PIXI.AnimatedSprite['loop'];
		play?: boolean;
	};
</script>

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';


	const props = defineProps<Props>();

	const parentContext = inject<any>('parentContext');
	const animatedSprite = new PIXI.AnimatedSprite(props.textures ?? []);

	watchEffect(() => {
		let targetInstance = typeof animatedSprite === 'function' ? animatedSprite() : animatedSprite;
		if (targetInstance) {
			Object.keys(props).filter(key => !['play'].includes(key)).forEach(key => {
				if (props[key] !== undefined) {
					targetInstance[key] = props[key];
				}
			});
		}
	});

	watchEffect(() => {
		if (props.play) {
			animatedSprite.gotoAndPlay(0);
		} else {
			animatedSprite.gotoAndStop(0);
		}
	});

	parentContext.addToParent(animatedSprite);
</script>
