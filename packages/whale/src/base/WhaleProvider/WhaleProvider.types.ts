import type { ThemeProps } from '@radix-ui/themes';
import type { ReactNode } from 'react';

export type WhaleProviderProps = {
  /** Light or dark. Defaults to Radix's `inherit`. */
  appearance?: ThemeProps['appearance'];
  children: ReactNode;
};
