import { useState } from "react";
import { MapPin } from "lucide-react";
import { PRIVACY_PATH } from "@/data/site";

/** No request to Google is made until the visitor activates this map. */
export function GoogleMap() {
  const [active, setActive] = useState(false);
  const privacyHref = `${import.meta.env.BASE_URL.replace(/\/$/, "")}${PRIVACY_PATH}`;

  return (
    <div className="relative h-[320px] w-full overflow-hidden bg-muted sm:h-[400px] lg:h-[460px]" role="region" aria-label="Carte de Sainte-Claire, Québec">
      {active ? (
        <iframe
          id="google-map"
          title="Carte centrée sur Sainte-Claire, Québec"
          src="https://maps.google.com/maps?q=Sainte-Claire%2C%20Qu%C3%A9bec&output=embed"
          className="block h-full w-full border-0 grayscale-[0.35]"
          referrerPolicy="no-referrer"
          allowFullScreen
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      )}
      <div className={active ? "absolute right-4 top-4 z-10" : "absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"}>
        {!active && (
          <>
            <MapPin className="h-8 w-8 text-primary" aria-hidden="true" />
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Pour afficher la carte, autorisez une connexion à Google.
            </p>
          </>
        )}
        <button
          type="button"
          data-testid="button-map-consent"
          aria-expanded={active}
          aria-controls={active ? "google-map" : undefined}
          onClick={() => setActive((value) => !value)}
          className={active
            ? "rounded-md bg-secondary px-4 py-3 text-xs font-semibold text-white shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            : "rounded-md bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"}
        >
          {active ? "Masquer la carte" : "Afficher la carte"}
        </button>
        {!active && (
          <a href={privacyHref} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground underline underline-offset-4 hover:text-secondary">
            Politique de confidentialité<span className="sr-only"> — nouvelle fenêtre</span>
          </a>
        )}
      </div>
    </div>
  );
}
