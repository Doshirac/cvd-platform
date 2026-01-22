import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ResourceNotFound } from '../ResourceNotFound';

describe('<ResourceNotFound /> component unit-tests', () => {
  test('renders with default message', () => {
    render(<ResourceNotFound />);

    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search or filters')).toBeInTheDocument();
  });

  test('renders with custom message', () => {
    const customMessage = 'No resources found';
    render(<ResourceNotFound message={customMessage} />);

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  test('renders with custom title', () => {
    const customTitle = 'No diseases found';
    render(<ResourceNotFound title={customTitle} />);

    expect(screen.getByText(customTitle)).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const customClass = 'custom-test-class';
    const { container } = render(<ResourceNotFound className={customClass} />);

    expect(container.firstChild).toHaveClass(customClass);
  });

  test('renders search icon', () => {
    render(<ResourceNotFound />);

    const icon = screen.getByLabelText('Search icon');
    expect(icon).toBeInTheDocument();
  });

  test('applies correct typography classes', () => {
    render(<ResourceNotFound />);

    const title = screen.getByText('No results found');
    const subtitle = screen.getByText('Try adjusting your search or filters');

    expect(title).toHaveClass('medium-18');
    expect(subtitle).toHaveClass('regular-14');
  });
});
