export type ColorMode = 'light' | 'dark' | 'morning' | 'midnight';
export type TextBreakpoint = 'mobile' | 'tablet' | 'desktop';

export type BuildSemanticConfig = {
  inputFile: string;
  destination: string;
  selector?: string | string[];
};

export type MediaQueryByBreakpoint = Record<TextBreakpoint, string>;
