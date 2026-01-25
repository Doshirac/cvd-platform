import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SourceCard } from '../SourceCard';

interface ExtendedSource {
  id: number;
  name: string;
  description: string;
  organization: string;
  link: string;
}

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'sourcesPage.visitSource': 'Visit Source',
        'sourcesPage.externalLink': 'Opens in new tab',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock window.open
const mockOpen = jest.fn();
Object.defineProperty(window, 'open', {
  value: mockOpen,
  writable: true,
});

const mockSource: ExtendedSource = {
  id: 1,
  name: 'World Health Organization',
  description: 'Global health organization providing leadership on global health matters.',
  organization: 'WHO',
  link: 'https://www.who.int/',
};

describe('<SourceCard /> component', () => {
  beforeEach(() => {
    mockOpen.mockClear();
  });

  test('renders source name', () => {
    render(<SourceCard source={mockSource} />);
    
    expect(screen.getByText('World Health Organization')).toBeInTheDocument();
  });

  test('renders source description', () => {
    render(<SourceCard source={mockSource} />);
    
    expect(screen.getByText('Global health organization providing leadership on global health matters.')).toBeInTheDocument();
  });

  test('renders source organization', () => {
    render(<SourceCard source={mockSource} />);
    
    expect(screen.getByText('WHO')).toBeInTheDocument();
  });

  test('renders visit source button', () => {
    render(<SourceCard source={mockSource} />);
    
    const button = screen.getByRole('button', { name: /viewResource/i });
    expect(button).toBeInTheDocument();
  });

  test('opens link in new tab when button is clicked', () => {
    render(<SourceCard source={mockSource} />);
    
    const button = screen.getByRole('button', { name: /viewResource/i });
    button.click();
    
    expect(mockOpen).toHaveBeenCalledWith(
      'https://www.who.int/',
      '_blank',
      'noopener,noreferrer'
    );
  });

  test('applies custom className', () => {
    const { container } = render(<SourceCard source={mockSource} className="custom-class" />);
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
