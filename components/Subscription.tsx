import { Check, ShieldCheck, Users, Phone, ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

const PLANS = [
  {
    id: 'fondation', label: 'Fondation', tag: 'Initiate',
    accent: 'default',
    price: '590', per: 'TND / mois', commit: 'Engagement 3 mois',
    pitch: 'Pour démarrer la transformation. Tout l\'essentiel pour commencer correctement.',
    bullets: ['Bilan corporel initial', 'Plan nutrition personnalisé', 'Plan d\'entraînement personnalisé', '2 appels coaching / mois', 'Application mobile complète'],
  },
  {
    id: 'ascension', label: 'Ascension', tag: 'Fighter → Champion',
    accent: 'volt', featured: true,
    price: '990', per: 'TND / mois', commit: 'Engagement 6 mois',
    pitch: 'Notre formule la plus choisie. Le rythme idéal pour une transformation profonde.',
    bullets: ['Tout Fondation', 'Coaching hebdomadaire (4 / mois)', 'Scanner d\'assiette IA débloqué', 'Analyse corporelle bimensuelle', 'Tarif Membre sur tous les produits'],
  },
  {
    id: 'elite', label: 'Elite', tag: 'Elite',
    accent: 'champagne',
    price: 'Sur entretien', per: '', commit: 'Admission limitée',
    pitch: 'Pour les profils élite. Coach dédié, protocole sur mesure, accès retraite.',
    bullets: ['Tout Ascension', 'Coach élite en 1:1 dédié', 'Protocole 100% sur mesure', 'Bilan physiologique annuel', 'Invitation retraite Société'],
  },
];

interface Props { onJoin: () => void; }

export default function Subscription({ onJoin }: Props) {
  return (
    <section className="dt-section dt-sub" id="abonnement">
      <div className="dt-container">
        <SectionHeader
          eyebrow="L'Adhésion"
          title={<>Trois formules. <em>Une seule direction.</em></>}
          kicker="Toutes les formules incluent l'application, le coaching humain et l'ascension par rangs. Vous choisissez seulement la cadence et la profondeur."
        />
        <div className="dt-sub-grid">
          {PLANS.map((p) => (
            <article key={p.id} className={`dt-sub-card dt-sub-${p.accent} ${p.featured ? 'is-featured' : ''} dt-reveal`}>
              {p.featured && <div className="dt-sub-tag">Le plus choisi</div>}
              <header className="dt-sub-head">
                <div>
                  <div className="dt-sub-label">{p.label}</div>
                  <div className="dt-sub-tier">— {p.tag}</div>
                </div>
              </header>
              <div className="dt-sub-price">
                {p.price === 'Sur entretien' ? (
                  <span className="dt-sub-price-c">Sur entretien</span>
                ) : (
                  <>
                    <span className="dt-sub-price-n">{p.price}</span>
                    <span className="dt-sub-price-u">{p.per}</span>
                  </>
                )}
                <div className="dt-sub-commit">{p.commit}</div>
              </div>
              <p className="dt-sub-pitch">{p.pitch}</p>
              <ul className="dt-sub-list">
                {p.bullets.map((b) => (
                  <li key={b}><Check size={14} /><span>{b}</span></li>
                ))}
              </ul>
              <button
                className={`dt-btn ${p.featured ? 'dt-btn-primary' : 'dt-btn-ghost'}`}
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={onJoin}
              >
                Rejoindre · {p.label} <ArrowUpRight size={16} />
              </button>
            </article>
          ))}
        </div>
        <div className="dt-sub-foot dt-reveal">
          <span><ShieldCheck size={14} />Satisfaction garantie 14 jours</span>
          <span><Users size={14} />Admissions limitées chaque mois</span>
          <span><Phone size={14} />Conseiller dédié au +216 71 000 000</span>
        </div>
      </div>
    </section>
  );
}
