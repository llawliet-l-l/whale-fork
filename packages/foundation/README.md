# @whale/foundation

Design system foundation package that generates CSS custom properties from design tokens using Style Dictionary.

## Overview

This package provides the foundational design tokens for the Whale design system, including:

- **Primitive tokens**: Colors, typography, spacing, and layout values
- **Semantic tokens**: Theme-aware tokens that reference primitives
- **Multi-theme support**: Light, dark, morning, and midnight themes
- **Responsive typography**: Fluid typography for different breakpoints

## Installation

```bash
yarn install
```

## Usage

### Build all tokens

```bash
yarn build
```

This command will:
1. Build primitive tokens (palette, typography, layout)
2. Build semantic tokens (text, colors, headings)
3. Generate CSS files in `src/` directory

## Output

Generated CSS files are placed in the `src/` directory:

```
src/
├── primitive/
│   ├── palette.css      # Color palette variables
│   ├── typography.css   # Typography tokens (rem units)
│   └── layout.css       # Spacing and layout tokens
└── semantic/
    ├── color.css        # All theme colors (light, dark, morning, midnight)
    ├── text.css         # Fixed typography tokens
    └── heading.css      # Responsive heading tokens (mobile, tablet, desktop)
```

## Token Structure

### Primitive Tokens

Raw design values that serve as the foundation:

```json
{
  "palette": {
    "blue": {
      "50": { "$type": "color", "$value": "#eff6ff" },
      "500": { "$type": "color", "$value": "#3b82f6" }
    }
  },
  "typography": {
    "font-size": {
      "sm": { "$type": "dimension", "$value": "14px" },
      "lg": { "$type": "dimension", "$value": "18px" }
    }
  }
}
```

### Semantic Tokens

Theme-aware tokens that reference primitives:

```json
{
  "color": {
    "brand": {
      "primary": { "$type": "color", "$value": "{palette.blue.500}" }
    }
  },
  "text": {
    "body": {
      "font-size": { "$type": "dimension", "$value": "{typography.font-size.sm}" }
    }
  }
}
```

## Features

- **Unit conversion**: Automatic px to rem conversion for typography
- **CSS custom properties**: Output as CSS variables with `w-` prefix
- **Reference resolution**: Semantic tokens automatically resolve to primitive values
- **Media query support**: Responsive typography with built-in breakpoints
- **Clean build output**: Organized logging with clear progress indicators

## Development

### Project Structure

```
packages/foundation/
├── package.json
├── tsconfig.json
├── README.md
├── tokens/                    # Design token JSON files
│   ├── 01-PRIMITIVE-*.tokens.json
│   ├── 02-SEMANTIC-*.tokens.json
│   └── 03-COMPONENT-*.tokens.json
└── src/                      # Generated CSS output
    ├── primitive/
    │   ├── palette.css
    │   ├── typography.css
    │   └── layout.css
    └── semantic/
        ├── color.css
        ├── text.css
        └── heading.css
```

### Build Scripts

The build process is handled by scripts in the root `scripts/style-dictionary/` directory:

```
scripts/style-dictionary/
├── command.mts              # Main entry point
├── types.mts                # TypeScript type definitions
├── constants/
│   ├── common.mts           # Configuration constants
│   └── tokenFiles.mjs       # Token file definitions
└── helpers/
    ├── buildPrimitives.mts  # Primitive token builder
    ├── buildSemantic.mts    # Semantic token builder
    └── utils.mts            # Style Dictionary utilities
```

### Adding New Tokens

1. Add token files to the `tokens/` directory
2. Update `scripts/style-dictionary/constants/tokenFiles.mjs` if needed
3. Run `yarn build:foundation` to generate CSS

### Adding New Themes

1. Create new semantic color files in `tokens/` directory
2. Update `COLOR_MODES` in `scripts/style-dictionary/constants/common.mts`
3. Rebuild with `yarn build:foundation`

## Build Output Example

```
🔨 Start building foundations...
════════════════════════════════════════════════════════════
🏗️  Building primitive tokens...
════════════════════════════════════════════════════════════
  ✅ Built palette.css
  ✅ Built typography.css
  ✅ Built layout.css

════════════════════════════════════════════════════════════
🏗️  Building semantic tokens...
════════════════════════════════════════════════════════════
  ✅ Built text.css
  ✅ Built color.css
  ✅ Built heading.css
════════════════════════════════════════════════════════════
🎉 Foundation build completed successfully!
```

## Clean Up

To remove generated CSS files:

```bash
yarn clean
```

This removes the `src/primitive` and `src/semantic` directories.
