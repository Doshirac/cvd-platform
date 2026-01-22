import type { Meta, StoryObj } from '@storybook/react-vite';
import { SourceCard } from '../SourceCard';
import type { Source } from '@shared/api/sources/sources.types';

interface ExtendedSource extends Source {
  description: string;
  organization: string;
}

const mockSource: ExtendedSource = {
  id: 1,
  name: 'ESC Guidelines on Cardiovascular Disease Prevention',
  description: 'Comprehensive clinical practice guidelines for cardiovascular disease prevention in clinical practice.',
  organization: 'European Society of Cardiology',
  link: 'https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines/Cardiovascular-Disease-Prevention-in-clinical-practice',
};

const meta: Meta<typeof SourceCard> = {
  title: 'Shared/SourceCard',
  component: SourceCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**SourceCard** displays a medical source with its name, description, organization, and link.

Features:
- Shows source name prominently
- Displays source description and organization
- External link button opens in new tab
- Responsive design
        `,
      },
    },
  },
  argTypes: {
    source: {
      description: 'The source object to display',
      table: { category: 'data' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: { category: 'appearance' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SourceCard>;

export const Default: Story = {
  args: {
    source: mockSource,
  },
};

export const LongName: Story = {
  args: {
    source: {
      id: 2,
      name: 'National Heart, Lung, and Blood Institute (NHLBI)',
      description: 'Information and resources on cardiovascular diseases and their prevention.',
      organization: 'NHLBI',
      link: 'https://www.nhlbi.nih.gov/health-topics/cardiovascular-diseases',
    },
  },
};

export const LongLink: Story = {
  args: {
    source: {
      id: 3,
      name: 'Mayo Clinic',
      description: 'Comprehensive information on heart disease symptoms, causes, and treatments.',
      organization: 'Mayo Clinic',
      link: 'https://www.mayoclinic.org/diseases-conditions/heart-disease/symptoms-causes/syc-20353118',
    },
  },
};

export const List: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <SourceCard
        source={{
          id: 1,
          name: 'ESC Guidelines on Cardiovascular Disease Prevention',
          description: 'Comprehensive clinical practice guidelines for cardiovascular disease prevention in clinical practice.',
          organization: 'European Society of Cardiology',
          link: 'https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines/Cardiovascular-Disease-Prevention-in-clinical-practice',
        }}
      />
      <SourceCard
        source={{
          id: 2,
          name: 'National Heart, Lung, and Blood Institute (NHLBI)',
          description: 'Information and resources on cardiovascular diseases and their prevention.',
          organization: 'NHLBI',
          link: 'https://www.nhlbi.nih.gov/health-topics/cardiovascular-diseases',
        }}
      />
      <SourceCard
        source={{
          id: 3,
          name: 'Mayo Clinic',
          description: 'Comprehensive information on heart disease symptoms, causes, and treatments.',
          organization: 'Mayo Clinic',
          link: 'https://www.mayoclinic.org/diseases-conditions/heart-disease/symptoms-causes/syc-20353118',
        }}
      />
    </div>
  ),
};
