<template>
<template v-if="parentContext.parent">
	<slot />
</template>
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";



	import { createContextParent, getContextApp } from '../context';

	type Props = {  };

	const props = defineProps<Props>();
	const context = getContextApp();

	let parentContext = createContextParent(
		context.stateApp.pixiApplication?.stage ?? new PIXI.Container(),
	);

</script>