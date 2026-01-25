import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from '../Footer';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'footer.disclaimer': 'This platform is for educational and informational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding a medical condition.',
        'footer.rights': 'All rights reserved.',
      };
      return translations[key] || key;
    },
  }),
}));

describe('<Footer /> component', () => {
  test('renders disclaimer text', () => {
    render(<Footer />);
    
    expect(screen.getByText(/This platform is for educational and informational purposes only/i)).toBeInTheDocument();
  });

  test('renders copyright with current year', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} CVD Platform`))).toBeInTheDocument();
  });

  test('renders rights reserved text', () => {
    render(<Footer />);
    
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });

  test('renders footer element', () => {
    const { container } = render(<Footer />);
    
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  test('renders warning icon', () => {
    const { container } = render(<Footer />);
    
    // Lucide icons render as SVG
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
