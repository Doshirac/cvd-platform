import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge';

const meta: Meta<typeof Badge> = {
  title: 'Shared/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'muted'],
      description: 'The visual style variant of the badge',
    },
    children: {
      control: 'text',
      description: 'The content to display inside the badge',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Default Badge',
    variant: 'default',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Badge',
    variant: 'outline',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Badge',
    variant: 'secondary',
  },
};

export const Muted: Story = {
  args: {
    children: 'Muted Badge',
    variant: 'muted',
  },
};

export const WithNumber: Story = {
  args: {
    children: '#42',
    variant: 'secondary',
  },
};

export const MoreBadge: Story = {
  args: {
    children: '+5',
    variant: 'muted',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="muted">Muted</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge variant="default">ACTIVE</Badge>
      <Badge variant="secondary">#1</Badge>
      <Badge variant="muted">+3</Badge>
    </div>
  ),
};
