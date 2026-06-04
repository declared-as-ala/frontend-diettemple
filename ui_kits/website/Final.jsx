/* global React */
function FinalCta({ onJoin }) {
  return (
    <section className="dt-section dt-final" id="rejoindre">
      <div className="dt-container">
        <div className="dt-final-stage dt-reveal">
          <div className="dt-final-glow" />
          <div className="dt-final-eyebrow">— L’Invitation</div>
          <h2 className="dt-final-headline">
            Vous êtes à une<br/>
            <em>décision</em><br/>
            de la version<br/>
            ultime.
          </h2>
          <p className="dt-final-sub">
            De devenir la version la plus forte de vous‑même. Le temple ne s’ouvre pas deux fois.
          </p>
          <div className="dt-final-ctas">
            <button className="dt-btn dt-btn-primary dt-btn-lg" onClick={onJoin}>
              Rejoindre Ultimate Human <i data-lucide="arrow-up-right"></i>
            </button>
            <a className="dt-btn dt-btn-ghost dt-btn-lg" href="tel:+21671000000">
              <i data-lucide="phone"></i> +216 71 000 000
            </a>
          </div>
          <div className="dt-final-meta">
            <span><i data-lucide="shield"></i>Adhésion examinée chaque semaine</span>
            <span><i data-lucide="lock"></i>Société protégée · admissions limitées</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { t: 'Système',     l: ['Le Mouvement', 'Le Système', 'Les Rangs', 'Coaching'] },
    { t: 'Instrument',  l: ['Application mobile', 'Scanner d’assiette', 'Analyse corporelle', 'Récupération'] },
    { t: 'Société',     l: ['Devenir Membre', 'Tarif Membre', 'Retraites', 'Témoignages'] },
    { t: 'Temple',      l: ['Manifeste', 'Coachs', 'Presse', 'Contact'] },
  ];
  return (
    <footer className="dt-footer">
      <div className="dt-container">
        <div className="dt-footer-top">
          <div className="dt-footer-brand">
            <div className="dt-brand">
              <img src="../../assets/logo.webp" alt="" />
              <span>Diet<em>Temple</em></span>
            </div>
            <p className="dt-footer-tag">Une société élite de transformation pour humains qui refusent d’être ordinaires.</p>
            <div className="dt-footer-meta">DT · UHS / Est. 2025</div>
          </div>
          <div className="dt-footer-cols">
            {cols.map((c) => (
              <div key={c.t}>
                <div className="dt-footer-h">— {c.t}</div>
                <ul>{c.l.map((x) => <li key={x}><a href="#">{x}</a></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <div className="dt-footer-bot">
          <div>© 2025 DietTemple — Ultimate Human Society.</div>
          <div className="dt-footer-bot-r">
            <span>Confidentialité</span><span>CGU</span><span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.FinalCta = FinalCta;
window.Footer = Footer;
