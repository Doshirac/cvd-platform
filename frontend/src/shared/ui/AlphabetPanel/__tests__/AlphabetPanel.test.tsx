import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AlphabetPanel } from '../AlphabetPanel';

describe('AlphabetPanel', () => {
  it('renders all English letters by default', () => {
    render(<AlphabetPanel />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(26);
    expect(screen.getByLabelText('Filter by letter A')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter by letter Z')).toBeInTheDocument();
  });

  it('renders all Russian letters when language is "ru"', () => {
    render(<AlphabetPanel language="ru" />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(29);
    expect(screen.getByLabelText('Filter by letter А')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter by letter Я')).toBeInTheDocument();
  });

  it('highlights selected letter with primary variant', () => {
    render(<AlphabetPanel selectedLetter="A" />);
    const buttonA = screen.getByLabelText('Filter by letter A');
    expect(buttonA).toHaveClass('primary');
    expect(buttonA).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onLetterSelect when a letter is clicked', () => {
    const handleLetterSelect = jest.fn();
    render(<AlphabetPanel onLetterSelect={handleLetterSelect} />);
    
    const buttonB = screen.getByLabelText('Filter by letter B');
    fireEvent.click(buttonB);
    
    expect(handleLetterSelect).toHaveBeenCalledWith('B');
  });

  it('deselects letter when clicking the selected letter', () => {
    const handleLetterSelect = jest.fn();
    render(<AlphabetPanel selectedLetter="C" onLetterSelect={handleLetterSelect} />);
    
    const buttonC = screen.getByLabelText('Filter by letter C');
    fireEvent.click(buttonC);
    
    expect(handleLetterSelect).toHaveBeenCalledWith(null);
  });

  it('resets selection when language changes', () => {
    const handleLetterSelect = jest.fn();
    const { rerender } = render(
      <AlphabetPanel language="en" selectedLetter="A" onLetterSelect={handleLetterSelect} />
    );
    
    rerender(<AlphabetPanel language="ru" selectedLetter="A" onLetterSelect={handleLetterSelect} />);
    
    expect(handleLetterSelect).toHaveBeenCalledWith(null);
  });

  it('manages internal state when onLetterSelect is not provided', () => {
    render(<AlphabetPanel />);
    
    const buttonD = screen.getByLabelText('Filter by letter D');
    fireEvent.click(buttonD);
    
    expect(buttonD).toHaveClass('primary');
    expect(buttonD).toHaveAttribute('aria-pressed', 'true');
    
    // Clicking again should deselect
    fireEvent.click(buttonD);
    expect(buttonD).toHaveClass('secondary');
    expect(buttonD).toHaveAttribute('aria-pressed', 'false');
  });

  it('applies secondary variant to non-selected letters', () => {
    render(<AlphabetPanel selectedLetter="E" />);
    
    const buttonF = screen.getByLabelText('Filter by letter F');
    expect(buttonF).toHaveClass('secondary');
    expect(buttonF).toHaveAttribute('aria-pressed', 'false');
  });
});
