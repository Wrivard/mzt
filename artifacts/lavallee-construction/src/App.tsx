import { useEffect, useLayoutEffect, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Home from '@/pages/Home';
import Soumission from '@/pages/Soumission';
import Privacy from '@/pages/Privacy';
import { PageMetadata } from '@/components/PageMetadata';
import { PRIVACY_PATH } from '@/data/site';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

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

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/soumission" component={Soumission} />
        <Route path={PRIVACY_PATH} component={Privacy} />
        <Route component={NotFound} />
      </Switch>
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

function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')} ssrPath={ssrPath}>
          <PageMetadata />
          <RouteScrollReset />
          <BrandedMotion />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
