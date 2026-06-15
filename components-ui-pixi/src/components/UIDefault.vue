<script setup lang="ts">
import UiFadeContainer from "./UiFadeContainer.vue";

import { getContextLayout } from "utils-layout";
import { EnableSpaceHold } from "components-shared";
import { computed } from "vue";

type Props = {
  gameName: any;
  logo: any;
};

const props = defineProps<any>();
// destructured props are read-only in vue or need toRef/toRefs, using * instead below if possible

const { stateLayoutDerived } = getContextLayout();

const LAYOUT_COMPONENT_MAP = {
  desktop: LayoutDesktop,
  portrait: LayoutPortrait,
  landscape: LayoutLandscape,
  tablet: LayoutTablet,
};

const LayoutComponent = computed(
  () => LAYOUT_COMPONENT_MAP[stateLayoutDerived.layoutType()],
);
</script>

<template>
  <EnableSpaceHold />

  <UiFadeContainer>
    <LayoutComponent>
      <template #gameName="">
        <slot name="gameName" />
      </template>

      <template #logo="">
        <slot name="logo" />
      </template>

      <template #amountBalance="labelProps">
        <LabelBalance v-bind="labelProps" />
      </template>

      <template #amountWin="labelProps">
        <LabelWin v-bind="labelProps" />
      </template>

      <template #amountBet="labelProps">
        <LabelBet v-bind="labelProps" />
      </template>

      <template #buttonBuyBonus="buttonProps">
        <ButtonBuyBonus v-bind="buttonProps" />
      </template>

      <template #buttonBet="buttonProps">
        <ButtonBet v-bind="buttonProps" />
      </template>

      <template #buttonTurbo="buttonProps">
        <ButtonTurbo v-bind="buttonProps" />
      </template>

      <template #buttonAutoSpin="buttonProps">
        <ButtonAutoSpin v-bind="buttonProps" />
      </template>

      <template #buttonIncrease="buttonProps">
        <ButtonIncrease v-bind="buttonProps" />
      </template>

      <template #buttonDecrease="buttonProps">
        <ButtonDecrease v-bind="buttonProps" />
      </template>

      <template #buttonMenu="buttonProps">
        <ButtonMenu v-bind="buttonProps" />
      </template>

      <template #buttonMenuClose="buttonProps">
        <ButtonMenuClose v-bind="buttonProps" />
      </template>

      <template #buttonPayTable="buttonProps">
        <ButtonPayTable v-bind="buttonProps" />
      </template>

      <template #buttonGameRules="buttonProps">
        <ButtonGameRules v-bind="buttonProps" />
      </template>

      <template #buttonSettings="buttonProps">
        <ButtonSettings v-bind="buttonProps" />
      </template>

      <template #buttonSoundSwitch="buttonProps">
        <ButtonSoundSwitch v-bind="buttonProps" />
      </template>
    </LayoutComponent>
  </UiFadeContainer>
</template>
