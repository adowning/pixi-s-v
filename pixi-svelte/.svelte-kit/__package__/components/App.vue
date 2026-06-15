<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';


	import InitialiseApplication from './InitialiseApplication.vue';
	import InitialiseParent from './InitialiseParent.vue';
	import AssetsLoader from './AssetsLoader.vue';




	const context = inject<any>('appContext');

	onMounted(() => context.stateApp.reset());
	onUnmounted(() => context.stateApp.reset());
</script>

<template>
<InitialiseApplication>
	<InitialiseParent>
		<AssetsLoader>
			<slot />
		</AssetsLoader>
	</InitialiseParent>
</InitialiseApplication>
</template>
