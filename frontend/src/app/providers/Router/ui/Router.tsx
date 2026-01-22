import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../config/routes';
import { MainLayout } from '../../../layouts/MainLayout';
import { Loader } from '@shared/ui/Loader';

const ErrorPage = lazy(() =>
  import('@pages/ErrorPage').then(module => ({ default: module.ErrorPage }))
);
const NotFoundPage = lazy(() =>
  import('@pages/NotFoundPage').then(module => ({ default: module.NotFoundPage }))
);
const MainPage = lazy(() =>
  import('@pages/MainPage').then(module => ({ default: module.MainPage }))
);
const SourcesPage = lazy(() =>
  import('@pages/SourcesPage').then(module => ({ default: module.SourcesPage }))
);
const ResearchPage = lazy(() =>
  import('@pages/ResearchPage').then(module => ({ default: module.ResearchPage }))
);

export const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={AppRoutes.MAIN} element={<MainPage />} />
          <Route path={AppRoutes.SOURCE} element={<SourcesPage />} />
          <Route path={AppRoutes.RESEARCH} element={<ResearchPage />} />
          <Route path={AppRoutes.ERROR} element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
