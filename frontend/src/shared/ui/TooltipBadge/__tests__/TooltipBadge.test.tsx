import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TooltipBadge } from '../TooltipBadge';

// Mock as non-touch device
Object.defineProperty(navigator, 'maxTouchPoints', {
  writable: true,
  configurable: true,
  value: 0,
});

delete (window as Window & { ontouchstart?: unknown }).ontouchstart;

describe('TooltipBadge', () => {
  it('renders the code', () => {
    render(<TooltipBadge code="SOB" tooltip="Shortness of Breath" />);
    expect(screen.getByText('SOB')).toBeInTheDocument();
  });

  it('has proper aria-label', () => {
    render(<TooltipBadge code="CP" tooltip="Chest Pain" />);
    const badge = screen.getByRole('button');
    expect(badge).toHaveAttribute('aria-label', 'CP: Chest Pain');
  });

  it('shows tooltip on hover', async () => {
    render(<TooltipBadge code="DIZ" tooltip="Dizziness" />);

    const badge = screen.getByRole('button');

    // Initially tooltip should not be visible
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    // Hover over the badge
    fireEvent.mouseEnter(badge);

    // Tooltip should appear
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    expect(screen.getByText('Dizziness')).toBeInTheDocument();
  });

  it('hides tooltip when mouse leaves', async () => {
    render(<TooltipBadge code="HA" tooltip="Headache" />);

    const badge = screen.getByRole('button');

    // Hover to show tooltip
    fireEvent.mouseEnter(badge);

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    // Unhover to hide tooltip
    fireEvent.mouseLeave(badge);

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    render(<TooltipBadge code="TEST" tooltip="Test" className="custom-class" />);
    const badge = screen.getByRole('button');
    expect(badge).toHaveClass('custom-class');
  });

  it('is keyboard accessible', () => {
    render(<TooltipBadge code="CP" tooltip="Chest Pain" />);
    const badge = screen.getByRole('button');
    expect(badge).toHaveAttribute('tabIndex', '0');
  });

  it('renders multiple badges independently', async () => {
    render(
      <div>
        <TooltipBadge code="CP" tooltip="Chest Pain" />
        <TooltipBadge code="SOB" tooltip="Shortness of Breath" />
      </div>
    );

    const badges = screen.getAllByRole('button');
    expect(badges).toHaveLength(2);

    // Hover over first badge
    fireEvent.mouseEnter(badges[0]);

    await waitFor(() => {
      expect(screen.getByText('Chest Pain')).toBeInTheDocument();
    });
    expect(screen.queryByText('Shortness of Breath')).not.toBeInTheDocument();
  });

  it('renders primary variant by default', () => {
    render(<TooltipBadge code="CP" tooltip="Chest Pain" />);
    const badge = screen.getByRole('button');
    expect(badge).toHaveClass('primary');
  });

  it('renders secondary variant when specified', () => {
    render(<TooltipBadge code="HC" tooltip="High Cholesterol" variant="secondary" />);
    const badge = screen.getByRole('button');
    expect(badge).toHaveClass('secondary');
  });
});
