<script setup lang="ts">
import { computed } from "vue";
import { Popup } from "components-shared";
import { zIndex } from "constants-shared/zIndex";
import { stateBet, stateModal } from "state-shared";

import BaseTitle from "./BaseTitle.vue";
import BaseContent from "./BaseContent.vue";
import BaseButtonWrap from "./BaseButtonWrap.vue";
import BaseButtonContent from "./BaseButtonContent.vue";
import AutoSpinsStartButton from "./AutoSpinsStartButton.vue";
import { i18nDerived } from "../i18n/i18nDerived";

const remaining = computed(() =>
  stateBet.autoSpinsCounter > 0 ? stateBet.autoSpinsCounter : 0,
);
const messageMap = {
  stop: "Auto spins stopped",
  complete: "Auto spins completed",
};
</script>

<template>
  <template v-if="stateModal.modal?.name === 'autoSpinMessage'">
    <Popup :zIndex="zIndex.modal" :onclose="() => (stateModal.modal = null)">
      <BaseContent maxWidth="100%">
        <BaseTitle>
          {{ i18nDerived.notification() }}
        </BaseTitle>
        <BaseScrollable type="column">
          <span class="text" data-test="auto-spin-stop-info">{{
            i18nDerived.autoSpinsStopInfo()
          }}</span>
          <div class="scrollY info-text" data-test="auto-spin-stop-content">
            {{ messageMap[stateModal.modal.message] }}
          </div>
        </BaseScrollable>
      </BaseContent>
    </Popup>
  </template>
</template>

<style lang="scss">
.text {
  text-align: center;
}

.info-text {
  text-align: center;
  max-height: 100px;
  max-width: 480px;
  border-radius: 8px;
  border: 1px solid white;
  white-space: normal;
  padding: 1rem;
}
</style>
