<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, useSlots } from "vue";
import { Button, Popup } from "components-shared";
import { zIndex } from "constants-shared/zIndex";
import { stateBet, stateModal, stateUi, INFINITY_MARK } from "state-shared";
import { getContextEventEmitter } from "utils-event-emitter";

import BaseIcon from "./BaseIcon.vue";
import BaseTitle from "./BaseTitle.vue";
import BaseContent from "./BaseContent.vue";
import BaseScrollable from "./BaseScrollable.vue";
import BaseButtonWrap from "./BaseButtonWrap.vue";
import BaseButtonContent from "./BaseButtonContent.vue";
import { stateBonus, stateBonusDerived } from "../stateBonus";
import { i18nDerived } from "../i18n/i18nDerived";
import type { EmitterEventModal } from "../types";

const { eventEmitter } = getContextEventEmitter<EmitterEventModal>();

const confirm = () => {
  stateBet.activeBetModeKey = stateBonus.selectedBetModeKey;

  if (stateBonusDerived.selectedBetModeData().type === "buy") {
    eventEmitter.broadcast({ type: "bet" });
  }

  if (stateBonusDerived.selectedBetModeData().type === "activate") {
    stateUi.autoSpinsLossLimitText = INFINITY_MARK;
    stateUi.autoSpinsSingleWinLimitText = INFINITY_MARK;
  }
};
</script>

<template>
  <template v-if="stateModal.modal?.name === 'buyBonusConfirm'">
    <Popup
      :zIndex="zIndex.dialog"
      :onclose="() => (stateModal.modal = { name: 'buyBonus' })"
    >
      <BaseContent maxWidth="500px">
        <BaseTitle>
          {{ stateBonusDerived.selectedBetModeData().text.title }}
        </BaseTitle>
        <BaseScrollable type="column">
          {{ stateBonusDerived.selectedBetModeData().text.dialog }}
        </BaseScrollable>
        <BaseButtonWrap type="max-width">
          <Button
            data-test="confirm-button"
            @click="
              () => {
                confirm();
                eventEmitter.broadcast({ type: 'soundPressGeneral' });
                stateModal.modal = null;
              }
            "
          >
            <BaseIcon width="100%" height="3rem" />
            <BaseButtonContent>
              <span style="font-size: 1rem">{{ i18nDerived.confirm() }}</span>
            </BaseButtonContent>
          </Button>
        </BaseButtonWrap>
      </BaseContent>
    </Popup>
  </template>
</template>
