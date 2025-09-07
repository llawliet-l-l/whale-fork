import type { GroupComponent, GroupMap } from '../../shared/types.js';

import { LayoutBreakpointDisplay, LayoutDisplay } from './components.js';

export const BREAKPOINT_INFO = {
  mobile: { emoji: '📱', name: 'Mobile' },
  tablet: { emoji: '📟', name: 'Tablet' },
  laptop: { emoji: '💻', name: 'Laptop' },
  desktop: { emoji: '🖥️', name: 'Desktop' },
  desktopMax: { emoji: '🖥️🚀', name: 'Desktop Max' },
} as const;

export type LayoutKey = 'border' | 'radius' | 'spacing' | 'breakpoint';

export const LAYOUT_GROUPS: GroupMap<LayoutKey> = {
  border: {
    key: 'border',
    prefix: '--w-layout-border-',
    title: 'Layout Border Variables',
    component: LayoutDisplay as GroupComponent,
  },
  radius: {
    key: 'radius',
    prefix: '--w-layout-radius-',
    title: 'Layout Border Radius Variables',
    component: LayoutDisplay as GroupComponent,
  },
  spacing: {
    key: 'spacing',
    prefix: '--w-layout-spacing-',
    title: 'Layout Spacing Variables',
    component: LayoutDisplay as GroupComponent,
  },
  breakpoint: {
    key: 'breakpoint',
    prefix: '--w-layout-breakpoint-',
    title: '📱 Layout Breakpoint Variables',
    component: LayoutBreakpointDisplay as GroupComponent,
  },
} as const;
