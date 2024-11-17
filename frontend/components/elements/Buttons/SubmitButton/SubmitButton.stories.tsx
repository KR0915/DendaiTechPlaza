import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';
import SubmitButton from './SubmitButton';

const meta: Meta<typeof SubmitButton> = {
    title: 'Components/elements/Buttons/SubmitButton/SubmitButton',
    component: SubmitButton,
    tags: ['autodocs'],
    argTypes: {
        preText: { control: 'text' },
        postText: { control: 'text' },
        disabled: { control: 'boolean' },
        padding: { control: 'text' },
        baseColor: { control: 'text' },
        hoverColor: { control: 'text' },
        textColor: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof SubmitButton>;

export const Default: Story = {
    args: {
        preText: 'Submit',
        postText: 'Submitting',
        disabled: false,
        padding: 'px-4 py-2',
        baseColor: 'bg-DendaiTechBlue',
        hoverColor: 'hover:bg-DendaiTechBlue/75',
        textColor: 'text-white',
    },
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true,
    },
};

export const CustomColors: Story = {
    args: {
        ...Default.args,
        baseColor: 'bg-green-500',
        hoverColor: 'hover:bg-green-600',
        textColor: 'text-black',
    },
};

export const LargePadding: Story = {
    args: {
        ...Default.args,
        padding: 'px-8 py-4',
    },
};

export const Interactive: Story = {
    args: {
        ...Default.args,
    },
    render: (args) => {
        const [isDisabled, setIsDisabled] = useState(args.disabled);
        return (
            <button onClick={() => setIsDisabled(!isDisabled)}>
                <SubmitButton preText={'ログイン'} postText={'ログイン中'} disabled={isDisabled}  />
            </button>
        );
    },
};