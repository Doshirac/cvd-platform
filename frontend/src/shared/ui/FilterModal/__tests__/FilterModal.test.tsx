import { render, screen, fireEvent } from '@testing-library/react';
import { FilterModal } from '../FilterModal';

const mockFilterGroups = [
  {
    id: 'symptoms',
    label: 'Symptoms',
    options: [
      { code: 'S001', label: 'Chest Pain' },
      { code: 'S002', label: 'Shortness of Breath' },
    ],
  },
  {
    id: 'riskFactors',
    label: 'Risk Factors',
    options: [
      { code: 'RF001', label: 'Smoking' },
      { code: 'RF002', label: 'High Blood Pressure' },
    ],
  },
];

describe('<FilterModal /> component', () => {
  test('renders nothing when isOpen is false', () => {
    const { container } = render(
      <FilterModal
        isOpen={false}
        onClose={() => {}}
        filterGroups={mockFilterGroups}
        selectedValues={{}}
        onFilterChange={() => {}}
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('renders modal when isOpen is true', () => {
    render(
      <FilterModal
        isOpen={true}
        onClose={() => {}}
        filterGroups={mockFilterGroups}
        selectedValues={{}}
        onFilterChange={() => {}}
      />
    );
    
    expect(screen.getByText('Apply Filters')).toBeInTheDocument();
  });

  test('renders custom title and subtitle', () => {
    render(
      <FilterModal
        isOpen={true}
        onClose={() => {}}
        title="Custom Title"
        subtitle="Custom Subtitle"
        filterGroups={mockFilterGroups}
        selectedValues={{}}
        onFilterChange={() => {}}
      />
    );
    
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Subtitle')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(
      <FilterModal
        isOpen={true}
        onClose={mockOnClose}
        filterGroups={mockFilterGroups}
        selectedValues={{}}
        onFilterChange={() => {}}
      />
    );
    
    const closeButton = screen.getByLabelText('Close filters');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when overlay is clicked', () => {
    const mockOnClose = jest.fn();
    render(
      <FilterModal
        isOpen={true}
        onClose={mockOnClose}
        filterGroups={mockFilterGroups}
        selectedValues={{}}
        onFilterChange={() => {}}
      />
    );
    
    // Click on the overlay (parent of modal)
    const overlay = screen.getByText('Apply Filters').closest('.overlay')?.parentElement;
    if (overlay) {
      fireEvent.click(overlay.firstChild as Element);
    }
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('does not close when clicking inside modal', () => {
    const mockOnClose = jest.fn();
    render(
      <FilterModal
        isOpen={true}
        onClose={mockOnClose}
        filterGroups={mockFilterGroups}
        selectedValues={{}}
        onFilterChange={() => {}}
      />
    );
    
    // Click inside the modal content
    const title = screen.getByText('Apply Filters');
    fireEvent.click(title);
    
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('renders FilterPanel with correct props', () => {
    render(
      <FilterModal
        isOpen={true}
        onClose={() => {}}
        filterGroups={mockFilterGroups}
        selectedValues={{}}
        onFilterChange={() => {}}
      />
    );
    
    // FilterPanel should render the filter groups
    expect(screen.getByText('Symptoms')).toBeInTheDocument();
    expect(screen.getByText('Risk Factors')).toBeInTheDocument();
  });

  test('closes on Escape key press', () => {
    const mockOnClose = jest.fn();
    render(
      <FilterModal
        isOpen={true}
        onClose={mockOnClose}
        filterGroups={mockFilterGroups}
        selectedValues={{}}
        onFilterChange={() => {}}
      />
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
