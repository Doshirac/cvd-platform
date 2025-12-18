import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSwitcher } from '../LanguageSwitcher';

describe('LanguageSwitcher', () => {
  it('renders the button with the globe icon', () => {
    render(<LanguageSwitcher />);
    const button = screen.getByRole('button', { name: /Language selection/i });
    expect(button).toBeInTheDocument();
  });

  it('opens the dropdown on button click', () => {
    render(<LanguageSwitcher />);
    const button = screen.getByRole('button', { name: /Language selection/i });
    fireEvent.click(button);
    const dropdown = screen.getByText(/English/i);
    expect(dropdown).toBeInTheDocument();
  });

  it('changes language on dropdown item click', () => {
    render(<LanguageSwitcher />);
    const button = screen.getByRole('button', { name: /Language selection/i });

    fireEvent.click(button);
    const dropdownItem = screen.getByText(/Русский/i);
    fireEvent.click(dropdownItem);

    fireEvent.click(button);

    const selectedItem = screen.getByText((_content, element) => {
      return element?.textContent === 'Русский ✓';
    });

    expect(selectedItem).toBeInTheDocument();
  });
});
