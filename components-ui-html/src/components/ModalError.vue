<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, useSlots } from "vue";
import { Popup } from "components-shared";
import { zIndex } from "constants-shared/zIndex";
import { stateModal } from "state-shared";

import BaseContent from "./BaseContent.vue";
</script>

<template>
  <template v-if="stateModal.modal?.name === 'error'">
    <Popup
      :zIndex="zIndex.modal"
      persistent
      :onclose="() => (stateModal.modal = null)"
    >
      <BaseContent maxWidth="100%">
        {{ @const error = stateModal.modal?.error }
        <span>Sorry, something went wrong.</span>
        <div class="scrollY error-text">
          <template v-if="stateModal.modal?.error">
            <template
              v-if="
                stateModal.modal?.error?.error &&
                stateModal.modal?.error?.message
              "
            >
              <span>{{ JSON.stringify(stateModal.modal?.error?.error || 'unknown')
                }</span>
              <p>
                {{ JSON.stringify(stateModal.modal?.error?.message || 'unknown')
                }
              </p>
            </template>
            <template v-else>
              <p>{{ error }</p>
            </template>
          </template>
          <template v-else>
            <span>unknown error</span>
          </template>
        </div>
      </BaseContent>
    </Popup>
  </template>
</template>

<style lang="scss">
.error-text {
  max-height: 100px;
  max-width: 480px;
  border-radius: 8px;
  border: 1px solid red;
  white-space: normal;
  padding: 1rem;
}
</style>
