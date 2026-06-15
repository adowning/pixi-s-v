<template>

</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as SPINE_PIXI from '@esotericsoftware/spine-pixi-v8';

	export type Props = Partial<SPINE_PIXI.Bone> & {
		boneName: Parameters<SPINE_PIXI.Spine['skeleton']['findBone']>[0];
	};


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