import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['build', 'dist', 'js']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // Vite/i18next config files run in Node, not the browser.
    files: ['*.config.js', 'config/**/*.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    // ---------------------------------------------------------------------
    // Adoption baseline. This repo had no linter until now, so these rules
    // start as warnings rather than errors: turning them on as errors would
    // mean 55 failures across pre-existing code, several of them behavioural
    // (react-hooks/refs, react-hooks/set-state-in-effect) and not safe to
    // "fix" mechanically in a dependency-alignment change.
    //
    // `pnpm lint` is therefore green today and the warnings are the backlog.
    // Promote these back to "error" one rule at a time as the code is cleaned
    // up; the mechanical ones (no-unused-vars, no-empty) are the cheapest.
    // ---------------------------------------------------------------------
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-async-promise-executor': 'warn',
      'no-constant-binary-expression': 'warn',
      'no-empty': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-refresh/only-export-components': 'warn',
    },
  },
])
