/* global React */
const STEPS = [
  { n: '01', t: 'Rejoignez le Temple', d: 'Un entretien court. Objectifs, biométrie, antécédents.', icon: 'shield' },
  { n: '02', t: 'Recevez votre protocole', d: 'Plan diététique, entraînement et sommeil personnalisés.', icon: 'file-text' },
  { n: '03', t: 'Coaching hebdomadaire', d: '45 minutes avec votre coach. Tous les sept jours.', icon: 'video' },
  { n: '04', t: 'Analyse corporelle', d: 'Photo, poids, composition, performance examinés.', icon: 'scan-line' },
  { n: '05', t: 'Mise à jour protocole', d: 'Entraînement et nutrition évoluent avec les données.', icon: 'sliders-horizontal' },
  { n: '06', t: 'Ascension de rang', d: 'Gagnez le rang suivant. Initiate. Fighter. Champion. Elite.', icon: 'trending-up' },
];

function System() {
  return (
    <section className="dt-section dt-system" id="systeme">
      <div className="dt-container">
        <SectionHeader
          eyebrow="Le Système"
          title={<>Une boucle <em>hebdomadaire</em>. Six étapes.</>}
          kicker="DietTemple fonctionne comme une boucle de transformation déterministe. Mesurer, coacher, ajuster, ascensionner. La même boucle qui produit des athlètes olympiques, appliquée à vous."
        />
        <ol className="dt-system-loop">
          {STEPS.map((s, i) => (
            <li key={s.n} className="dt-system-step dt-reveal" style={{ '--i': i }}>
              <div className="dt-system-rail">
                <span className="dt-system-dot" />
                {i < STEPS.length - 1 && <span className="dt-system-line" />}
              </div>
              <div className="dt-system-card">
                <div className="dt-system-step-head">
                  <span className="dt-system-n">Étape {s.n}</span>
                  <i data-lucide={s.icon}></i>
                </div>
                <h3 className="dt-system-t">{s.t}</h3>
                <p className="dt-system-d">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

window.System = System;
