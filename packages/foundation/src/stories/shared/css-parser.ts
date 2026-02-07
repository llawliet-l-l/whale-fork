// Import CSS files at build time
import type { Category, CSSVariables, FileName } from './types.js';

import componentColorCSS from '../../../dist/component/color.css?raw';
import primitiveLayoutCSS from '../../../dist/primitive/layout.css?raw';
import primitivePaletteCSS from '../../../dist/primitive/palette.css?raw';
import primitiveTypographyCSS from '../../../dist/primitive/typography.css?raw';
import semanticColorCSS from '../../../dist/semantic/color.css?raw';
import semanticHeadingCSS from '../../../dist/semantic/heading.css?raw';
import semanticTextCSS from '../../../dist/semantic/text.css?raw';

// CSS file mapping for easy access
const CSS_FILES = {
  primitive: {
    layout: primitiveLayoutCSS,
    palette: primitivePaletteCSS,
    typography: primitiveTypographyCSS,
  },
  semantic: {
    color: semanticColorCSS,
    heading: semanticHeadingCSS,
    text: semanticTextCSS,
  },
  component: {
    color: componentColorCSS,
  },
} as const;

// Parse CSS content and extract CSS variables
function parseCSSVariables(cssContent: string): CSSVariables {
  const variables: CSSVariables = {};

  if (!cssContent || cssContent.length === 0) {
    console.error('CSS content is empty or undefined!');
    return {};
  }

  /*
   * Improved regex to handle various CSS variable formats
   * This regex will match CSS variables in any context (root, media queries, data attributes)
   */
  const regex = /--[\w-]+:\s*([^;]+);/g;
  let match;

  while ((match = regex.exec(cssContent)) !== null) {
    const variableName = match[0].split(':')[0].trim();
    const value = match[1].trim();
    variables[variableName] = value;
  }

  return variables;
}

// Load design tokens from actual CSS files (build-time)
function loadCSSVariables(
  category: Category,
  fileName: FileName,
): CSSVariables {
  try {
    const cssContent =
      CSS_FILES[category][
        fileName as unknown as keyof (typeof CSS_FILES)[typeof category]
      ];

    if (!cssContent) {
      console.error(`CSS file not found for: ${category}/${fileName}`);
      return {} as CSSVariables;
    }

    // Parse CSS variables from the CSS content
    const variables = parseCSSVariables(cssContent);

    console.log(
      `Loaded ${Object.keys(variables).length} CSS variables from ${category}/${fileName}`,
    );
    return variables;
  } catch (error) {
    console.error(
      `Failed to load CSS variables from: ${category}/${fileName}`,
      error,
    );
    return {} as CSSVariables;
  }
}

function filterVariablesByPrefix(
  variables: CSSVariables,
  prefix: string,
): CSSVariables {
  const filtered: CSSVariables = {};

  Object.entries(variables).forEach(([key, value]) => {
    if (key.startsWith(prefix)) {
      filtered[key] = value;
    }
  });

  return filtered;
}

export { loadCSSVariables, filterVariablesByPrefix, CSS_FILES };
