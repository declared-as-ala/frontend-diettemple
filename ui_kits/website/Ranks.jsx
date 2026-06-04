/* global React */
const RANKS = [
  {
    n: '01', name: 'Initiate', badge: 'initiate', window: 'J0 — J30',
    body: 'L’arrivée. Mesure initiale. Premier protocole.',
    bullets: [
      'Scan de composition corporelle',
      'Objectif macros personnalisé',
      'Plan d’entraînement fondation',
      'Deux appels de coaching',
    ],
  },
  {
    n: '02', name: 'Fighter', badge: 'fighter', window: 'J30 — J90',
    body: 'La forge. Le protocole s’intensifie. Le mental durcit.',
    bullets: [
      'Split force + cardio',
      'Télémétrie sommeil & récupération',
      'Consultation hebdomadaire',
      'Scanner d’assiette débloqué',
    ],
  },
  {
    n: '03', name: 'Champion', badge: 'champion', window: 'J90 — J180',
    body: 'La discipline. Vous n’êtes plus la personne qui a commencé.',
    bullets: [
      'Périodisation de performance',
      'Stratégie nutritionnelle avancée',
      'Analyse corporelle approfondie',
      'Tarif membre sur les produits',
    ],
    accent: 'champagne',
  },
  {
    n: '04', name: 'Elite', badge: 'elite', window: 'J180+',
    body: 'L’ascension. Réservé à ceux qui ne s’arrêtent pas.',
    bullets: [
      'Protocole sur mesure',
      'Coach élite en 1:1',
      'Bilan physiologique annuel',
      'Invitation à la retraite société',
    ],
    accent: 'volt',
    featured: true,
  },
];

function Ranks() {
  return (
    <section className="dt-section dt-ranks" id="rangs">
      <div className="dt-container">
        <SectionHeader
          eyebrow="Les Rangs du Temple"
          title={<>Quatre rangs. <em>Une ascension.</em></>}
          kicker="Le parcours Ultimate Human n’est pas linéaire en intensité, mais absolument linéaire en direction. Chaque rang se gagne par la mesure, le coaching et la constance."
        />
        <div className="dt-ranks-grid">
          {RANKS.map((r) => (
            <article key={r.n} className={`dt-rank dt-rank-${r.accent || 'default'} ${r.featured ? 'is-featured' : ''} dt-reveal`}>
              <header className="dt-rank-head">
                <span className="dt-rank-n">{r.n}</span>
                <span className="dt-rank-win">{r.window}</span>
              </header>
              <div className="dt-rank-badge-wrap">
                <img className="dt-rank-badge" src={`../../assets/ranks/${r.badge}.png`} alt={`Rank ${r.name}`} />
                <div className="dt-rank-badge-halo" />
              </div>
              <h3 className="dt-rank-name">{r.name}</h3>
              <p className="dt-rank-body">{r.body}</p>
              <ul className="dt-rank-list">
                {r.bullets.map((b) => (
                  <li key={b}><i data-lucide="circle-dot"></i><span>{b}</span></li>
                ))}
              </ul>
              {r.featured && <div className="dt-rank-tag">Invitation Société</div>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Ranks = Ranks;
