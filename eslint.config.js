import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  // 1) ESLint rekommenderade regler (JS)
  js.configs.recommended,

  // 2) TypeScript-regler
  ...tseslint.configs.recommended,

  // 3) Prettier (stänger av regler som krockar med Prettier)
  prettierConfig,

  // 4) Projektets egna inställningar
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser, // 👈 Browser i stället för Node
        ...globals.es2021,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error', // kör Prettier som ESLint-regel
      'no-console': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // 5) Ignorerade paths
  {
    ignores: ['dist/', 'node_modules/', '.vscode/'],
  },
];
