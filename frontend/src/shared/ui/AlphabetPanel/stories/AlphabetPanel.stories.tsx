import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { AlphabetPanel } from '../AlphabetPanel';

const meta: Meta<typeof AlphabetPanel> = {
  title: 'Shared/AlphabetPanel',
  component: AlphabetPanel,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: `
**AlphabetPanel** is a UI component that displays an interactive alphabet navigation panel.

Key features:
- Supports English and Russian alphabets
- Allows users to filter content by selecting a letter
- Toggle selection by clicking the same letter again
- Automatically resets selection when language changes
- Fully accessible with proper ARIA labels
- Horizontal scrollable layout for mobile devices
- Adapts to light and dark themes

The component can be controlled or uncontrolled, making it flexible for different use cases.
        `,
      },
    },
  },

  argTypes: {
    language: {
      control: 'select',
      options: ['en', 'ru'],
      description: 'The language alphabet to display (English or Russian)',
      table: {
        category: 'content',
        defaultValue: { summary: 'en' },
      },
    },
    selectedLetter: {
      control: 'text',
      description: 'The currently selected letter (controlled mode)',
      table: {
        category: 'state',
      },
    },
    onLetterSelect: {
      action: 'letterSelected',
      description: 'Callback fired when a letter is selected or deselected',
      table: {
        category: 'events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const EnglishDefault: Story = {
  args: {
    language: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default AlphabetPanel with English alphabet. Click letters to select/deselect them.',
      },
    },
  },
};

export const RussianAlphabet: Story = {
  args: {
    language: 'ru',
  },
  parameters: {
    docs: {
      description: {
        story: 'AlphabetPanel displaying the Russian alphabet (32 letters).',
      },
    },
  },
};

export const WithSelectedLetter: Story = {
  args: {
    language: 'en',
    selectedLetter: 'M',
  },
  parameters: {
    docs: {
      description: {
        story: 'AlphabetPanel with a pre-selected letter "M".',
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [selectedLetter, setSelectedLetter] = useState<string | null>('C');
    
    return (
      <div>
        <div style={{ marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
          Selected Letter: <strong>{selectedLetter || 'None'}</strong>
        </div>
        <AlphabetPanel
          language="en"
          selectedLetter={selectedLetter}
          onLetterSelect={setSelectedLetter}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled AlphabetPanel where the parent component manages the selected letter state.',
      },
    },
  },
};

export const LanguageSwitching: Story = {
  render: () => {
    const [language, setLanguage] = useState<'en' | 'ru'>('en');
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
    
    return (
      <div>
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setLanguage('en')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: language === 'en' ? '#2a4e8a' : '#e1e5eb',
              color: language === 'en' ? '#fff' : '#1c1f25',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('ru')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: language === 'ru' ? '#2a4e8a' : '#e1e5eb',
              color: language === 'ru' ? '#fff' : '#1c1f25',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Русский
          </button>
        </div>
        <div style={{ marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
          Selected Letter: <strong>{selectedLetter || 'None'}</strong>
        </div>
        <AlphabetPanel
          language={language}
          selectedLetter={selectedLetter}
          onLetterSelect={setSelectedLetter}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demo showing language switching. Notice how the alphabet changes and selection is reset when switching languages.',
      },
    },
  },
};
