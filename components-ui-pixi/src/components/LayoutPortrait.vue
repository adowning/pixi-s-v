<script setup lang="ts">
import { stateUi } from "state-shared";
import { BLACK } from "constants-shared/colors";
import { FadeContainer } from "components-pixi";
import { MainContainer } from "components-layout";
import { waitForResolve } from "utils-shared/wait";
import type { LayoutUiProps } from "../types";
import { getContext } from "../context";
import { ref } from "vue";
import LabelFreeSpinCounter from "./LabelFreeSpinCounter.vue";
import ButtonDrawer from "./ButtonDrawer.vue";

const props = defineProps<LayoutUiProps>();

const context = getContext();

const DRAWER_Y = {
  unfold: 0,
  fold: 550,
};
const drawerTween = ref(stateUi.drawerFold ? DRAWER_Y.fold : DRAWER_Y.unfold);

const DRAWER_BUTTON_Y = {
  unfold: 0,
  fold: 50,
};
const drawerButtonTween = ref(
  stateUi.drawerFold ? DRAWER_BUTTON_Y.fold : DRAWER_BUTTON_Y.unfold,
);

const drawerButtonFadeComplete = ref<((value?: unknown) => void) | undefined>();

context.eventEmitter.subscribeOnMount({
  drawerButtonShow: async () => {
    if (!stateUi.drawerButtonShow) {
      stateUi.drawerButtonShow = true;
      await waitForResolve(
        (resolve: any) => (drawerButtonFadeComplete.value = resolve),
      );
    }
  },
  drawerButtonHide: async () => {
    if (stateUi.drawerButtonShow) {
      stateUi.drawerButtonShow = false;
      await waitForResolve(
        (resolve: any) => (drawerButtonFadeComplete.value = resolve),
      );
    }
  },
  drawerUnfold: async () => {
    if (stateUi.drawerFold) {
      drawerButtonTween.value = DRAWER_BUTTON_Y.unfold;
      drawerTween.value = DRAWER_Y.unfold;
    }
  },
  drawerFold: async () => {
    if (!stateUi.drawerFold) {
      drawerButtonTween.value = DRAWER_BUTTON_Y.fold;
      drawerTween.value = DRAWER_Y.fold;
    }
  },
});
</script>

<template>
  <Container :x="20">
    <slot name="gameName" />
  </Container>

  <Container :x="context.stateLayoutDerived.canvasSizes().width - 20">
    <slot name="logo" />
  </Container>

  <MainContainer standard align-vertical="bottom">
    <!-- drawer container -->
    <Container :y="drawerTween">
      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 440"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 400"
      >
        <slot name="buttonMenu" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 + 440"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 400"
      >
        <slot name="buttonBuyBonus" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 400"
      >
        <slot name="buttonBet" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 180"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 400"
      >
        <slot name="buttonAutoSpin" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 + 180"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 400"
      >
        <slot name="buttonTurbo" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 270"
      >
        <slot name="amountBalance" v-bind="{ stacked: true }" />
      </Container>
    </Container>

    <Container :y="Math.min(drawerTween, 350)">
      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 670"
      >
        <slot name="amountWin" v-bind="{ stacked: true }" />
      </Container>
    </Container>
  </MainContainer>

  <MainContainer standard align-vertical="bottom">
    <template v-if="stateUi.freeSpinCounterShow">
      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 130"
      >
        <LabelFreeSpinCounter stacked />
      </Container>
    </template>
    <template v-else>
      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 130"
      >
        <slot name="amountBet" v-bind="{ stacked: true }" />
      </Container>

      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 390"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 85"
      >
        <slot name="buttonDecrease" v-bind="{ anchor: 0.5 }" />
      </Container>

      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 + 390"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 85"
      >
        <slot name="buttonIncrease" v-bind="{ anchor: 0.5 }" />
      </Container>
    </template>

    <!-- drawer button -->
    <FadeContainer
      persistent
      :show="stateUi.drawerButtonShow"
      :oncomplete="drawerButtonFadeComplete"
      :y="drawerButtonTween"
    >
      <Container
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 + 440"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 105"
      >
        <ButtonDrawer :disabled="!stateUi.drawerButtonShow" :anchor="0.5" />
      </Container>
    </FadeContainer>
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
        :x="context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 440"
        :y="context.stateLayoutDerived.mainLayoutStandard().height - 400"
      >
        <Container :y="-190 - 210 * 3">
          <slot name="buttonPayTable" v-bind="{ anchor: 0.5 }" />
        </Container>

        <Container :y="-190 - 210 * 2">
          <slot name="buttonGameRules" v-bind="{ anchor: 0.5 }" />
        </Container>

        <Container :y="-190 - 210 * 1">
          <slot name="buttonSettings" v-bind="{ anchor: 0.5 }" />
        </Container>

        <Container :y="-190">
          <slot name="buttonSoundSwitch" v-bind="{ anchor: 0.5 }" />
        </Container>

        <Container>
          <slot name="buttonMenuClose" v-bind="{ anchor: 0.5 }" />
        </Container>
      </Container>
    </MainContainer>
  </template>
</template>
