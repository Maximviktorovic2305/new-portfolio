import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores(["dist/**", "node_modules/**", ".codebase-memory/**"]),
  {
    files: ["**/*.{js,mjs,ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      ...reactHooks.configs.flat.recommended.rules,
      ...reactRefresh.configs.vite.rules,
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-deprecated": "warn",
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],
      "no-restricted-syntax": [
        "error",
        {
          selector: "MemberExpression[property.name='innerHTML']",
          message: "Use React rendering instead of HTML injection sinks.",
        },
        { selector: "CallExpression[callee.name='eval']", message: "Dynamic code execution is forbidden." },
      ],
    },
  },
  {
    files: ["scripts/**/*.mjs", "*.config.{js,ts}"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    files: ["src/shared/config/theme-context.tsx"],
    rules: {
      // Context modules intentionally expose their provider, hook, and serializable presets together.
      "react-refresh/only-export-components": "off",
    },
  },
);
