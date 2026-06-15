<template>
<Container
	v-bind="containerProps"
	eventMode="static"
	:cursor="disabled ? 'not-allowed' : 'pointer'"
	:pivot="anchorToPivot({ sizes, anchor  })"
	@pointerover="() => {
		if (disabled) return;
		hovered = true;
	"}
	@pointerout="() => {
		if (disabled) return;
		hovered = false;
	"}
	@pointerdown="() => {
		if (disabled) return;
		pressed = true;
	"}
	@pointerup="() => {
		if (disabled) return;
		pressed = false;
		onpress();
	"}
>
	<template v-if="debug">
		<Rectangle
			:width="sizes.width"
			:height="sizes.height"
			:alpha="0.5"
			:borderWidth="2"
			:borderColor="0xffffff"
		/>
	</template>
	<slot v-bind="{ center, hovered, pressed }" />
</Container>
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";



	import {
		Container,
		Rectangle,
		anchorToPivot,
		type ContainerProps,
		type Sizes,
		type PixiPoint,
	} from 'pixi-svelte';

	type ContainerPropsToOmit =
		| 'eventMode'
		| 'cursor'
		| 'pivot'
		| 'children'
		| 'onpointerover'
		| 'onpointerout'
		| 'onpointerdown'
		| 'onpointerup';

	export type Props = Omit<ContainerProps, ContainerPropsToOmit> & {
		sizes: Sizes;
		onpress: () => void;
		disabled?: boolean;
		anchor?: PixiPoint;
		;
		debug?: boolean;
	};


	const props = defineProps<Props>();
	const { children, sizes, anchor, disabled, onpress, debug, ...containerProps  } = toRefs(props);
	const center = computed(() => ({ x: sizes.width * 0.5,
		y: sizes.height * 0.5,
	}));

	const hovered = ref(false);
	const pressed = ref(false);

	watchEffect(() => {
		if (disabled) {
			hovered = false;
			pressed = false;
		}
	});

</script>