import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { DiseaseCard } from '../DiseaseCard';
import type { Disease } from '@shared/api/diseases/diseases.types';

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'diseaseCard.primarySymptoms': 'Primary Symptoms',
        'diseaseCard.riskFactors': 'Risk Factors',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock Icon component
jest.mock('@shared/ui/Icon', () => ({
  Icon: ({ name }: { name: string }) => <span data-testid="icon">{name}</span>,
}));

// Mock Badge component
jest.mock('@shared/ui/Badge', () => ({
  Badge: ({ children, className, variant }: { children: React.ReactNode; className?: string; variant?: string }) => (
    <span className={className} data-testid="badge" data-variant={variant}>{children}</span>
  ),
}));

// Mock TooltipBadge component
jest.mock('@shared/ui/TooltipBadge', () => ({
  TooltipBadge: ({ code, variant }: { code: string; variant: string; fullName?: string; category?: string }) => (
    <span data-testid={`tooltip-badge-${variant}`}>{code}</span>
  ),
}));

const mockDisease: Disease = {
  id: 1,
  code: 'IHD',
  name: 'Ischemic Heart Disease',
  description: 'A condition where blood flow to the heart is reduced, usually due to coronary artery disease.',
  prevention: 'Regular exercise, healthy diet, no smoking, control blood pressure.',
  symptoms: [
    { code: 'S001', name: 'Chest pain' },
    { code: 'S002', name: 'Shortness of breath' },
    { code: 'S003', name: 'Fatigue' },
  ],
  risks: [
    { code: 'R001', name: 'Hypertension' },
    { code: 'R002', name: 'Smoking' },
  ],
};

// Helper function to render with Router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('<DiseaseCard /> component', () => {
  test('renders disease name and ID badge', () => {
    renderWithRouter(<DiseaseCard disease={mockDisease} />);
    
    expect(screen.getByText('Ischemic Heart Disease')).toBeInTheDocument();
    expect(screen.getByText('#1')).toBeInTheDocument();
  });

  test('renders icon container with correct icon', () => {
    renderWithRouter(<DiseaseCard disease={mockDisease} />);
    
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    // Disease ID 1 % 8 = 1 -> 'ACTIVITY'
    expect(icon).toHaveTextContent('ACTIVITY');
  });

  test('renders primary symptoms section', () => {
    renderWithRouter(<DiseaseCard disease={mockDisease} />);
    
    expect(screen.getByText('Primary Symptoms')).toBeInTheDocument();
    
    const symptomBadges = screen.getAllByTestId('tooltip-badge-primary');
    expect(symptomBadges).toHaveLength(3);
    expect(screen.getByText('S001')).toBeInTheDocument();
    expect(screen.getByText('S002')).toBeInTheDocument();
    expect(screen.getByText('S003')).toBeInTheDocument();
  });

  test('renders risk factors section', () => {
    renderWithRouter(<DiseaseCard disease={mockDisease} />);
    
    expect(screen.getByText('Risk Factors')).toBeInTheDocument();
    
    const riskBadges = screen.getAllByTestId('tooltip-badge-secondary');
    expect(riskBadges).toHaveLength(2);
    expect(screen.getByText('R001')).toBeInTheDocument();
    expect(screen.getByText('R002')).toBeInTheDocument();
  });

  test('shows "+N more" badge when there are more than 3 symptoms', () => {
    const diseaseWithManySymptoms: Disease = {
      ...mockDisease,
      symptoms: [
        { code: 'S001', name: 'Chest pain' },
        { code: 'S002', name: 'Shortness of breath' },
        { code: 'S003', name: 'Fatigue' },
        { code: 'S004', name: 'Nausea' },
        { code: 'S005', name: 'Dizziness' },
      ],
    };
    
    renderWithRouter(<DiseaseCard disease={diseaseWithManySymptoms} />);
    
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  test('shows "+N more" badge when there are more than 3 risks', () => {
    const diseaseWithManyRisks: Disease = {
      ...mockDisease,
      risks: [
        { code: 'R001', name: 'Hypertension' },
        { code: 'R002', name: 'Smoking' },
        { code: 'R003', name: 'Diabetes' },
        { code: 'R004', name: 'Obesity' },
      ],
    };
    
    renderWithRouter(<DiseaseCard disease={diseaseWithManyRisks} />);
    
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  test('does not render symptoms section when symptoms array is empty', () => {
    const diseaseWithoutSymptoms: Disease = {
      ...mockDisease,
      symptoms: [],
    };
    
    renderWithRouter(<DiseaseCard disease={diseaseWithoutSymptoms} />);
    
    expect(screen.queryByText('Primary Symptoms')).not.toBeInTheDocument();
  });

  test('does not render risk factors section when risks array is empty', () => {
    const diseaseWithoutRisks: Disease = {
      ...mockDisease,
      risks: [],
    };
    
    renderWithRouter(<DiseaseCard disease={diseaseWithoutRisks} />);
    
    expect(screen.queryByText('Risk Factors')).not.toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = renderWithRouter(<DiseaseCard disease={mockDisease} className="custom-class" />);
    
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  test('renders correctly with different disease IDs for icon selection', () => {
    const diseaseWithDifferentId: Disease = {
      ...mockDisease,
      id: 5,
    };
    
    renderWithRouter(<DiseaseCard disease={diseaseWithDifferentId} />);
    
    const icon = screen.getByTestId('icon');
    // Disease ID 5 % 8 = 5 -> 'PILL'
    expect(icon).toHaveTextContent('PILL');
  });
});
