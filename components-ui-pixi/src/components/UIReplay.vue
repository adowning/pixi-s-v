<script setup lang="ts">
import LabelFreeSpinCounter from "./LabelFreeSpinCounter.vue";
import UiFadeContainer from "./UiFadeContainer.vue";

import { EnableSpaceHold } from "components-shared";
import { stateUi } from "state-shared";
import { BLACK } from "constants-shared/colors";
import { MainContainer } from "components-layout";
import { getContext } from "../context";
import type { LayoutUiProps } from "../types";

type Props = {
  gameName: LayoutUiProps["gameName"];
  logo: LayoutUiProps["logo"];
};

const props = defineProps<any>();
// destructured props are read-only in vue or need toRef/toRefs, using * instead below if possible
const context = getContext();
</script>

<template>
  <EnableSpaceHold />

  <UiFadeContainer>
    <Container :x="20">
      <slot name="gameName" />
    </Container>

    <Container :x="context.stateLayoutDerived.canvasSizes().width - 20">
      <slot name="logo" />
    </Container>

    <MainContainer standard align-vertical="bottom">
      <template
        v-if="
          stateUi.freeSpinCounterShow &&
          ['portrait', 'tablet'].includes(
            context.stateLayoutDerived.layoutType(),
          )
        "
      >
        <Container
          :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5"
          :y="120"
        >
          <LabelFreeSpinCounter stacked />
        </Container>
      </template>

      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 270"
        :scale="0.8"
      >
        <LabelWin stacked />
      </Container>

      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 150"
        :scale="0.8"
      >
        <LabelBet stacked />
      </Container>

      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 350"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 270 - 15"
        :scale="0.7"
      >
        <ButtonMenu />
      </Container>

      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 350"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 150 - 15"
        :scale="0.7"
      >
        <ButtonTurbo />
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
          :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 350"
          :y="context.stateLayoutDerived.mainLayoutStandard().height - 270 - 15"
        >
          <Container :scale="0.8" :y="0 * 0.5 - 150 - 170 * 3">
            <ButtonPayTable :anchor="0.5" />
          </Container>

          <Container :scale="0.8" :y="0 * 0.5 - 150 - 170 * 2">
            <ButtonGameRules :anchor="0.5" />
          </Container>

          <Container :scale="0.8" :y="0 * 0.5 - 150 - 170 * 1">
            <ButtonSettings :anchor="0.5" />
          </Container>

          <Container :scale="0.8" :y="0 * 0.5 - 150">
            <ButtonSoundSwitch :anchor="0.5" />
          </Container>

          <Container :scale="0.8" :y="0 * 0.5">
            <ButtonMenuClose :anchor="0.5" />
          </Container>
        </Container>
      </MainContainer>
    </template>
  </UiFadeContainer>
</template>
