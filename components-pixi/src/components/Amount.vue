<template>
<Container v-bind="containerProps" :pivot="anchorToPivot({ anchor, sizes: componentSizes  })">
	<template v-if="debug">
		<Rectangle
			:width="componentSizes.width"
			:height="componentSizes.height"
			:alpha="0.5"
			:borderWidth="2"
			:borderColor="0xffffff"
		/>
	</template>
	<template v-if="label">
		<Text
			:x="centerLabel ? componentSizes.width * 0.5 : 0"
			:anchor="{ x: centerLabel ? 0.5 : 0, y: 0.5 "}
			:y="stacked ? labelTextSizes.height * 0.5 : amountTextSizes.height * 0.5"
			text=:label="label"
			:style="{
				fontFamily: 'proxima-nova',
				fontSize: REM,
				fontWeight: '600',
				fill: disabled ? GREY : WHITE,
				...labelStyle,
			"}
			@resize="(value) => (labelTextSizes = value)"
		/>
	</template>
	<Text
		:x="stacked ? (centerLabel ? componentSizes.width * 0.5 : 0) : labelTextSizes.width + gap"
		:y="stacked ? labelTextSizes.height : 0"
		:anchor="{ x: centerLabel ? 0.5 : 0, y: 0 "}
		:text="numberToCurrencyString(amount)"
		:style="{
			fontFamily: 'proxima-nova',
			fontSize: REM,
			fontWeight: '600',
			fill: disabled ? GREY : amountStyle.fill === undefined ? WHITE : amountStyle.fill,
			...amountStyle,
		"}
		@resize="(value) => (amountTextSizes = value)"
	/>
</Container>
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import {
		REM,
		Text,
		Container,
		Rectangle,
		anchorToPivot,
		type PixiPoint,
		type TextProps,
		type ContainerProps,
	} from 'pixi-svelte';

	export type Props = Omit<ContainerProps, 'children' | 'pivot'> & {
		amount: number;
		amountStyle?: TextProps['style'];
		anchor?: PixiPoint;
		label?: string;
		centerLabel?: boolean;
		labelStyle?: TextProps['style'];
		stacked?: boolean;
		disabled?: boolean;
		debug?: boolean;
	};


	import { numberToCurrencyString } from 'utils-shared/amount';
	import { GREY, WHITE } from 'constants-shared/colors';

	const {
		amount,
		amountStyle = {},
		anchor,
		label,
		centerLabel,
		labelStyle = {},
		stacked,
		disabled,
		debug,
		...containerProps
	}: Props = $props();

	const labelTextSizes = ref({ width: 0, height: 0 });
	const amountTextSizes = ref({ width: 0, height: 0 });

	const gap = computed(() => label ? 0.25 * amountTextSizes.height : 0);
	const componentSizes = computed(() => ({ width: stacked
			? Math.max(labelTextSizes.width, amountTextSizes.width)
			: labelTextSizes.width + gap + amountTextSizes.width,
		height: stacked
			? labelTextSizes.height + amountTextSizes.height
			: Math.max(labelTextSizes.height, amountTextSizes.height),
	}));

</script>