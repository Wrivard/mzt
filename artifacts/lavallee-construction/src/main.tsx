import { createRoot } from 'react-dom/client';
import { useLayoutEffect, type ReactNode } from 'react';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

function StartupReady({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    // Reveal the app only after React has committed its first complete layout.
    document.documentElement.removeAttribute('data-app-loading');
    document.getElementById('app-startup')?.remove();
  }, []);
  return children;
}

createRoot(document.getElementById('root')!, {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <StartupReady>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StartupReady>,
);
