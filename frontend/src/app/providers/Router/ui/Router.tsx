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
// const MainPage = lazy(() => import('@pages/MainPage').then(module => ({ default: module.MainPage })));
// const SourcePage = lazy(() => import('@pages/SourcePage').then(module => ({ default: module.SourcePage })));
// const DiseasePage = lazy(() => import('@pages/DiseasePage').then(module => ({ default: module.DiseasePage })));

export const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          {/* <Route path={AppRoutes.MAIN} element={<MainPage />} />
          <Route path={AppRoutes.SOURCE} element={<SourcePage />} />
          <Route path={AppRoutes.DISEASE} element={<DiseasePage />} /> */}
          <Route path={AppRoutes.ERROR} element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
