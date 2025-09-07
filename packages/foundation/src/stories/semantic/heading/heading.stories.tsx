import type { GroupConfig } from '../../shared/types.js';
import type { Meta, StoryObj } from '@storybook/react';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import React from 'react';

import { ErrorDisplay, LoadingSpinner } from '../../shared/components.js';
import { filterVariablesByPrefix } from '../../shared/css-parser.js';
import { useCSSVariables } from '../../shared/use-css-variables.js';

import { HEADING_GROUPS, type HeadingKey } from './constants.js';

const meta: Meta = {
  title: 'Foundation/Semantic/Heading',
  parameters: {
    layout: 'padded',
    viewport: {
      //👇 Set available viewports
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'desktop',
    },
  },
};

export default meta;

function HeadingList() {
  const { variables, loading, error } = useCSSVariables('semantic', 'heading');
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  return (
    <div>
      {Object.values(HEADING_GROUPS).map((group: GroupConfig<HeadingKey>) => {
        const { key, prefix, title, component: GroupComponent } = group;
        const filtered = filterVariablesByPrefix(variables, prefix || '');
        return (
          <div key={key}>
            <GroupComponent variables={filtered} title={title} />
          </div>
        );
      })}
    </div>
  );
}

type Story = StoryObj;

export const Mobile: Story = {
  render: function Render() {
    return <HeadingList />;
  },
  parameters: { viewport: { defaultViewport: 'iphone14promax' } },
};

export const Tablet: Story = {
  render: function Render() {
    return <HeadingList />;
  },
  parameters: { viewport: { defaultViewport: 'ipad11p' } },
};

export const Desktop: Story = {
  render: function Render() {
    return <HeadingList />;
  },
  parameters: { viewport: { defaultViewport: 'desktop' } },
};
