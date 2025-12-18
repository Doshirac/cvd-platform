import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeToggle } from '../ThemeToggle';
import { ThemeProvider } from '@shared/context/ThemeContext';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Shared/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],

  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],

  parameters: {
    docs: {
      description: {
        component: `
**ThemeToggle** is a UI component that allows users to switch between light and dark themes.

Key features:
- Uses the Button and Icon components for consistent styling
- Displays a Sun icon in light mode and Moon icon in dark mode
- Automatically saves theme preference to localStorage
- Fully accessible with proper ARIA labels
- Adapts to the current theme with appropriate colors

The component integrates with the ThemeContext and provides a seamless theme-switching experience.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightTheme: Story = {
  parameters: {
    backgrounds: { default: 'light' },
    docs: {
      description: {
        story: 'ThemeToggle in light theme showing the Sun icon. Click to switch to dark theme.',
      },
    },
  },
  decorators: [
    Story => {
      // Force light theme for this story
      if (typeof window !== 'undefined') {
        document.documentElement.classList.remove('theme-dark');
        document.documentElement.classList.add('theme-light');
      }
      return (
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'ThemeToggle in dark theme showing the Moon icon. Click to switch to light theme.',
      },
    },
  },
  decorators: [
    Story => {
      // Force dark theme for this story
      if (typeof window !== 'undefined') {
        document.documentElement.classList.remove('theme-light');
        document.documentElement.classList.add('theme-dark');
      }
      return (
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive ThemeToggle. Click to toggle between light and dark themes.',
      },
    },
  },
};

export const InHeader: Story = {
  name: 'In Header Context',
  parameters: {
    docs: {
      description: {
        story: 'Example of ThemeToggle placed in a header-like container.',
      },
    },
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem',
            backgroundColor: 'var(--bg-color)',
            border: '1px solid var(--border-color)',
            borderRadius: '0.5rem',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>App Header</span>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
