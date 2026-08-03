import { defineMain } from '@storybook/react-vite/node';

export default defineMain({
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  /*
   * Only addons that still ship as packages in Storybook 10. Actions,
   * backgrounds, controls, interactions and viewport all moved into core, and
   * addon-essentials no longer exists.
   */
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  /*
   * Stories import `@rango/whale` the way a consumer would, so props come from
   * Radix's declarations inside node_modules, which docgen cannot see through.
   * Controls are declared explicitly in argTypes instead.
   */
  typescript: { reactDocgen: false },
});
