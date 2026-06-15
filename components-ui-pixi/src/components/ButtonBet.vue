<script setup lang="ts">
import { Text } from "vue3-pixi";
import UiSprite from "./UiSprite.vue";
import { Container } from "vue3-pixi";
import ButtonBetProvider from "./ButtonBetProvider.vue";

import { Button, type ButtonProps } from "components-pixi";
import { OnHotkey } from "components-shared";
import { stateBetDerived } from "state-shared";
import { UI_BASE_FONT_SIZE, UI_BASE_SIZE } from "../constants";
import { i18nDerived } from "../i18n/i18nDerived";
import { computed } from "vue";

const props: Partial<Omit<ButtonProps, "children">> = defineProps<any>();
const disabled = computed(() => !stateBetDerived.isBetCostAvailable());
const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };
</script>

<template>
  <ButtonBetProvider>
    <template #children="{ key, onpress }">
      <OnHotkey hotsprite-key="Space" :disabled="disabled" :onpress="onpress" />
      <Button
        v-bind="props"
        :sizes="sizes"
        :onpress="onpress"
        :disabled="disabled"
      >
        <template #children="{ center, hovered }">
          <Container v-bind="center">
            <UiSprite
              sprite-key="bet"
              :width="sizes.width"
              :height="sizes.height"
              :anchor="0.5"
              v-bind="
                disabled || ['spin_disabled', 'stop_disabled'].includes(key)
                  ? {
                      backgroundColor: 0xaaaaaa,
                    }
                  : {}
              "
            />
            <Text
              :anchor="0.5"
              :text="
                ['spin_default', 'spin_disabled'].includes(key)
                  ? i18nDerived.bet()
                  : i18nDerived.stop()
              "
              :style="{
                align: 'center',
                wordWrap: true,
                wordWrapWidth: 200,
                fontFamily: 'proxima-nova',
                fontWeight: '600',
                fontSize: UI_BASE_FONT_SIZE * 0.9,
                fill: 0xffffff,
              }"
            />
          </Container>
        </template>
      </Button>
    </template>
  </ButtonBetProvider>
</template>
