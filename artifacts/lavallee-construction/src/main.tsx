import { hydrateRoot } from 'react-dom/client';
import { Root } from './Root';

hydrateRoot(document.getElementById('root')!,
  <Root ssrPath={window.location.pathname} />,
  {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
  },
);
