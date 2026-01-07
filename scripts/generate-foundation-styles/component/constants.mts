import path from 'path';
import { OUTPUT_DIRECTORY, TOKENS_DIRECTORY } from '../config.mjs';

export const COMPONENT_OUTPUT_DIRECTORY = path.join(
  OUTPUT_DIRECTORY,
  'component',
);

export const COMPONENT_COLORS_FILE = path.join(
  TOKENS_DIRECTORY,
  '03-COMPONENT-COLORS.default.tokens.json',
);

export const COMPONENT_OUTPUT_COLOR_CSS = 'color.css';

export const COMPONENT_SELECTOR_THEME = '[data-theme]';
