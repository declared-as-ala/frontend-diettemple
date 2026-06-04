import Image from 'next/image';

const COLS = [
  { t: 'Système',    l: ['Le Mouvement', 'Le Système', 'Les Rangs', 'Coaching'] },
  { t: 'Instrument', l: ['Application mobile', 'Scanner d\'assiette', 'Analyse corporelle', 'Récupération'] },
  { t: 'Société',    l: ['Devenir Membre', 'Tarif Membre', 'Retraites', 'Témoignages'] },
  { t: 'Temple',     l: ['Manifeste', 'Coachs', 'Presse', 'Contact'] },
];

export default function Footer() {
  return (
    <footer className="dt-footer">
      <div className="dt-container">
        <div className="dt-footer-top">
          <div className="dt-footer-brand">
            <div className="dt-brand">
              <Image src="/logo.webp" alt="DietTemple" width={26} height={26} />
              <span>Diet<em>Temple</em></span>
            </div>
            <p className="dt-footer-tag">Une société élite de transformation pour humains qui refusent d&apos;être ordinaires.</p>
            <div className="dt-footer-meta">DT · UHS / Est. 2025</div>
          </div>
          <div className="dt-footer-cols">
            {COLS.map((c) => (
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
