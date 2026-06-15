<template>
<slot />
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";


	import * as SPINE_PIXI from '@esotericsoftware/spine-pixi-v8';

	import type { OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<Omit<SPINE_PIXI.SpineOptions, 'children'>> & {
		spineData: SPINE_PIXI.SkeletonData;
		;
	};


	import { propsSyncEffect } from '../utils';
	import { setContextSpine, getContextParent } from '../context';

	const props = defineProps<Props>();
	const parentContext = getContextParent();
	const spine = new SPINE_PIXI.Spine(props.spineData);

	propsSyncEffect({ props, target: spine, ignore: ['children'] });

	parentContext.addToParent(spine);
	setContextSpine(spine);

</script>