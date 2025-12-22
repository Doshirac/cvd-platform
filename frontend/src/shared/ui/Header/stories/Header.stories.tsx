import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@shared/context/ThemeContext';
import Header from '../Header';

const meta: Meta<typeof Header> = {
  title: 'Shared/Header',
  component: Header,
  tags: ['autodocs'],

  decorators: [
    Story => (
      <ThemeProvider>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </ThemeProvider>
    ),
  ],

  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Header** is the main navigation component for the CVD Platform application.

Key features:
- Responsive design with desktop and mobile layouts
- Logo with icon and text linking to home
- Navigation links: Home, Sources, Research
- Language switcher and theme toggle
- Mobile menu with slide-in animation using Framer Motion
- Uses useBreakpoint hook to determine layout
- Locks body scroll when mobile menu is open
- Fully accessible with proper ARIA labels and keyboard navigation

The component adapts seamlessly between desktop and mobile views:
- **Desktop**: Horizontal navigation with all links visible
- **Mobile**: Burger menu that opens a slide-in panel from the right

Theme support:
- Fully styled for both light and dark themes
- Backdrop blur effect for modern look
- Smooth transitions and animations
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    backgrounds: { default: 'light' },
    docs: {
      description: {
        story:
          'Default header view with full navigation bar, logo, language switcher, and theme toggle.',
      },
    },
  },
  decorators: [
    Story => {
      if (typeof window !== 'undefined') {
        document.documentElement.classList.remove('theme-dark');
        document.documentElement.classList.add('theme-light');
      }
      return <Story />;
    },
  ],
};

export const WithPageContent: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    backgrounds: { default: 'light' },
    docs: {
      description: {
        story:
          'Header shown with page content below to demonstrate its sticky positioning and backdrop blur effect. Scroll down to see how the header stays at the top.',
      },
    },
  },
  decorators: [
    Story => {
      if (typeof window !== 'undefined') {
        document.documentElement.classList.remove('theme-dark');
        document.documentElement.classList.add('theme-light');
      }
      return (
        <div style={{ minHeight: '200vh' }}>
          <Story />
          <div style={{ padding: '2rem' }}>
            <h1>Page Content</h1>
            <p>Scroll down to see the sticky header behavior.</p>
            <div style={{ marginTop: '50vh' }}>
              <h2>More Content</h2>
              <p>The header should remain visible at the top of the viewport.</p>
            </div>
          </div>
        </div>
      );
    },
  ],
};
