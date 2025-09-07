import type { GroupStoryProps } from '../../shared/types.js';
import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { ErrorDisplay, LoadingSpinner } from '../../shared/components.js';
import { filterVariablesByPrefix } from '../../shared/css-parser.js';
import { useCSSVariables } from '../../shared/use-css-variables.js';

import { PALETTE_GROUPS, type PaletteKey } from './constants.js';

const meta: Meta = {
  title: 'Foundation/Primitive/Palette',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

function GroupStory(props: GroupStoryProps<PaletteKey>) {
  const { groupKey } = props;
  const { variables, loading, error } = useCSSVariables('primitive', 'palette');
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  const group = PALETTE_GROUPS[groupKey];
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

export const Black: Story = {
  render: function Render() {
    return <GroupStory groupKey={'black'} />;
  },
};
export const White: Story = {
  render: function Render() {
    return <GroupStory groupKey={'white'} />;
  },
};
export const Gray: Story = {
  render: function Render() {
    return <GroupStory groupKey={'gray'} />;
  },
};
export const Lavender: Story = {
  render: function Render() {
    return <GroupStory groupKey={'lavender'} />;
  },
};
export const Blue: Story = {
  render: function Render() {
    return <GroupStory groupKey={'blue'} />;
  },
};
export const Sky: Story = {
  render: function Render() {
    return <GroupStory groupKey={'sky'} />;
  },
};
export const Teal: Story = {
  render: function Render() {
    return <GroupStory groupKey={'teal'} />;
  },
};
export const Green: Story = {
  render: function Render() {
    return <GroupStory groupKey={'green'} />;
  },
};
export const Yellow: Story = {
  render: function Render() {
    return <GroupStory groupKey={'yellow'} />;
  },
};
export const Orange: Story = {
  render: function Render() {
    return <GroupStory groupKey={'orange'} />;
  },
};
export const Red: Story = {
  render: function Render() {
    return <GroupStory groupKey={'red'} />;
  },
};
export const Magenta: Story = {
  render: function Render() {
    return <GroupStory groupKey={'magenta'} />;
  },
};
export const Purple: Story = {
  render: function Render() {
    return <GroupStory groupKey={'purple'} />;
  },
};
