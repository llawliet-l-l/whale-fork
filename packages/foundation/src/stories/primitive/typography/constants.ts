import type { GroupComponent, GroupMap } from '../../shared/types.js';

import { TypographyDisplay } from './components.js';

export type TypographyKey =
  | 'font-family'
  | 'font-size'
  | 'font-weight'
  | 'line-height';

export const TYPOGRAPHY_GROUPS: GroupMap<TypographyKey> = {
  'font-family': {
    key: 'font-family',
    prefix: '--w-typography-font-family-',
    title: 'Typography Font Family Variables',
    component: TypographyDisplay as GroupComponent,
  },
  'font-size': {
    key: 'font-size',
    prefix: '--w-typography-font-size-',
    title: 'Typography Font Size Variables',
    component: TypographyDisplay as GroupComponent,
  },
  'font-weight': {
    key: 'font-weight',
    prefix: '--w-typography-font-weight-',
    title: 'Typography Font Weight Variables',
    component: TypographyDisplay as GroupComponent,
  },
  'line-height': {
    key: 'line-height',
    prefix: '--w-typography-line-height-',
    title: 'Typography Line Height Variables',
    component: TypographyDisplay as GroupComponent,
  },
} as const;
