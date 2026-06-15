<script setup lang="ts">
import { Rectangle } from "vue3-pixi";

import { stateUi } from "state-shared";
import { BLACK } from "constants-shared/colors";
import { MainContainer } from "components-layout";
import { DESKTOP_BASE_SIZE, DESKTOP_BACKGROUND_WIDTH_LIST } from "../constants";
import { getContext } from "../context";
import type { LayoutUiProps } from "../types";

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
        10
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
      <Container :y="DESKTOP_BASE_SIZE * 0.5 - 160" :x="900 - 500" :scale="0.8">
        <slot name="props.amountBalance" v-bind="{ stacked: true }" />
      </Container>

      <Container :y="DESKTOP_BASE_SIZE * 0.5 - 160" :x="900" :scale="0.8">
        <slot name="props.amountWin" v-bind="{ stacked: true }" />
      </Container>

      <Container :y="DESKTOP_BASE_SIZE * 0.5 - 160" :x="900 + 500" :scale="0.8">
        <slot name="props.amountBet" v-bind="{ stacked: true }" />
      </Container>

      <Container :y="DESKTOP_BASE_SIZE * 0.5" :x="220" :scale="0.8">
        <slot name="props.buttonMenu" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container :y="DESKTOP_BASE_SIZE * 0.5" :x="220 + 150" :scale="0.8">
        <slot name="props.buttonBuyBonus" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container :y="DESKTOP_BASE_SIZE * 0.5" :x="160 + 150 * 4" :scale="0.8">
        <slot name="props.buttonAutoSpin" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container :y="DESKTOP_BASE_SIZE * 0.5" :x="160 + 150 * 5" :scale="0.8">
        <slot name="props.buttonBet" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container :y="DESKTOP_BASE_SIZE * 0.5" :x="160 + 150 * 6" :scale="0.8">
        <slot name="props.buttonTurbo" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container :y="DESKTOP_BASE_SIZE * 0.5" :x="1440" :scale="0.8">
        <slot name="props.buttonDecrease" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container :y="DESKTOP_BASE_SIZE * 0.5" :x="1440 + 150" :scale="0.8">
        <slot name="props.buttonIncrease" v-bind="{ anchor: 0.5 }" />
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
        :x="298"
        :y="
          context.stateLayoutDerived.mainLayoutStandard().height -
          DESKTOP_BASE_SIZE -
          10
        "
      >
        <Container :scale="0.8" :y="DESKTOP_BASE_SIZE * 0.5 - 150 - 170 * 3">
          <slot name="props.buttonPayTable" v-bind="{ anchor: 0.5 }" />
        </Container>

        <Container :scale="0.8" :y="DESKTOP_BASE_SIZE * 0.5 - 150 - 170 * 2">
          <slot name="props.buttonGameRules" v-bind="{ anchor: 0.5 }" />
        </Container>

        <Container :scale="0.8" :y="DESKTOP_BASE_SIZE * 0.5 - 150 - 170 * 1">
          <slot name="props.buttonSettings" v-bind="{ anchor: 0.5 }" />
        </Container>

        <Container :scale="0.8" :y="DESKTOP_BASE_SIZE * 0.5 - 150">
          <slot name="props.buttonSoundSwitch" v-bind="{ anchor: 0.5 }" />
        </Container>

        <Container :scale="0.8" :y="DESKTOP_BASE_SIZE * 0.5">
          <slot name="props.buttonMenuClose" v-bind="{ anchor: 0.5 }" />
        </Container>
      </Container>
    </MainContainer>
  </template>
</template>
