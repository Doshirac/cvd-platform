import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResearchCard, ResearchModal } from '../index';
import type { Research } from '../ResearchCard.types';

const mockResearch: Research = {
  id: 1,
  title: 'Heart Attack Prediction using Machine Learning',
  description: 'Comprehensive analysis of cardiovascular risk factors using ensemble learning methods to predict heart attack probability with high accuracy.',
  category: 'prediction',
  methodology: 'We employed a combination of Random Forest, Gradient Boosting, and Neural Networks to build an ensemble model.',
  findings: [
    'Age and cholesterol levels are the strongest predictors',
    'Ensemble methods outperform single classifiers by 12%',
    'Early detection can reduce mortality by 40%',
  ],
  tools: ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas'],
  dataset: 'UCI Heart Disease Dataset',
  accuracy: 94,
  samples: 303,
  features: 14,
  date: '2024-12-15',
  imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
};

const meta: Meta<typeof ResearchCard> = {
  title: 'Shared/ResearchCard',
  component: ResearchCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**ResearchCard** displays research project information in a clean, clickable card format.

Features:
- Line-clamped title (2 lines) and description (3 lines)
- Optional image with hover scale effect
- Whole card is clickable
- Keyboard navigation support
- Group hover effects
        `,
      },
    },
  },
  argTypes: {
    research: {
      description: 'The research object to display',
      table: { category: 'data' },
    },
    onViewDetails: {
      action: 'clicked',
      description: 'Callback when card is clicked',
      table: { category: 'events' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: { category: 'appearance' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResearchCard>;

export const Default: Story = {
  args: {
    research: mockResearch,
  },
};

export const WithoutImage: Story = {
  args: {
    research: {
      ...mockResearch,
      imageUrl: undefined,
    },
  },
};

export const ShortDescription: Story = {
  args: {
    research: {
      ...mockResearch,
      description: 'Brief analysis of heart disease.',
    },
  },
};

export const LongTitle: Story = {
  args: {
    research: {
      ...mockResearch,
      title: 'Comprehensive Deep Learning Analysis of Cardiovascular Disease Risk Factors Using Advanced Machine Learning Techniques',
    },
  },
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '1200px' }}>
      <ResearchCard research={mockResearch} />
      <ResearchCard research={{ ...mockResearch, id: 2, title: 'CVD Statistical Analysis', imageUrl: undefined }} />
      <ResearchCard research={{ ...mockResearch, id: 3, title: 'Data Visualization Study' }} />
    </div>
  ),
};

export const WithModal: Story = {
  render: () => {
    const [selectedResearch, setSelectedResearch] = useState<Research | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <ResearchCard
          research={mockResearch}
          onViewDetails={(r) => {
            setSelectedResearch(r);
            setIsOpen(true);
          }}
        />
        <ResearchModal
          research={selectedResearch}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </>
    );
  },
};
