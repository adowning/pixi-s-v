<script setup lang="ts">
import * as PIXI from 'pixi.js';
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';






	const context = inject<any>('appContext');

	const parentContainer = context.stateApp.pixiApplication?.stage ?? new PIXI.Container();
	let parentContext = { parent: parentContainer, addToParent: (node) => { onMounted(() => { parentContainer.addChild(node); parentContainer.sortChildren(); }); onUnmounted(() => { if(node) node.destroy(); }); } };
	provide('parentContext', parentContext);
</script>

<template>
<template v-if="parentContext.parent">
	<slot />
</template>
</template>
