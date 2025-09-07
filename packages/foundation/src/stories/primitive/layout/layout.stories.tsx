import type { GroupStoryProps } from '../../shared/types.js';
import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { ErrorDisplay, LoadingSpinner } from '../../shared/components.js';
import { filterVariablesByPrefix } from '../../shared/css-parser.js';
import { useCSSVariables } from '../../shared/use-css-variables.js';

import { LAYOUT_GROUPS, type LayoutKey } from './constants.js';

function GroupStory(props: GroupStoryProps<LayoutKey>) {
  const { groupKey } = props;
  const { variables, loading, error } = useCSSVariables('primitive', 'layout');
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  const group = LAYOUT_GROUPS[groupKey];
  if (!group) {
    return <ErrorDisplay error={'Group not found'} />;
  }
  const { prefix, title, component: GroupComponent } = group;
  const filtered = filterVariablesByPrefix(variables, prefix || '');
  return (
    <GroupComponent variables={filtered} title={title} groupKey={groupKey} />
  );
}

const meta: Meta = {
  title: 'Foundation/Primitive/Layout',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Border: Story = {
  render: function Render() {
    return <GroupStory groupKey={'border'} />;
  },
};

export const Radius: Story = {
  render: function Render() {
    return <GroupStory groupKey={'radius'} />;
  },
};

export const Spacing: Story = {
  render: function Render() {
    return <GroupStory groupKey={'spacing'} />;
  },
};

export const Breakpoint: Story = {
  render: function Render() {
    return <GroupStory groupKey={'breakpoint'} />;
  },
};
