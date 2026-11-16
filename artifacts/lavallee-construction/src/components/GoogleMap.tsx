export function GoogleMap() {
  return (
    <div className="relative h-[320px] w-full overflow-hidden bg-muted sm:h-[400px] lg:h-[460px]" role="region" aria-label="Carte de Sainte-Claire, Québec">
      <iframe
        id="google-map"
        title="Carte centrée sur Sainte-Claire, Québec"
        src="https://maps.google.com/maps?q=Sainte-Claire%2C%20Qu%C3%A9bec&output=embed"
        className="block h-full w-full border-0 grayscale-[0.35]"
        loading="eager"
        referrerPolicy="no-referrer"
        allowFullScreen
      />
    </div>
  );
}
