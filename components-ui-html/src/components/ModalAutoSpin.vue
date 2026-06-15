<script setup lang="ts">
import { ref, computed } from "vue";
import { Popup } from "components-shared";
import { zIndex } from "constants-shared/zIndex";
import { stateModal } from "state-shared";
import { scrollIntoView } from "utils-shared/scroll";

import BaseContent from "./BaseContent.vue";
import BaseTitle from "./BaseTitle.vue";
import BaseScrollable from "./BaseScrollable.vue";
import BaseButtonWrap from "./BaseButtonWrap.vue";
import AutoSpinsOptions from "./AutoSpinsOptions.vue";
import AutoSpinsAdvanced from "./AutoSpinsAdvanced.vue";
import AutoSpinsStartButton from "./AutoSpinsStartButton.vue";
import { i18nDerived } from "../i18n/i18nDerived";
</script>

<template>
  <template v-if="stateModal.modal?.name === 'autoSpin'">
    <Popup :zIndex="zIndex.modal" :onclose="() => (stateModal.modal = null)">
      <BaseContent maxWidth="100%">
        <BaseTitle>
          {{ i18nDerived.autoSpins() }}
        </BaseTitle>
        <BaseScrollable type="column">
          <template #children="{ data }">
            <div class="subtitle" data-test="number-of-rounds">
              {{ i18nDerived.numberOfRounds() }}
            </div>
            <AutoSpinsOptions />
            <AutoSpinsAdvanced
              :ontoggle="
                (duration) => {
                  if (data.element) {
                    scrollIntoView({ element: data.element, duration });
                  }
                }
              "
            />
          </template>
        </BaseScrollable>
        <BaseButtonWrap type="full-width">
          <AutoSpinsStartButton />
        </BaseButtonWrap>
      </BaseContent>
    </Popup>
  </template>
</template>
