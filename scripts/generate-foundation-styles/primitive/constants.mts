import path from 'path';
import { OUTPUT_DIRECTORY, TOKENS_DIRECTORY } from '../config.mjs';
import type { PrimitiveInputFile } from './types.js';

export const PRIMITIVE_OUTPUT_DIRECTORY = path.join(
  OUTPUT_DIRECTORY,
  'primitive',
);

export const PRIMITIVE_TYPOGRAPHY_TRANSFORMS = [
  'attribute/cti',
  'name/kebab',
  'dimension/pixelToRem',
  'color/css',
] as const;

export const PRIMITIVE_INPUT_FILES: PrimitiveInputFile[] = [
  {
    name: 'palette',
    src: path.join(
      TOKENS_DIRECTORY,
      '01-PRIMITIVE-PALETTE.default.tokens.json',
    ),
  },
  {
    name: 'typography',
    src: path.join(
      TOKENS_DIRECTORY,
      '01-PRIMITIVE-TYPOGRAPHY.default.tokens.json',
    ),
  },
  {
    name: 'layout',
    src: path.join(TOKENS_DIRECTORY, '01-PRIMITIVE-LAYOUT.default.tokens.json'),
  },
];
