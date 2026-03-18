import eslintKongUiConfig from '@kong/eslint-config-kong-ui'

export default [
  {
    ignores: [
      'playwright/.cache/**',
      'test-results/**',
      'playwright-report/**',
    ],
  },
  ...eslintKongUiConfig,
  // @typescript-eslint/recommended disables no-undef for .ts/.tsx but not .vue.
  // TypeScript handles undeclared identifiers in all three, so mirror that here.
  {
    files: ['**/*.vue'],
    rules: { 'no-undef': 'off' },
  },
]
