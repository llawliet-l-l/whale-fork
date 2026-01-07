import { PRIMITIVE_INPUT_FILES } from './constants.mjs';

export function getPrimitiveSources() {
  return [...PRIMITIVE_INPUT_FILES.map((file) => file.src)];
}
