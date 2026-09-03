import Image from 'next/image';
import Link from 'next/link';

const COLS = [
  { t: 'Navigation', l: [{ t: 'Notre Mission', h: '/#mission' }, { t: 'Fondé sur la Science', h: '/#science' }, { t: 'Rejoindre UH', h: '/rejoindre' }] },
  { t: 'Boutique',   l: [{ t: 'Tous les Produits', h: '/produits' }, { t: 'Paniers & Commandes', h: '/checkout' }] },
  { t: 'Compte',     l: [{ t: 'Connexion Membre', h: '/connexion' }, { t: 'Support & FAQ', h: '/support' }] },
  { t: 'Légal',      l: [{ t: 'Politique de Confidentialité', h: '/privacy-policy' }, { t: 'Conditions Générales', h: '#' }] },
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
            <p className="dt-footer-tag">UH — Ultimate Human. Le premier système 100 % tunisien d&apos;entraînement et de nutrition fondé sur la science.</p>
            <div className="dt-footer-meta">DT · UH / Est. 2025</div>
          </div>
          <div className="dt-footer-cols">
            {COLS.map((c) => (
              <div key={c.t}>
                <div className="dt-footer-h">— {c.t}</div>
                <ul>
                  {c.l.map((x) => (
                    <li key={x.t}>
                      <Link href={x.h}>{x.t}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="dt-footer-bot">
          <div>© 2025 DietTemple — UH / Ultimate Human.</div>
          <div className="dt-footer-bot-r">
            <Link href="/privacy-policy">Confidentialité</Link>
            <span>CGU</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
