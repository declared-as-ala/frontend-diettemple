/* global React */
const { useEffect, useState } = React;

function Nav({ onJoin }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll while mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* Refresh lucide icons after mobile menu mounts */
  useEffect(() => {
    if (menuOpen && window.lucide) {
      setTimeout(() => lucide.createIcons(), 20);
    }
  }, [menuOpen]);

  const links = [
    ['systeme',  'Le Système'],
    ['rangs',    'Les Rangs'],
    ['app',      'L\'Application'],
    ['societe',  'La Société'],
    ['produits', 'Nos Produits'],
  ];

  const close = () => setMenuOpen(false);
  const toggle = () => setMenuOpen(o => !o);

  return (
    <>
      <nav className={`dt-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="dt-nav-inner">
          <a className="dt-brand" href="#top" onClick={close}>
            <img src="../../assets/logo.webp" alt="DietTemple" />
            <span>Diet<em>Temple</em></span>
          </a>

          {/* Desktop links */}
          <div className="dt-nav-links">
            {links.map(([id, l]) => (
              id === 'produits'
                ? <a key={id} href="products.html">{l}</a>
                : <a key={id} href={`#${id}`}>{l}</a>
            ))}
          </div>

          <div className="dt-nav-right">
            <a className="dt-nav-signin" href="#">Connexion</a>
            <button className="dt-btn dt-btn-primary dt-btn-sm dt-nav-cta-desk" onClick={onJoin}>
              Rejoindre UH <i data-lucide="arrow-up-right"></i>
            </button>
            {/* Hamburger — mobile only */}
            <button
              className={`dt-hamburger${menuOpen ? ' is-open' : ''}`}
              onClick={toggle}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="dt-mobile-overlay" onClick={close}>
          <div className="dt-mobile-panel" onClick={e => e.stopPropagation()}>
            <ul className="dt-mobile-links">
              {links.map(([id, l], i) => (
                <li key={id} style={{ animationDelay: `${i * 55}ms` }}>
                  {id === 'produits'
                    ? <a href="products.html" onClick={close}><span>{l}</span><i data-lucide="arrow-right" /></a>
                    : <a href={`#${id}`} onClick={close}><span>{l}</span><i data-lucide="arrow-right" /></a>
                  }
                </li>
              ))}
            </ul>

            <div className="dt-mobile-foot">
              <a className="dt-btn dt-btn-ghost dt-mobile-btn" href="#">
                <i data-lucide="log-in"></i> Connexion
              </a>
              <button
                className="dt-btn dt-btn-primary dt-mobile-btn"
                onClick={() => { close(); onJoin(); }}
              >
                Rejoindre Ultimate Human <i data-lucide="arrow-up-right"></i>
              </button>
            </div>

            <div className="dt-mobile-meta">
              <span><i data-lucide="shield-check"></i> Sans engagement</span>
              <span><i data-lucide="zap"></i> Accès immédiat</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

window.Nav = Nav;
