import type { GroupStoryProps } from '../../shared/types.js';
import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { ErrorDisplay, LoadingSpinner } from '../../shared/components.js';
import { filterVariablesByPrefix } from '../../shared/css-parser.js';
import { useCSSVariables } from '../../shared/use-css-variables.js';

import { COLOR_GROUPS, type ComponentColorKey } from './constants.js';

const meta: Meta = {
  title: 'Foundation/Component/Color',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

function GroupStory(props: GroupStoryProps<ComponentColorKey>) {
  const { groupKey } = props;
  const { variables, loading, error } = useCSSVariables('component', 'color');
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
  console.log(variables);
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

export const Button: Story = {
  render: function Render() {
    return <GroupStory groupKey={'button'} />;
  },
};
