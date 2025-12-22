import type { Meta, StoryObj } from '@storybook/react-vite';
import { MainLayout } from '../MainLayout';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createReduxStore } from '@app/providers/StoreProvider/config/store';
import { ThemeProvider } from '@shared/context/ThemeContext';

const store = createReduxStore();

const meta: Meta<typeof MainLayout> = {
  title: 'App/Layouts/MainLayout',
  component: MainLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**MainLayout** is the main application layout that includes the header, main content area, and a scroll-to-top button.

It handles:
- Fetching initial data (sources, diseases, risk factors, symptoms)
- Rendering child routes via React Router's Outlet
- Providing consistent layout structure across the application
        `,
      },
    },
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <Story />
          </MemoryRouter>
        </Provider>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MainLayout>;

export const Default: Story = {
  render: () => (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <div style={{ padding: '2rem' }}>
              <h1>Home Page</h1>
              <p>This is the main content area rendered via the Outlet component.</p>
            </div>
          }
        />
      </Route>
    </Routes>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <div style={{ padding: '2rem' }}>
              <h1>Page with Long Content</h1>
              <p>Scroll down to see the scroll-to-top button in action.</p>
              {Array.from({ length: 50 }, (_, i) => (
                <p key={i} style={{ marginBottom: '1rem' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Paragraph {i + 1}
                </p>
              ))}
            </div>
          }
        />
      </Route>
    </Routes>
  ),
};

export const WithMultipleRoutes: Story = {
  render: () => (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <div style={{ padding: '2rem' }}>
              <h1>Home</h1>
              <p>This demonstrates the layout with different route content.</p>
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div style={{ padding: '2rem' }}>
              <h1>About</h1>
              <p>About page content goes here.</p>
            </div>
          }
        />
      </Route>
    </Routes>
  ),
};
