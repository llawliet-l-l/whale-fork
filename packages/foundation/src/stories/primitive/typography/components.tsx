import type { TypographyDisplayProps } from '../../shared/types.js';

import React from 'react';

// Visual component for typography
export function TypographyDisplay(props: TypographyDisplayProps) {
  const { variables, title } = props;

  return (
    <div style={{ padding: '2rem' }}>
      <h2
        style={{
          marginBottom: '2rem',
          color: 'var(--w-color-neutral-content-static-primary-emphasis)',
        }}>
        {title}
      </h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '100%',
        }}>
        {Object.entries(variables).map(([name, value]) => (
          <div
            key={name}
            style={{
              padding: '1rem',
              border:
                '1px solid var(--w-color-neutral-border-static-primary-subtle)',
              borderRadius: '8px',
              backgroundColor:
                'var(--w-color-neutral-bg-static-primary-subtle)',
              width: '100%', // Ensures full width
            }}>
            <div
              style={{
                fontSize: '0.875rem',
                color: 'var(--w-color-neutral-content-static-primary-subtle)',
                marginBottom: '0.5rem',
              }}>
              {name}
            </div>
            <div
              style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: 'var(--w-color-neutral-content-static-primary-emphasis)',
                marginBottom: '0.5rem',
              }}>
              {value}
            </div>
            <div
              style={{
                fontSize: name.includes('font-size') ? `var(${name})` : '1rem',
                fontWeight: name.includes('font-weight')
                  ? `var(${name})`
                  : '400',
                lineHeight: name.includes('line-height')
                  ? `var(${name})`
                  : '1.5',
                fontFamily: name.includes('font-family') ? value : 'inherit',
                color: 'var(--w-color-neutral-content-static-primary-emphasis)',
                padding: '0.5rem',
                backgroundColor:
                  'var(--w-color-neutral-bg-static-primary-emphasis)',
                borderRadius: '4px',
                border:
                  '1px solid var(--w-color-neutral-border-static-primary-subtle)',
                width: '100%',
              }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
