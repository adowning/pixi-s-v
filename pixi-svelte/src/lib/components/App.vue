<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/App.vue
<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';


	import InitialiseApplication from './InitialiseApplication.vue';
	import InitialiseParent from './InitialiseParent.vue';
	import AssetsLoader from './AssetsLoader.vue';




	const context = inject<any>('appContext');

	onMounted(() => context.stateApp.reset());
	onUnmounted(() => context.stateApp.reset());
</script>

=======
>>>>>>> master:pixi-svelte/src/lib/components/App.vue
<template>
<InitialiseApplication>
	<InitialiseParent>
		<AssetsLoader>
			<slot />
		</AssetsLoader>
	</InitialiseParent>
</InitialiseApplication>
</template>
<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/App.vue
=======

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";



	import { getContextApp } from '../context';

	import InitialiseApplication from './InitialiseApplication.vue';
	import InitialiseParent from './InitialiseParent.vue';
	import AssetsLoader from './AssetsLoader.vue';

	type Props = {  };

	const props = defineProps<Props>();
	const context = getContextApp();

	onMounted(() => context.stateApp.reset());
	onUnmounted(() => context.stateApp.reset());

</script>
>>>>>>> master:pixi-svelte/src/lib/components/App.vue
