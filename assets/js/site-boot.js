/* Auto-mount language switch + apply data-i18n on all pages */
(function siteBoot() {
  function init() {
    if (typeof SiteI18n === 'undefined') return;
    const mount = document.querySelector('.hero') || document.querySelector('main.page') || document.body;
    SiteI18n.mountLangSelect(mount, {
      onChange: () => {
        SiteI18n.apply(document);
        window.dispatchEvent(new CustomEvent('site:langchange', { detail: { lang: SiteI18n.getLang() } }));
      },
    });
    SiteI18n.apply(document);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
