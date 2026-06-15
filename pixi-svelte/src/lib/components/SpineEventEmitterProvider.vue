<template>
<slot />
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";



	export type Props = {  };


	import * as PIXI from 'pixi.js';

	import { getContextSpine, setContextSpineEventEmitter } from '../context';

	const props = defineProps<Props>();
	const spine = getContextSpine();
	const spineEventEmitter = new PIXI.EventEmitter();

	spine.beforeUpdateWorldTransforms = () => spineEventEmitter.emit('beforeUpdateWorldTransforms');
	spine.afterUpdateWorldTransforms = () => spineEventEmitter.emit('afterUpdateWorldTransforms');

	setContextSpineEventEmitter(spineEventEmitter);

</script>