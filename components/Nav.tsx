'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowUpRight,
  ShoppingBag,
  Zap,
  LogOut,
  User,
  Menu,
  X,
  ArrowRight,
  Home,
  FlaskConical,
  MoreHorizontal,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/authContext';

interface NavProps {
  onJoin: () => void;
}

export default function Nav({ onJoin }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === '/';
  const isShop = pathname.startsWith('/produits');
  const isAuth = pathname.startsWith('/connexion');
  const { count, openDrawer } = useCart();
  const { user, isLoggedIn, hasSubscription, logout } = useAuth();

  /* Scroll detection */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* Hash observation for active section */
  useEffect(() => {
    const handleHash = () => {
      setActiveHash(window.location.hash);
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const close = () => {
    setMenuOpen(false);
    setUserOpen(false);
  };

  const scrollToSection = (id: string) => {
    close();
    if (isHome) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveHash(`#${id}`);
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  const scrollToTop = () => {
    close();
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveHash('');
    } else {
      router.push('/');
    }
  };

  /* Mobile menu drawer links */
  const mobileLinks: { href: string; label: string; action?: () => void }[] = [
    ...(isHome
      ? [
          { href: '#top', label: 'Accueil', action: scrollToTop },
          { href: '#mission', label: 'Notre Mission', action: () => scrollToSection('mission') },
          { href: '#science', label: 'Fondé sur la Science', action: () => scrollToSection('science') },
        ]
      : [{ href: '/', label: 'Accueil' }]),
    { href: '/produits', label: 'Boutique' },
  ];

  return (
    <>
      {/* ── Fixed Compact & Premium Top Navbar ───────────────────────────── */}
      <nav className={`dt-nav-sports${scrolled ? ' is-scrolled' : ''}`}>
        <div className="dt-nav-sports-inner">

          {/* Left: Brand Identity */}
          <Link className="dt-brand-sports" href="/" onClick={close}>
            <Image src="/logo.webp" alt="DietTemple" width={28} height={28} priority />
            <div className="dt-brand-text">
              <span>Diet</span>
              <em>Temple</em>
            </div>
          </Link>

          {/* Center-Left: Desktop Navigation Links */}
          <div className="dt-nav-sports-links dt-desk-only">
            {isHome ? (
              <>
                <button
                  type="button"
                  className={`dt-nav-item-link ${activeHash === '#mission' ? 'is-active' : ''}`}
                  onClick={() => scrollToSection('mission')}
                >
                  Notre Mission
                </button>
                <button
                  type="button"
                  className={`dt-nav-item-link ${activeHash === '#science' ? 'is-active' : ''}`}
                  onClick={() => scrollToSection('science')}
                >
                  Fondé sur la Science
                </button>
              </>
            ) : (
              <Link href="/" className="dt-nav-item-link">
                Accueil
              </Link>
            )}
            <Link
              href="/produits"
              className={`dt-nav-item-link ${isShop ? 'is-active' : ''}`}
            >
              Boutique
            </Link>
          </div>

          {/* Right Side: Account, Cart, Primary CTA, Mobile Controls */}
          <div className="dt-nav-sports-right">

            {/* Desktop Auth / Account */}
            {isLoggedIn ? (
              <div className="dt-nav-user dt-desk-only" onClick={() => setUserOpen((o) => !o)}>
                <div className="dt-nav-user-avatar">
                  {user?.name?.charAt(0).toUpperCase()}
                  {hasSubscription && <span className="dt-nav-user-dot" />}
                </div>
                {userOpen && (
                  <div className="dt-nav-user-dd">
                    <div className="dt-nav-user-info">
                      <div className="dt-nav-user-name">{user?.name}</div>
                      {hasSubscription ? (
                        <div className="dt-nav-user-sub">
                          <Zap size={10} /> Membre Actif
                        </div>
                      ) : (
                        <div className="dt-nav-user-sub-off">Pas d&apos;abonnement</div>
                      )}
                    </div>
                    <Link href="/produits" className="dt-nav-user-opt" onClick={close}>
                      <ShoppingBag size={13} /> Boutique
                    </Link>
                    <button
                      className="dt-nav-user-opt dt-nav-user-opt--logout"
                      onClick={() => {
                        logout();
                        close();
                      }}
                    >
                      <LogOut size={13} /> Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={`/connexion?from=${encodeURIComponent(pathname)}`}
                className="dt-nav-signin-sports dt-desk-only"
              >
                <User size={14} />
                <span>Connexion</span>
              </Link>
            )}

            {/* Mobile Account Quick Button */}
            <Link
              href={isLoggedIn ? '/produits' : `/connexion?from=${encodeURIComponent(pathname)}`}
              className="dt-nav-icon-btn dt-mobile-only"
              aria-label="Mon Compte"
            >
              <User size={18} />
            </Link>

            {/* Cart Icon Button (Desktop & Mobile) */}
            <button
              className="dt-nav-icon-btn dt-nav-cart-btn"
              onClick={openDrawer}
              aria-label="Panier"
            >
              <ShoppingBag size={18} />
              {count > 0 && <span className="dt-nav-cart-badge">{count}</span>}
            </button>

            {/* Desktop Primary CTA Button */}
            <button
              className="dt-nav-cta-btn dt-desk-only"
              onClick={onJoin}
              aria-label="Rejoindre Ultimate Human"
            >
              <span>Rejoindre UH</span>
              <ArrowUpRight size={15} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className={`dt-nav-hamburger dt-mobile-only ${menuOpen ? 'is-active' : ''}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay Drawer ───────────────────────────────────── */}
      {menuOpen && (
        <div className="dt-mobile-overlay" onClick={close}>
          <div className="dt-mobile-panel" onClick={(e) => e.stopPropagation()}>
            <div className="dt-mobile-header">
              <div className="dt-brand-sports">
                <Image src="/logo.webp" alt="DietTemple" width={26} height={26} />
                <div className="dt-brand-text">
                  <span>Diet</span>
                  <em>Temple</em>
                </div>
              </div>
              <button
                className="dt-mobile-close-btn"
                onClick={close}
                aria-label="Fermer le menu"
              >
                <X size={20} />
              </button>
            </div>

            <ul className="dt-mobile-links">
              {mobileLinks.map((link, i) => (
                <li key={link.href} style={{ animationDelay: `${i * 50}ms` }}>
                  {link.action ? (
                    <button type="button" onClick={link.action} className="dt-mobile-link-btn">
                      <span>{link.label}</span>
                      <ArrowRight size={18} />
                    </button>
                  ) : (
                    <Link href={link.href} onClick={close}>
                      <span>{link.label}</span>
                      <ArrowRight size={18} />
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="dt-mobile-foot">
              {isLoggedIn ? (
                <button
                  className="dt-btn dt-btn-ghost dt-mobile-btn"
                  onClick={() => {
                    logout();
                    close();
                  }}
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
                onClick={() => {
                  close();
                  onJoin();
                }}
              >
                Rejoindre Ultimate Human <ArrowUpRight size={15} />
              </button>
            </div>

            <div className="dt-mobile-meta">
              <span>✓ Sans engagement</span>
              <span>⚡ Accès immédiat</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Fixed Mobile Bottom Navigation Dock ──────────────────────────── */}
      <nav className="dt-bottom-nav" aria-label="Navigation mobile">
        {/* 1. Accueil */}
        <button
          type="button"
          className={`dt-bottom-tab ${isHome && activeHash !== '#science' ? 'is-active' : ''}`}
          onClick={scrollToTop}
          aria-label="Accueil"
        >
          <Home size={20} />
          <span>Accueil</span>
          {isHome && activeHash !== '#science' && <span className="dt-tab-pip" />}
        </button>

        {/* 2. Science */}
        <button
          type="button"
          className={`dt-bottom-tab ${activeHash === '#science' ? 'is-active' : ''}`}
          onClick={() => scrollToSection('science')}
          aria-label="Fondé sur la Science"
        >
          <FlaskConical size={20} />
          <span>Science</span>
          {activeHash === '#science' && <span className="dt-tab-pip" />}
        </button>

        {/* 3. Boutique */}
        <Link
          href="/produits"
          className={`dt-bottom-tab ${isShop ? 'is-active' : ''}`}
          onClick={close}
          aria-label="Boutique"
        >
          <ShoppingBag size={20} />
          <span>Boutique</span>
          {isShop && <span className="dt-tab-pip" />}
        </Link>

        {/* 4. Compte */}
        <Link
          href={isLoggedIn ? '/produits' : `/connexion?from=${encodeURIComponent(pathname)}`}
          className={`dt-bottom-tab ${isAuth ? 'is-active' : ''}`}
          onClick={close}
          aria-label="Compte"
        >
          <User size={20} />
          <span>Compte</span>
          {isAuth && <span className="dt-tab-pip" />}
        </Link>

        {/* 5. Plus (Opens Drawer Menu) */}
        <button
          type="button"
          className={`dt-bottom-tab ${menuOpen ? 'is-active' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Plus d'options"
          aria-expanded={menuOpen}
        >
          <MoreHorizontal size={20} />
          <span>Plus</span>
          {menuOpen && <span className="dt-tab-pip" />}
        </button>
      </nav>
    </>
  );
}
