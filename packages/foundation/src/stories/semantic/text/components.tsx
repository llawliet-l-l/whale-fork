import type { GroupComponentProps } from '../../shared/types.js';

import React from 'react';

import { TextStyle } from '../../shared/components.js';
import { filterVariablesByPrefix } from '../../shared/css-parser.js';

import { TEXT_SUBGROUPS } from './constants.js';

export function SemanticTextDisplay(props: GroupComponentProps) {
  const { variables, title, namePrefix } = props;
  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      {TEXT_SUBGROUPS.map((size) => {
        const sizePrefix = `${namePrefix}${size}-`;
        const filtered = filterVariablesByPrefix(variables, sizePrefix);
        if (Object.keys(filtered).length === 0) {
          return null;
        }
        const sectionTitle = `${size} ${title}`;
        return (
          <TextStyle key={size} variables={filtered} title={sectionTitle} />
        );
      })}
    </div>
  );
}
