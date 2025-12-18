import { render, screen } from '@testing-library/react';
import { Loader } from '../Loader';

describe('<Loader>', () => {
  test('renders without crashing and displays the status element with aria-label', () => {
    render(<Loader />);

    const loaderElement = screen.getByRole('status');
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveAttribute('aria-label', 'Loading...');
  });
});
