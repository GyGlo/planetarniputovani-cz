(() => {
  const measurementId = 'G-V4FD1KP692';
  const storageKey = 'planetarni-putovani-analytics-consent';

  const getConsent = () => {
    try {
      return window.localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  };

  const saveConsent = (value) => {
    try {
      window.localStorage.setItem(storageKey, value);
    } catch {
      // Bez lokálního úložiště se analytika nenačte.
    }
  };

  const deleteAnalyticsCookies = () => {
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0].trim();
      if (!name.startsWith('_ga')) return;
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname}`;
    });
  };

  const loadAnalytics = () => {
    if (window.__planetarniAnalyticsLoaded) return;
    window.__planetarniAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { anonymize_ip: true });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.append(script);
  };

  const removeBanner = () => document.querySelector('[data-cookie-banner]')?.remove();

  const showBanner = () => {
    if (document.querySelector('[data-cookie-banner]')) return;
    const banner = document.createElement('section');
    banner.className = 'cookie-banner';
    banner.dataset.cookieBanner = '';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Nastavení analytických cookies');
    banner.innerHTML = `
      <div>
        <strong>Pomozte nám zlepšovat Planetární putování</strong>
        <p>Se souhlasem používáme Google Analytics pro anonymizované měření návštěvnosti. <a href="/ochrana-soukromi.html">Více o ochraně soukromí</a>. Volbu můžete kdykoli změnit v patičce.</p>
      </div>
      <div class="cookie-banner-actions">
        <button class="button button-secondary" type="button" data-cookie-decline>Pouze nezbytné</button>
        <button class="button" type="button" data-cookie-accept>Povolit analytiku</button>
      </div>
    `;
    document.body.append(banner);
  };

  const setConsent = (value) => {
    saveConsent(value);
    removeBanner();
    if (value === 'granted') loadAnalytics();
    if (value === 'denied') {
      window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
      deleteAnalyticsCookies();
    }
  };

  const initialise = () => {
    if (getConsent() === 'granted') loadAnalytics();
    else showBanner();

    document.addEventListener('click', (event) => {
      if (event.target.closest('[data-cookie-accept]')) setConsent('granted');
      if (event.target.closest('[data-cookie-decline]')) setConsent('denied');
      if (event.target.closest('[data-cookie-settings]')) {
        try { window.localStorage.removeItem(storageKey); } catch { /* no-op */ }
        showBanner();
      }
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialise);
  else initialise();
})();
