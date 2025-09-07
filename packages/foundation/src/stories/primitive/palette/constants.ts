import type { GroupComponent, GroupMap } from '../../shared/types.js';

import { ColorStyle } from '../../shared/components.js';

export type PaletteKey =
  | 'black'
  | 'white'
  | 'gray'
  | 'lavender'
  | 'blue'
  | 'sky'
  | 'teal'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'magenta'
  | 'purple';

export const PALETTE_GROUPS: GroupMap<PaletteKey> = {
  black: {
    key: 'black',
    prefix: '--w-palette-black-',
    title: 'Black Palette',
    description: 'Black color variations',
    component: ColorStyle as GroupComponent,
  },
  white: {
    key: 'white',
    prefix: '--w-palette-white-',
    title: 'White Palette',
    description: 'White color variations',
    component: ColorStyle as GroupComponent,
  },
  gray: {
    key: 'gray',
    prefix: '--w-palette-gray-',
    title: 'Gray Palette',
    description: 'Gray color variations',
    component: ColorStyle as GroupComponent,
  },
  lavender: {
    key: 'lavender',
    prefix: '--w-palette-lavender-',
    title: 'Lavender Palette',
    description: 'Lavender color variations',
    component: ColorStyle as GroupComponent,
  },
  blue: {
    key: 'blue',
    prefix: '--w-palette-blue-',
    title: 'Blue Palette',
    description: 'Blue color variations',
    component: ColorStyle as GroupComponent,
  },
  sky: {
    key: 'sky',
    prefix: '--w-palette-sky-',
    title: 'Sky Palette',
    description: 'Sky color variations',
    component: ColorStyle as GroupComponent,
  },
  teal: {
    key: 'teal',
    prefix: '--w-palette-teal-',
    title: 'Teal Palette',
    description: 'Teal color variations',
    component: ColorStyle as GroupComponent,
  },
  green: {
    key: 'green',
    prefix: '--w-palette-green-',
    title: 'Green Palette',
    description: 'Green color variations',
    component: ColorStyle as GroupComponent,
  },
  yellow: {
    key: 'yellow',
    prefix: '--w-palette-yellow-',
    title: 'Yellow Palette',
    description: 'Yellow color variations',
    component: ColorStyle as GroupComponent,
  },
  orange: {
    key: 'orange',
    prefix: '--w-palette-orange-',
    title: 'Orange Palette',
    description: 'Orange color variations',
    component: ColorStyle as GroupComponent,
  },
  red: {
    key: 'red',
    prefix: '--w-palette-red-',
    title: 'Red Palette',
    description: 'Red color variations',
    component: ColorStyle as GroupComponent,
  },
  magenta: {
    key: 'magenta',
    prefix: '--w-palette-magenta-',
    title: 'Magenta Palette',
    description: 'Magenta color variations',
    component: ColorStyle as GroupComponent,
  },
  purple: {
    key: 'purple',
    prefix: '--w-palette-purple-',
    title: 'Purple Palette',
    description: 'Purple color variations',
    component: ColorStyle as GroupComponent,
  },
} as const;
