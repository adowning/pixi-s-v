<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, useSlots } from "vue";

import ModalError from "./ModalError.vue";
import ModalBetMenu from "./ModalBetMenu.vue";
import ModalBuyBonus from "./ModalBuyBonus.vue";
import ModalBuyBonusConfirm from "./ModalBuyBonusConfirm.vue";
import ModalAutoSpin from "./ModalAutoSpin.vue";
import ModalAutoSpinMessage from "./ModalAutoSpinMessage.vue";
import ModalPayTable from "./ModalPayTable.vue";
import ModalGameRules from "./ModalGameRules.vue";
import ModalSettings from "./ModalSettings.vue";

interface Props {}

const props = defineProps<Props>();
</script>

<template>
<ModalError />
  <ModalBetMenu />
  <ModalBuyBonus />
  <ModalBuyBonusConfirm />
  <ModalAutoSpin />
  <ModalAutoSpinMessage />
  <ModalPayTable>
    <slot name="version" />
  </ModalPayTable>
  <ModalGameRules>
    <slot name="version" />
  </ModalGameRules>
  <ModalSettings />
</template>

<style lang="scss">
:global(html) {
  font-size: 16px; /* you can chose any size here 16 is default */
  @media screen and (max-width: 500px) {
    font-size: 50%;
  }
}
</style>
