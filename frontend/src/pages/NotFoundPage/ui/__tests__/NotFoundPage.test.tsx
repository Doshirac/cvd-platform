import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFoundPage } from '../NotFoundPage';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'notFoundPage.code': '404',
        'notFoundPage.title': 'Page Not Found',
        'notFoundPage.description': 'The page you are looking for does not exist',
        'notFoundPage.helpfulLinks': 'Helpful Links',
        'notFoundPage.exploreDiseasesLink': 'Explore Diseases',
        'notFoundPage.browseSourcesLink': 'Browse Sources',
        'notFoundPage.viewResearchLink': 'View Research',
        'common.goHome': 'Go to Homepage',
        'common.goBack': 'Go Back',
      };
      return translations[key] || key;
    },
  }),
}));

describe('<NotFoundPage />', () => {
  it('renders 404 content', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go to homepage/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
  });
});
