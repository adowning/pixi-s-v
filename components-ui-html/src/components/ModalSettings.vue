<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, useSlots } from "vue";
import { zIndex } from "constants-shared/zIndex";
import { Popup } from "components-shared";
import { stateModal, stateSound } from "state-shared";

import BaseTitle from "./BaseTitle.vue";
import BaseContent from "./BaseContent.vue";
import BaseScrollable from "./BaseScrollable.vue";
import ModalSettingsSound from "./ModalSettingsSound.vue";
import { i18nDerived } from "../i18n/i18nDerived";
</script>

<template>
  <template v-if="stateModal.modal?.name === 'settings'">
    <Popup :zIndex="zIndex.modal" :onclose="() => (stateModal.modal = null)">
      <BaseContent maxWidth="100%">
        <BaseTitle>{{ i18nDerived.settings() }}</BaseTitle>
        <BaseScrollable type="column">
          <wrap class="wrap">
            <ModalSettingsSound bind:v:alue="stateSound.volumeValueMaster">
              {{ i18nDerived.masterVolume() }}
            </ModalSettingsSound>

            <ModalSettingsSound bind:v:alue="stateSound.volumeValueMusic">
              {{ i18nDerived.musicVolume() }}
            </ModalSettingsSound>

            <ModalSettingsSound bind:v:alue="stateSound.volumeValueSoundEffect">
              {{ i18nDerived.soundEffectVolume() }}
            </ModalSettingsSound>
          </wrap>
        </BaseScrollable>
      </BaseContent>
    </Popup>
  </template>
</template>

<style lang="scss">
.wrap {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 480px) {
    min-width: 360px;
  }

  @media (min-width: 800px) {
    min-width: 480px;
  }
}
</style>
