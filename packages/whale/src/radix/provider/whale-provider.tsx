'use client';

import { Theme, type ThemeProps } from '@radix-ui/themes';
import React, { forwardRef } from 'react';

export type WhaleProviderProps = ThemeProps;

/**
 * Supplies the CSS variables that Radix-based Whale components read. Pair it
 * with `import '@arthur2079/whale2/styles.css'`.
 */
export const WhaleProvider = forwardRef<HTMLDivElement, WhaleProviderProps>(
  function WhaleProvider(props, ref) {
    return <Theme ref={ref} {...props} />;
  },
);
