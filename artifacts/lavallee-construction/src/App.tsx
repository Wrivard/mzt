import { Suspense, useEffect, useLayoutEffect, type ReactNode } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { lazyPages, pageKey, type PageComponent } from '@/route-pages';
import { PageMetadata } from '@/components/PageMetadata';
import { PRIVACY_PATH } from '@/data/site';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

function RouteScrollReset() {
  const [location] = useLocation();

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useLayoutEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      document.getElementById(hash)?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location]);

  return null;
}

function Router({ initialPage, initialPath }: { initialPage: PageComponent; initialPath: string }) {
  const initialKey = pageKey(initialPath);
  const component = (key: keyof typeof lazyPages) => key === initialKey ? initialPage : lazyPages[key];
  return (
    <RoutedErrorBoundary>
      <Suspense fallback={<div className="min-h-screen bg-[#1B1B1B]" role="status" aria-label="Chargement de la page" />}>
        <RouteScrollReset />
        <BrandedMotion />
        <Switch>
          <Route path="/" component={component("/")} />
          <Route path="/soumission" component={component("/soumission")} />
          <Route path={PRIVACY_PATH} component={component(PRIVACY_PATH)} />
          <Route component={component("/404")} />
        </Switch>
      </Suspense>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

/* Light, non-blocking reveal: no loader wait, content becomes visible even if the observer never fires. */
function BrandedMotion() {
  const [location] = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("main > section:not(:first-child) > .container"));
    const viewport = window.innerHeight;
    const pending = targets.filter((t) => t.getBoundingClientRect().top > viewport * 0.9);
    if (!pending.length) return;
    root.classList.add("motion-enhanced");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    pending.forEach((target) => {
      target.classList.add("reveal-on-scroll");
      observer.observe(target);
    });
    const failsafe = window.setTimeout(() => pending.forEach((t) => t.classList.add("is-visible")), 4000);
    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
      pending.forEach((t) => t.classList.remove("reveal-on-scroll", "is-visible"));
      root.classList.remove("motion-enhanced");
    };
  }, [location]);

  return null;
}

function App({ ssrPath, initialPage }: { ssrPath: string; initialPage: PageComponent }) {
  return (
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')} ssrPath={ssrPath}>
          <PageMetadata />
          <Router initialPage={initialPage} initialPath={ssrPath} />
        </WouterRouter>
  );
}

export default App;
