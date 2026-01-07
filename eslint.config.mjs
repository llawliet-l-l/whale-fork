import rangoRules from "eslint-config-rango";

export default [
  { ignores: ['**/dist/**', '**/storybook-static/**', '**/*.d.ts', 'packages/**/tsup.config.ts'] },
  ...rangoRules,
  { settings: { react: { version: 'detect' } } }
];
