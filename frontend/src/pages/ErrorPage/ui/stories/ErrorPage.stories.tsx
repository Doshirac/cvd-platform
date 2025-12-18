import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorPage } from '../ErrorPage';

const meta: Meta<typeof ErrorPage> = {
  title: 'Pages/ErrorPage',
  component: ErrorPage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**ErrorPage** displays a user-friendly error message when something goes wrong.

It is used by the global **ErrorBoundary** and provides a way to recover
by refreshing the page.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ErrorPage>;

export const Default: Story = {};
