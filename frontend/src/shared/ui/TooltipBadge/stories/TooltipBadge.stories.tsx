import type { Meta, StoryObj } from '@storybook/react-vite';
import { TooltipBadge } from '../TooltipBadge';

const meta = {
  title: 'Shared/TooltipBadge',
  component: TooltipBadge,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    code: {
      control: 'text',
      description: 'The abbreviated code to display',
    },
    tooltip: {
      control: 'text',
      description: 'The full name/description to show in tooltip',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Badge color variant (primary: blue, secondary: red)',
    },
    className: {
      control: 'text',
      description: 'Optional CSS class name',
    },
  },
} satisfies Meta<typeof TooltipBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    code: 'SOB',
    tooltip: 'Shortness of Breath',
  },
  render: args => (
    <div style={{ margin: '2rem' }}>
      <TooltipBadge {...args} />
    </div>
  ),
};

export const ChestPain: Story = {
  args: {
    code: 'CP',
    tooltip: 'Chest Pain',
  },
  render: args => (
    <div style={{ margin: '2rem' }}>
      <TooltipBadge {...args} />
    </div>
  ),
};

export const Dizziness: Story = {
  args: {
    code: 'DIZ',
    tooltip: 'Dizziness',
  },
  render: args => (
    <div style={{ margin: '2rem' }}>
      <TooltipBadge {...args} />
    </div>
  ),
};

export const Secondary: Story = {
  args: {
    code: 'HC',
    tooltip: 'High Cholesterol',
    variant: 'secondary',
  },
  render: args => (
    <div style={{ margin: '2rem' }}>
      <TooltipBadge {...args} />
    </div>
  ),
};

export const PrimarySymptoms: Story = {
  args: {
    code: 'ANG',
    tooltip: 'Angina',
  },
  render: () => (
    <div style={{ margin: '2rem' }}>
      <h3 style={{ marginBottom: '0.5rem' }}>Primary Symptoms</h3>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <TooltipBadge code="ANG" tooltip="Angina" />
        <TooltipBadge code="CP" tooltip="Chest Pain" />
        <TooltipBadge code="SOB" tooltip="Shortness of Breath" />
      </div>
    </div>
  ),
};

export const RiskFactors: Story = {
  args: {
    code: 'HC',
    tooltip: 'High Cholesterol',
    variant: 'secondary',
  },
  render: () => (
    <div style={{ margin: '2rem' }}>
      <h3 style={{ marginBottom: '0.5rem' }}>Risk Factors</h3>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <TooltipBadge code="HC" tooltip="High Cholesterol" variant="secondary" />
        <TooltipBadge code="SMK" tooltip="Smoking" variant="secondary" />
        <TooltipBadge code="FH" tooltip="Family History" variant="secondary" />
      </div>
    </div>
  ),
};

export const MultipleBadges: Story = {
  args: {
    code: 'CP',
    tooltip: 'Chest Pain',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '2rem' }}>
      <TooltipBadge code="CP" tooltip="Chest Pain" />
      <TooltipBadge code="SOB" tooltip="Shortness of Breath" />
      <TooltipBadge code="DIZ" tooltip="Dizziness" />
      <TooltipBadge code="N&V" tooltip="Nausea and Vomiting" />
      <TooltipBadge code="HA" tooltip="Headache" />
    </div>
  ),
};
