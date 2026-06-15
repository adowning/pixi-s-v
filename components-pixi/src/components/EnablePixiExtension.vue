<template>

</template>

<script setup lang="ts">
	import { computed, ref, watchEffect, toRefs } from "vue";

	import { getContextApp } from 'pixi-svelte';

	const context = getContextApp();

	// @ts-ignore
	globalThis.__PIXI_APP__ = context.stateApp.pixiApplication;

</script>