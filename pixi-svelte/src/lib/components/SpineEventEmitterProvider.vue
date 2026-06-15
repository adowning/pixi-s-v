<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/SpineEventEmitterProvider.vue


<script setup lang="ts">
import { watchEffect, onMounted, onUnmounted, inject, provide, computed } from 'vue';

	import * as PIXI from 'pixi.js';



	const spine = inject<any>('spineContext');
=======
<template>
<slot />
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";



	export type Props = {  };


	import * as PIXI from 'pixi.js';

	import { getContextSpine, setContextSpineEventEmitter } from '../context';

	const props = defineProps<Props>();
	const spine = getContextSpine();
>>>>>>> master:pixi-svelte/src/lib/components/SpineEventEmitterProvider.vue
	const spineEventEmitter = new PIXI.EventEmitter();

	spine.beforeUpdateWorldTransforms = () => spineEventEmitter.emit('beforeUpdateWorldTransforms');
	spine.afterUpdateWorldTransforms = () => spineEventEmitter.emit('afterUpdateWorldTransforms');

<<<<<<< HEAD:pixi-svelte/.svelte-kit/__package__/components/SpineEventEmitterProvider.vue
	provide('spineEventEmitterContext', spineEventEmitter);
</script>

<template>
<slot />
</template>
=======
	setContextSpineEventEmitter(spineEventEmitter);

</script>
>>>>>>> master:pixi-svelte/src/lib/components/SpineEventEmitterProvider.vue
