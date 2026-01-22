import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfinityScroll } from '../InfinityScroll';

interface MockItem {
  id: number;
  title: string;
  description: string;
}

const generateMockItems = (page: number, itemsPerPage: number): MockItem[] => {
  const startId = (page - 1) * itemsPerPage + 1;
  return Array.from({ length: itemsPerPage }, (_, i) => ({
    id: startId + i,
    title: `Item ${startId + i}`,
    description: `This is the description for item ${startId + i}. It contains some sample text to demonstrate the InfinityScroll component.`,
  }));
};

const meta: Meta<typeof InfinityScroll<MockItem>> = {
  title: 'Shared/InfinityScroll',
  component: InfinityScroll,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**InfinityScroll** provides infinite scrolling functionality with virtualization for performance.

Features:
- Virtualized rendering for large lists
- Load more button
- Lazy loading with pagination
- Responsive design
- Custom item rendering
        `,
      },
    },
  },
  argTypes: {
    fetchPage: {
      description: 'Function to fetch items for a specific page',
      table: { category: 'data' },
    },
    renderItem: {
      description: 'Function to render each item',
      table: { category: 'rendering' },
    },
    itemsPerPage: {
      control: 'number',
      description: 'Number of items per page',
      table: { category: 'pagination' },
    },
    buttonLabel: {
      control: 'text',
      description: 'Label for the load more button',
      table: { category: 'labels' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InfinityScroll<MockItem>>;

export const Default: Story = {
  args: {
    fetchPage: async (page: number) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return generateMockItems(page, 5);
    },
    renderItem: (item: MockItem) => (
      <div
        style={{
          padding: '1.5rem',
          border: '1px solid #e1e5eb',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          backgroundColor: '#fff',
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: 500 }}>
          {item.title}
        </h3>
        <p style={{ margin: 0, color: '#4d5665', fontSize: '0.875rem' }}>
          {item.description}
        </p>
      </div>
    ),
    itemsPerPage: 5,
    buttonLabel: 'Load More',
  },
};

export const SmallItems: Story = {
  args: {
    fetchPage: async (page: number) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return generateMockItems(page, 10);
    },
    renderItem: (item: MockItem) => (
      <div
        style={{
          padding: '0.75rem 1rem',
          border: '1px solid #e1e5eb',
          borderRadius: '0.375rem',
          marginBottom: '0.5rem',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontWeight: 500 }}>{item.title}</span>
        <span style={{ fontSize: '0.875rem', color: '#4d5665' }}>#{item.id}</span>
      </div>
    ),
    itemsPerPage: 10,
    buttonLabel: 'Load More Items',
  },
};

export const LargeItems: Story = {
  args: {
    fetchPage: async (page: number) => {
      await new Promise((resolve) => setTimeout(resolve, 700));
      // Limit to 3 pages
      if (page > 3) return [];
      return generateMockItems(page, 3);
    },
    renderItem: (item: MockItem) => (
      <div
        style={{
          padding: '2rem',
          border: '1px solid #e1e5eb',
          borderRadius: '0.875rem',
          marginBottom: '1.5rem',
          backgroundColor: '#fff',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem', fontWeight: 600 }}>
          {item.title}
        </h2>
        <p style={{ margin: '0 0 1rem 0', color: '#4d5665', lineHeight: 1.6 }}>
          {item.description}
        </p>
        <div
          style={{
            height: '200px',
            backgroundColor: '#f7f9fc',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9ca3af',
          }}
        >
          Image Placeholder
        </div>
      </div>
    ),
    itemsPerPage: 3,
    buttonLabel: 'Show More',
  },
};

export const LimitedData: Story = {
  args: {
    fetchPage: async (page: number) => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      // Only 2 pages available
      if (page > 2) return [];
      return generateMockItems(page, 5);
    },
    renderItem: (item: MockItem) => (
      <div
        style={{
          padding: '1.5rem',
          border: '1px solid #e1e5eb',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          backgroundColor: '#fff',
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: 500 }}>
          {item.title}
        </h3>
        <p style={{ margin: 0, color: '#4d5665', fontSize: '0.875rem' }}>
          {item.description}
        </p>
      </div>
    ),
    itemsPerPage: 5,
    buttonLabel: 'Load More',
  },
};
