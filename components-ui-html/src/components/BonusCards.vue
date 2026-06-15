<script setup lang="ts">
import { stateBet, stateModal, type BetModeData } from "state-shared";
import { Button } from "components-shared";
import { getContextEventEmitter } from "utils-event-emitter";
import { numberToCurrencyString } from "utils-shared/amount";

import BaseIcon from "./BaseIcon.vue";
import BonusCard from "./BonusCard.vue";
import BaseButtonContent from "./BaseButtonContent.vue";
import { stateBonus } from "../stateBonus";
import type { EmitterEventModal } from "../types";

interface Props {
  list: BetModeData[];
}

const props = defineProps<Props>();
const { eventEmitter } = getContextEventEmitter<EmitterEventModal>();
</script>

<template>
  <template v-for="mode in props.list" :key="mode.mode">
    <template v-if="mode.type !== 'default'">
      <BonusCard>
        <template #title="">
          <div class="title">
            {{ mode.text.title }}
          </div>
        </template>

        <template #description="">
          <template v-if="mode?.text?.description">
            <div class="description">
              {{ mode.text.description }}
            </div>
          </template>
        </template>

        <template #price="">
          <div class="price">
            {{
              `${numberToCurrencyString(stateBet.betAmount * mode.costMultiplier)}`
            }}}
          </div>
        </template>

        <template #button="">
          <Button
            :disabled="
              stateBet.betAmount <= 0 ||
              stateBet.balanceAmount < stateBet.betAmount * mode.costMultiplier
            "
            @click="
              () => {
                stateBonus.selectedBetModeKey = mode.mode;
                eventEmitter.broadcast({ type: 'buyBonusConfirm' });
                eventEmitter.broadcast({ type: 'soundPressGeneral' });
              }
            "
          >
            <BaseIcon width="100%" height="2rem" border="2px solid white;" />
            <BaseButtonContent>
              <span style="font-size: 1rem">{{ mode.text.button }}</span>
            </BaseButtonContent>
          </Button>
        </template>
      </BonusCard>
    </template>
  </template>
</template>

<style lang="scss">
.title {
  font-size: 1rem;
  line-height: 1rem;
  text-align: center;
}

.description {
  font-size: 0.75rem;
  text-align: center;
  min-height: 4rem;
  white-space: pre-line;
  display: inline-flex;
  align-items: center;
}

.description:empty {
  display: none;
}

.price {
  font-size: 1rem;
  line-height: 1rem;
  text-align: center;
  white-space: nowrap;
}
</style>
