<template>
<Container visible=:false="false">
	<BitmapText v-bind="textProps" @resize="(sizes) => (baseSizes = sizes)" />
</Container>

<Container>
	<BitmapText v-bind="textProps" :scale="Math.min(responsiveScale, 1)" />
</Container>
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import { Container, BitmapText, type BitmapTextProps } from 'pixi-svelte';

	type Props = Omit<BitmapTextProps, 'scale' | 'onresize'> & { maxWidth: number };

	const props = defineProps<Props>();
	const { maxWidth, ...textProps  } = toRefs(props);
	const baseSizes = ref({ width: 0, height: 0 });
	const responsiveScale = computed(() => maxWidth / (baseSizes.width || 1));

</script>