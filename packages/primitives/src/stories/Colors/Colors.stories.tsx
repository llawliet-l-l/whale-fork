import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { Colors } from './mod.js';

const blueColors = [
        'w-pri-palette-blue-base-10',
        'w-pri-palette-blue-base-20',
        'w-pri-palette-blue-base-30',
        'w-pri-palette-blue-base-40',
        'w-pri-palette-blue-base-50',
        'w-pri-palette-blue-base-60',
        'w-pri-palette-blue-base-70',
        'w-pri-palette-blue-base-80',
        'w-pri-palette-blue-base-90',
        'w-pri-palette-blue-base-100',
];

const yellowColors = [
        'w-pri-palette-yellow-base-10',
        'w-pri-palette-yellow-base-20',
        'w-pri-palette-yellow-base-30',
        'w-pri-palette-yellow-base-40',
        'w-pri-palette-yellow-base-50',
        'w-pri-palette-yellow-base-60',
        'w-pri-palette-yellow-base-70',
        'w-pri-palette-yellow-base-80',
        'w-pri-palette-yellow-base-90',
        'w-pri-palette-yellow-base-100',
];

function Color(props) {
        return (
                <div>
                        {props.data.map((color) => (
                                <Colors color={color} />
                        ))}
                </div>
        );
}

const meta: Meta<typeof Colors> = {
        title: 'primitives/Colors',
        component: Color,
};

export default meta;
type Story = StoryObj<typeof Colors>;

export const Blue: Story = {
        args: {
                primary: true,
                data: blueColors,
        },
};

export const Yellow: Story = {
        args: {
                data: yellowColors,
        },
};
