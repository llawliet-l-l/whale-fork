import path from 'path';
import type {
  MediaQueryByBreakpoint,
  TextBreakpoint,
  ColorMode,
} from './types.js';
import { OUTPUT_DIRECTORY } from '../config.mjs';

export const SEMANTIC_OUTPUT_DIRECTORY = path.join(
  OUTPUT_DIRECTORY,
  'semantic',
);

export const SEMANTIC_TEXT_FIXED_FILE =
  '02-SEMANTIC-TEXT-FIXED.default.tokens.json';

export const COLOR_BY_MODE: Record<ColorMode, string> = {
  light: '02-SEMANTIC-COLORS.light.tokens.json',
  dark: '02-SEMANTIC-COLORS.dark.tokens.json',
  morning: '02-SEMANTIC-COLORS.morning.tokens.json',
  midnight: '02-SEMANTIC-COLORS.midnight.tokens.json',
};

export const HEADING_BY_BREAKPOINT: Record<string, string> = {
  mobile: '02-SEMANTIC-TEXT-FLUID.mobile.tokens.json',
  tablet: '02-SEMANTIC-TEXT-FLUID.tablet.tokens.json',
  desktop: '02-SEMANTIC-TEXT-FLUID.desktop.tokens.json',
};

export const SEMANTIC_OUTPUT_TEXT_CSS = 'text.css';
export const SEMANTIC_OUTPUT_COLOR_CSS = 'color.css';
export const SEMANTIC_OUTPUT_HEADING_CSS = 'heading.css';

export const SEMANTIC_SELECTOR_ROOT = ':root';

export const COLOR_MODES: ColorMode[] = [
  'light',
  'dark',
  'morning',
  'midnight',
] as const;

export const TEXT_BREAKPOINTS: TextBreakpoint[] = [
  'mobile',
  'tablet',
  'desktop',
] as const;

export const MEDIA_QUERY_BY_BREAKPOINT: MediaQueryByBreakpoint = {
  mobile: '@media (max-width: 767px)',
  tablet: '@media (min-width: 768px) and (max-width: 979px)',
  desktop: '@media (min-width: 1200px)',
};
