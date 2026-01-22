import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchBar } from '../SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Shared/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**SearchBar** is a reusable search input component with debouncing and clear functionality.

Features:
- Debounced onChange callback (default 300ms)
- Clear button when value is present
- Search icon indicator
- Customizable placeholder
- Controlled and uncontrolled modes
- Full theme support (light/dark)
- Fully accessible with ARIA labels
- Proper height matching reference design (h-11)
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The current search value (controlled mode)',
      table: { category: 'data' },
    },
    onChange: {
      action: 'changed',
      description: 'Callback when search value changes (debounced)',
      table: { category: 'events' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: { category: 'appearance' },
    },
    debounceMs: {
      control: 'number',
      description: 'Debounce delay in milliseconds',
      table: { category: 'behavior', defaultValue: { summary: '300' } },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: { category: 'appearance' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <div style={{ width: '400px' }}>
        <SearchBar
          value={value}
          onChange={setValue}
          placeholder="Search diseases..."
        />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--muted-text)' }}>
          Current value: {value || '(empty)'}
        </p>
      </div>
    );
  },
};

export const WithInitialValue: Story = {
  args: {
    value: 'heart disease',
    placeholder: 'Search diseases...',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Search sources by name or description...',
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <SearchBar {...args} />
    </div>
  ),
  args: {
    placeholder: 'Search across all content...',
  },
};

export const LongDebounce: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');
    
    return (
      <div style={{ width: '400px' }}>
        <SearchBar
          value={value}
          onChange={(v) => {
            setValue(v);
            setDebouncedValue(v);
          }}
          placeholder="Type to see 1s debounce..."
          debounceMs={1000}
        />
        <div style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
          <p style={{ color: 'var(--text)' }}>Immediate: {value || '(empty)'}</p>
          <p style={{ color: 'var(--muted-text)' }}>Debounced (1s): {debouncedValue || '(empty)'}</p>
        </div>
      </div>
    );
  },
};

export const InForm: Story = {
  render: () => {
    const [search, setSearch] = useState('');
    
    return (
      <div style={{ width: '400px' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(`Searching for: ${search}`);
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search and press Enter..."
          />
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </form>
      </div>
    );
  },
};
