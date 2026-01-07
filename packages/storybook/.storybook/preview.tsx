import type { Decorator, Preview } from '@storybook/react';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import React from 'react';

// Load foundation tokens (dist) and local fonts
import '@whale/foundation/css';
import '../public/fonts/fonts.css';

/**
 * Theme toolbar + decorator
 * - provides a `data-theme` attribute to stories so your CSS variables work
 * - keeps logic simple & readable (JSX)
 */
const ThemeDecorator: Decorator = (Story, context) => {
  const theme = (context.globals?.theme as string) || 'light';
  return (
    <>
      <style>{`:root { font-size: 16px; }`}</style>
      <div
        data-theme={theme}
        style={{
          minHeight: '100vh',
          padding: '1rem',
          boxSizing: 'border-box',
          width: '100%',
          background: 'var(--w-color-neutral-bg-static-primary-emphasis)',
          fontFamily: 'var(--w-typography-font-family-sora, Sora, sans-serif)',
          fontSize: 'var(--w-typography-font-size-16, 1rem)',
          lineHeight: 'var(--w-typography-line-height-24, 1.5rem)',
          fontWeight: 'var(--w-typography-font-weight-regular, 400)',
        }}>
        <Story />
      </div>
    </>
  );
};

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
    backgrounds: { disable: true },
    actions: { argTypesRegex: '^on[A-Z].*' },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'desktop',
    },
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', left: '🌞' },
          { value: 'dark', title: 'Dark', left: '🌙' },
          { value: 'midnight', title: 'Midnight', left: '🌌' },
          { value: 'morning', title: 'Morning', left: '🌅' },
        ],
        dynamicTitle: true,
      },
    },
  },

  // shared decorators
  decorators: [
    ThemeDecorator,
    // add other global decorators here (providers, layout wrappers, etc.)
  ],
};

export default preview;
