import { Shield, Lock, ArrowUpRight, Phone } from 'lucide-react';

interface Props { onJoin: () => void; }

export default function FinalCta({ onJoin }: Props) {
  return (
    <section className="dt-section dt-final" id="rejoindre">
      <div className="dt-container">
        <div className="dt-final-stage dt-reveal">
          <div className="dt-final-glow" />
          <div className="dt-final-eyebrow">— L&apos;Invitation</div>
          <h2 className="dt-final-headline">
            Vous êtes à une<br />
            <em>décision</em><br />
            de la version<br />
            ultime.
          </h2>
          <p className="dt-final-sub">
            De devenir la version la plus forte de vous‑même. Le temple ne s&apos;ouvre pas deux fois.
          </p>
          <div className="dt-final-ctas">
            <button className="dt-btn dt-btn-primary dt-btn-lg" onClick={onJoin}>
              Rejoindre Ultimate Human <ArrowUpRight size={18} />
            </button>
            <a className="dt-btn dt-btn-ghost dt-btn-lg" href="tel:+21671000000">
              <Phone size={16} /> +216 71 000 000
            </a>
          </div>
          <div className="dt-final-meta">
            <span><Shield size={14} />Adhésion examinée chaque semaine</span>
            <span><Lock size={14} />Société protégée · admissions limitées</span>
          </div>
        </div>
      </div>
    </section>
  );
}
