<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, useSlots } from "vue";
import { Button, Popup } from "components-shared";
import { zIndex } from "constants-shared/zIndex";
import { stateModal } from "state-shared";

import BaseIcon from "./BaseIcon.vue";
import BaseTitle from "./BaseTitle.vue";
import BaseContent from "./BaseContent.vue";
import BaseScrollable from "./BaseScrollable.vue";
import BaseButtonWrap from "./BaseButtonWrap.vue";
import BaseButtonContent from "./BaseButtonContent.vue";
import BetMenuAmountToggle from "./BetMenuAmountToggle.vue";
import BetMenuAmountGrid from "./BetMenuAmountGrid.vue";
import { i18nDerived } from "../i18n/i18nDerived";

const confirm = () => {
  stateModal.modal = null;
};
</script>

<template>
  <template v-if="stateModal.modal?.name === 'betAmountMenu'">
    <Popup :zIndex="zIndex.modal" :onclose="() => (stateModal.modal = null)">
      <BaseContent maxWidth="100%">
        <BaseTitle>
          {{ i18nDerived.betMenu() }}
        </BaseTitle>
        <BaseScrollable type="column">
          <span>{{ i18nDerived.selectYourBet() }}</span>
          <BetMenuAmountToggle />
          <BetMenuAmountGrid />
        </BaseScrollable>
        <BaseButtonWrap type="full-width">
          <Button data-test="confirm-button" @click="confirm">
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
