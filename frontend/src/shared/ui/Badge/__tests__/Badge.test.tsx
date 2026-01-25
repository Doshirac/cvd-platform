import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';

describe('<Badge /> component', () => {
  test('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>);
    
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  test('renders with default variant by default', () => {
    render(<Badge>Default</Badge>);
    
    const badge = screen.getByText('Default');
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('default');
  });

  test('renders with outline variant', () => {
    render(<Badge variant="outline">Outline</Badge>);
    
    const badge = screen.getByText('Outline');
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('outline');
  });

  test('renders with secondary variant', () => {
    render(<Badge variant="secondary">Secondary</Badge>);
    
    const badge = screen.getByText('Secondary');
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('secondary');
  });

  test('renders with muted variant', () => {
    render(<Badge variant="muted">Muted</Badge>);
    
    const badge = screen.getByText('Muted');
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('muted');
  });

  test('applies custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>);
    
    const badge = screen.getByText('Custom');
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('custom-class');
  });

  test('renders as a span element', () => {
    render(<Badge>Span Badge</Badge>);
    
    const badge = screen.getByText('Span Badge');
    expect(badge.tagName).toBe('SPAN');
  });

  test('renders numeric content', () => {
    render(<Badge>+5</Badge>);
    
    expect(screen.getByText('+5')).toBeInTheDocument();
  });

  test('renders with multiple children', () => {
    render(
      <Badge>
        <span>Icon</span> Text
      </Badge>
    );
    
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });
});
