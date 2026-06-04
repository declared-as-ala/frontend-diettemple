/* global React */
function SectionHeader({ eyebrow, title, kicker, align = 'left' }) {
  return (
    <div className={`dt-sec-head dt-sec-head-${align} dt-reveal`}>
      <div className="dt-eyebrow">— {eyebrow}</div>
      <h2 className="dt-sec-title">{title}</h2>
      {kicker && <p className="dt-sec-kicker">{kicker}</p>}
    </div>
  );
}

function Movement() {
  return (
    <section className="dt-section dt-movement" id="mouvement">
      <div className="dt-container">
        <SectionHeader
          eyebrow="Le Mouvement"
          title={<>Une société d’humains qui refusent l’<em>ordinaire</em>.</>}
        />
        <div className="dt-movement-grid">
          <div className="dt-reveal">
            <p className="dt-editorial">
              "DietTemple n’est pas une salle de sport. C’est un temple de transformation —
              mesuré, ritualisé, conçu pour l’ascension."
            </p>
            <div className="dt-movement-figure">
              <CinematicSlot label="Modèle · 4:5 · contre‑jour" ratio="4/5" tone="portrait" />
            </div>
          </div>
          <div className="dt-movement-pillars">
            <Pillar n="01" t="Plans scientifiques" d="Macros, timing et entraînement dérivés de votre biologie — pas de templates génériques." />
            <Pillar n="02" t="Coaching personnalisé" d="Un coach analyse votre corps et votre mental tous les sept jours. Sans exception." />
            <Pillar n="03" t="Intelligence nutritionnelle" d="Scannez une assiette. Le protocole la lit, la pèse, ajuste la semaine." />
            <Pillar n="04" t="L’arc long" d="De douze à vingt‑quatre mois. Les rangs se gagnent, ils ne s’achètent pas." />
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillar({ n, t, d }) {
  return (
    <div className="dt-pillar dt-reveal">
      <div className="dt-pillar-n">{n}</div>
      <h3 className="dt-pillar-t">{t}</h3>
      <p className="dt-pillar-d">{d}</p>
    </div>
  );
}

window.Movement = Movement;
window.SectionHeader = SectionHeader;
