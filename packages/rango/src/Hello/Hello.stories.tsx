import type { Meta, StoryObj } from '@storybook/react';

import { Hello } from './';

const meta: Meta<typeof Hello> = {
  component: Hello,
};

export default meta;
type Story = StoryObj<typeof Hello>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Hello',
  },
};
