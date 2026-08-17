import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],

    ignores: [
      "dist/**",
      "node_modules/**",
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      react,
    },

    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,
    ],

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      // React 17+ me React import ki zarurat nahi
      "react/react-in-jsx-scope": "off",

      // React 17+ me JSX runtime ke liye
      "react/jsx-uses-react": "off",

      // Props validation use nahi kar rahe
      "react/prop-types": "off",

      // Helpful warnings
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "no-console": "off",
    },
  },
]);