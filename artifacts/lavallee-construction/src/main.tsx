import { hydrateRoot } from 'react-dom/client';
import { Root } from './Root';
import { loadPage } from './route-pages';

async function start() {
  const initialPage = await loadPage(window.location.pathname);
  hydrateRoot(document.getElementById('root')!,
    <Root ssrPath={window.location.pathname} initialPage={initialPage} />,
    {
      // Keeps caught errors off reportError(), which would raise the dev overlay.
      onCaughtError: (error, errorInfo) => {
        console.error(error, errorInfo.componentStack);
      },
    },
  );
}

void start().catch((error) => console.error("Application startup failed", error));
