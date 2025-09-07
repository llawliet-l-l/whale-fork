import type { GroupComponent, GroupMap } from '../../shared/types.js';

import { SemanticTextDisplay } from './components.js';

export type SemanticTextKey = 'title' | 'label' | 'paragraph';

export type TextSizeKey = 'x-large' | 'large' | 'medium' | 'small';

export const TEXT_SUBGROUPS: readonly TextSizeKey[] = [
  'x-large',
  'large',
  'medium',
  'small',
] as const;

export const TEXT_GROUPS: GroupMap<SemanticTextKey> = {
  title: {
    key: 'title',
    prefix: '--w-text-title-',
    title: 'Title',
    component: SemanticTextDisplay as GroupComponent,
  },
  label: {
    key: 'label',
    prefix: '--w-text-label-',
    title: 'Label',
    component: SemanticTextDisplay as GroupComponent,
  },
  paragraph: {
    key: 'paragraph',
    prefix: '--w-text-paragraph-',
    title: 'Paragraph',
    component: SemanticTextDisplay as GroupComponent,
  },
} as const;
