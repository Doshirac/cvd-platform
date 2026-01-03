import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TabPanel } from '../TabPanel';
import type { Tab } from '../TabPanel.types';

const mockTabs: Tab[] = [
  {
    id: 'overview',
    label: 'Overview',
    content: <div>Overview Content</div>,
  },
  {
    id: 'symptoms',
    label: 'Primary Symptoms',
    content: <div>Primary Symptoms Content</div>,
  },
  {
    id: 'secondary',
    label: 'Secondary Symptoms',
    content: <div>Secondary Symptoms Content</div>,
  },
];

describe('TabPanel', () => {
  it('renders all tabs', () => {
    render(<TabPanel tabs={mockTabs} />);
    
    expect(screen.getByRole('tab', { name: 'Overview' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Primary Symptoms' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Secondary Symptoms' })).toBeInTheDocument();
  });

  it('renders the first tab as active by default', () => {
    render(<TabPanel tabs={mockTabs} />);
    
    const overviewTab = screen.getByRole('tab', { name: 'Overview' });
    expect(overviewTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Overview Content')).toBeInTheDocument();
  });

  it('displays active tab content', () => {
    render(<TabPanel tabs={mockTabs} activeTab="symptoms" />);
    
    expect(screen.getByText('Primary Symptoms Content')).toBeInTheDocument();
    expect(screen.queryByText('Overview Content')).not.toBeInTheDocument();
  });

  it('calls onTabChange when a tab is clicked', () => {
    const handleTabChange = jest.fn();
    render(<TabPanel tabs={mockTabs} onTabChange={handleTabChange} />);
    
    const symptomsTab = screen.getByRole('tab', { name: 'Primary Symptoms' });
    fireEvent.click(symptomsTab);
    
    expect(handleTabChange).toHaveBeenCalledWith('symptoms');
  });

  it('switches tab content when clicking a different tab', () => {
    render(<TabPanel tabs={mockTabs} />);
    
    expect(screen.getByText('Overview Content')).toBeInTheDocument();
    
    const secondaryTab = screen.getByRole('tab', { name: 'Secondary Symptoms' });
    fireEvent.click(secondaryTab);
    
    expect(screen.getByText('Secondary Symptoms Content')).toBeInTheDocument();
    expect(screen.queryByText('Overview Content')).not.toBeInTheDocument();
  });

  it('updates aria-selected attribute when tab changes', () => {
    render(<TabPanel tabs={mockTabs} />);
    
    const overviewTab = screen.getByRole('tab', { name: 'Overview' });
    const symptomsTab = screen.getByRole('tab', { name: 'Primary Symptoms' });
    
    expect(overviewTab).toHaveAttribute('aria-selected', 'true');
    expect(symptomsTab).toHaveAttribute('aria-selected', 'false');
    
    fireEvent.click(symptomsTab);
    
    expect(overviewTab).toHaveAttribute('aria-selected', 'false');
    expect(symptomsTab).toHaveAttribute('aria-selected', 'true');
  });

  it('works in controlled mode', () => {
    const handleTabChange = jest.fn();
    const { rerender } = render(
      <TabPanel tabs={mockTabs} activeTab="overview" onTabChange={handleTabChange} />
    );
    
    expect(screen.getByText('Overview Content')).toBeInTheDocument();
    
    const symptomsTab = screen.getByRole('tab', { name: 'Primary Symptoms' });
    fireEvent.click(symptomsTab);
    
    expect(handleTabChange).toHaveBeenCalledWith('symptoms');
    
    // Parent updates activeTab
    rerender(
      <TabPanel tabs={mockTabs} activeTab="symptoms" onTabChange={handleTabChange} />
    );
    
    expect(screen.getByText('Primary Symptoms Content')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<TabPanel tabs={mockTabs} activeTab="overview" />);
    
    const overviewTab = screen.getByRole('tab', { name: 'Overview' });
    const symptomsTab = screen.getByRole('tab', { name: 'Primary Symptoms' });
    
    expect(overviewTab).toHaveClass('active');
    expect(symptomsTab).not.toHaveClass('active');
  });

  it('accepts custom className', () => {
    const { container } = render(
      <TabPanel tabs={mockTabs} className="custom-tabs" />
    );
    
    const tabPanelContainer = container.firstChild;
    expect(tabPanelContainer).toHaveClass('custom-tabs');
  });

  it('has proper accessibility attributes', () => {
    render(<TabPanel tabs={mockTabs} activeTab="overview" />);
    
    const overviewTab = screen.getByRole('tab', { name: 'Overview' });
    const tabpanel = screen.getByRole('tabpanel');
    
    expect(overviewTab).toHaveAttribute('id', 'tab-overview');
    expect(overviewTab).toHaveAttribute('aria-controls', 'tabpanel-overview');
    expect(tabpanel).toHaveAttribute('id', 'tabpanel-overview');
    expect(tabpanel).toHaveAttribute('aria-labelledby', 'tab-overview');
  });
});
