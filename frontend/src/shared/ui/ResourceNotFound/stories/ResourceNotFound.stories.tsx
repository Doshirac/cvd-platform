import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResourceNotFound } from '../ResourceNotFound';

const meta: Meta<typeof ResourceNotFound> = {
  title: 'Shared/ResourceNotFound',
  component: ResourceNotFound,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: `
**ResourceNotFound** is a UI component used to display an empty state when no results are found.

It is used for:
- displaying empty search results
- showing when no data matches the current filters
- providing user feedback for empty states

The component supports a customizable message and adapts to light and dark themes.
It includes a search icon and helpful subtitle text.
        `,
      },
    },
  },

  argTypes: {
    message: {
      control: 'text',
      description: 'The main message to display when no resources are found.',
      table: {
        category: 'content',
        defaultValue: { summary: 'No diseases found' },
      },
    },

    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the container.',
      table: {
        category: 'appearance',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResourceNotFound>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default state with the standard "No diseases found" message.',
      },
    },
  },
};

export const CustomMessage: Story = {
  args: {
    message: 'No resources found',
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom message for different resource types.',
      },
    },
  },
};
