<template>
<template v-if="alpha.current > 0 || persistent">
	<Container v-bind="restProps" :alpha="alpha.current">
		<slot />
	</Container>
</template>
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";


	import { Tween } from 'svelte/motion';

	import { Container, type ContainerProps } from 'pixi-svelte';

	type Props = ContainerProps & {
		show: boolean;
		persistent?: boolean;
		duration?: number;
		oncomplete?: () => void;
	};

	const props = defineProps<Props>();
	const { show, persistent, duration, oncomplete, children, ...restProps  } = toRefs(props);
	const alpha = new Tween(show ? 1 : 0, { duration: duration });

	watchEffect(() => {
		alpha.set(show ? 1 : 0, { duration: duration }).then(() => oncomplete?.());
	});

	onMounted(async () => {
		if (show) {
			await alpha.set(0, { duration: 0 });
			await alpha.set(1);
			oncomplete?.();
		}
	});

</script>