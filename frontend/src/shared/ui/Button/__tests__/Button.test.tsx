import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../Button';
import type { ButtonVariant, ButtonSize } from '../Button.types';

describe('<Button /> component unit-tests', () => {
  const label = 'Register';

  test('renders its children', () => {
    render(<Button>{label}</Button>);
    expect(screen.getByRole('button')).toHaveTextContent(label);
  });

  test.each<ButtonVariant>(['primary', 'secondary'])('applies %s variant class', variant => {
    render(<Button variant={variant}>{label}</Button>);
    expect(screen.getByRole('button')).toHaveClass(variant);
  });

  test.each<ButtonSize>(['default', 'sm', 'lg', 'icon'])('applies %s size class', size => {
    render(<Button size={size}>{label}</Button>);
    expect(screen.getByRole('button')).toHaveClass(size);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>{label}</Button>);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled');
  });

  test('adds fullWidth class when fullWidth is true', () => {
    render(<Button fullWidth>{label}</Button>);
    expect(screen.getByRole('button')).toHaveClass('full-width');
  });

  test('fires onClick when enabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>{label}</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does NOT fire onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        {label}
      </Button>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('passes native button attributes (type="submit")', () => {
    render(<Button type="submit">{label}</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
