'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck, ChevronRight } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { API_URL } from '@/lib/config';

export default function CartDrawer() {
  const { items, count, subtotal, deliveryFee, total, drawerOpen, closeDrawer, removeItem, updateQty } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeDrawer]);

  const resolveImg = (url: string | null) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `${API_URL.replace('/api', '')}${url}`;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`dt-drawer-back ${drawerOpen ? 'is-open' : ''}`}
        onClick={closeDrawer}
        aria-hidden
      />

      {/* Panel */}
      <aside className={`dt-drawer ${drawerOpen ? 'is-open' : ''}`} aria-label="Panier">
        {/* Header */}
        <div className="dt-drawer-head">
          <div className="dt-drawer-head-left">
            <ShoppingBag size={18} />
            <span className="dt-drawer-title">Mon Panier</span>
            {count > 0 && <span className="dt-drawer-badge">{count}</span>}
          </div>
          <button className="dt-drawer-close" onClick={closeDrawer} aria-label="Fermer">
            <X size={18} />
          </button>
        </div>

        {/* Delivery banner */}
        {subtotal > 0 && (
          <div className="dt-drawer-delivery-bar">
            <Truck size={13} />
            {subtotal >= 200
              ? <span><strong>Livraison offerte</strong> pour cette commande</span>
              : <span>Plus que <strong>{(200 - subtotal).toFixed(0)} TND</strong> pour la livraison offerte</span>
            }
          </div>
        )}

        {/* Items */}
        <div className="dt-drawer-body">
          {items.length === 0 ? (
            <div className="dt-drawer-empty">
              <ShoppingBag size={40} strokeWidth={1} />
              <p>Votre panier est vide.</p>
              <button className="dt-btn dt-btn-ghost" onClick={closeDrawer}>
                Découvrir les produits
              </button>
            </div>
          ) : (
            <ul className="dt-drawer-list">
              {items.map(item => {
                const img = resolveImg(item.image);
                return (
                  <li key={item.productId} className="dt-drawer-item">
                    <div className="dt-drawer-item-vis">
                      {img ? (
                        <Image src={img} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="72px" />
                      ) : (
                        <div className="dt-drawer-item-placeholder">
                          <span>{item.brand?.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="dt-drawer-item-info">
                      <div className="dt-drawer-item-brand">{item.brand}</div>
                      <div className="dt-drawer-item-name">{item.name}</div>
                      <div className="dt-drawer-item-price">
                        {(item.price * item.quantity).toFixed(0)}
                        <span className="dt-cur">TND</span>
                      </div>
                    </div>
                    <div className="dt-drawer-item-actions">
                      <div className="dt-drawer-qty">
                        <button
                          className="dt-drawer-qty-btn"
                          onClick={() => updateQty(item.productId, item.quantity - 1)}
                          aria-label="Moins"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="dt-drawer-qty-val">{item.quantity}</span>
                        <button
                          className="dt-drawer-qty-btn"
                          onClick={() => updateQty(item.productId, item.quantity + 1)}
                          aria-label="Plus"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        className="dt-drawer-rm"
                        onClick={() => removeItem(item.productId)}
                        aria-label="Supprimer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="dt-drawer-foot">
            <div className="dt-drawer-totals">
              <div className="dt-drawer-total-row">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(0)} TND</span>
              </div>
              <div className="dt-drawer-total-row">
                <span>Livraison</span>
                <span className={deliveryFee === 0 ? 'volt' : ''}>
                  {deliveryFee === 0 ? 'Offerte' : `${deliveryFee} TND`}
                </span>
              </div>
              <div className="dt-drawer-total-row is-total">
                <span>Total</span>
                <span>{total.toFixed(0)} <small>TND</small></span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="dt-btn dt-btn-primary dt-btn-lg dt-drawer-checkout"
              onClick={closeDrawer}
            >
              Commander <ArrowRight size={16} />
            </Link>
            <button className="dt-drawer-continue" onClick={closeDrawer}>
              Continuer mes achats <ChevronRight size={13} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
