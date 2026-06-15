<template>
<Container :x="props.x" :y="props.y" :pivot="anchorToPivot({ anchor: { x: 0.5, y: 0 ", sizes })}>
	<slot v-bind="sizes" />
	<Container>
		<slot v-bind="sizes" />

		<Rectangle
			isMask
			:height="props.height"
			:width="props.width * (context.stateApp.loadingProgress / 100)"
		/>
	</Container>
	<slot v-bind="sizes" />
</Container>
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import { Container, Rectangle, getContextApp, anchorToPivot, Sprite } from 'pixi-svelte';


	type Props = {
		x?: number;
		y?: number;
		width: number;
		height: number;
		background: Snippet<[{ width: number; height: number }]>;
		progress: Snippet<[{ width: number; height: number }]>;
		frame: Snippet<[{ width: number; height: number }]>;
	};

	const props = defineProps<Props>();
	const context = getContextApp();

	const sizes = computed(() => ({ width: props.width, height: props.height });

</script>