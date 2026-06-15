<template>
<CanvasSizeRectangle
	@pointerup="props.onpress"
	cursor="pointer"
	eventMode="static"
	:backgroundColor="0xffffff"
	:backgroundAlpha="0.001"
/>
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import CanvasSizeRectangle from './CanvasSizeRectangle.vue';

	type Props = {
		onpress: () => void;
	};

	const props = defineProps<Props>();

</script>