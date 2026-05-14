'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ShoppingBag, Zap, LogOut, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/authContext';

interface NavProps { onJoin: () => void; }

export default function Nav({ onJoin }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const pathname = usePathname();
  const isHome   = pathname === '/';
  const { count, openDrawer } = useCart();
  const { user, isLoggedIn, hasSubscription, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isShop = pathname.startsWith('/produits');

  return (
    <nav className={`dt-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="dt-nav-inner">
        {/* Brand */}
        <Link className="dt-brand" href="/">
          <Image src="/logo.webp" alt="DietTemple" width={26} height={26} />
          <span>Diet<em>Temple</em></span>
        </Link>

        {/* Links */}
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
          <Link href="/produits" className={isShop ? 'dt-nav-link-active' : ''}>
            Boutique
          </Link>
        </div>

        {/* Right side */}
        <div className="dt-nav-right">
          {/* Auth */}
          {isLoggedIn ? (
            <div className="dt-nav-user" onClick={() => setUserOpen(o => !o)}>
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
                  <Link href="/produits" className="dt-nav-user-opt" onClick={() => setUserOpen(false)}>
                    <ShoppingBag size={13} /> Boutique
                  </Link>
                  <button className="dt-nav-user-opt dt-nav-user-opt--logout" onClick={() => { logout(); setUserOpen(false); }}>
                    <LogOut size={13} /> Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href={`/connexion?from=${encodeURIComponent(pathname)}`}
              className="dt-nav-signin"
            >
              <User size={13} /> Connexion
            </Link>
          )}

          {/* Cart */}
          <button className="dt-nav-cart" onClick={openDrawer} aria-label="Panier">
            <ShoppingBag size={18} />
            {count > 0 && <span className="dt-nav-cart-badge">{count}</span>}
          </button>

          {/* CTA */}
          <button className="dt-btn dt-btn-primary dt-btn-sm" onClick={onJoin}>
            Rejoindre UH <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </nav>
  );
}
