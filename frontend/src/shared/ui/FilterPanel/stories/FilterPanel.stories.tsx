import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterPanel } from '../FilterPanel';
import type { FilterGroup } from '../FilterPanel.types';

const meta: Meta<typeof FilterPanel> = {
  title: 'Shared/FilterPanel',
  component: FilterPanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**FilterPanel** is a reusable component for filtering data using collapsible sections with checkboxes.

Features:
- Collapsible filter groups for better organization
- Multiple selection support with checkboxes
- Reset functionality to clear all filters
- Responsive design with custom scrollbars
- Supports dark and light themes
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterPanel>;

const sampleFilterGroups: FilterGroup[] = [
  {
    id: 'symptoms',
    label: 'Symptoms',
    options: [
      { code: 'S001', label: 'Chest Pain (R07.9)' },
      { code: 'S002', label: 'Shortness of Breath (R06.0)' },
      { code: 'S003', label: 'Fatigue (R53.83)' },
      { code: 'S004', label: 'Palpitations (R00.2)' },
      { code: 'S005', label: 'Dizziness (R42)' },
      { code: 'S006', label: 'Nausea (R11.0)' },
    ],
  },
  {
    id: 'riskFactors',
    label: 'Risk Factors',
    options: [
      { code: 'RF001', label: 'Smoking (Z72.0)' },
      { code: 'RF002', label: 'High Blood Pressure (I10)' },
      { code: 'RF003', label: 'Diabetes (E11)' },
      { code: 'RF004', label: 'High Cholesterol (E78.0)' },
      { code: 'RF005', label: 'Obesity (E66.9)' },
      { code: 'RF006', label: 'Family History (Z82.49)' },
    ],
  },
];

export const Default: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<Record<string, string[]>>({});

    const handleFilterChange = (groupId: string, values: string[]) => {
      setSelectedValues((prev) => ({
        ...prev,
        [groupId]: values,
      }));
    };

    const handleReset = () => {
      setSelectedValues({});
    };

    return (
      <div style={{ maxWidth: '400px' }}>
        <FilterPanel
          filterGroups={sampleFilterGroups}
          selectedValues={selectedValues}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
      </div>
    );
  },
};

export const WithPreselectedValues: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<Record<string, string[]>>({
      symptoms: ['S001', 'S003'],
      riskFactors: ['RF002', 'RF003'],
    });

    const handleFilterChange = (groupId: string, values: string[]) => {
      setSelectedValues((prev) => ({
        ...prev,
        [groupId]: values,
      }));
    };

    const handleReset = () => {
      setSelectedValues({});
    };

    return (
      <div style={{ maxWidth: '400px' }}>
        <FilterPanel
          filterGroups={sampleFilterGroups}
          selectedValues={selectedValues}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
      </div>
    );
  },
};

export const WithoutResetButton: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<Record<string, string[]>>({});

    const handleFilterChange = (groupId: string, values: string[]) => {
      setSelectedValues((prev) => ({
        ...prev,
        [groupId]: values,
      }));
    };

    return (
      <div style={{ maxWidth: '400px' }}>
        <FilterPanel
          filterGroups={sampleFilterGroups}
          selectedValues={selectedValues}
          onFilterChange={handleFilterChange}
        />
      </div>
    );
  },
};

export const SingleGroup: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<Record<string, string[]>>({});

    const handleFilterChange = (groupId: string, values: string[]) => {
      setSelectedValues((prev) => ({
        ...prev,
        [groupId]: values,
      }));
    };

    const handleReset = () => {
      setSelectedValues({});
    };

    return (
      <div style={{ maxWidth: '400px' }}>
        <FilterPanel
          filterGroups={[sampleFilterGroups[0]]}
          selectedValues={selectedValues}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
      </div>
    );
  },
};
