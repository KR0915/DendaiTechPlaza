import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import StarButton from './StarButton';

const meta: Meta<typeof StarButton> = {
    title: 'Components/elements/Buttons/BookmarkButon/StarButton',
    component: StarButton,
    tags: ['autodocs'],
    argTypes: {
        isBookmark: { control: 'boolean' }
    },
};

export default meta;
type Story = StoryObj<typeof StarButton>;

export const Bookmarked: Story = {
    args: {
        isBookmark: true,
    },
};

export const NotBookmarked: Story = {
    args: {
        isBookmark: false,
    },
};

export const Interactive: Story = {
    args: {
        isBookmark: false,
    },
    render: (args) => {
        const [isBookmark, setIsBookmark] = useState(args.isBookmark);
        return (
            <button onClick={() => setIsBookmark(!isBookmark)}>
                <StarButton isBookmark={isBookmark} />
            </button>
        );
    },
};