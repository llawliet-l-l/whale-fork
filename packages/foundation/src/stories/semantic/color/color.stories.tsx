import type { GroupStoryProps } from '../../shared/types.js';
import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { ErrorDisplay, LoadingSpinner } from '../../shared/components.js';
import { filterVariablesByPrefix } from '../../shared/css-parser.js';
import { useCSSVariables } from '../../shared/use-css-variables.js';

import { COLOR_GROUPS, type SemanticColorKey } from './constants.js';

const meta: Meta = {
  title: 'Foundation/Semantic/Color',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

function GroupStory(props: GroupStoryProps<SemanticColorKey>) {
  const { groupKey } = props;
  const { variables, loading, error } = useCSSVariables('semantic', 'color');
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  const group = COLOR_GROUPS[groupKey];
  if (!group) {
    return <ErrorDisplay error={'Group not found'} />;
  }
  const { prefix, title, description, component: GroupComponent } = group;
  const filtered = filterVariablesByPrefix(variables, prefix || '');
  return (
    <GroupComponent
      variables={filtered}
      title={title}
      description={description}
      namePrefix={prefix}
    />
  );
}

type Story = StoryObj;

export const Neutral: Story = {
  render: function Render() {
    return <GroupStory groupKey={'neutral'} />;
  },
};

export const Brand: Story = {
  render: function Render() {
    return <GroupStory groupKey={'brand'} />;
  },
};

export const Accent: Story = {
  render: function Render() {
    return <GroupStory groupKey={'accent'} />;
  },
};

export const System: Story = {
  render: function Render() {
    return <GroupStory groupKey={'system'} />;
  },
};
