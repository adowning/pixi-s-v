

<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';

	import * as PIXI from 'pixi.js';



	const spine = inject<any>('spineContext');
	const spineEventEmitter = new PIXI.EventEmitter();

	spine.beforeUpdateWorldTransforms = () => spineEventEmitter.emit('beforeUpdateWorldTransforms');
	spine.afterUpdateWorldTransforms = () => spineEventEmitter.emit('afterUpdateWorldTransforms');

	provide('spineEventEmitterContext', spineEventEmitter);
</script>

<template>
<slot />
</template>
