import type { Meta, StoryObj } from '@storybook/react';

import { Route } from './mod.js';

const meta: Meta<typeof Route> = {
  title: 'rango/Route',
  component: Route,
};

export default meta;
type Story = StoryObj<typeof Route>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Route',
  },
};
