/* global React */
function Society() {
  return (
    <section className="dt-section dt-society" id="societe">
      <div className="dt-container">
        <SectionHeader
          eyebrow="La Société"
          title={<>Pas une communauté. Une <em>société</em>.</>}
        />
        <div className="dt-society-stats dt-reveal">
          <SocStat n={<CountUp to="14200" />} l="Membres actifs" />
          <SocStat n={<><span>−</span><CountUp to="14.2" decimals={1} suffix=" %" /></>} l="Perte de gras moy. · 90 j" volt />
          <SocStat n={<><CountUp to="612" /><span> k</span></>} l="Mises à jour / an" />
          <SocStat n={<CountUp to="98.7" decimals={1} suffix=" %" />} l="Rétention vers Fighter" />
        </div>
        <div className="dt-society-grid">
          <Testimonial
            name="Yasmine A." rank="03 · Champion"
            quote="Je n’ai pas perdu du poids. J’ai reconstruit le système d’exploitation de mon corps."
          />
          <Testimonial
            name="Karim D." rank="04 · Elite"
            quote="L’appel hebdomadaire est la réunion la plus importante de mon agenda. Au‑dessus du bureau."
            featured
          />
          <Testimonial
            name="Léa M." rank="02 · Fighter"
            quote="Trois mois. Mon coach connaît ma biologie mieux que mon médecin traitant."
          />
        </div>
      </div>
    </section>
  );
}

function SocStat({ n, l, volt }) {
  return (
    <div className="dt-soc-stat">
      <div className={`dt-soc-stat-n ${volt ? 'volt' : ''}`}>{n}</div>
      <div className="dt-soc-stat-l">— {l}</div>
    </div>
  );
}

function Testimonial({ name, rank, quote, featured }) {
  return (
    <article className={`dt-testimonial ${featured ? 'is-featured' : ''} dt-reveal`}>
      <div className="dt-test-q">"{quote}"</div>
      <footer className="dt-test-foot">
        <div className="dt-test-avatar">{name.split(' ').map((s) => s[0]).join('')}</div>
        <div>
          <div className="dt-test-name">{name}</div>
          <div className="dt-test-rank">{rank}</div>
        </div>
      </footer>
    </article>
  );
}

window.Society = Society;
