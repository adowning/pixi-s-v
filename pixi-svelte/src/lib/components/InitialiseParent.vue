<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/InitialiseParent.vue
<script setup lang="ts">
import * as PIXI from 'pixi.js';
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';






	const context = inject<any>('appContext');

	const parentContainer = context.stateApp.pixiApplication?.stage ?? new PIXI.Container();
	let parentContext = { parent: parentContainer, addToParent: (node) => { onMounted(() => { parentContainer.addChild(node); parentContainer.sortChildren(); }); onUnmounted(() => { if(node) node.destroy(); }); } };
	provide('parentContext', parentContext);
</script>

=======
>>>>>>> master:pixi-svelte/src/lib/components/InitialiseParent.vue
<template>
<template v-if="parentContext.parent">
	<slot />
</template>
</template>
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/InitialiseParent.vue
=======

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
>>>>>>> master:pixi-svelte/src/lib/components/InitialiseParent.vue
