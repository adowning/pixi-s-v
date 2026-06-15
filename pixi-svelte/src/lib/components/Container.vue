<template>
<slot />
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as PIXI from 'pixi.js';


	import type { OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<Omit<PIXI.ContainerOptions, 'children'>> & {
		;
	};


	import { propsSyncEffect } from '../utils';
	import { getContextParent, createContextParent } from '../context';

	const props = defineProps<Props>();
	const parentContext = getContextParent();
	const container = new PIXI.Container();

	propsSyncEffect({ props, target: container, ignore: ['children'] });
	parentContext.addToParent(container);
	createContextParent(container);

</script>