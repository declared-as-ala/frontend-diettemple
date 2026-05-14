'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Truck, CreditCard, CheckCircle, ShieldCheck, Package, ChevronDown, Loader } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JoinModal from '@/components/JoinModal';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/authContext';
import { API_URL } from '@/lib/config';

const GOVERNORATES: Record<string, string[]> = {
  'Tunis':           ['Tunis', 'Bab Bhar', 'Bab Souika', 'Cité El Khadra', 'El Kabaria', 'El Menzah', 'El Ouardia', 'Ettahrir', 'Ezzouhour', 'Hraïria', 'Jebel Jelloud', 'La Goulette', 'La Marsa', 'Le Bardo', 'Le Kram', 'Séjoumi', 'Sidi El Béchir', 'Sidi Hassine'],
  'Ariana':          ['Ariana Ville', 'Ettadhamen', 'Kalâat el-Andalous', 'La Soukra', 'Mnihla', 'Raoued', 'Sidi Thabet'],
  'Ben Arous':       ['Ben Arous', 'Bou Mhel el-Bassatine', 'El Mourouj', 'Ezzahra', 'Fouchana', 'Hammam Chott', 'Hammam Lif', 'Medina Jedida', 'Megrine', 'Mohamed Ali Annabi', 'Mohamedia', 'Mornag', 'Nouvelle Médina'],
  'Manouba':         ['Borj El Amri', 'Djedeida', 'El Battan', 'Manouba', 'Mornaguia', 'Oued Ellil', 'Tebourba', 'Douar Hicher'],
  'Nabeul':          ['Nabeul', 'Hammamet', 'Dar Chaabane', 'El Haouaria', 'Grombalia', 'Kelibia', 'Korba', 'Menzel Bouzelfa', 'Menzel Temime', 'Soliman', 'Takelsa'],
  'Zaghouan':        ['Zaghouan', 'Bir Mcherga', 'El Fahs', 'Enfidha', 'Hammamet', 'Nadhour'],
  'Bizerte':         ['Bizerte Nord', 'Bizerte Sud', 'Menzel Bourguiba', 'Menzel Jemil', 'Sejnane', 'Tinja', 'Utique'],
  'Béja':            ['Béja Nord', 'Béja Sud', 'Amdoun', 'Goubellat', 'Medjez el-Bab', 'Nefza', 'Téboursouk', 'Testour', 'Thibar'],
  'Jendouba':        ['Jendouba', 'Ain Draham', 'Bou Salem', 'Fernana', 'Ghardimaou', 'Oued Mliz', 'Tabarka'],
  'Le Kef':          ['Le Kef', 'Dahmani', 'El Ksour', 'Jerissa', 'Kalaat Sinane', 'Nebeur', 'Sakiet Sidi Youssef', 'Sers', 'Tajerouine'],
  'Siliana':         ['Siliana', 'Bou Arada', 'El Aroussa', 'Gaafour', 'Kesra', 'Makthar', 'Rouhia', 'Sidi Bou Rouis'],
  'Sousse':          ['Sousse', 'Akouda', 'Enfidha', 'Hammam Sousse', 'Hergla', 'Kalaa Kebira', 'Kalaa Seghira', 'Kondar', 'Msaken', 'Sidi Bou Ali', 'Sidi El Hani'],
  'Monastir':        ['Monastir', 'Bembla', 'Beni Hassen', 'Jemmal', 'Ksar Hellal', 'Ksibet el-Mediouni', 'Moknine', 'Ouerdanine', 'Sahline', 'Sayada-Lamta-Bou Hajar', 'Téboulba', 'Zeramdine'],
  'Mahdia':          ['Mahdia', 'Bekalta', 'Bou Merdes', 'Chebba', 'Chorbane', 'El Jem', 'Essouassi', 'Hebira', 'Ksour Essef', 'Melloulèche', 'Ouled Chamekh', 'Sidi Alouane'],
  'Sfax':            ['Sfax Ville', 'Sfax Ouest', 'Agareb', 'Bir Ali Ben Khalifa', 'El Amra', 'El Hencha', 'Graïba', 'Jebiniana', 'Kerkennah', 'Mahras', 'Menzel Chaker', 'Sakiet Eddaïer', 'Sakiet Ezzit', 'Skhira', 'Thyna'],
  'Kairouan':        ['Kairouan Nord', 'Kairouan Sud', 'Bouhajla', 'Chébika', 'Cherarda', 'El Alâa', 'Haffouz', 'Hajeb El Ayoun', 'Menzel Mhiri', 'Nasrallah', 'Oueslatia', 'Sbikha'],
  'Kasserine':       ['Kasserine Nord', 'Kasserine Sud', 'Ezzouhour', 'Feriana', 'Foussana', 'Hassi el-Frid', 'Hidra', 'Jedeliane', 'Majel Bel Abbès', 'Sbiba', 'Thala'],
  'Sidi Bouzid':     ['Sidi Bouzid', 'Ben Aoun', 'Bir El Hafey', 'Cebbala Ouled Asker', 'Jelma', 'Jilma', 'Mazzouna', 'Menzel Bouzaiane', 'Meknassy', 'Ouled Haffouz', 'Regueb', 'Souk Jedid'],
  'Gabès':           ['Gabès Ville', 'Gabès Médina', 'Gabès Ouest', 'El Hamma', 'Ghannouch', 'Mareth', 'Matmata', 'Menzel El Habib', 'Métouia', 'Nouvelle Matmata', 'Oudhref', 'Sommâa'],
  'Médenine':        ['Médenine', 'Ben Gardane', 'Beni Khedache', 'Djerba - Ajim', 'Djerba - Houmt Souk', 'Djerba - Midoun', 'Sidi Makhlouf', 'Zarzis'],
  'Tataouine':       ['Tataouine', 'Bir Lahmar', 'Dehiba', 'Ghomrassen', 'Remada', 'Smar'],
  'Gafsa':           ['Gafsa', 'Belkhir', 'El Guettar', 'El Ksar', 'Mdhila', 'Metlaoui', 'Moularès', 'Redeyef', 'Sened', 'Sidi Aïch'],
  'Tozeur':          ['Tozeur', 'Degache', 'Hazoua', 'Nefta', 'Tamerza'],
  'Kébili':          ['Kébili', 'Douz', 'El Faouar', 'Souk Lahad'],
};

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  delegation: string;
  notes: string;
  paymentMethod: 'CASH_ON_DELIVERY';
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();
  const { token } = useAuth();
  const [joinOpen, setJoinOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<FormData>({
    fullName: '', phone: '', email: '', street: '', city: 'Tunis', delegation: '', notes: '',
    paymentMethod: 'CASH_ON_DELIVERY',
  });

  // Redirect if cart is empty after hydration
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);
  useEffect(() => {
    if (hydrated && items.length === 0) router.replace('/produits');
  }, [hydrated, items.length, router]);

  const delegations = GOVERNORATES[form.city] ?? [];

  const set = (k: keyof FormData, v: string) => {
    setForm(prev => {
      const next = { ...prev, [k]: v };
      if (k === 'city') next.delegation = '';
      return next;
    });
  };

  const resolveImg = (url: string | null) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `${API_URL.replace('/api', '')}${url}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.delegation) { setError('Veuillez sélectionner une délégation.'); return; }
    setError('');
    setSubmitting(true);
    try {
      const payload = {
        items: items.map(i => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image ?? undefined,
        })),
        deliveryAddress: {
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          street: form.street,
          city: form.city,
          delegation: form.delegation,
          notes: form.notes || undefined,
        },
        subtotal,
        discount: 0,
        paymentMethod: form.paymentMethod,
      };
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`${API_URL}/orders/create`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur lors de la commande.');
      clearCart();
      router.push(`/checkout/succes?ref=${data.order.reference}&id=${data.order._id}`);
    } catch (err: any) {
      setError(err.message ?? 'Une erreur est survenue.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!hydrated || items.length === 0) return null;

  return (
    <>
      <Nav onJoin={() => setJoinOpen(true)} />
      <main className="dt-checkout-page">
        <div className="dt-container">
          <Link href="/produits" className="dt-shop-back" style={{ display: 'inline-flex', marginBottom: 32, marginTop: 100 }}>
            <span>←</span> Continuer mes achats
          </Link>

          <div className="dt-checkout-layout">
            {/* ── Left: Form ── */}
            <div className="dt-checkout-left">
              <h1 className="dt-checkout-title">Finaliser la commande</h1>

              <form onSubmit={handleSubmit} className="dt-checkout-form">
                {/* Contact */}
                <fieldset className="dt-checkout-section">
                  <legend className="dt-checkout-section-title">
                    <span className="dt-checkout-step-num">1</span>
                    Informations de contact
                  </legend>
                  <div className="dt-checkout-grid">
                    <div className="dt-field is-full">
                      <label className="dt-field-l">Nom et prénom <em>*</em></label>
                      <input type="text" required value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Ahmed Ben Salah" />
                    </div>
                    <div className="dt-field">
                      <label className="dt-field-l">Téléphone <em>*</em></label>
                      <input type="tel" required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="XX XXX XXX" />
                    </div>
                    <div className="dt-field">
                      <label className="dt-field-l">Email <em>*</em></label>
                      <input type="email" required value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@exemple.com" />
                    </div>
                  </div>
                </fieldset>

                {/* Address */}
                <fieldset className="dt-checkout-section">
                  <legend className="dt-checkout-section-title">
                    <span className="dt-checkout-step-num">2</span>
                    Adresse de livraison
                  </legend>
                  <div className="dt-checkout-grid">
                    <div className="dt-field is-full">
                      <label className="dt-field-l">Adresse <em>*</em></label>
                      <input type="text" required value={form.street} onChange={e => set('street', e.target.value)} placeholder="Rue, numéro, immeuble…" />
                    </div>
                    <div className="dt-field">
                      <label className="dt-field-l">Gouvernorat <em>*</em></label>
                      <div className="dt-select-wrap">
                        <select required value={form.city} onChange={e => set('city', e.target.value)}>
                          {Object.keys(GOVERNORATES).map(g => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="dt-select-arrow" />
                      </div>
                    </div>
                    <div className="dt-field">
                      <label className="dt-field-l">Délégation <em>*</em></label>
                      <div className="dt-select-wrap">
                        <select required value={form.delegation} onChange={e => set('delegation', e.target.value)}>
                          <option value="">Sélectionner…</option>
                          {delegations.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <ChevronDown size={14} className="dt-select-arrow" />
                      </div>
                    </div>
                    <div className="dt-field is-full">
                      <label className="dt-field-l">Instructions (optionnel)</label>
                      <input type="text" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Précisions pour la livraison…" />
                    </div>
                  </div>
                </fieldset>

                {/* Payment */}
                <fieldset className="dt-checkout-section">
                  <legend className="dt-checkout-section-title">
                    <span className="dt-checkout-step-num">3</span>
                    Mode de paiement
                  </legend>
                  <label className="dt-pay-option is-selected">
                    <div className="dt-pay-option-left">
                      <div className="dt-pay-radio is-checked" />
                      <div>
                        <div className="dt-pay-option-name">Paiement à la livraison</div>
                        <div className="dt-pay-option-desc">Réglez en espèces à la réception de votre colis.</div>
                      </div>
                    </div>
                    <Truck size={20} className="dt-pay-icon" />
                  </label>
                  <div className="dt-pay-soon">
                    <CreditCard size={14} />
                    Paiement en ligne bientôt disponible
                  </div>
                </fieldset>

                {error && (
                  <div className="dt-checkout-error">{error}</div>
                )}

                <button type="submit" className="dt-btn dt-btn-primary dt-btn-lg dt-checkout-submit" disabled={submitting}>
                  {submitting
                    ? <><Loader size={16} className="dt-spin" /> Traitement…</>
                    : <><CheckCircle size={16} /> Confirmer la commande — {total.toFixed(0)} TND</>
                  }
                </button>

                <div className="dt-checkout-trust">
                  <span><ShieldCheck size={13} /> Commande sécurisée</span>
                  <span><Truck size={13} /> Livraison sous 2–5 jours</span>
                  <span><Package size={13} /> Retours acceptés</span>
                </div>
              </form>
            </div>

            {/* ── Right: Summary ── */}
            <aside className="dt-checkout-right">
              <div className="dt-checkout-summary">
                <h2 className="dt-checkout-summary-title">Récapitulatif</h2>
                <ul className="dt-checkout-items">
                  {items.map(item => {
                    const img = resolveImg(item.image);
                    return (
                      <li key={item.productId} className="dt-checkout-item">
                        <div className="dt-checkout-item-vis">
                          {img
                            ? <Image src={img} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="60px" />
                            : <div className="dt-checkout-item-ph">{item.brand?.charAt(0)}</div>
                          }
                          <span className="dt-checkout-item-qty">{item.quantity}</span>
                        </div>
                        <div className="dt-checkout-item-info">
                          <div className="dt-checkout-item-name">{item.name}</div>
                          <div className="dt-checkout-item-brand">{item.brand}</div>
                        </div>
                        <div className="dt-checkout-item-price">
                          {(item.price * item.quantity).toFixed(0)}<span className="dt-cur">TND</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="dt-checkout-totals">
                  <div className="dt-checkout-total-row">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(0)} TND</span>
                  </div>
                  <div className="dt-checkout-total-row">
                    <span>Livraison</span>
                    <span className={deliveryFee === 0 ? 'volt' : ''}>
                      {deliveryFee === 0 ? 'Offerte ✓' : `${deliveryFee} TND`}
                    </span>
                  </div>
                  <div className="dt-checkout-total-row is-grand">
                    <span>Total</span>
                    <span>{total.toFixed(0)} <small>TND</small></span>
                  </div>
                </div>
                {deliveryFee > 0 && (
                  <div className="dt-checkout-free-hint">
                    Ajoutez {(200 - subtotal).toFixed(0)} TND pour la livraison offerte
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      {joinOpen && <JoinModal open={joinOpen} onClose={() => setJoinOpen(false)} />}
    </>
  );
}
