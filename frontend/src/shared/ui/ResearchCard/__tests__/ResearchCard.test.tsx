import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ResearchCard } from '../ResearchCard';
import type { Research } from '../ResearchCard.types';

const mockResearch: Research = {
  id: 1,
  title: 'Heart Attack Prediction using Machine Learning',
  description: 'Machine learning analysis of cardiovascular risk factors.',
  category: 'prediction',
  accuracy: 94,
  samples: 303,
  features: 14,
  tools: ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas'],
  date: '2024-12-15',
  imageUrl: '/test-image.jpg',
};

describe('<ResearchCard /> component', () => {
  test('renders research title', () => {
    render(<ResearchCard research={mockResearch} />);
    
    expect(screen.getByText('Heart Attack Prediction using Machine Learning')).toBeInTheDocument();
  });

  test('renders research description', () => {
    render(<ResearchCard research={mockResearch} />);
    
    expect(screen.getByText(/Machine learning analysis/)).toBeInTheDocument();
  });

  test('renders image when imageUrl is provided', () => {
    render(<ResearchCard research={mockResearch} />);
    
    const image = screen.getByAltText('Heart Attack Prediction using Machine Learning');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  test('does not render image when imageUrl is not provided', () => {
    const researchWithoutImage = { ...mockResearch, imageUrl: undefined };
    render(<ResearchCard research={researchWithoutImage} />);
    
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  test('calls onViewDetails when card is clicked', () => {
    const mockOnViewDetails = jest.fn();
    render(<ResearchCard research={mockResearch} onViewDetails={mockOnViewDetails} />);
    
    const card = screen.getByRole('button');
    fireEvent.click(card);
    
    expect(mockOnViewDetails).toHaveBeenCalledWith(mockResearch);
  });

  test('calls onViewDetails when Enter key is pressed', () => {
    const mockOnViewDetails = jest.fn();
    render(<ResearchCard research={mockResearch} onViewDetails={mockOnViewDetails} />);
    
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });
    
    expect(mockOnViewDetails).toHaveBeenCalledWith(mockResearch);
  });

  test('calls onViewDetails when Space key is pressed', () => {
    const mockOnViewDetails = jest.fn();
    render(<ResearchCard research={mockResearch} onViewDetails={mockOnViewDetails} />);
    
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: ' ' });
    
    expect(mockOnViewDetails).toHaveBeenCalledWith(mockResearch);
  });

  test('does not call onViewDetails when other key is pressed', () => {
    const mockOnViewDetails = jest.fn();
    render(<ResearchCard research={mockResearch} onViewDetails={mockOnViewDetails} />);
    
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Tab' });
    
    expect(mockOnViewDetails).not.toHaveBeenCalled();
  });

  test('applies custom className', () => {
    const { container } = render(<ResearchCard research={mockResearch} className="custom-class" />);
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('has group class for hover effects', () => {
    const { container } = render(<ResearchCard research={mockResearch} />);
    
    expect(container.firstChild).toHaveClass('group');
  });

  test('is keyboard accessible', () => {
    render(<ResearchCard research={mockResearch} />);
    
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('tabIndex', '0');
  });
});
