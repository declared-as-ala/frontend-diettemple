'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ShoppingBag, Zap, LogOut, User, Menu, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/authContext';

interface NavProps { onJoin: () => void; }

export default function Nav({ onJoin }: NavProps) {
  const [scrolled,  setScrolled]  = useState(false);
  const [userOpen,  setUserOpen]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const pathname = usePathname();
  const isHome  = pathname === '/';
  const isShop  = pathname.startsWith('/produits');
  const { count, openDrawer } = useCart();
  const { user, isLoggedIn, hasSubscription, logout } = useAuth();

  /* scroll detection */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => { setMenuOpen(false); setUserOpen(false); };

  /* mobile nav links */
  const mobileLinks: { href: string; label: string; anchor?: boolean }[] = [
    ...(isHome
      ? [
          { href: '#systeme', label: 'Le Système',      anchor: true },
          { href: '#rangs',   label: 'Les Rangs',        anchor: true },
          { href: '#app',     label: "L'Application",    anchor: true },
          { href: '#societe', label: 'La Société',       anchor: true },
        ]
      : [{ href: '/', label: 'Accueil' }]),
    { href: '/produits', label: 'Boutique' },
  ];

  return (
    <>
      {/* ── Fixed navbar ─────────────────────────────────────────────────── */}
      <nav className={`dt-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="dt-nav-inner">

          {/* Brand */}
          <Link className="dt-brand" href="/" onClick={close}>
            <Image src="/logo.webp" alt="DietTemple" width={26} height={26} />
            <span>Diet<em>Temple</em></span>
          </Link>

          {/* Desktop links */}
          <div className="dt-nav-links">
            {isHome ? (
              <>
                <a href="#systeme">Le Système</a>
                <a href="#rangs">Les Rangs</a>
                <a href="#app">L&apos;Application</a>
                <a href="#societe">La Société</a>
              </>
            ) : (
              <Link href="/" style={{ color: 'var(--bone-2)' }}>Accueil</Link>
            )}
            <Link href="/produits" className={isShop ? 'dt-nav-link-active' : ''}>Boutique</Link>
          </div>

          {/* Right side */}
          <div className="dt-nav-right">

            {/* Auth (desktop only) */}
            {isLoggedIn ? (
              <div className="dt-nav-user dt-desk-only" onClick={() => setUserOpen(o => !o)}>
                <div className="dt-nav-user-avatar">
                  {user?.name?.charAt(0).toUpperCase()}
                  {hasSubscription && <span className="dt-nav-user-dot" />}
                </div>
                {userOpen && (
                  <div className="dt-nav-user-dd">
                    <div className="dt-nav-user-info">
                      <div className="dt-nav-user-name">{user?.name}</div>
                      {hasSubscription
                        ? <div className="dt-nav-user-sub"><Zap size={10} /> Membre Actif</div>
                        : <div className="dt-nav-user-sub-off">Pas d&apos;abonnement</div>
                      }
                    </div>
                    <Link href="/produits" className="dt-nav-user-opt" onClick={close}>
                      <ShoppingBag size={13} /> Boutique
                    </Link>
                    <button className="dt-nav-user-opt dt-nav-user-opt--logout" onClick={() => { logout(); close(); }}>
                      <LogOut size={13} /> Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={`/connexion?from=${encodeURIComponent(pathname)}`}
                className="dt-nav-signin dt-desk-only"
              >
                <User size={13} /> Connexion
              </Link>
            )}

            {/* Cart */}
            <button className="dt-nav-cart" onClick={openDrawer} aria-label="Panier">
              <ShoppingBag size={18} />
              {count > 0 && <span className="dt-nav-cart-badge">{count}</span>}
            </button>

            {/* Desktop CTA — hidden on mobile (sticky CTA handles it) */}
            <button className="dt-btn dt-btn-primary dt-btn-sm dt-desk-only" onClick={onJoin}>
              Rejoindre UH <ArrowUpRight size={14} />
            </button>

            {/* Hamburger — mobile only */}
            <button
              className={`dt-hamburger${menuOpen ? ' is-open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

          </div>
        </div>
      </nav>

      {/* ── Mobile menu overlay ───────────────────────────────────────────── */}
      {menuOpen && (
        <div className="dt-mobile-overlay" onClick={close}>
          <div className="dt-mobile-panel" onClick={e => e.stopPropagation()}>

            <ul className="dt-mobile-links">
              {mobileLinks.map((link, i) => (
                <li key={link.href} style={{ animationDelay: `${i * 55}ms` }}>
                  {link.anchor ? (
                    <a href={link.href} onClick={close}>
                      <span>{link.label}</span><ArrowRight size={18} />
                    </a>
                  ) : (
                    <Link href={link.href} onClick={close}>
                      <span>{link.label}</span><ArrowRight size={18} />
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="dt-mobile-foot">
              {isLoggedIn ? (
                <button
                  className="dt-btn dt-btn-ghost dt-mobile-btn"
                  onClick={() => { logout(); close(); }}
                >
                  <LogOut size={14} /> Déconnexion
                </button>
              ) : (
                <Link
                  href={`/connexion?from=${encodeURIComponent(pathname)}`}
                  className="dt-btn dt-btn-ghost dt-mobile-btn"
                  onClick={close}
                >
                  <User size={14} /> Connexion
                </Link>
              )}
              <button
                className="dt-btn dt-btn-primary dt-mobile-btn"
                onClick={() => { close(); onJoin(); }}
              >
                Rejoindre Ultimate Human <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="dt-mobile-meta">
              <span>✓ Sans engagement</span>
              <span>⚡ Accès immédiat</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
