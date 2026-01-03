import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { TabPanel } from '../TabPanel';
import type { Tab } from '../TabPanel.types';

const meta: Meta<typeof TabPanel> = {
  title: 'Shared/TabPanel',
  component: TabPanel,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: `
**TabPanel** is a UI component that displays tabbed content with navigation.

Key features:
- Supports multiple tabs with custom content
- Controlled or uncontrolled mode
- Keyboard accessible with proper ARIA attributes
- Smooth transitions between tabs
- Adapts to light and dark themes
- Mobile responsive design

The component manages tab state internally or can be controlled externally for more complex use cases.
        `,
      },
    },
  },

  argTypes: {
    tabs: {
      description: 'Array of tab objects with id, label, and content',
      table: {
        category: 'content',
      },
    },
    activeTab: {
      control: 'text',
      description: 'The currently active tab ID (controlled mode)',
      table: {
        category: 'state',
      },
    },
    onTabChange: {
      action: 'tabChanged',
      description: 'Callback fired when a tab is selected',
      table: {
        category: 'events',
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class for the container',
      table: {
        category: 'styling',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTabs: Tab[] = [
  {
    id: 'overview',
    label: 'Overview',
    content: (
      <div style={{ padding: '1rem', fontFamily: 'Inter, sans-serif' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Overview</h3>
        <p>This is the overview content section with important information.</p>
      </div>
    ),
  },
  {
    id: 'primary',
    label: 'Primary Symptoms',
    content: (
      <div style={{ padding: '1rem', fontFamily: 'Inter, sans-serif' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Primary Symptoms</h3>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li>Chest pain or discomfort</li>
          <li>Shortness of breath</li>
          <li>Irregular heartbeat</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'secondary',
    label: 'Secondary Symptoms',
    content: (
      <div style={{ padding: '1rem', fontFamily: 'Inter, sans-serif' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Secondary Symptoms</h3>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li>Fatigue</li>
          <li>Dizziness</li>
          <li>Nausea</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'risk',
    label: 'Risk Factors',
    content: (
      <div style={{ padding: '1rem', fontFamily: 'Inter, sans-serif' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Risk Factors</h3>
        <p>Understanding risk factors can help prevent cardiovascular disease.</p>
      </div>
    ),
  },
  {
    id: 'prevention',
    label: 'Prevention',
    content: (
      <div style={{ padding: '1rem', fontFamily: 'Inter, sans-serif' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Prevention</h3>
        <p>Learn about prevention strategies and healthy lifestyle choices.</p>
      </div>
    ),
  },
];

export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<string>('overview');

    return (
      <div>
        <div style={{ marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
          <strong>Current Tab:</strong> {activeTab}
        </div>
        <TabPanel tabs={defaultTabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Controlled TabPanel where the parent component manages the active tab state. Click any tab to switch between content.',
      },
    },
  },
};
