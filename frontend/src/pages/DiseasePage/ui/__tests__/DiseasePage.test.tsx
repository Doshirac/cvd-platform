import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { DiseasePage } from '../DiseasePage';
import diseasesReducer from '@shared/api/diseases/diseasesSlice';
import type { Disease } from '@shared/api/diseases/diseases.types';

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));

const mockDisease: Disease = {
  id: 1,
  code: 'CAD',
  name: 'Coronary Artery Disease',
  description: 'A condition where the coronary arteries become narrowed',
  prevention: 'Regular exercise, healthy diet',
  symptoms: ['chest pain', 'shortness of breath'],
  risks: ['smoking', 'high cholesterol'],
};

const createMockStore = (diseases: Disease[] = []) => {
  return configureStore({
    reducer: {
      diseases: diseasesReducer,
    },
    preloadedState: {
      diseases: {
        items: diseases,
        symptomList: [],
        riskFactors: [],
        loading: false,
        error: null,
      },
    },
  });
};

const renderWithProviders = (diseaseId: string, diseases: Disease[] = []) => {
  const store = createMockStore(diseases);
  
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/diseases/${diseaseId}`]}>
        <Routes>
          <Route path="/diseases/:id" element={<DiseasePage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('DiseasePage', () => {
  it('renders disease details correctly', async () => {
    renderWithProviders('1', [mockDisease]);

    await waitFor(() => {
      expect(screen.getByText('Coronary Artery Disease')).toBeInTheDocument();
    });

    expect(screen.getByText('CAD')).toBeInTheDocument();
    expect(screen.getByText('A condition where the coronary arteries become narrowed')).toBeInTheDocument();
  });

  it('renders symptoms section', async () => {
    renderWithProviders('1', [mockDisease]);

    await waitFor(() => {
      expect(screen.getByText('diseasePage.symptoms')).toBeInTheDocument();
    });

    expect(screen.getByText('chest pain')).toBeInTheDocument();
    expect(screen.getByText('shortness of breath')).toBeInTheDocument();
  });

  it('renders risk factors section', async () => {
    renderWithProviders('1', [mockDisease]);

    await waitFor(() => {
      expect(screen.getByText('diseasePage.riskFactors')).toBeInTheDocument();
    });

    expect(screen.getByText('smoking')).toBeInTheDocument();
    expect(screen.getByText('high cholesterol')).toBeInTheDocument();
  });

  it('shows not found when disease does not exist', async () => {
    renderWithProviders('999', [mockDisease]);

    await waitFor(() => {
      expect(screen.getByText('diseasePage.notFound')).toBeInTheDocument();
    });
  });
});
