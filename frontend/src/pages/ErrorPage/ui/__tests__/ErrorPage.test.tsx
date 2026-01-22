import { render, screen } from '@testing-library/react';
import { ErrorPage } from '../ErrorPage';

jest.mock('@shared/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'errorPage.title': 'Something went wrong',
        'errorPage.description': 'Please try refreshing the page or contact support',
        'errorPage.refresh': 'Refresh',
      };
      return translations[key] || key;
    },
  }),
}));

describe('ErrorPage', () => {
  it('renders title and description', () => {
    render(<ErrorPage />);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(
      screen.getByText(/please try refreshing the page or contact support/i)
    ).toBeInTheDocument();
  });

  it('renders Refresh button', () => {
    render(<ErrorPage />);
    expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument();
  });
});
