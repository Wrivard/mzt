export function GoogleMap() {
  // Center the territory bounds, then compensate northward for the cropped
  // 64px My Maps header (32px difference between iframe and visible centers).
  return (
    <div className="relative h-[320px] w-full overflow-hidden bg-muted sm:h-[400px] lg:h-[460px]" role="region" aria-label="Carte du territoire desservi par MZT Construction">
      <iframe
        id="google-map"
        title="Territoire desservi par MZT Construction"
        src="https://www.google.com/maps/d/u/0/embed?mid=1njDNeKER442MPAq3QQjWBGBeBDeZ0RE&ehbc=2E312F&ll=46.790000%2C-70.844943&z=7"
        // Crop only the My Maps header; retain map controls and attribution.
        className="absolute -top-16 left-0 block h-[calc(100%+4rem)] w-full border-0"
        loading="eager"
        referrerPolicy="no-referrer"
        allowFullScreen
      />
    </div>
  );
}
