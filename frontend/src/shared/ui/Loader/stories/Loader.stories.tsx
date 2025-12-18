import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loader } from '../Loader';

const meta: Meta<typeof Loader> = {
  title: 'Shared/Loader',
  component: Loader,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: `
**Loader** is a visual indicator used to represent a loading or pending state.

It is commonly used:
- while fetching data
- during async actions (form submit, page transitions)
- inside buttons or layouts to indicate progress

The loader is responsive, accessible, and adapts to the current text color
(using \`currentColor\`).
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default loader size. Inherits color from the parent element.',
      },
    },
  },
};

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to experiment with all loader props.',
      },
    },
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
};
