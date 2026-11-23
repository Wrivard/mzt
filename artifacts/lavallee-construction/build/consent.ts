/** Insert only into production HTML. Keep Cookiebot ahead of all other scripts. */
export function withProductionConsent(html: string) {
  const scripts = `
    <script data-cookieconsent="ignore">
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'default', {
        ad_storage: 'denied', analytics_storage: 'denied',
        ad_user_data: 'denied', ad_personalization: 'denied',
        functionality_storage: 'denied', personalization_storage: 'denied',
        security_storage: 'granted', wait_for_update: 500
      });
      gtag('set', 'ads_data_redaction', true);
    </script>
    <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="4631a8e3-a162-4134-8659-a678be5f061f" data-blockingmode="auto" data-culture="FR" type="text/javascript"></script>
    <script data-cookieconsent="ignore">
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-5HLMKNHG');
    </script>`;
  // Keep charset first; Cookiebot must run before startup and application code.
  return html
    .replace(/<meta charset="UTF-8"\s*\/?>/i, (charset) => `${charset}${scripts}`)
    // Vite regenerates the module tag and drops custom source attributes.
    .replace(/<script\b(?=[^>]*\btype="module")(?![^>]*\bdata-cookieconsent=)/gi,
      '<script data-cookieconsent="ignore"');
}
