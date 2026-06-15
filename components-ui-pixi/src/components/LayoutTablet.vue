<script setup lang="ts">
import LabelFreeSpinCounter from "./LabelFreeSpinCounter.vue";

import { stateUi } from "state-shared";
import { BLACK } from "constants-shared/colors";
import { MainContainer } from "components-layout";
import { getContext } from "../context";
import type { LayoutUiProps } from "../types";
import { DESKTOP_BASE_SIZE, DESKTOP_BACKGROUND_WIDTH_LIST } from "../constants";

const props = defineProps<any>();
// destructured props are read-only in vue or need toRef/toRefs, using props.* instead below if possible
const context = getContext();
</script>

<template>
  <Container :x="20">
    <slot name="props.gameName" />
  </Container>

  <Container :x="context.stateLayoutDerived.canvasSizes().width - 20">
    <slot name="props.logo" />
  </Container>

  <MainContainer standard align-vertical="bottom">
    <Container
      :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5"
      :y="
        context.stateLayoutDerived.mainLayoutStandard().height -
        DESKTOP_BASE_SIZE -
        30
      "
      :pivot="
        anchorToPivot({
          anchor: { x: 0.5, y: 0 },
          sizes: {
            height: DESKTOP_BASE_SIZE,
            width: DESKTOP_BACKGROUND_WIDTH_LIST.reduce(
              (sum, width) => sum + width,
              0,
            ),
          },
        })
      "
    >
      <Container :y="DESKTOP_BASE_SIZE * 0.5 - 220" :x="880 - 640">
        <slot name="props.amountBalance" v-bind="{ stacked: true }" />
      </Container>

      <Container :y="DESKTOP_BASE_SIZE * 0.5 - 220" :x="880">
        <slot name="props.amountWin" v-bind="{ stacked: true }" />
      </Container>

      <Container :y="DESKTOP_BASE_SIZE * 0.5 - 220" :x="880 + 640">
        <slot name="props.amountBet" v-bind="{ stacked: true }" />
      </Container>

      <Container :y="DESKTOP_BASE_SIZE * 0.5" :x="20">
        <slot name="props.buttonMenu" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container :y="DESKTOP_BASE_SIZE * 0.5" :x="20 + 180">
        <slot name="props.buttonBuyBonus" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container :y="DESKTOP_BASE_SIZE * 0.5" :x="-10 + 180 * 4">
        <slot name="props.buttonAutoSpin" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container :y="DESKTOP_BASE_SIZE * 0.5" :x="-10 + 180 * 5">
        <slot name="props.buttonBet" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container :y="DESKTOP_BASE_SIZE * 0.5" :x="-10 + 180 * 6">
        <slot name="props.buttonTurbo" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container :y="DESKTOP_BASE_SIZE * 0.5" :x="1560">
        <slot name="props.buttonDecrease" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container :y="DESKTOP_BASE_SIZE * 0.5" :x="1560 + 180">
        <slot name="props.buttonIncrease" v-bind="{ anchor: 0.5 }" />
      </Container>

      <template v-if="stateUi.freeSpinCounterShow">
        <Container :y="DESKTOP_BASE_SIZE * 0.5 - 320" :x="668">
          <LabelFreeSpinCounter />
        </Container>
      </template>
    </Container>
  </MainContainer>

  <template v-if="stateUi.menuOpen">
    <Rectangle
      event-mode="static"
      cursor="pointer"
      :alpha="0.5"
      :anchor="0.5"
      :background-color="BLACK"
      :width="context.stateLayoutDerived.canvasSizes().width"
      :height="context.stateLayoutDerived.canvasSizes().height"
      :x="context.stateLayoutDerived.canvasSizes().width * 0.5"
      :y="context.stateLayoutDerived.canvasSizes().height * 0.5"
      :onpointerup="() => (stateUi.menuOpen = false)"
    />

    <MainContainer standard align-vertical="bottom">
      <Container
        :x="100"
        :y="
          context.stateLayoutDerived.mainLayoutStandard().height -
          DESKTOP_BASE_SIZE -
          30
        "
      >
        <Container :y="DESKTOP_BASE_SIZE * 0.5 - 185 - 210 * 3">
          <slot name="props.buttonPayTable" v-bind="{ anchor: 0.5 }" />
        </Container>

        <Container :y="DESKTOP_BASE_SIZE * 0.5 - 185 - 210 * 2">
          <slot name="props.buttonGameRules" v-bind="{ anchor: 0.5 }" />
        </Container>

        <Container :y="DESKTOP_BASE_SIZE * 0.5 - 185 - 210 * 1">
          <slot name="props.buttonSettings" v-bind="{ anchor: 0.5 }" />
        </Container>

        <Container :y="DESKTOP_BASE_SIZE * 0.5 - 185">
          <slot name="props.buttonSoundSwitch" v-bind="{ anchor: 0.5 }" />
        </Container>

        <Container :y="DESKTOP_BASE_SIZE * 0.5">
          <slot name="props.buttonMenuClose" v-bind="{ anchor: 0.5 }" />
        </Container>
      </Container>
    </MainContainer>
  </template>
</template>
