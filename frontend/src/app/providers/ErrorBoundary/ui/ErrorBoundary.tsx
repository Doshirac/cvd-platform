import * as Sentry from '@sentry/react';
import { type ReactNode, Component, Suspense } from 'react';
import { Loader } from '@shared/ui/Loader';
import { ErrorPage } from '@pages/ErrorPage';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(`ErrorBoundary caught an error: ${error} ${errorInfo}`);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Suspense fallback={<Loader />}>
          <ErrorPage />
        </Suspense>
      );
    }

    return children;
  }
}
