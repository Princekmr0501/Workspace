//import js from "@eslint/js";
//import globals from "globals";
//import pluginReact from "eslint-plugin-react";
//import { defineConfig } from "eslint/config";

//export default defineConfig([
 // { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
//  pluginReact.configs.flat.recommended,
//]);
///////////////////////////

import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import tsPlugin from "@typescript-eslint/eslint-plugin";   
import tsParser from "@typescript-eslint/parser";          

export default defineConfig([

  // Base JS recommended rules
  js.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      parser: tsParser, // use parser directly
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: globals.node,
    },

    plugins: {
      "@typescript-eslint": tsPlugin, // use plugin directly
    },

    rules: {
      ...tsPlugin.configs.recommended.rules, //  correct way

      // Disable JS rule and use TS version
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",

      // Your formatting rules
      semi: ["error", "never"],
      quotes: ["error", "single"],
      "comma-dangle": ["error", "never"],
      indent: ["error", 4],
      "space-before-function-paren": ["error", "never"],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "space-infix-ops": "error",
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "eol-last": ["error", "always"],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
    },
  },
]);
