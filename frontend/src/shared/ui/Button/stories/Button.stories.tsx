import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: `
**Button** is a base UI component used across the CVD platform.

It represents a clickable action element and is used for:
- primary call-to-action (CTA)
- secondary and navigation actions
- destructive or irreversible actions

The component supports multiple variants, sizes, states, and adapts to
light and dark themes. It is fully accessible and keyboard-focusable.
        `,
      },
    },
  },

  argTypes: {
    onClick: {
      action: 'clicked',
      description: 'Callback fired when the button is clicked.',
      table: { category: 'events' },
    },

    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
      description: `
Visual style of the button.

- **primary** — main action (CTA)
- **secondary** — secondary or navigation action
- **destructive** — dangerous or irreversible action
- **outline** — neutral action with border
- **ghost** — minimal visual emphasis
- **link** — looks and behaves like a text link
      `,
      table: {
        category: 'appearance',
        defaultValue: { summary: 'primary' },
      },
    },

    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      description: `
Defines the button size.

- **default** — standard button size
- **sm** — compact button
- **lg** — large button
- **icon** — square button for icons only
- **icon-sm / icon-lg** — icon button size variations
      `,
      table: {
        category: 'appearance',
        defaultValue: { summary: 'default' },
      },
    },

    disabled: {
      control: 'boolean',
      description: `
Disables the button.

- prevents user interaction
- blocks click events
- visually indicates inactive state
      `,
      table: {
        category: 'state',
        defaultValue: { summary: 'false' },
      },
    },

    fullWidth: {
      control: 'boolean',
      description: `
Expands the button to the full width of its container.
Commonly used in forms and mobile layouts.
      `,
      table: {
        category: 'layout',
        defaultValue: { summary: 'false' },
      },
    },

    className: {
      control: false,
      description: 'Additional custom class names.',
      table: { category: 'styling' },
    },
  },

  args: {
    children: 'Button',
    variant: 'primary',
    size: 'default',
    disabled: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary' },
  parameters: {
    docs: {
      description: {
        story: 'Primary button used for the main user action.',
      },
    },
  },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
  parameters: {
    docs: {
      description: {
        story: 'Secondary button used for navigation or secondary actions.',
      },
    },
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state — the button is not interactive.',
      },
    },
  },
};

export const Small: Story = {
  args: { size: 'sm' },
  parameters: {
    docs: {
      description: {
        story: 'Small button variant for compact layouts.',
      },
    },
  },
};

export const Large: Story = {
  args: { size: 'lg' },
  parameters: {
    docs: {
      description: {
        story: 'Large button variant for emphasis.',
      },
    },
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '★',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon-only button, typically used for toolbar actions.',
      },
    },
  },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: {
    docs: {
      description: {
        story: 'Button stretched to full container width.',
      },
    },
  },
};

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to experiment with all button props.',
      },
    },
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
};
