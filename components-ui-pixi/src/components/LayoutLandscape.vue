<script setup lang="ts">
import { Rectangle } from "vue3-pixi";

import { stateUi } from "state-shared";
import { BLACK } from "constants-shared/colors";
import { MainContainer } from "components-layout";
import {
  LANDSCAPE_BASE_SIZE,
  LANDSCAPE_BACKGROUND_WIDTH_LIST,
} from "../constants";
import type { LayoutUiProps } from "../types";
import { getContext } from "../context";

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
        LANDSCAPE_BASE_SIZE -
        40
      "
      :pivot="
        anchorToPivot({
          anchor: { x: 0.5, y: 0 },
          sizes: {
            height: LANDSCAPE_BASE_SIZE,
            width: LANDSCAPE_BACKGROUND_WIDTH_LIST.reduce(
              (sum, width) => sum + width,
              0,
            ),
          },
        })
      "
    >
      <Container :y="LANDSCAPE_BASE_SIZE * 0.5 - 90" :x="85 + 20" :scale="0.8">
        <slot name="props.buttonMenu" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container :y="LANDSCAPE_BASE_SIZE * 0.5 - 90" :x="220 + 20" :scale="0.8">
        <slot name="props.buttonBuyBonus" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container :y="LANDSCAPE_BASE_SIZE * 0.5" :x="420" :scale="0.8">
        <slot name="props.amountBalance" v-bind="{ stacked: true }" />
      </Container>

      <Container :y="LANDSCAPE_BASE_SIZE * 0.5" :x="910" :scale="0.8">
        <slot name="props.amountWin" v-bind="{ stacked: true }" />
      </Container>

      <Container :y="LANDSCAPE_BASE_SIZE * 0.5" :x="1400" :scale="0.8">
        <slot name="props.amountBet" v-bind="{ stacked: true }" />
      </Container>

      <Container :y="LANDSCAPE_BASE_SIZE * 0.5 - 90" :x="1580" :scale="0.8">
        <slot name="props.buttonDecrease" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container :y="LANDSCAPE_BASE_SIZE * 0.5 - 90" :x="1715" :scale="0.8">
        <slot name="props.buttonIncrease" v-bind="{ anchor: 0.5 }" />
      </Container>
    </Container>

    <Container
      :x="context.stateLayoutDerived.mainLayoutStandard().width - 60"
      :y="context.stateLayoutDerived.mainLayoutStandard().height * 0.5"
      :pivot="
        anchorToPivot({
          anchor: { x: 1, y: 0.5 },
          sizes: {
            height: LANDSCAPE_BASE_SIZE,
            width: LANDSCAPE_BASE_SIZE,
          },
        })
      "
    >
      <Container
        :x="LANDSCAPE_BASE_SIZE * 0.5"
        :y="LANDSCAPE_BASE_SIZE * 0.5 - 140"
        :scale="0.8"
      >
        <slot name="props.buttonAutoSpin" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container
        :x="LANDSCAPE_BASE_SIZE * 0.5"
        :y="LANDSCAPE_BASE_SIZE * 0.5"
        :scale="0.8"
      >
        <slot name="props.buttonBet" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container
        :x="LANDSCAPE_BASE_SIZE * 0.5"
        :y="LANDSCAPE_BASE_SIZE * 0.5 + 140"
        :scale="0.8"
      >
        <slot name="props.buttonTurbo" v-bind="{ anchor: 0.5 }" />
      </Container>
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
        :x="165"
        :y="
          context.stateLayoutDerived.mainLayoutStandard().height -
          LANDSCAPE_BASE_SIZE -
          130
        "
      >
        <Container :scale="0.8" :y="LANDSCAPE_BASE_SIZE * 0.5 - 150 - 170 * 3">
          <slot name="props.buttonPayTable" v-bind="{ anchor: 0.5 }" />
        </Container>

        <Container :scale="0.8" :y="LANDSCAPE_BASE_SIZE * 0.5 - 150 - 170 * 2">
          <slot name="props.buttonGameRules" v-bind="{ anchor: 0.5 }" />
        </Container>

        <Container :scale="0.8" :y="LANDSCAPE_BASE_SIZE * 0.5 - 150 - 170 * 1">
          <slot name="props.buttonSettings" v-bind="{ anchor: 0.5 }" />
        </Container>

        <Container :scale="0.8" :y="LANDSCAPE_BASE_SIZE * 0.5 - 150">
          <slot name="props.buttonSoundSwitch" v-bind="{ anchor: 0.5 }" />
        </Container>

        <Container :scale="0.8" :y="LANDSCAPE_BASE_SIZE * 0.5">
          <slot name="props.buttonMenuClose" v-bind="{ anchor: 0.5 }" />
        </Container>
      </Container>
    </MainContainer>
  </template>
</template>
