import { Button } from '@rango/whale';
import React from 'react';

import preview from '#.storybook/preview';

const VARIANTS = [
  'classic',
  'solid',
  'soft',
  'surface',
  'outline',
  'ghost',
] as const;
const SIZES = ['1', '2', '3', '4'] as const;

const meta = preview.meta({
  title: 'Radix/Button',
  component: Button,
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: SIZES },
    color: {
      control: 'select',
      options: ['indigo', 'jade', 'crimson', 'amber', 'iris', 'gray'],
    },
    radius: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large', 'full'],
    },
    highContrast: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    variant: 'solid',
    size: '2',
    children: 'Swap',
  },
});

/** Every prop wired to a control — the default place to try things out. */
export const Playground = meta.story({});

const Row = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <span
      style={{
        width: 72,
        fontSize: 12,
        opacity: 0.6,
        fontFamily: 'monospace',
      }}>
      {label}
    </span>
    {children}
  </div>
);

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
    {children}
  </div>
);

/** All variants side by side. Switch the toolbar theme to check each one. */
export const Variants = meta.story({
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Grid>
      {VARIANTS.map((variant) => (
        <Row key={variant} label={variant}>
          <Button {...args} id={`btn-${variant}`} variant={variant}>
            {args.children}
          </Button>
          <Button
            {...args}
            id={`btn-${variant}-high-contrast`}
            variant={variant}
            highContrast>
            high contrast
          </Button>
          <Button
            {...args}
            id={`btn-${variant}-disabled`}
            variant={variant}
            disabled>
            disabled
          </Button>
        </Row>
      ))}
    </Grid>
  ),
});

/** Radix sizes 1–4, which scale with the `scaling` toolbar control. */
export const Sizes = meta.story({
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Grid>
      {SIZES.map((size) => (
        <Row key={size} label={`size ${size}`}>
          <Button {...args} id={`btn-size-${size}`} size={size}>
            {args.children}
          </Button>
          <Button
            {...args}
            id={`btn-size-${size}-soft`}
            size={size}
            variant="soft">
            soft
          </Button>
          <Button
            {...args}
            id={`btn-size-${size}-outline`}
            size={size}
            variant="outline">
            outline
          </Button>
        </Row>
      ))}
    </Grid>
  ),
});

/** Loading swaps the label for a spinner while preserving the button width. */
export const Loading = meta.story({
  args: { loading: true },
});
