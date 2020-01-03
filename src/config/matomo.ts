import router from "../router"

export default {
    host: "https://kpi.unik-name.com",
    siteId: 8,
    enableLinkTracking: true,
    trackInitialView: true,
    router
}

declare global {
  interface Window { _paq: any; }
}

export function setupMatomoConfig() {
  window._paq = window._paq || [];

  window._paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
  window._paq.push(["setDomains", ["*.uns.network", "*.unik-name.com"]]);
  window._paq.push(["enableCrossDomainLinking"]);
  window._paq.push(["setDoNotTrack", true]);
  // window._paq.push(['trackPageView']); => handled by standard Vue-Matomo configuration
  // window._paq.push(['enableLinkTracking']); => handled by standard Vue-Matomo configuration
}
