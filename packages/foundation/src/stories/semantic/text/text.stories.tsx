import type { GroupStoryProps } from '../../shared/types.js';
import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { ErrorDisplay, LoadingSpinner } from '../../shared/components.js';
import { filterVariablesByPrefix } from '../../shared/css-parser.js';
import { useCSSVariables } from '../../shared/use-css-variables.js';

import { type SemanticTextKey, TEXT_GROUPS } from './constants.js';

const meta: Meta = {
  title: 'Foundation/Semantic/Text',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

function GroupStory(props: GroupStoryProps<SemanticTextKey>) {
  const { groupKey } = props;
  const { variables, loading, error } = useCSSVariables('semantic', 'text');
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  const group = TEXT_GROUPS[groupKey];
  if (!group) {
    return <ErrorDisplay error={'Group not found'} />;
  }
  const { prefix, title, component: GroupComponent } = group;
  const filtered = filterVariablesByPrefix(variables, prefix || '');
  return (
    <GroupComponent variables={filtered} title={title} namePrefix={prefix} />
  );
}

type Story = StoryObj;

export const Title: Story = {
  render: function Render() {
    return <GroupStory groupKey={'title'} />;
  },
};

export const Label: Story = {
  render: function Render() {
    return <GroupStory groupKey={'label'} />;
  },
};

export const Paragraph: Story = {
  render: function Render() {
    return <GroupStory groupKey={'paragraph'} />;
  },
};
