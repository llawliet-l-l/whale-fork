import { WhaleProvider } from '@rango-dev/whale';
import addonA11y from '@storybook/addon-a11y';
import { definePreview } from '@storybook/react-vite';
import React from 'react';

import '@rango-dev/whale/styles.css';

/*
 * Every base Whale component reads CSS variables that only exist inside
 * WhaleProvider, so it wraps every story. Appearance is the only theme choice
 * the provider leaves to the app, hence the single toolbar control.
 */
export default definePreview({
  /*
   * Addons listed here (not just in main.ts) contribute their types to every
   * story file, so any `parameters.a11y` a story sets is type-checked rather
   * than `any`.
   */
  addons: [addonA11y()],

  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
    /*
     * Radix paints the surface from the theme, so Storybook's own background
     * switcher would only fight it.
     */
    backgrounds: { disable: true },
  },

  globalTypes: {
    appearance: {
      name: 'Appearance',
      toolbar: {
        icon: 'mirror',
        items: ['light', 'dark', 'inherit'],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    appearance: 'light',
  },

  decorators: [
    (Story, context) => (
      <WhaleProvider appearance={context.globals.appearance}>
        {/* The provider pins `hasBackground={false}`, so the canvas paints. */}
        <div
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            background: 'var(--color-background)',
          }}>
          <Story />
        </div>
      </WhaleProvider>
    ),
  ],
});
