import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollToTop } from '../ScrollToTop';

const meta: Meta<typeof ScrollToTop> = {
  title: 'Shared/ScrollToTop',
  component: ScrollToTop,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**ScrollToTop** is a floating action button that scrolls the page to the top.

In this story, the button is shown in a fixed position relative to the viewport,
as it would appear in the real application.
        `,
      },
    },
  },
  args: {
    visible: true,
  },
};

export default meta;
type Story = StoryObj<typeof ScrollToTop>;

export const Default: Story = {
  render: args => (
    <div
      style={{
        minHeight: '200vh',
        padding: '2rem',
        position: 'relative',
        background: 'linear-gradient(to bottom, #f7f9fc 0%, #f7f9fc 60%, #e9edf5 100%)',
      }}
    >
      <h2>Scroll down</h2>
      <p>
        This is a mock page to demonstrate how <strong>ScrollToTop</strong> behaves when the page is
        scrollable.
      </p>
      <ScrollToTop {...args} />
    </div>
  ),
};
