'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, Truck, Phone, ArrowRight, Download, Home } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JoinModal from '@/components/JoinModal';
import { API_URL } from '@/lib/config';

interface OrderDetail {
  reference: string;
  totalPrice: number;
  deliveryAddress: {
    fullName: string;
    phone: string;
    city: string;
    delegation: string;
  };
  items: { name: string; quantity: number; price: number }[];
  status: string;
  createdAt: string;
}

export default function SuccesPage() {
  const params = useSearchParams();
  const ref  = params.get('ref') ?? '';
  const id   = params.get('id') ?? '';
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [joinOpen, setJoinOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/orders/${id}`)
      .then(r => r.json())
      .then(d => { if (d.order) setOrder(d.order); })
      .catch(() => {});
  }, [id]);

  return (
    <>
      <Nav onJoin={() => setJoinOpen(true)} />
      <main className="dt-success-page">
        <div className="dt-container">

          {/* Hero checkmark */}
          <div className="dt-success-hero">
            <div className="dt-success-mark">
              <CheckCircle size={48} strokeWidth={1.5} />
            </div>
            <div className="dt-success-eyebrow">Commande confirmée</div>
            <h1 className="dt-success-title">Merci pour votre commande !</h1>
            {ref && (
              <div className="dt-success-ref">
                Référence : <strong>{ref}</strong>
              </div>
            )}
            <p className="dt-success-sub">
              Vous recevrez un appel de confirmation avant la livraison.
              Votre colis sera livré sous <strong>2 à 5 jours ouvrables</strong>.
            </p>
          </div>

          <div className="dt-success-layout">
            {/* Steps */}
            <div className="dt-success-steps">
              <h2 className="dt-success-section-title">Prochaines étapes</h2>
              <div className="dt-success-step">
                <div className="dt-success-step-icon">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="dt-success-step-name">Appel de confirmation</div>
                  <div className="dt-success-step-desc">Notre équipe vous contactera pour confirmer votre commande et votre adresse.</div>
                </div>
              </div>
              <div className="dt-success-step">
                <div className="dt-success-step-icon">
                  <Package size={18} />
                </div>
                <div>
                  <div className="dt-success-step-name">Préparation</div>
                  <div className="dt-success-step-desc">Votre commande est préparée avec soin et emballée pour la livraison.</div>
                </div>
              </div>
              <div className="dt-success-step">
                <div className="dt-success-step-icon">
                  <Truck size={18} />
                </div>
                <div>
                  <div className="dt-success-step-name">Livraison à domicile</div>
                  <div className="dt-success-step-desc">Paiement à la réception en espèces. Sous 2 à 5 jours ouvrables.</div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            {order && (
              <div className="dt-success-summary">
                <h2 className="dt-success-section-title">Détail de la commande</h2>
                <div className="dt-success-summary-card">
                  <div className="dt-success-summary-address">
                    <div className="dt-success-summary-label">Livraison à</div>
                    <div className="dt-success-summary-val">
                      {order.deliveryAddress.fullName}<br />
                      {order.deliveryAddress.delegation}, {order.deliveryAddress.city}<br />
                      <span style={{ color: 'var(--bone-3)', fontSize: 13 }}>{order.deliveryAddress.phone}</span>
                    </div>
                  </div>
                  <ul className="dt-success-items">
                    {order.items.map((it, i) => (
                      <li key={i} className="dt-success-item">
                        <span>{it.name} × {it.quantity}</span>
                        <span>{(it.price * it.quantity).toFixed(0)} TND</span>
                      </li>
                    ))}
                  </ul>
                  <div className="dt-success-grand">
                    <span>Total</span>
                    <span className="volt">{order.totalPrice.toFixed(0)} TND</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="dt-success-actions">
            <Link href="/produits" className="dt-btn dt-btn-ghost dt-btn-lg">
              <ArrowRight size={16} /> Continuer mes achats
            </Link>
            <Link href="/" className="dt-btn dt-btn-primary dt-btn-lg">
              <Home size={16} /> Retour à l&apos;accueil
            </Link>
          </div>

          {/* Upsell */}
          <div className="dt-success-upsell">
            <div className="dt-success-upsell-inner">
              <div className="dt-success-upsell-text">
                <div className="dt-eyebrow" style={{ marginBottom: 10 }}>Prochaine étape</div>
                <h3 className="dt-success-upsell-title">Maximisez vos résultats avec <em>Ultimate Human</em></h3>
                <p className="dt-success-upsell-sub">Coaching nutritionnel, plans d&apos;entraînement sur mesure, et tarif membre sur toute la boutique.</p>
              </div>
              <button className="dt-btn dt-btn-primary dt-btn-lg" onClick={() => setJoinOpen(true)}>
                Rejoindre Ultimate Human <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </main>
      <Footer />
      {joinOpen && <JoinModal open={joinOpen} onClose={() => setJoinOpen(false)} />}
    </>
  );
}
