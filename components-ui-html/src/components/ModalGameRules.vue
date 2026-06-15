<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, useSlots } from "vue";

import { Popup } from "components-shared";
import { zIndex } from "constants-shared/zIndex";
import { stateModal } from "state-shared";

import BaseContent from "./BaseContent.vue";
import BaseScrollable from "./BaseScrollable.vue";

interface Props {}

const props = defineProps<Props>();
</script>

<template>
  <template v-if="stateModal.modal?.name === 'gameRules'">
    <Popup :zIndex="zIndex.modal" :onclose="() => (stateModal.modal = null)">
      <BaseContent maxWidth="100%">
        <BaseScrollable type="column">
          <span>ADD YOUR GAME RULES</span>
          <slot />
        </BaseScrollable>
      </BaseContent>
    </Popup>
  </template>
</template>
