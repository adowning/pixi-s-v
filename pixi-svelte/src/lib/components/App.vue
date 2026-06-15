<template>
<InitialiseApplication>
	<InitialiseParent>
		<AssetsLoader>
			<slot />
		</AssetsLoader>
	</InitialiseParent>
</InitialiseApplication>
</template>

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