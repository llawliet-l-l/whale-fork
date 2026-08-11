'use client';

import type { WhaleProviderProps } from './WhaleProvider.types.js';

import { Theme } from '@radix-ui/themes';
import React, { forwardRef } from 'react';

/**
 * Supplies the CSS variables that Whale's base components read. Pair it with
 * `import '@arthur2079/whale3/styles.css'`.
 *
 * The brand decisions are pinned rather than accepted as props — forwarding the
 * whole Radix `Theme` surface would enforce nothing. Only `appearance` is left
 * to the app, because dark mode is application state.
 */
export const WhaleProvider = forwardRef<HTMLDivElement, WhaleProviderProps>(
  function WhaleProvider({ appearance, children }, ref) {
    return (
      <Theme
        ref={ref}
        accentColor="cyan"
        panelBackground="solid"
        hasBackground={false}
        appearance={appearance}>
        {children}
      </Theme>
    );
  },
);
