import { WhaleProvider } from '@rango/whale';
import addonA11y from '@storybook/addon-a11y';
import { definePreview } from '@storybook/react-vite';
import React from 'react';

import '@rango/whale/styles.css';

/*
 * Every Radix-based Whale component reads CSS variables that only exist inside
 * WhaleProvider, so it wraps every story. The toolbar drives the same props a
 * consumer would pass, which makes this the place to check how components hold
 * up across themes rather than only in the default one.
 */
export default definePreview({
  /*
   * Addons listed here (not just in main.ts) contribute their types to every
   * story file, so `parameters.a11y` below is checked rather than `any`.
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
    a11y: { test: 'todo' },
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
    accentColor: {
      name: 'Accent',
      toolbar: {
        icon: 'paintbrush',
        items: ['indigo', 'jade', 'crimson', 'amber', 'iris', 'gray'],
        dynamicTitle: true,
      },
    },
    grayColor: {
      name: 'Gray',
      toolbar: {
        icon: 'contrast',
        items: ['auto', 'slate', 'mauve', 'sage', 'olive', 'sand'],
        dynamicTitle: true,
      },
    },
    radius: {
      name: 'Radius',
      toolbar: {
        icon: 'component',
        items: ['none', 'small', 'medium', 'large', 'full'],
        dynamicTitle: true,
      },
    },
    scaling: {
      name: 'Scaling',
      toolbar: {
        icon: 'zoom',
        items: ['90%', '95%', '100%', '105%', '110%'],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    appearance: 'light',
    accentColor: 'indigo',
    grayColor: 'auto',
    radius: 'medium',
    scaling: '100%',
  },

  decorators: [
    (Story, context) => {
      const { appearance, accentColor, grayColor, radius, scaling } =
        context.globals;

      return (
        <WhaleProvider
          appearance={appearance}
          accentColor={accentColor}
          grayColor={grayColor}
          radius={radius}
          scaling={scaling}
          style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
          <Story />
        </WhaleProvider>
      );
    },
  ],
});
