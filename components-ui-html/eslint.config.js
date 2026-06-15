import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".vue"],
      }
    }
  },
  {
    files: ["src/**/*.{js,mjs,cjs,ts,vue}"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "vue/html-indent": "off",
      "vue/max-attributes-per-line": "off",
      "vue/attribute-hyphenation": "off",
      "vue/no-v-html": "off"
    }
  }
];
