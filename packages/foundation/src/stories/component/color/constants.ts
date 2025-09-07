import type { GroupComponent, GroupMap } from '../../shared/types.js';

import { ColorStyle } from '../../shared/components.js';

export type ComponentColorKey = 'button';

export const COLOR_GROUPS: GroupMap<ComponentColorKey> = {
  button: {
    key: 'button',
    prefix: '--w-color-button-',
    title: 'Button Colors',
    description: 'Button colors for backgrounds, content, and borders',
    component: ColorStyle as GroupComponent,
  },
} as const;
