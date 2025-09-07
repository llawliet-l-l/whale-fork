import type { GroupComponent, GroupMap } from '../../shared/types.js';

import { TextStyle } from '../../shared/components.js';

export type HeadingKey =
  | '3x-large'
  | '2x-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'small';

export const HEADING_GROUPS: GroupMap<HeadingKey> = {
  '3x-large': {
    key: '3x-large',
    prefix: '--w-text-heading-3x-large-',
    title: '3x Large',
    component: TextStyle as GroupComponent,
  },
  '2x-large': {
    key: '2x-large',
    prefix: '--w-text-heading-2x-large-',
    title: '2x Large',
    component: TextStyle as GroupComponent,
  },
  'x-large': {
    key: 'x-large',
    prefix: '--w-text-heading-x-large-',
    title: 'X-Large',
    component: TextStyle as GroupComponent,
  },
  large: {
    key: 'large',
    prefix: '--w-text-heading-large-',
    title: 'Large',
    component: TextStyle as GroupComponent,
  },
  medium: {
    key: 'medium',
    prefix: '--w-text-heading-medium-',
    title: 'Medium',
    component: TextStyle as GroupComponent,
  },
  small: {
    key: 'small',
    prefix: '--w-text-heading-small-',
    title: 'Small',
    component: TextStyle as GroupComponent,
  },
} as const;
