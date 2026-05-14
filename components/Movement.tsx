import SectionHeader from './SectionHeader';
import CinematicSlot from './CinematicSlot';

function Pillar({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="dt-pillar dt-reveal">
      <div className="dt-pillar-n">{n}</div>
      <h3 className="dt-pillar-t">{t}</h3>
      <p className="dt-pillar-d">{d}</p>
    </div>
  );
}

export default function Movement() {
  return (
    <section className="dt-section dt-movement" id="mouvement">
      <div className="dt-container">
        <SectionHeader
          eyebrow="Le Mouvement"
          title={<>Une société d&apos;humains qui refusent l&apos;<em>ordinaire</em>.</>}
        />
        <div className="dt-movement-grid">
          <div className="dt-reveal">
            <p className="dt-editorial">
              &ldquo;DietTemple n&apos;est pas une salle de sport. C&apos;est un temple de transformation —
              mesuré, ritualisé, conçu pour l&apos;ascension.&rdquo;
            </p>
            <div className="dt-movement-figure">
              <CinematicSlot label="Modèle · 4:5 · contre‑jour" ratio="4/5" tone="portrait" />
            </div>
          </div>
          <div className="dt-movement-pillars">
            <Pillar n="01" t="Plans scientifiques" d="Macros, timing et entraînement dérivés de votre biologie — pas de templates génériques." />
            <Pillar n="02" t="Coaching personnalisé" d="Un coach analyse votre corps et votre mental tous les sept jours. Sans exception." />
            <Pillar n="03" t="Intelligence nutritionnelle" d="Scannez une assiette. Le protocole la lit, la pèse, ajuste la semaine." />
            <Pillar n="04" t="L&apos;arc long" d="De douze à vingt‑quatre mois. Les rangs se gagnent, ils ne s&apos;achètent pas." />
          </div>
        </div>
      </div>
    </section>
  );
}
