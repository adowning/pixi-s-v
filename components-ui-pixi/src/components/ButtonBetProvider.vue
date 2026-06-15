<script setup lang="ts">
import { stateBet, stateBetDerived } from "state-shared";
import { getContext } from "../context";
import { computed, ref } from "vue";

// Module context
export type ButtonBetKey =
  | "spin_default"
  | "spin_disabled"
  | "stop_default"
  | "stop_disabled";

// destructured props are read-only in vue or need toRef/toRefs, using props.* instead below if possible
const context = getContext();

const stopDisabled = ref(false);

const bet = () => {
  if (stateBetDerived.activeBetMode()?.type === "buy")
    stateBet.activeBetModeKey = "BASE";
  context.eventEmitter.broadcast({ type: "bet" });
};

const stop = () => {
  if (!stopDisabled.value) {
    if (stateBetDerived.hasAutoBetCounter()) stateBet.autoSpinsCounter = 0;
    context.eventEmitter.broadcast({ type: "stopButtonClick" });
  }
};

const onpress = () => {
  context.eventEmitter.broadcast({ type: "soundPressBet" });

  if (context.stateXstateDerived.isIdle()) {
    bet();
  } else {
    stop();
  }
};

const getKey = () => {
  if (context.stateXstateDerived.isIdle()) {
    if (!stateBetDerived.isBetCostAvailable()) return "spin_disabled";
    return "spin_default";
  }

  if (!context.stateXstateDerived.isIdle()) {
    if (stopDisabled.value) return "stop_disabled";
    if (stateBetDerived.hasAutoBetCounter()) return "stop_default";
    if (stateBet.isTurbo) return "stop_disabled";
    return "stop_default";
  }

  return "spin_default";
};

const key = computed(getKey);

context.eventEmitter.subscribeOnMount({
  stopButtonClick: () => (stopDisabled.value = true),
  stopButtonEnable: () => (stopDisabled.value = false),
});
</script>

<template>
  <slot name="props.children" v-bind="{ key, onpress }" />
</template>
