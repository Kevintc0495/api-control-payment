// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          // varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        }
      ],
      'no-console': ['error'],
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-require-imports': 'off'
    },
  }
);
