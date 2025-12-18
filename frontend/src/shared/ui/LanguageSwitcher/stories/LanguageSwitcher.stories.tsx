import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageSwitcher } from '../LanguageSwitcher';

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Shared/LanguageSwitcher',
  component: LanguageSwitcher,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: `
**LanguageSwitcher** is a UI component that allows users to select a language.

Key features:
- Uses the Button and Icon components for consistent styling
- Displays a dropdown with language options
- Fully accessible with proper ARIA labels
- Adapts to the current theme with appropriate colors

The component integrates seamlessly with the application UI.
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
        story:
          'LanguageSwitcher with default settings. Click to open the dropdown and select a language.',
      },
    },
  },
};
