import type { BetModeKey } from "state-shared";
import { reactive } from "vue";
import { stateBetDerived } from "state-shared";

export const stateBonus = reactive({
  selectedBetModeKey: "BASE" as BetModeKey,
});

export const stateBonusDerived = {
  selectedBetModeData: () => {
    return stateBetDerived.betModesAvailable()?.[stateBonus.selectedBetModeKey];
  },
};
