import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('../../Icon/Icon', () => ({
  __esModule: true,
  default: () => <span data-testid="mock-icon" />,
}));

import { Input } from '../index';

describe('Input component', () => {
  it('renders with a label', () => {
    render(<Input label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('applies placeholder correctly', () => {
    render(<Input placeholder="Enter your name" />);
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('applies type correctly', () => {
    render(<Input type="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('displays helper text', () => {
    render(<Input helperText="This is a helper" />);
    expect(screen.getByText('This is a helper')).toBeInTheDocument();
  });

  it('displays error state and error helper', () => {
    render(<Input error helperText="Error occurred" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });

  it('disables input when disabled prop is passed', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies full width when fullWidth is true', () => {
    render(<Input fullWidth data-testid="input" />);
    expect(screen.getByTestId('input').className).toMatch(/full-width/);
  });

  it('calls onChange handler', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('calls onFocus and onBlur handlers', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(handleFocus).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});
