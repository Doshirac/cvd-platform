import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from '../Footer';

const meta: Meta<typeof Footer> = {
  title: 'UI/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Footer component with medical disclaimer and copyright information. Displays a warning that the platform is for educational purposes only and users should consult healthcare professionals.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, padding: '2rem' }}>
          <p>Page content goes here...</p>
        </div>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};

export const LightTheme: Story = {
  parameters: {
    backgrounds: { default: 'light' },
  },
  decorators: [
    (Story) => {
      document.documentElement.className = 'theme-light';
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: '2rem' }}>
            <p>Page content in light theme...</p>
          </div>
          <Story />
        </div>
      );
    },
  ],
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => {
      document.documentElement.className = 'theme-dark';
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0f1419' }}>
          <div style={{ flex: 1, padding: '2rem', color: '#f7f9fc' }}>
            <p>Page content in dark theme...</p>
          </div>
          <Story />
        </div>
      );
    },
  ],
};
