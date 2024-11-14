import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import BookmarkButton from './BookmarkButton';

const meta:Meta<typeof BookmarkButton> = {
  title: 'Components/BookmarkButton',
  component: BookmarkButton,
  argTypes: {
    postId: { control: 'text' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BookmarkButton>;

export const Default: Story = {
  args: {
    postId: '1',
  },
};

export const InitiallyBookmarked: Story = {
  args: {
    postId: '2',
  },
};

export const Clicked: Story = {
  args: {
    postId: '3',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bookmarkButton = canvas.getByRole('button');
    await userEvent.click(bookmarkButton);
  },
};