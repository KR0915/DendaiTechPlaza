import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import BookmarkButton from './BookmarkButton';

const meta: Meta<typeof BookmarkButton> = {
  title: 'Components/BookmarkButton',
  component: BookmarkButton,
  argTypes: {
    isBookmarked: { control: 'boolean' },
    onToggle: { action: 'toggled' },
    isLoading: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BookmarkButton>;

export const Default: Story = {
  args: {
    isBookmarked: false,
    isLoading: false,
  },
};

export const Bookmarked: Story = {
  args: {
    isBookmarked: true,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    isBookmarked: false,
    isLoading: true,
  },
};

export const Clicked: Story = {
  args: {
    isBookmarked: false,
    isLoading: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const bookmarkButton = canvas.getByRole('button');
    await userEvent.click(bookmarkButton);
    args.onToggle();
  },
};