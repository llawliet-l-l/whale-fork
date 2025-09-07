import type {
  ColorStyleProps,
  ErrorDisplayProps,
  TextStyleProps,
  VariableDisplayProps,
} from './types.js';

import React from 'react';

function VariableDisplay(props: VariableDisplayProps) {
  const { variables, title, renderValue, renderTitle } = props;

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
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          maxWidth: '1200px',
        }}>
        {Object.entries(variables).map(([variable, value]) => (
          <div
            key={variable}
            style={{
              padding: '1rem',
              border:
                '1px solid var(--w-color-neutral-border-static-primary-subtle)',
              borderRadius: '8px',
              backgroundColor:
                'var(--w-color-neutral-bg-static-primary-subtle)',
            }}>
            <div
              style={{
                fontSize: '0.875rem',
                color: 'var(--w-color-neutral-content-static-primary-subtle)',
                marginBottom: '0.5rem',
              }}>
              {renderTitle ? renderTitle(variable) : variable}
            </div>
            <div
              style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: 'var(--w-color-neutral-content-static-primary-emphasis)',
              }}>
              {renderValue ? renderValue(value) : value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Visual component for typography - used in multiple stories
function TextStyle(props: TextStyleProps) {
  const { variables, title } = props;

  function getVariableValue(name: string) {
    return Object.entries(variables).find((item) => item[0].includes(name));
  }

  const fontSizeValue = getVariableValue('font-size');
  const fontWeightValue = getVariableValue('font-weight');
  const lineHeightValue = getVariableValue('line-height');
  const fontFamilyValue = getVariableValue('font-family');

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
          maxWidth: '80%',
        }}>
        <div
          style={{
            padding: '1.25rem',
            border: 'none',
            borderRadius: '10px',
            backgroundColor:
              'var(--w-color-neutral-bg-static-overlay-bright-subtle)',
            width: '100%', // Ensures full width
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          }}>
          <div
            style={{
              fontSize: fontSizeValue ? `var(${fontSizeValue[0]})` : '1rem',
              fontWeight: fontWeightValue
                ? `var(${fontWeightValue[0]})`
                : '400',
              lineHeight: lineHeightValue
                ? `var(${lineHeightValue[0]})`
                : '1.5',
              fontFamily: fontFamilyValue
                ? `var(${fontFamilyValue[0]})`
                : 'inherit',
              color: 'var(--w-color-neutral-content-static-primary-emphasis)',
              padding: '0.75rem 1rem',
              backgroundColor:
                'var(--w-color-neutral-bg-static-primary-subtle)',
              borderRadius: '8px',
              border: 'none',
              boxShadow:
                'inset 0 0 0 1px var(--w-color-neutral-border-static-primary-subtle)',
              width: '100%',
            }}>
            Quick fox jumps.
          </div>
        </div>
      </div>
    </div>
  );
}

// Generalized color display component for both palette and semantic colors
function ColorStyle(props: ColorStyleProps) {
  const {
    variables,
    title,
    description,
    namePrefix = '',
    showValue = true,
  } = props;

  const entries = Object.entries(variables).map(([name, value]) => ({
    name,
    value,
  }));

  const isSemantic = namePrefix.includes('--w-color-');
  const gridColumns = isSemantic ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)';

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--w-color-neutral-content-static-primary-emphasis)',
            marginBottom: '0.5rem',
          }}>
          {title}
        </h2>
        {description && (
          <p
            style={{
              color: 'var(--w-color-neutral-content-static-primary-subtle)',
              fontSize: '0.9rem',
              margin: 0,
            }}>
            {description}
          </p>
        )}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: gridColumns,
          gap: '1rem',
          maxWidth: '1200px',
        }}>
        {entries.map(({ name, value }) => {
          const displayName = namePrefix ? name.replace(namePrefix, '') : name;
          return (
            <div
              key={name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem',
                border:
                  '1px solid var(--w-color-neutral-border-static-primary-subtle)',
                borderRadius: '8px',
                backgroundColor:
                  'var(--w-color-neutral-bg-static-primary-emphasis)',
                minWidth: '140px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
              }}>
              <div
                aria-label={`color ${displayName}`}
                title={String(value)}
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: `var(${name})`,
                  borderRadius: '8px',
                  border:
                    '1px solid var(--w-color-neutral-border-static-primary-subtle)',
                  marginBottom: '0.5rem',
                }}
              />
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--w-color-neutral-content-static-primary-subtle)',
                  textAlign: 'center',
                  marginBottom: '0.25rem',
                  fontWeight: '500',
                }}>
                {displayName}
              </div>
              {showValue && (
                <div
                  style={{
                    fontSize: '0.7rem',
                    color:
                      'var(--w-color-neutral-content-static-primary-emphasis)',
                    fontWeight: '500',
                    textAlign: 'center',
                    wordBreak: 'break-all',
                  }}>
                  {String(value)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          border:
            '4px solid var(--w-color-neutral-border-static-primary-subtle)',
          borderTop:
            '4px solid var(--w-color-neutral-content-static-primary-emphasis)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function ErrorDisplay(props: ErrorDisplayProps) {
  const { error } = props;

  return (
    <div
      style={{
        padding: '2rem',
        color: 'var(--w-color-system-content-static-error-emphasis)',
        backgroundColor: 'var(--w-color-system-bg-static-error-subtle)',
        border: '1px solid var(--w-color-system-border-static-error-subtle)',
        borderRadius: '8px',
      }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Error</h3>
      <p style={{ margin: 0 }}>{error}</p>
    </div>
  );
}

export { VariableDisplay, TextStyle, ColorStyle, LoadingSpinner, ErrorDisplay };
