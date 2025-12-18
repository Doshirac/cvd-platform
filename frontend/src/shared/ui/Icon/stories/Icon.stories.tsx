import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, iconMap, iconColors, iconSizes } from '../index';

const meta: Meta<typeof Icon> = {
  title: 'Shared/Icon',
  component: Icon,
  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Icon** is a base UI component used across the application.

It renders icons from a predefined icon set and supports:
- configurable size
- configurable color
- accessibility via \`aria-label\`

The icon uses \`currentColor\`, allowing it to inherit color
from parent components such as buttons, links, or text.
        `,
      },
    },
  },

  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(iconMap),
      description: 'Icon name from the predefined icon set.',
      table: {
        category: 'appearance',
      },
    },

    size: {
      control: 'select',
      options: Object.values(iconSizes),
      description: 'Controls the icon size.',
      table: {
        category: 'appearance',
        defaultValue: { summary: iconSizes.MEDIUM },
      },
    },

    color: {
      control: 'select',
      options: Object.values(iconColors),
      description: `
Controls the icon color.

Uses \`currentColor\` internally, so the actual color
can also be inherited from the parent component.
      `,
      table: {
        category: 'appearance',
        defaultValue: { summary: iconColors.PRIMARY },
      },
    },

    ariaLabel: {
      control: 'text',
      description: 'Accessible label for screen readers.',
      table: {
        category: 'accessibility',
      },
    },
  },

  args: {
    name: 'CHECK',
    size: iconSizes.MEDIUM,
    color: iconColors.PRIMARY,
    ariaLabel: 'Icon',
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        story: 'Interactive playground to explore all icon properties.',
      },
    },
  },
};

export const Primary: Story = {
  args: {
    name: 'CHECK',
    color: iconColors.PRIMARY,
  },
};

export const Success: Story = {
  args: {
    name: 'CHECK',
    color: iconColors.SUCCESS,
  },
};

export const Danger: Story = {
  args: {
    name: 'CLOSE',
    color: iconColors.DANGER,
  },
};

export const Large: Story = {
  args: {
    name: 'INFO',
    size: iconSizes.LARGE,
  },
};
