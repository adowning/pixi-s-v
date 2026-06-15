<script setup lang="ts">
import { computed } from "vue";
import { Popup } from "components-shared";
import { zIndex } from "constants-shared/zIndex";
import { getContextLayout } from "utils-layout";
import { stateModal, stateBetDerived, type BetModeData } from "state-shared";

import BaseTitle from "./BaseTitle.vue";
import BonusCards from "./BonusCards.vue";
import BonusContentWrapLarge from "./BonusContentWrapLarge.vue";
import BonusContentWrapPortrait from "./BonusContentWrapPortrait.vue";
import BonusContentWrapLandscape from "./BonusContentWrapLandscape.vue";

const { stateLayoutDerived } = getContextLayout();

const list = computed(
  () =>
    Object.values(
      stateBetDerived.betModesAvailable() || {},
    ).reverse() as BetModeData[],
);

const isLarge = computed(
  () =>
    list.value.filter((i) => i.type === "buy").length > 3 ||
    list.value.filter((i) => i.type === "activate").length > 3,
);

const activateList = computed(() =>
  list.value.filter((i) => i.type === "activate"),
);
const buyList = computed(() => list.value.filter((i) => i.type === "buy"));
</script>

<template>
  <template v-if="stateModal.modal?.name === 'buyBonus'">
    <Popup :zIndex="zIndex.modal" :onclose="() => (stateModal.modal = null)">
      <BonusContentWrap
        :maxListLength="Math.max(activateList.length, buyList.length)"
      >
        <template #betAmount="">
          <BetMenuAmountToggle />
        </template>

        <template #bonusCardsActivate="">
          <BonusCards :list="activateList" />
        </template>

        <template #bonusCardsBuy="">
          <BonusCards :list="buyList" />
        </template>
      </BonusContentWrap>
    </Popup>
  </template>
</template>
