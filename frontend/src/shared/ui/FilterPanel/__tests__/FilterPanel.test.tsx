import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterPanel } from '../FilterPanel';
import type { FilterGroup } from '../FilterPanel.types';

// Mock lucide-react
jest.mock('lucide-react', () => ({
  ChevronDown: ({ className }: { className?: string }) => (
    <div data-testid="chevron-icon" className={className}>▼</div>
  ),
}));

const mockFilterGroups: FilterGroup[] = [
  {
    id: 'symptoms',
    label: 'Symptoms',
    options: [
      { code: 'S001', label: 'Chest Pain' },
      { code: 'S002', label: 'Shortness of Breath' },
      { code: 'S003', label: 'Fatigue' },
    ],
  },
  {
    id: 'riskFactors',
    label: 'Risk Factors',
    options: [
      { code: 'RF001', label: 'Smoking' },
      { code: 'RF002', label: 'High Blood Pressure' },
      { code: 'RF003', label: 'Diabetes' },
    ],
  },
];

describe('<FilterPanel /> component', () => {
  test('renders filter groups with labels', () => {
    render(
      <FilterPanel
        filterGroups={mockFilterGroups}
        selectedValues={{}}
        onFilterChange={() => {}}
      />
    );
    
    expect(screen.getByText('Symptoms')).toBeInTheDocument();
    expect(screen.getByText('Risk Factors')).toBeInTheDocument();
  });

  test('renders all filter options as checkboxes', () => {
    render(
      <FilterPanel
        filterGroups={mockFilterGroups}
        selectedValues={{}}
        onFilterChange={() => {}}
      />
    );
    
    expect(screen.getByLabelText('Chest Pain')).toBeInTheDocument();
    expect(screen.getByLabelText('Shortness of Breath')).toBeInTheDocument();
    expect(screen.getByLabelText('Smoking')).toBeInTheDocument();
    expect(screen.getByLabelText('High Blood Pressure')).toBeInTheDocument();
  });

  test('toggles filter group visibility when clicked', () => {
    render(
      <FilterPanel
        filterGroups={mockFilterGroups}
        selectedValues={{}}
        onFilterChange={() => {}}
      />
    );
    
    const symptomsButton = screen.getByRole('button', { name: /symptoms/i });
    
    // Options should be visible initially
    expect(screen.getByLabelText('Chest Pain')).toBeInTheDocument();
    
    // Click to collapse
    fireEvent.click(symptomsButton);
    
    // Options should be hidden
    expect(screen.queryByLabelText('Chest Pain')).not.toBeInTheDocument();
    
    // Click to expand again
    fireEvent.click(symptomsButton);
    
    // Options should be visible again
    expect(screen.getByLabelText('Chest Pain')).toBeInTheDocument();
  });

  test('calls onFilterChange when checkbox is toggled', () => {
    const mockOnFilterChange = jest.fn();
    render(
      <FilterPanel
        filterGroups={mockFilterGroups}
        selectedValues={{}}
        onFilterChange={mockOnFilterChange}
      />
    );
    
    const chestPainCheckbox = screen.getByLabelText('Chest Pain');
    fireEvent.click(chestPainCheckbox);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith('symptoms', ['S001']);
  });

  test('unchecks checkbox when already selected', () => {
    const mockOnFilterChange = jest.fn();
    render(
      <FilterPanel
        filterGroups={mockFilterGroups}
        selectedValues={{ symptoms: ['S001'] }}
        onFilterChange={mockOnFilterChange}
      />
    );
    
    const chestPainCheckbox = screen.getByLabelText('Chest Pain');
    fireEvent.click(chestPainCheckbox);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith('symptoms', []);
  });

  test('allows multiple selections within a group', () => {
    const mockOnFilterChange = jest.fn();
    render(
      <FilterPanel
        filterGroups={mockFilterGroups}
        selectedValues={{ symptoms: ['S001'] }}
        onFilterChange={mockOnFilterChange}
      />
    );
    
    const fatigueCheckbox = screen.getByLabelText('Fatigue');
    fireEvent.click(fatigueCheckbox);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith('symptoms', ['S001', 'S003']);
  });

  test('shows reset button when onReset is provided', () => {
    const mockOnReset = jest.fn();
    render(
      <FilterPanel
        filterGroups={mockFilterGroups}
        selectedValues={{}}
        onFilterChange={() => {}}
        onReset={mockOnReset}
      />
    );
    
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  test('hides reset button when onReset is not provided', () => {
    render(
      <FilterPanel
        filterGroups={mockFilterGroups}
        selectedValues={{}}
        onFilterChange={() => {}}
      />
    );
    
    expect(screen.queryByRole('button', { name: /reset/i })).not.toBeInTheDocument();
  });

  test('disables reset button when no filters are active', () => {
    const mockOnReset = jest.fn();
    render(
      <FilterPanel
        filterGroups={mockFilterGroups}
        selectedValues={{}}
        onFilterChange={() => {}}
        onReset={mockOnReset}
      />
    );
    
    const resetButton = screen.getByRole('button', { name: /reset/i });
    expect(resetButton).toBeDisabled();
  });

  test('enables reset button when filters are active', () => {
    const mockOnReset = jest.fn();
    render(
      <FilterPanel
        filterGroups={mockFilterGroups}
        selectedValues={{ symptoms: ['S001'] }}
        onFilterChange={() => {}}
        onReset={mockOnReset}
      />
    );
    
    const resetButton = screen.getByRole('button', { name: /reset/i });
    expect(resetButton).not.toBeDisabled();
  });

  test('calls onReset when reset button is clicked', () => {
    const mockOnReset = jest.fn();
    render(
      <FilterPanel
        filterGroups={mockFilterGroups}
        selectedValues={{ symptoms: ['S001'] }}
        onFilterChange={() => {}}
        onReset={mockOnReset}
      />
    );
    
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    
    expect(mockOnReset).toHaveBeenCalled();
  });

  test('applies custom className', () => {
    const { container } = render(
      <FilterPanel
        filterGroups={mockFilterGroups}
        selectedValues={{}}
        onFilterChange={() => {}}
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('displays checked checkboxes for selected values', () => {
    render(
      <FilterPanel
        filterGroups={mockFilterGroups}
        selectedValues={{
          symptoms: ['S001', 'S003'],
          riskFactors: ['RF002'],
        }}
        onFilterChange={() => {}}
      />
    );
    
    const chestPainCheckbox = screen.getByLabelText('Chest Pain') as HTMLInputElement;
    const fatigueCheckbox = screen.getByLabelText('Fatigue') as HTMLInputElement;
    const breathCheckbox = screen.getByLabelText('Shortness of Breath') as HTMLInputElement;
    const highBPCheckbox = screen.getByLabelText('High Blood Pressure') as HTMLInputElement;
    
    expect(chestPainCheckbox.checked).toBe(true);
    expect(fatigueCheckbox.checked).toBe(true);
    expect(breathCheckbox.checked).toBe(false);
    expect(highBPCheckbox.checked).toBe(true);
  });
});
