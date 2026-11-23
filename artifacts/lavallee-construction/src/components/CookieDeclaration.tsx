import { useEffect, useRef } from "react";

export function CookieDeclaration() {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!import.meta.env.PROD || !container.current) return;
    const script = document.createElement("script");
    script.id = "CookieDeclaration";
    script.src = "https://consent.cookiebot.com/4631a8e3-a162-4134-8659-a678be5f061f/cd.js";
    script.type = "text/javascript";
    script.async = true;
    script.dataset.culture = "FR";
    const target = container.current;
    target.appendChild(script);
    return () => { target.replaceChildren(); };
  }, []);

  return (
    <section id="declaration-temoins" className="mt-10 border-t border-border pt-10 scroll-mt-32">
      <h2 className="text-2xl sm:text-[1.75rem] font-bold text-secondary mb-5">Déclaration relative aux témoins</h2>
      <div ref={container} className="min-w-0 overflow-x-auto text-muted-foreground" />
      <noscript>Activez JavaScript pour consulter la déclaration et gérer vos préférences de témoins.</noscript>
    </section>
  );
}
