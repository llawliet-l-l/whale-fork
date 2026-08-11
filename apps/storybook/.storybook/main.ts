import { defineMain } from '@storybook/react-vite/node';

export default defineMain({
  framework: '@storybook/react-vite',
  // Stories live beside the components they document, in packages/whale.
  stories: [
    '../../../packages/whale/src/**/*.mdx',
    '../../../packages/whale/src/**/*.stories.@(ts|tsx)',
  ],
  /*
   * Only addons that still ship as packages in Storybook 10. Actions,
   * backgrounds, controls, interactions and viewport all moved into core, and
   * addon-essentials no longer exists.
   */
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  /*
   * Whale's components re-export Radix's, so their props come from
   * declarations inside node_modules, which docgen cannot see through.
   * Controls are declared explicitly in argTypes instead.
   */
  typescript: { reactDocgen: false },
});
