import rangoRules from 'eslint-config-rango';

export default [
  {
    ignores: ['**/dist/**', '**/storybook-static/**', '**/*.d.ts'],
  },
  ...rangoRules,
  { settings: { react: { version: 'detect' } } },
];
