import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from '@app/providers/StoreProvider';
import { ErrorBoundary } from '@app/providers/ErrorBoundary';
import { Router } from '@app/providers/Router';
import './styles/index.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <ErrorBoundary>
          <StoreProvider>
            <Router />
          </StoreProvider>
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  );
};

export default App;
