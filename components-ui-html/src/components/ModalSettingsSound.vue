<script setup lang="ts">
import { getContextEventEmitter } from "utils-event-emitter";
import { Button } from "components-shared";
import BaseIcon from "./BaseIcon.vue";
import BaseButtonContent from "./BaseButtonContent.vue";
import type { EmitterEventModal } from "../types";

const { eventEmitter } = getContextEventEmitter<EmitterEventModal>();

const value = defineModel<number>("value", { default: 0 });
</script>

<template>
  <div class="col">
    <span><slot /></span>
    <div class="row">
      <!-- button -->
      <div class="button-wrap">
        <Button
          @click="
            () => {
              eventEmitter.broadcast({ type: 'soundPressGeneral' });
              if (value === 0) {
                value = 50;
              } else {
                value = 0;
              }
            }
          "
        >
          <BaseIcon width="3rem" height="3rem" />
          <BaseButtonContent>
            <span>{{ value > 0 ? "ON" : "OFF" }}</span>
          </BaseButtonContent>
        </Button>
      </div>

      <!-- range -->
      <input v-model="value" type="range" min="0" max="100" class="range">

      <!-- value -->
      <div class="value">
        <span>{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.col {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

.button-wrap {
  width: 15%;
  display: flex;
  align-items: center;
}

.range {
  width: 70%;
  display: flex;
  align-items: center;
}

.value {
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
