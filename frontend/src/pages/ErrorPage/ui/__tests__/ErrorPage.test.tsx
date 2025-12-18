import { render, screen } from '@testing-library/react';
import { ErrorPage } from '../ErrorPage';

jest.mock('@shared/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
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
