import type {
  ButtonIntent,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from './Button.types.js';
import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { Button } from './Button.js';

const intents: ButtonIntent[] = [
  'primary',
  'secondary',
  'neutral',
  'destructive',
];
const variants: ButtonVariant[] = ['filled', 'outline', 'ghost'];
const sizes: ButtonSize[] = ['small', 'medium', 'large'];

const meta: Meta<ButtonProps> = {
  title: 'Base/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    intent: {
      control: 'select',
      options: intents,
    },
    variant: {
      control: 'select',
      options: variants,
    },
    size: {
      control: 'select',
      options: sizes,
    },
    rounded: { control: 'boolean' },
    disabled: { control: 'boolean' },
    preloaded: { control: 'boolean' },
    isSelected: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    asChild: {
      control: 'boolean',
      description:
        'If true, delegates rendering to the immediate child (Polymorphism)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    prefix: { control: 'text' },
    suffix: { control: 'text' },
    children: { control: 'text' },
  },
  args: {
    children: 'Button',
    intent: 'primary',
    variant: 'filled',
    size: 'medium',
    rounded: true,
    disabled: false,
    preloaded: false,
    isSelected: false,
    fullWidth: false,
    asChild: false,
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Playground: Story = {};

/**
 * The `asChild` prop allows the Button to render as a completely different element
 * (like an `<a>` tag) while retaining all Button styling and behavior.
 */
export const AsLink: Story = {
  args: {
    asChild: true,
    children: (
      <a href="https://rango.exchange" target="_blank" rel="noreferrer">
        I am an Anchor Tag
      </a>
    ),
    intent: 'secondary',
  },
};

export const IntentsPerStyle: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      {variants.map((variant) => (
        <div key={variant}>
          <h4
            style={{
              margin: '0 0 0.5rem 0',
              textTransform: 'capitalize',
              color: 'var(--w-color-neutral-bg-static-inverted-emphasis)',
              fontFamily: 'var(--w-text-label-medium-font-family)',
            }}>
            {variant}
          </h4>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {intents.map((intent) => (
              <Button
                key={`${variant}-${intent}`}
                id={`${variant}-${intent}`}
                intent={intent}
                variant={variant}>
                {intent}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button id="sizes-small" size="small">
        Small
      </Button>
      <Button id="sizes-medium" size="medium">
        Medium
      </Button>
      <Button id="sizes-large" size="large">
        Large
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button id="states-default">Default</Button>
      <Button id="states-disabled" disabled>
        Disabled
      </Button>
      <Button id="states-preloaded" preloaded>
        Preloaded
      </Button>
      <Button id="states-selected" isSelected intent="secondary">
        Selected (Active)
      </Button>
    </div>
  ),
};

export const WithPrefixSuffix: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {/* Example with Emoji/String */}
      <Button id="with-prefix-emoji" prefix="🔍">
        Search
      </Button>

      {/* Example with React Node (Span) */}
      <Button
        id="with-suffix-node"
        intent="secondary"
        suffix={<span style={{ fontWeight: 'bold' }}>→</span>}>
        Open
      </Button>

      <Button
        id="with-prefix-suffix-outline"
        prefix="⭐"
        suffix="▼"
        variant="outline">
        Starred
      </Button>
    </div>
  ),
};

export const RoundedToggle: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button id="rounded-true" rounded={true}>
          Rounded (Default)
        </Button>
        <Button id="rounded-false" rounded={false}>
          Square Corners
        </Button>
      </div>
    </div>
  ),
};

/**
 * Visual regression testing grid for all possible states.
 */
export const AllCombinations: Story = {
  render: () => {
    const states = [
      { label: 'Default', props: {} },
      { label: 'Selected', props: { isSelected: true } },
      { label: 'Disabled', props: { disabled: true } },
      { label: 'Preloaded', props: { preloaded: true } },
    ];

    return (
      <div style={{ display: 'grid', gap: '2rem' }}>
        {variants.map((variant) => (
          <section key={variant} style={{ display: 'grid', gap: '1rem' }}>
            <h3 style={{ textTransform: 'capitalize', margin: 0 }}>
              {variant}
            </h3>
            <div
              style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: 'repeat(2, 1fr)',
              }}>
              {intents.map((intent) => (
                <div
                  key={`${variant}-${intent}`}
                  style={{
                    display: 'grid',
                    gap: '1rem',
                    padding: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                  }}>
                  <h4 style={{ margin: 0, textTransform: 'capitalize' }}>
                    {intent}
                  </h4>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {sizes.map((size) => (
                      <div
                        key={`${variant}-${intent}-${size}`}
                        style={{ display: 'grid', gap: '0.5rem' }}>
                        <small
                          style={{ opacity: 0.7, textTransform: 'capitalize' }}>
                          {size}
                        </small>
                        <div
                          style={{
                            display: 'flex',
                            gap: '0.5rem',
                            flexWrap: 'wrap',
                          }}>
                          {states.map((s) => (
                            <Button
                              key={`${variant}-${intent}-${size}-${s.label}`}
                              id={`all-${variant}-${intent}-${size}-${s.label.toLowerCase()}`}
                              intent={intent}
                              variant={variant}
                              size={size}
                              {...s.props}>
                              {s.label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  },
};
