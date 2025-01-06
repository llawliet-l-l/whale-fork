import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from './mod.js';

const meta: Meta<typeof Stack> = {
  title: 'base/Stack',
  component: Stack,
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Stack',
  },
};
