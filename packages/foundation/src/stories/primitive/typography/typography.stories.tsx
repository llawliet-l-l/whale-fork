import type { GroupStoryProps } from '../../shared/types.js';
import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { ErrorDisplay, LoadingSpinner } from '../../shared/components.js';
import { filterVariablesByPrefix } from '../../shared/css-parser.js';
import { useCSSVariables } from '../../shared/use-css-variables.js';

import { TYPOGRAPHY_GROUPS, type TypographyKey } from './constants.js';

const meta: Meta = {
  title: 'Foundation/Primitive/Typography',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

function GroupStory(props: GroupStoryProps<TypographyKey>) {
  const { groupKey } = props;
  const { variables, loading, error } = useCSSVariables(
    'primitive',
    'typography',
  );
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  const group = TYPOGRAPHY_GROUPS[groupKey];
  if (!group) {
    return <ErrorDisplay error={'Group not found'} />;
  }
  const { prefix, title, component: GroupComponent } = group;
  const filtered = filterVariablesByPrefix(variables, prefix || '');
  return <GroupComponent variables={filtered} title={title} />;
}

export const FontFamily: Story = {
  render: function Render() {
    return <GroupStory groupKey={'font-family'} />;
  },
};

export const FontSize: Story = {
  render: function Render() {
    return <GroupStory groupKey={'font-size'} />;
  },
};

export const FontWeight: Story = {
  render: function Render() {
    return <GroupStory groupKey={'font-weight'} />;
  },
};

export const LineHeight: Story = {
  render: function Render() {
    return <GroupStory groupKey={'line-height'} />;
  },
};
