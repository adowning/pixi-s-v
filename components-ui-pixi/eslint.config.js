import eslintPluginVue from "eslint-plugin-vue";
import typescriptEslintParser from "@typescript-eslint/parser";

export default [
  ...eslintPluginVue.configs["flat/recommended"],
  {
    languageOptions: {
      parserOptions: {
        parser: typescriptEslintParser,
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/valid-template-root": "off",
      "vue/no-reserved-component-names": "off",
      "vue/no-v-model-argument": "off",
      "vue/no-multiple-template-root": "off",
      "vue/no-unused-vars": "off",
    },
  },
];
