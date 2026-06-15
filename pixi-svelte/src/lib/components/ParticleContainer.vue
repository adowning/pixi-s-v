<template>
<slot />
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import * as PIXI from 'pixi.js';


	import type { OverwriteCursor } from '../types';

	export type Props = OverwriteCursor<PIXI.ParticleContainerOptions> & {
		;
	};


	import { propsSyncEffect } from '../utils';
	import { getContextParent, setContextParticleParent } from '../context';

	const props = defineProps<Props>();
	const parentContext = getContextParent();
	const particleContainer = new PIXI.ParticleContainer();

	propsSyncEffect({ props, target: particleContainer, ignore: ['children'] });
	parentContext.addToParent(particleContainer);
	setContextParticleParent(particleContainer);

</script>