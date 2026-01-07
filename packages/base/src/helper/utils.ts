// A small typed mapper: turns { sm: 'class1', md: 'class2' } into { sm: 'class1', ... }
export function mapVariants<T extends Record<string, string>>(
  variants: T,
): { [K in keyof T]: T[K] } {
  return Object.fromEntries(
    Object.entries(variants).map(([k, v]) => [k, v]),
  ) as { [K in keyof T]: T[K] };
}
