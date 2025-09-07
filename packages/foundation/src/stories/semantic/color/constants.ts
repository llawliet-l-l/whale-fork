import type { GroupComponent, GroupMap } from '../../shared/types.js';

import { ColorStyle } from '../../shared/components.js';

export type SemanticColorKey = 'neutral' | 'brand' | 'accent' | 'system';

export const COLOR_GROUPS: GroupMap<SemanticColorKey> = {
  neutral: {
    key: 'neutral',
    prefix: '--w-color-neutral-',
    title: 'Neutral Colors',
    description: 'Neutral colors for backgrounds, content, and borders',
    component: ColorStyle as GroupComponent,
  },
  brand: {
    key: 'brand',
    prefix: '--w-color-brand-',
    title: 'Brand Colors',
    description: 'Brand colors for primary interactive elements',
    component: ColorStyle as GroupComponent,
  },
  accent: {
    key: 'accent',
    prefix: '--w-color-accent-',
    title: 'Accent Colors',
    description: 'Accent colors for secondary interactive elements',
    component: ColorStyle as GroupComponent,
  },
  system: {
    key: 'system',
    prefix: '--w-color-system-',
    title: 'System Colors',
    description: 'Colors for status indicators, alerts, and feedback',
    component: ColorStyle as GroupComponent,
  },
} as const;
