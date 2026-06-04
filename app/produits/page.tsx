'use client';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, SlidersHorizontal, X, ChevronDown, Package, Star, ShoppingCart, Check, Lock, Zap } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JoinModal from '@/components/JoinModal';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/authContext';
import { API_URL } from '@/lib/config';

export interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  uhPrice?: number | null;
  discount?: number;
  images: string[];
  stock: number;
  description?: string;
  rating?: number;
}

const SORT_OPTIONS = [
  { value: 'popular',    label: 'Plus populaires' },
  { value: 'price_asc',  label: 'Prix croissant'  },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'newest',     label: 'Nouveautés'       },
];

export const CATEGORY_ICONS: Record<string, string> = {
  'protéines':        '🥛',
  'créatine':         '⚡',
  'prise de masse':   '💪',
  'brûleurs':         '🔥',
  'pré-entraînement': '🚀',
  'récupération':     '🌙',
  'hydratation':      '💧',
  'vitamines':        '🌿',
  'performance':      '🎯',
  'force':            '🏋️',
  'santé':            '❤️',
};

export function resolveImg(url: string | null | undefined, apiUrl: string) {
  if (!url) return null;
  return url.startsWith('http') ? url : `${apiUrl.replace('/api', '')}${url}`;
}

function ProductSkeleton() {
  return (
    <div className="dt-prod-card dt-prod-card--skel">
      <div className="dt-prod-card-vis"><div className="dt-skeleton" style={{ position: 'absolute', inset: 0 }} /></div>
      <div className="dt-prod-card-body">
        <div className="dt-skeleton" style={{ height: 10, width: '45%', borderRadius: 4 }} />
        <div className="dt-skeleton" style={{ height: 20, width: '80%', marginTop: 8, borderRadius: 6 }} />
        <div className="dt-skeleton" style={{ height: 14, width: '55%', marginTop: 6, borderRadius: 4 }} />
        <div className="dt-skeleton" style={{ height: 36, marginTop: 16, borderRadius: 8 }} />
      </div>
    </div>
  );
}

function ProductCard({ product, onJoin }: { product: Product; onJoin: () => void }) {
  const { addItem, items } = useCart();
  const { hasSubscription, isLoggedIn } = useAuth();
  const [added, setAdded] = useState(false);

  const discountPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : null;
  const memberPrice = product.uhPrice ?? null;

  // What the user actually pays at checkout (backend enforces)
  const effectivePrice = discountPrice ?? product.price;

  const savePct = memberPrice
    ? Math.round(((product.price - memberPrice) / product.price) * 100)
    : product.discount ?? 0;

  const imageUrl = resolveImg(product.images?.[0], API_URL);
  const catIcon  = CATEGORY_ICONS[product.category?.toLowerCase()] ?? '📦';
  const inCart   = items.some(i => i.productId === product._id);
  const outOfStock = product.stock === 0;

  const handleAdd = () => {
    addItem({
      productId: product._id,
      name: product.name,
      brand: product.brand,
      price: effectivePrice,
      memberPrice: memberPrice,
      image: imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article className="dt-prod-card">
      <Link href={`/produits/${product._id}`} className="dt-prod-card-vis" tabIndex={-1}>
        <div className="dt-prod-card-glow" />
        {imageUrl ? (
          <Image src={imageUrl} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="(max-width:600px) 50vw, 25vw" />
        ) : (
          <div className="dt-prod-card-tube">
            <div className="dt-prod-card-tube-cap" />
            <div className="dt-prod-card-tube-body">
              <span className="dt-prod-card-tube-brand">{product.brand}</span>
              <span className="dt-prod-card-tube-name">{product.name.split(' ').slice(0, 2).join(' ')}</span>
            </div>
          </div>
        )}
        <div className="dt-prod-card-badges">
          <span className="dt-prod-cat-pill">{catIcon} {product.category}</span>
          {savePct > 0 && <span className="dt-prod-save-pill">−{savePct}%</span>}
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <div className="dt-prod-stock-warn">Plus que {product.stock}</div>
        )}
      </Link>

      <div className="dt-prod-card-body">
        <div className="dt-prod-card-meta">
          <span className="dt-prod-brand">{product.brand}</span>
          {product.rating && <span className="dt-prod-rating"><Star size={10} fill="currentColor" />{product.rating.toFixed(1)}</span>}
        </div>
        <Link href={`/produits/${product._id}`}>
          <h3 className="dt-prod-name">{product.name}</h3>
        </Link>

        <div className="dt-prod-prices">
          {/* Logged-in with active subscription → show UH price as THE price */}
          {isLoggedIn && hasSubscription && memberPrice ? (
            <>
              <div className="dt-prod-price-row">
                <span className="dt-prod-price-public is-struck">{product.price}<span className="dt-cur">TND</span></span>
                <span className="dt-prod-price-member">{memberPrice}<span className="dt-cur">TND</span></span>
              </div>
              <span className="dt-prod-price-tag"><Zap size={9} /> Tarif Membre appliqué</span>
            </>
          ) : memberPrice ? (
            /* Not logged in → show regular price, teaser UH price locked */
            <>
              <div className="dt-prod-price-row">
                <span className="dt-prod-price-public">{effectivePrice}<span className="dt-cur">TND</span></span>
              </div>
              <button className="dt-prod-uh-teaser" onClick={onJoin}>
                <Lock size={10} /> Tarif Membre : <strong>{memberPrice} TND</strong>
              </button>
            </>
          ) : (
            <div className="dt-prod-price-row">
              <span className="dt-prod-price-public">{effectivePrice}<span className="dt-cur">TND</span></span>
            </div>
          )}
        </div>

        <button
          className={`dt-btn dt-prod-cta ${added ? 'dt-prod-cta--added' : outOfStock ? 'dt-prod-cta--out' : 'dt-btn-primary'}`}
          onClick={outOfStock ? undefined : handleAdd}
          disabled={outOfStock}
        >
          {outOfStock
            ? 'Rupture de stock'
            : added
              ? <><Check size={13} /> Ajouté !</>
              : inCart
                ? <><ShoppingCart size={13} /> Ajouter encore</>
                : <><ShoppingCart size={13} /> Ajouter au panier</>
          }
        </button>
      </div>
    </article>
  );
}

export default function ProduitsPage() {
  const [products,   setProducts]   = useState<Product[]>([]);
  const [filtered,   setFiltered]   = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [activeCategory, setActiveCategory] = useState('tous');
  const [search,     setSearch]     = useState('');
  const [sort,       setSort]       = useState('popular');
  const [sortOpen,   setSortOpen]   = useState(false);
  const [joinOpen,   setJoinOpen]   = useState(false);
  const [visibleCount, setVisibleCount] = useState(16);

  const { isLoggedIn, hasSubscription, user, logout } = useAuth();

  useEffect(() => {
    fetch(`${API_URL}/products?limit=200&sort=popular`)
      .then(r => r.json())
      .then(data => {
        const prods: Product[] = data.products ?? FALLBACK_PRODUCTS;
        setProducts(prods);
        const cats = Array.from(new Set(prods.map(p => p.category?.toLowerCase()).filter(Boolean))) as string[];
        setCategories(cats);
        setLoading(false);
      })
      .catch(() => {
        setProducts(FALLBACK_PRODUCTS);
        setCategories(Array.from(new Set(FALLBACK_PRODUCTS.map(p => p.category.toLowerCase()))));
        setLoading(false);
      });
  }, []);

  const applyFilters = useCallback(() => {
    let list = [...products];
    if (activeCategory !== 'tous') list = list.filter(p => p.category?.toLowerCase() === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q));
    }
    switch (sort) {
      case 'price_asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price_desc': list.sort((a, b) => b.price - a.price); break;
      case 'newest':     list.reverse(); break;
    }
    setFiltered(list);
    setVisibleCount(16);
  }, [products, activeCategory, search, sort]);

  useEffect(() => { applyFilters(); }, [applyFilters]);

  const visible   = filtered.slice(0, visibleCount);
  const hasMore   = visibleCount < filtered.length;
  const sortLabel = SORT_OPTIONS.find(o => o.value === sort)?.label ?? 'Trier';

  return (
    <>
      <Nav onJoin={() => setJoinOpen(true)} />

      {/* ── Page header (compact) ── */}
      <div className="dt-shop-page-head">
        <div className="dt-container">
          <div className="dt-shop-page-head-inner">
            <div>
              <Link href="/" className="dt-shop-back"><span>←</span> Accueil</Link>
              <h1 className="dt-shop-page-title">
                Boutique <em>UH</em>
              </h1>
              <p className="dt-shop-page-sub">
                {loading ? '' : `${products.length} produits — nutrition d'élite`}
              </p>
            </div>
            {/* Auth pill */}
            {isLoggedIn ? (
              <div className="dt-shop-auth-pill dt-shop-auth-pill--in">
                <div className="dt-shop-auth-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
                <div className="dt-shop-auth-info">
                  <span className="dt-shop-auth-name">{user?.name}</span>
                  {hasSubscription
                    ? <span className="dt-shop-auth-sub"><Zap size={10} /> Tarifs membres actifs</span>
                    : <span className="dt-shop-auth-sub-off">Pas d&apos;abonnement actif</span>
                  }
                </div>
                <button className="dt-shop-auth-logout" onClick={logout}>Déconnexion</button>
              </div>
            ) : (
              <div className="dt-shop-auth-pill">
                <Lock size={14} />
                <div>
                  <span className="dt-shop-auth-name">Tarifs membres</span>
                  <span className="dt-shop-auth-sub-off">Connectez-vous pour voir vos prix</span>
                </div>
                <Link href={`/connexion?from=/produits`} className="dt-btn dt-btn-ghost dt-btn-sm">
                  Connexion
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Sticky filter bar ── */}
      <div className="dt-shop-filters-wrap">
        <div className="dt-container">
          <div className="dt-shop-filters">
            <div className="dt-shop-search">
              <Search size={15} className="dt-shop-search-icon" />
              <input
                type="text"
                placeholder="Rechercher…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="dt-shop-search-input"
              />
              {search && <button className="dt-shop-search-clear" onClick={() => setSearch('')}><X size={13} /></button>}
            </div>

            <div className="dt-shop-cats">
              <button className={`dt-shop-cat-pill ${activeCategory === 'tous' ? 'is-active' : ''}`} onClick={() => { setActiveCategory('tous'); }}>
                <Package size={12} /> Tous
              </button>
              {categories.map(cat => (
                <button key={cat} className={`dt-shop-cat-pill ${activeCategory === cat ? 'is-active' : ''}`} onClick={() => setActiveCategory(cat)}>
                  {CATEGORY_ICONS[cat] ?? ''} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            <div className="dt-shop-sort" onClick={() => setSortOpen(o => !o)}>
              <SlidersHorizontal size={14} />
              <span>{sortLabel}</span>
              <ChevronDown size={14} className={sortOpen ? 'is-open' : ''} />
              {sortOpen && (
                <div className="dt-shop-sort-dd">
                  {SORT_OPTIONS.map(o => (
                    <button key={o.value} className={`dt-shop-sort-opt ${sort === o.value ? 'is-active' : ''}`}
                      onClick={e => { e.stopPropagation(); setSort(o.value); setSortOpen(false); }}>
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {(activeCategory !== 'tous' || search) && (
            <div className="dt-shop-active-filters">
              <span className="dt-shop-result-count">{filtered.length} produit{filtered.length !== 1 ? 's' : ''}</span>
              {activeCategory !== 'tous' && (
                <button className="dt-shop-active-tag" onClick={() => setActiveCategory('tous')}>{activeCategory} <X size={10} /></button>
              )}
              {search && (
                <button className="dt-shop-active-tag" onClick={() => setSearch('')}>&ldquo;{search}&rdquo; <X size={10} /></button>
              )}
              <button className="dt-shop-clear-all" onClick={() => { setActiveCategory('tous'); setSearch(''); }}>Tout effacer</button>
            </div>
          )}
        </div>
      </div>

      {/* ── Grid ── */}
      <main className="dt-shop-main">
        <div className="dt-container">
          {loading ? (
            <div className="dt-shop-grid">
              {Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="dt-shop-empty">
              <div className="dt-shop-empty-icon">🔍</div>
              <h3>Aucun produit trouvé</h3>
              <p>Essayez d&apos;autres termes ou catégories.</p>
              <button className="dt-btn dt-btn-ghost" onClick={() => { setActiveCategory('tous'); setSearch(''); }}>
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <>
              <div className="dt-shop-grid">
                {visible.map(p => <ProductCard key={p._id} product={p} onJoin={() => setJoinOpen(true)} />)}
              </div>
              {hasMore && (
                <div className="dt-shop-loadmore">
                  <button className="dt-btn dt-btn-ghost dt-btn-lg" onClick={() => setVisibleCount(n => n + 16)}>
                    Voir plus <span className="dt-shop-loadmore-count">+{filtered.length - visibleCount}</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
      {joinOpen && <JoinModal open={joinOpen} onClose={() => setJoinOpen(false)} />}
    </>
  );
}

const FALLBACK_PRODUCTS: Product[] = [
  { _id: '1', name: 'Whey Protocol',  brand: 'DietTemple', category: 'protéines',       price: 220, uhPrice: 159, images: [], stock: 24 },
  { _id: '2', name: 'Creatine Mono',  brand: 'DietTemple', category: 'créatine',         price: 120, uhPrice:  89, images: [], stock: 18 },
  { _id: '3', name: 'Lean Stack',     brand: 'DietTemple', category: 'prise de masse',   price: 330, uhPrice: 245, images: [], stock:  8 },
  { _id: '4', name: 'Electrolytes+',  brand: 'DietTemple', category: 'hydratation',      price:  89, uhPrice:  68, images: [], stock: 32 },
  { _id: '5', name: 'Sleep Arch.',    brand: 'DietTemple', category: 'récupération',     price: 145, uhPrice: 105, images: [], stock: 14 },
  { _id: '6', name: 'Pre-Workout X',  brand: 'DietTemple', category: 'pré-entraînement', price: 145, uhPrice: 109, images: [], stock:  5 },
  { _id: '7', name: 'Omega-3 Elite',  brand: 'DietTemple', category: 'vitamines',        price:  95, uhPrice:  72, images: [], stock: 20 },
  { _id: '8', name: 'BCAA Matrix',    brand: 'DietTemple', category: 'récupération',     price: 110, uhPrice:  82, images: [], stock: 11 },
  { _id: '9', name: 'Fat Burner Pro', brand: 'DietTemple', category: 'brûleurs',         price: 175, uhPrice: 129, images: [], stock:  7 },
];
