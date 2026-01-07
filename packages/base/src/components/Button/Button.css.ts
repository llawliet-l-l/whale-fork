import { styleVariants } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { skeletonBaseStyle } from '../../helper/skeleton.css.js';

/*
 * -----------------------------------------------------------------------------
 * 1. Shared Primitive Variants
 * -----------------------------------------------------------------------------
 */

export const size = styleVariants({
  small: {
    padding: 'var(--w-layout-spacing-6) var(--w-layout-spacing-8)',
    vars: { '--button-radius': 'var(--w-layout-radius-8)' },
  },
  medium: {
    padding: 'var(--w-layout-spacing-10) var(--w-layout-spacing-12)',
    vars: { '--button-radius': 'var(--w-layout-radius-10)' },
  },
  large: {
    padding: 'var(--w-layout-spacing-14) var(--w-layout-spacing-12)',
    vars: { '--button-radius': 'var(--w-layout-radius-12)' },
  },
});

export const rounded = styleVariants({
  true: { vars: { '--button-radius': 'var(--w-layout-radius-full)' } },
});

export const fullWidth = styleVariants({
  true: { width: '100%' },
});

/*
 * -----------------------------------------------------------------------------
 * 2. Main Button Recipe
 * -----------------------------------------------------------------------------
 */

export const buttonStyle = recipe({
  base: {
    // Layout
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--w-layout-spacing-8)',
    whiteSpace: 'nowrap',
    appearance: 'none',

    // Borders & Spacing
    border: 'none',
    borderRadius: 'var(--button-radius, var(--w-layout-radius-8))',

    // Typography
    fontFamily: 'var(--w-text-label-medium-font-family)',
    fontSize: 'var(--w-text-label-medium-font-size)',
    lineHeight: 'var(--w-text-label-medium-line-height)',
    fontWeight: 'var(--w-text-label-medium-font-weight)',

    // Interaction & State
    cursor: 'pointer',
    transitionProperty:
      'background-color, color, border-color, box-shadow, opacity, transform',
    transitionDuration: '120ms',
    transitionTimingFunction: 'ease-out',

    // Dynamic Color Binding (Consumed from Compound Variants)
    backgroundColor: 'var(--button-bg-rest, transparent)',
    color: 'var(--button-text, inherit)',

    selectors: {
      // Hover / Active
      '&:hover': {
        backgroundColor: 'var(--button-bg-hover, var(--button-bg-rest))',
      },
      '&:active': {
        backgroundColor: 'var(--button-bg-pressed, var(--button-bg-hover))',
      },

      // Focus
      '&:focus-visible': {
        boxShadow:
          '0 0 0 2px var(--w-color-system-border-static-primary-emphasis) inset',
      },

      // Selected (Accessibility preferred)
      '&[aria-pressed="true"]': {
        backgroundColor: 'var(--button-bg-selected, var(--button-bg-rest))',
        color: 'var(--button-text-selected, var(--button-text))',
      },

      // Disabled
      '&:disabled': {
        cursor: 'not-allowed',
        backgroundColor: 'var(--w-color-button-disable-background-disable)',
        color: 'var(--w-color-button-disable-content-disable)',
        border: 'none',
      },
    },
  },

  variants: {
    size,
    rounded,
    fullWidth,

    intent: {
      primary: {},
      secondary: {},
      neutral: {},
      destructive: {},
    },
    variant: {
      filled: {},
      outline: {
        border: 'var(--w-layout-border-2) solid var(--button-border-color)',
      },
      ghost: {},
    },
  },

  compoundVariants: [
    /*
     * -------------------------------------------------------------------------
     * FILLED VARIANTS
     * -------------------------------------------------------------------------
     */
    {
      variants: { intent: 'primary', variant: 'filled' },
      style: {
        vars: {
          '--button-bg-rest':
            'var(--w-color-button-primary-filled-background-rest)',
          '--button-bg-hover':
            'var(--w-color-button-primary-filled-background-hover)',
          '--button-bg-pressed':
            'var(--w-color-button-primary-filled-background-pressed)',
          '--button-bg-selected':
            'var(--w-color-button-primary-filled-background-selected)',
          '--button-text':
            'var(--w-color-button-primary-filled-content-on-brand)',
          '--button-text-selected':
            'var(--w-color-button-primary-filled-content-on-brand)',
        },
      },
    },
    {
      variants: { intent: 'secondary', variant: 'filled' },
      style: {
        vars: {
          '--button-bg-rest':
            'var(--w-color-button-secondary-filled-background-rest)',
          '--button-bg-hover':
            'var(--w-color-button-secondary-filled-background-hover)',
          '--button-bg-pressed':
            'var(--w-color-button-secondary-filled-background-pressed)',
          '--button-bg-selected':
            'var(--w-color-button-secondary-filled-background-selected)',
          '--button-text':
            'var(--w-color-button-secondary-filled-content-on-brand)',
          '--button-text-selected':
            'var(--w-color-button-secondary-filled-content-on-brand)',
        },
      },
    },
    {
      variants: { intent: 'neutral', variant: 'filled' },
      style: {
        vars: {
          '--button-bg-rest':
            'var(--w-color-button-neutral-filled-background-rest)',
          '--button-bg-hover':
            'var(--w-color-button-neutral-filled-background-hover)',
          '--button-bg-pressed':
            'var(--w-color-button-neutral-filled-background-pressed)',
          '--button-bg-selected':
            'var(--w-color-button-neutral-filled-background-selected)',
          '--button-text':
            'var(--w-color-button-neutral-filled-content-emphasis)',
          '--button-text-selected':
            'var(--w-color-button-neutral-filled-content-emphasis)',
        },
      },
    },
    {
      variants: { intent: 'destructive', variant: 'filled' },
      style: {
        vars: {
          '--button-bg-rest':
            'var(--w-color-button-destructive-filled-background-rest)',
          '--button-bg-hover':
            'var(--w-color-button-destructive-filled-background-hover)',
          '--button-bg-pressed':
            'var(--w-color-button-destructive-filled-background-pressed)',
          '--button-bg-selected':
            'var(--w-color-button-destructive-filled-background-selected)',
          '--button-text':
            'var(--w-color-button-destructive-filled-content-on-brand)',
          '--button-text-selected':
            'var(--w-color-button-destructive-filled-content-on-brand)',
        },
      },
    },

    /*
     * -------------------------------------------------------------------------
     * OUTLINE VARIANTS
     * -------------------------------------------------------------------------
     */
    {
      variants: { intent: 'primary', variant: 'outline' },
      style: {
        vars: {
          '--button-bg-rest':
            'var(--w-color-button-primary-outline-background-rest)',
          '--button-bg-hover':
            'var(--w-color-button-primary-outline-background-hover)',
          '--button-bg-pressed':
            'var(--w-color-button-primary-outline-background-pressed)',
          '--button-bg-selected':
            'var(--w-color-button-primary-outline-background-selected)',
          '--button-text':
            'var(--w-color-button-primary-outline-content-emphasis)',
          '--button-text-selected':
            'var(--w-color-button-primary-outline-content-emphasis)',
          '--button-border-color':
            'var(--w-color-button-primary-outline-border-emphasis)',
        },
      },
    },
    {
      variants: { intent: 'secondary', variant: 'outline' },
      style: {
        vars: {
          '--button-bg-rest':
            'var(--w-color-button-secondary-outline-background-rest)',
          '--button-bg-hover':
            'var(--w-color-button-secondary-outline-background-hover)',
          '--button-bg-pressed':
            'var(--w-color-button-secondary-outline-background-pressed)',
          '--button-bg-selected':
            'var(--w-color-button-secondary-outline-background-selected)',
          '--button-text':
            'var(--w-color-button-secondary-outline-content-emphasis)',
          '--button-text-selected':
            'var(--w-color-button-secondary-outline-content-emphasis)',
          '--button-border-color':
            'var(--w-color-button-secondary-outline-border-emphasis)',
        },
      },
    },
    {
      variants: { intent: 'neutral', variant: 'outline' },
      style: {
        vars: {
          '--button-bg-rest':
            'var(--w-color-button-neutral-outline-background-rest)',
          '--button-bg-hover':
            'var(--w-color-button-neutral-outline-background-hover)',
          '--button-bg-pressed':
            'var(--w-color-button-neutral-outline-background-pressed)',
          '--button-bg-selected':
            'var(--w-color-button-neutral-outline-background-selected)',
          '--button-text':
            'var(--w-color-button-neutral-outline-content-emphasis)',
          '--button-text-selected':
            'var(--w-color-button-neutral-outline-content-emphasis)',
          '--button-border-color':
            'var(--w-color-button-neutral-outline-border-emphasis)',
        },
      },
    },
    {
      variants: { intent: 'destructive', variant: 'outline' },
      style: {
        vars: {
          '--button-bg-rest':
            'var(--w-color-button-destructive-outline-background-rest)',
          '--button-bg-hover':
            'var(--w-color-button-destructive-outline-background-hover)',
          '--button-bg-pressed':
            'var(--w-color-button-destructive-outline-background-pressed)',
          '--button-bg-selected':
            'var(--w-color-button-destructive-outline-background-selected)',
          '--button-text':
            'var(--w-color-button-destructive-outline-content-emphasis)',
          '--button-text-selected':
            'var(--w-color-button-destructive-outline-content-emphasis)',
          '--button-border-color':
            'var(--w-color-button-destructive-outline-border-emphasis)',
        },
      },
    },

    /*
     * -------------------------------------------------------------------------
     * GHOST VARIANTS
     * -------------------------------------------------------------------------
     */
    {
      variants: { intent: 'primary', variant: 'ghost' },
      style: {
        vars: {
          '--button-bg-rest':
            'var(--w-color-button-primary-ghost-background-rest)',
          '--button-bg-hover':
            'var(--w-color-button-primary-ghost-background-hover)',
          '--button-bg-pressed':
            'var(--w-color-button-primary-ghost-background-pressed)',
          '--button-bg-selected':
            'var(--w-color-button-primary-ghost-background-selected)',
          '--button-text':
            'var(--w-color-button-primary-ghost-content-emphasis)',
        },
      },
    },
    {
      variants: { intent: 'secondary', variant: 'ghost' },
      style: {
        vars: {
          '--button-bg-rest':
            'var(--w-color-button-secondary-ghost-background-rest)',
          '--button-bg-hover':
            'var(--w-color-button-secondary-ghost-background-hover)',
          '--button-bg-pressed':
            'var(--w-color-button-secondary-ghost-background-pressed)',
          '--button-bg-selected':
            'var(--w-color-button-secondary-ghost-background-selected)',
          '--button-text':
            'var(--w-color-button-secondary-ghost-content-emphasis)',
        },
      },
    },
    {
      variants: { intent: 'neutral', variant: 'ghost' },
      style: {
        vars: {
          '--button-bg-rest':
            'var(--w-color-button-neutral-ghost-background-rest)',
          '--button-bg-hover':
            'var(--w-color-button-neutral-ghost-background-hover)',
          '--button-bg-pressed':
            'var(--w-color-button-neutral-ghost-background-pressed)',
          '--button-bg-selected':
            'var(--w-color-button-neutral-ghost-background-selected)',
          '--button-text':
            'var(--w-color-button-neutral-ghost-content-emphasis)',
        },
      },
    },
    {
      variants: { intent: 'destructive', variant: 'ghost' },
      style: {
        vars: {
          '--button-bg-rest':
            'var(--w-color-button-destructive-ghost-background-rest)',
          '--button-bg-hover':
            'var(--w-color-button-destructive-ghost-background-hover)',
          '--button-bg-pressed':
            'var(--w-color-button-destructive-ghost-background-pressed)',
          '--button-bg-selected':
            'var(--w-color-button-destructive-ghost-background-selected)',
          '--button-text':
            'var(--w-color-button-destructive-ghost-content-emphasis)',
        },
      },
    },
  ],
});

/*
 * -----------------------------------------------------------------------------
 * 3. Skeleton & Exports
 * -----------------------------------------------------------------------------
 */

export const skeletonStyle = recipe({
  base: [
    skeletonBaseStyle,
    {
      minWidth: '120px',
      borderRadius: 'var(--button-radius, var(--w-layout-radius-8))',
    },
  ],
  variants: {
    size,
    rounded,
    fullWidth,
  },
});

export type ButtonVariants = RecipeVariants<typeof buttonStyle>;
