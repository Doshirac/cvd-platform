import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import { useBreakpoint } from '@shared/hooks';
import '@testing-library/jest-dom';

// Mock dependencies
jest.mock('@shared/hooks/useBreakpoint', () => ({
  useBreakpoint: jest.fn(),
}));

jest.mock('@shared/ui/Icon', () => ({
  Icon: ({ name, ariaLabel }: { name: string; ariaLabel?: string }) => (
    <div data-testid={`icon-${name}`} aria-label={ariaLabel}>
      {name}
    </div>
  ),
}));

jest.mock('@shared/ui/ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));

jest.mock('@shared/ui/LanguageSwitcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher">Language Switcher</div>,
}));

jest.mock('@shared/ui/Button', () => ({
  Button: ({
    children,
    onClick,
    'aria-label': ariaLabel,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    'aria-label'?: string;
  }) => (
    <button onClick={onClick} aria-label={ariaLabel} {...props}>
      {children}
    </button>
  ),
}));

const mockUseBreakpoint = useBreakpoint as jest.MockedFunction<typeof useBreakpoint>;

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Desktop View', () => {
    beforeEach(() => {
      mockUseBreakpoint.mockReturnValue('desktop');
    });

    it('renders the header with logo', () => {
      renderWithRouter(<Header />);
      const logo = screen.getByText('CVD Platform');
      expect(logo).toBeInTheDocument();
    });

    it('renders the logo icon', () => {
      renderWithRouter(<Header />);
      const logoIcon = screen.getByTestId('icon-HEART_PULSE');
      expect(logoIcon).toBeInTheDocument();
    });

    it('renders navigation links on desktop', () => {
      renderWithRouter(<Header />);

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Sources')).toBeInTheDocument();
      expect(screen.getByText('Research')).toBeInTheDocument();
    });

    it('renders navigation icons', () => {
      renderWithRouter(<Header />);

      expect(screen.getByTestId('icon-HOME')).toBeInTheDocument();
      expect(screen.getByTestId('icon-BUILDING')).toBeInTheDocument();
      expect(screen.getByTestId('icon-ACTIVITY')).toBeInTheDocument();
    });

    it('renders ThemeToggle component', () => {
      renderWithRouter(<Header />);
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    });

    it('renders LanguageSwitcher component', () => {
      renderWithRouter(<Header />);
      expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    });

    it('does not render burger menu button on desktop', () => {
      renderWithRouter(<Header />);
      const burgerButton = screen.queryByLabelText('Toggle mobile menu');
      expect(burgerButton).not.toBeInTheDocument();
    });

    it('does not render mobile menu on desktop', () => {
      renderWithRouter(<Header />);
      const mobileMenu = screen.queryByText('Menu');
      expect(mobileMenu).not.toBeInTheDocument();
    });
  });

  describe('Mobile View', () => {
    beforeEach(() => {
      mockUseBreakpoint.mockReturnValue('mobile');
    });

    it('renders the header with logo on mobile', () => {
      renderWithRouter(<Header />);
      const logo = screen.getByText('CVD Platform');
      expect(logo).toBeInTheDocument();
    });

    it('renders burger menu button on mobile', () => {
      renderWithRouter(<Header />);
      const burgerButton = screen.getByLabelText('Toggle mobile menu');
      expect(burgerButton).toBeInTheDocument();
    });

    it('renders menu icon in burger button', () => {
      renderWithRouter(<Header />);
      expect(screen.getByTestId('icon-MENU')).toBeInTheDocument();
    });

    it('does not render desktop navigation links on mobile', () => {
      renderWithRouter(<Header />);
      const navLinks = screen.queryAllByRole('link');
      // Only logo link should be visible
      expect(navLinks.length).toBe(1);
      expect(navLinks[0]).toHaveTextContent('CVD Platform');
    });

    it('opens mobile menu when burger button is clicked', () => {
      renderWithRouter(<Header />);
      const burgerButton = screen.getByLabelText('Toggle mobile menu');

      fireEvent.click(burgerButton);

      expect(screen.getByText('Menu')).toBeInTheDocument();
    });

    it('renders mobile menu items when menu is open', () => {
      renderWithRouter(<Header />);
      const burgerButton = screen.getByLabelText('Toggle mobile menu');

      fireEvent.click(burgerButton);

      const navLinks = screen.getAllByRole('link');
      // Logo link + 3 menu items
      expect(navLinks.length).toBe(4);

      const menuItems = screen.getAllByText(/Home|Sources|Research/);
      expect(menuItems.length).toBeGreaterThanOrEqual(3);
    });

    it('renders close button in mobile menu', () => {
      renderWithRouter(<Header />);
      const burgerButton = screen.getByLabelText('Toggle mobile menu');

      fireEvent.click(burgerButton);

      const closeButton = screen.getByLabelText('Close mobile menu');
      expect(closeButton).toBeInTheDocument();
    });

    it('closes mobile menu when close button is clicked', () => {
      renderWithRouter(<Header />);
      const burgerButton = screen.getByLabelText('Toggle mobile menu');

      // Open menu
      fireEvent.click(burgerButton);
      expect(screen.getByText('Menu')).toBeInTheDocument();

      // Close menu
      const closeButton = screen.getByLabelText('Close mobile menu');
      fireEvent.click(closeButton);

      expect(screen.queryByText('Menu')).not.toBeInTheDocument();
    });

    it('closes mobile menu when backdrop is clicked', () => {
      renderWithRouter(<Header />);
      const burgerButton = screen.getByLabelText('Toggle mobile menu');

      // Open menu
      fireEvent.click(burgerButton);
      expect(screen.getByText('Menu')).toBeInTheDocument();

      // Click backdrop
      const backdrop = document.querySelector('[aria-hidden="true"]');
      if (backdrop) {
        fireEvent.click(backdrop);
      }

      expect(screen.queryByText('Menu')).not.toBeInTheDocument();
    });

    it('closes mobile menu when a navigation link is clicked', () => {
      renderWithRouter(<Header />);
      const burgerButton = screen.getByLabelText('Toggle mobile menu');

      // Open menu
      fireEvent.click(burgerButton);
      expect(screen.getByText('Menu')).toBeInTheDocument();

      // Click on a menu item
      const homeLinks = screen.getAllByText('Home');
      const mobileHomeLink = homeLinks[homeLinks.length - 1]; // Get the one in mobile menu
      fireEvent.click(mobileHomeLink);

      expect(screen.queryByText('Menu')).not.toBeInTheDocument();
    });

    it('locks body scroll when mobile menu is open', () => {
      renderWithRouter(<Header />);
      const burgerButton = screen.getByLabelText('Toggle mobile menu');

      // Open menu
      fireEvent.click(burgerButton);

      expect(document.body.style.overflow).toBe('hidden');

      // Close menu
      const closeButton = screen.getByLabelText('Close mobile menu');
      fireEvent.click(closeButton);

      expect(document.body.style.overflow).toBe('unset');
    });

    it('renders ThemeToggle and LanguageSwitcher on mobile', () => {
      renderWithRouter(<Header />);
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
      expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    });
  });

  describe('Logo Link', () => {
    beforeEach(() => {
      mockUseBreakpoint.mockReturnValue('desktop');
    });

    it('logo links to home page', () => {
      renderWithRouter(<Header />);
      const logoLink = screen.getByRole('link', { name: /CVD Platform/i });
      expect(logoLink).toHaveAttribute('href', '/');
    });
  });

  describe('Navigation Links', () => {
    beforeEach(() => {
      mockUseBreakpoint.mockReturnValue('desktop');
    });

    it('home link points to correct route', () => {
      renderWithRouter(<Header />);
      const homeLink = screen.getAllByText('Home')[0].closest('a');
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('sources link points to correct route', () => {
      renderWithRouter(<Header />);
      const sourcesLink = screen.getByText('Sources').closest('a');
      expect(sourcesLink).toHaveAttribute('href', '/sources');
    });

    it('research link points to correct route', () => {
      renderWithRouter(<Header />);
      const researchLink = screen.getByText('Research').closest('a');
      expect(researchLink).toHaveAttribute('href', '/research');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      mockUseBreakpoint.mockReturnValue('mobile');
    });

    it('burger button has accessible label', () => {
      renderWithRouter(<Header />);
      const burgerButton = screen.getByLabelText('Toggle mobile menu');
      expect(burgerButton).toBeInTheDocument();
    });

    it('close button has accessible label', () => {
      renderWithRouter(<Header />);
      fireEvent.click(screen.getByLabelText('Toggle mobile menu'));

      const closeButton = screen.getByLabelText('Close mobile menu');
      expect(closeButton).toBeInTheDocument();
    });

    it('backdrop has aria-hidden attribute', () => {
      renderWithRouter(<Header />);
      fireEvent.click(screen.getByLabelText('Toggle mobile menu'));

      const backdrop = document.querySelector('[aria-hidden="true"]');
      expect(backdrop).toBeInTheDocument();
    });
  });
});
