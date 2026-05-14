'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingCart, Check, Zap, Lock, Shield, Truck, RefreshCw, Star, ChevronRight, Minus, Plus } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JoinModal from '@/components/JoinModal';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/authContext';
import { API_URL } from '@/lib/config';
import { type Product, CATEGORY_ICONS, resolveImg } from '../page';

function ProductDetailSkeleton() {
  return (
    <div className="dt-pd-layout">
      <div className="dt-pd-gallery">
        <div className="dt-skeleton" style={{ width: '100%', aspectRatio: '1', borderRadius: 20 }} />
      </div>
      <div className="dt-pd-info" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="dt-skeleton" style={{ height: 12, width: '30%', borderRadius: 4 }} />
        <div className="dt-skeleton" style={{ height: 40, width: '85%', borderRadius: 8 }} />
        <div className="dt-skeleton" style={{ height: 18, width: '55%', borderRadius: 4 }} />
        <div className="dt-skeleton" style={{ height: 80, borderRadius: 10, marginTop: 8 }} />
        <div className="dt-skeleton" style={{ height: 54, borderRadius: 12, marginTop: 8 }} />
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router  = useRouter();
  const { addItem, items, updateQty } = useCart();
  const { isLoggedIn, hasSubscription } = useAuth();
  const [product, setProduct]   = useState<Product | null>(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [added,   setAdded]     = useState(false);
  const [qty,     setQty]       = useState(1);
  const [joinOpen, setJoinOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/products/${id}`)
      .then(r => r.json())
      .then(d => {
        if (d.product) { setProduct(d.product); }
        else { setNotFound(true); }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (notFound) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--bone)' }}>Produit introuvable</h1>
        <Link href="/produits" className="dt-btn dt-btn-ghost">← Retour à la boutique</Link>
      </div>
    );
  }

  const discountPrice = product?.discount
    ? Math.round((product.price) * (1 - product.discount / 100))
    : null;
  const memberPrice    = product?.uhPrice ?? null;
  const effectivePrice = discountPrice ?? (product?.price ?? 0);
  const savePct = memberPrice && product
    ? Math.round(((product.price - memberPrice) / product.price) * 100)
    : (product?.discount ?? 0);

  const images = product?.images?.length ? product.images : [];
  const mainImg = resolveImg(images[activeImg] ?? null, API_URL);
  const catIcon = product ? (CATEGORY_ICONS[product.category?.toLowerCase()] ?? '📦') : '';

  const inCart = items.find(i => i.productId === id);
  const outOfStock = product?.stock === 0;

  const handleAdd = () => {
    if (!product) return;
    addItem({
      productId: product._id,
      name: product.name,
      brand: product.brand,
      price: effectivePrice,
      memberPrice: memberPrice,
      image: resolveImg(images[0] ?? null, API_URL),
    });
    // bump qty if already in cart
    if (inCart && qty > 1) updateQty(product._id, (inCart.quantity ?? 1) + qty - 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Nav onJoin={() => setJoinOpen(true)} />

      <main className="dt-pd-page">
        <div className="dt-container">
          {/* Breadcrumb */}
          <nav className="dt-pd-breadcrumb">
            <Link href="/">Accueil</Link>
            <ChevronRight size={12} />
            <Link href="/produits">Boutique</Link>
            {product && <><ChevronRight size={12} /><span>{product.name}</span></>}
          </nav>

          {loading ? (
            <ProductDetailSkeleton />
          ) : product ? (
            <div className="dt-pd-layout">
              {/* ── Gallery ── */}
              <div className="dt-pd-gallery">
                <div className="dt-pd-main-img">
                  <div className="dt-pd-img-glow" />
                  {mainImg ? (
                    <Image src={mainImg} alt={product.name} fill style={{ objectFit: 'contain' }} sizes="(max-width:900px) 100vw, 50vw" priority />
                  ) : (
                    <div className="dt-pd-no-img">
                      <div className="dt-pd-tube">
                        <div className="dt-pd-tube-cap" />
                        <div className="dt-pd-tube-body">
                          <span className="dt-pd-tube-brand">{product.brand}</span>
                          <span className="dt-pd-tube-name">{product.name}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {savePct > 0 && <div className="dt-pd-save-badge">−{savePct}%</div>}
                </div>
                {images.length > 1 && (
                  <div className="dt-pd-thumbs">
                    {images.map((img, i) => {
                      const thumb = resolveImg(img, API_URL);
                      return (
                        <button key={i} className={`dt-pd-thumb ${i === activeImg ? 'is-active' : ''}`} onClick={() => setActiveImg(i)}>
                          {thumb && <Image src={thumb} alt="" fill style={{ objectFit: 'cover' }} sizes="72px" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ── Info ── */}
              <div className="dt-pd-info">
                {/* Category + brand */}
                <div className="dt-pd-meta">
                  <span className="dt-pd-cat">{catIcon} {product.category}</span>
                  <span className="dt-pd-brand-tag">{product.brand}</span>
                </div>

                <h1 className="dt-pd-title">{product.name}</h1>

                {product.rating && (
                  <div className="dt-pd-rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill={i < Math.round(product.rating!) ? 'currentColor' : 'none'} />
                    ))}
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                )}

                {/* Prices */}
                <div className="dt-pd-prices">
                  {isLoggedIn && hasSubscription && memberPrice ? (
                    <div className="dt-pd-price-block">
                      <div className="dt-pd-price-row">
                        <span className="dt-pd-price-was">{product.price} TND</span>
                        <span className="dt-pd-price-now member">{memberPrice} <small>TND</small></span>
                      </div>
                      <div className="dt-pd-uh-active">
                        <Zap size={12} /> Tarif Membre UH appliqué — économisez {product.price - memberPrice} TND
                      </div>
                    </div>
                  ) : memberPrice ? (
                    <div className="dt-pd-price-block">
                      <div className="dt-pd-price-row">
                        <span className="dt-pd-price-now">{effectivePrice} <small>TND</small></span>
                      </div>
                      <button className="dt-pd-uh-locked" onClick={() => setJoinOpen(true)}>
                        <Lock size={11} /> Tarif Membre UH : <strong>{memberPrice} TND</strong> — Rejoindre →
                      </button>
                    </div>
                  ) : (
                    <div className="dt-pd-price-block">
                      <span className="dt-pd-price-now">{effectivePrice} <small>TND</small></span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <p className="dt-pd-desc">{product.description}</p>
                )}

                {/* Stock */}
                <div className="dt-pd-stock">
                  {outOfStock ? (
                    <span className="dt-pd-stock-out">Rupture de stock</span>
                  ) : product.stock <= 10 ? (
                    <span className="dt-pd-stock-low">Plus que {product.stock} en stock</span>
                  ) : (
                    <span className="dt-pd-stock-ok">En stock</span>
                  )}
                </div>

                {/* Qty + Add to cart */}
                {!outOfStock && (
                  <div className="dt-pd-actions">
                    <div className="dt-pd-qty">
                      <button className="dt-pd-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}><Minus size={14} /></button>
                      <span className="dt-pd-qty-val">{qty}</span>
                      <button className="dt-pd-qty-btn" onClick={() => setQty(q => Math.min(product.stock, q + 1))}><Plus size={14} /></button>
                    </div>
                    <button
                      className={`dt-btn dt-btn-lg dt-pd-add ${added ? 'dt-prod-cta--added' : 'dt-btn-primary'}`}
                      onClick={handleAdd}
                    >
                      {added
                        ? <><Check size={16} /> Ajouté au panier !</>
                        : <><ShoppingCart size={16} /> Ajouter au panier</>
                      }
                    </button>
                  </div>
                )}

                {/* Trust */}
                <div className="dt-pd-trust">
                  <div className="dt-pd-trust-item"><Shield size={14} /><span>Paiement sécurisé</span></div>
                  <div className="dt-pd-trust-item"><Truck size={14} /><span>Livraison 2–5 jours</span></div>
                  <div className="dt-pd-trust-item"><RefreshCw size={14} /><span>Retours acceptés</span></div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Back link */}
          <div style={{ marginTop: 48 }}>
            <button className="dt-btn dt-btn-ghost" onClick={() => router.back()}>
              <ArrowLeft size={15} /> Retour à la boutique
            </button>
          </div>
        </div>
      </main>

      <Footer />
      {joinOpen && <JoinModal open={joinOpen} onClose={() => setJoinOpen(false)} />}
    </>
  );
}
