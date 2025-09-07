import type { GroupComponentProps } from '../../shared/types.js';

import React from 'react';

import { VariableDisplay } from '../../shared/components.js';

import { getBreakpointInfo } from './utils.js';

// Visual component for layout spacing
export function LayoutDisplay(props: GroupComponentProps) {
  const { variables, title, groupKey } = props;
  const isBorder = groupKey === 'border';
  const isRadius = groupKey === 'radius';
  const isSpacing = groupKey === 'spacing';

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem', color: '#333' }}>{title}</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
          maxWidth: '1200px',
        }}>
        {Object.entries(variables).map(([name, value]) => (
          <div
            key={name}
            style={{
              padding: '1rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
            }}>
            <div
              style={{
                fontSize: '0.875rem',
                color: '#666',
                marginBottom: '0.5rem',
              }}>
              {name}
            </div>
            <div
              style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: '#333',
                marginBottom: '0.5rem',
              }}>
              {value}
            </div>
            <div
              style={{
                width: isRadius ? '100px' : '100%',
                height: isSpacing ? `var(${name})` : '100px',
                backgroundColor: isBorder ? 'white' : '#3b82f6',
                border: isBorder ? `var(${name}) solid #3b82f6` : 'none',
                borderRadius: isRadius ? `var(${name})` : '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isBorder ? '#3b82f6' : 'white',
                fontSize: '0.75rem',
                fontWeight: '500',
              }}>
              {isBorder ? `Border: var(${name})` : isSpacing ? '' : value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LayoutBreakpointDisplay(props: GroupComponentProps) {
  const { variables, title } = props;
  function renderBreakpointTitle(variable: string) {
    const info = getBreakpointInfo(variable);
    return info ? `${info.emoji} ${info.name}` : variable;
  }
  return (
    <VariableDisplay
      variables={variables}
      title={title}
      renderTitle={renderBreakpointTitle}
    />
  );
}
