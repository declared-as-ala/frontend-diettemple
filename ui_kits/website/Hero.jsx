/* global React */
function CinematicSlot({ label, ratio = '21/9', tone = 'hero', children, style }) {
  return (
    <div className={`dt-cine dt-cine-${tone}`} style={{ aspectRatio: ratio, ...style }}>
      <div className="dt-cine-grade" />
      <div className="dt-cine-figure" aria-hidden="true" />
      <div className="dt-cine-grain" />
      {children}
      {label && <div className="dt-cine-label">— {label}</div>}
    </div>
  );
}

function Hero({ onJoin }) {
  return (
    <header className="dt-hero-section" id="top">
      <CinematicSlot
        label="Image · athlète solitaire · 21:9 · ombres froides"
        ratio="21/9"
        tone="hero"
        style={{ position: 'absolute', inset: 0, aspectRatio: 'auto', borderRadius: 0 }}
      >
        <div className="dt-hero-glow" />
        <div className="dt-hero-particles" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} style={{
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--s': `${Math.random() * 3 + 1}px`,
              '--d': `${Math.random() * 14 + 10}s`,
              '--delay': `${-Math.random() * 14}s`,
              '--o': Math.random() * 0.4 + 0.2,
            }} />
          ))}
        </div>
      </CinematicSlot>

      <div className="dt-hero-content dt-reveal">
        <div className="dt-hero-eyebrow">
          <span className="dt-pip" /> Ultimate Human Society · Est. 2025
        </div>
        <h1 className="dt-hero-headline">
          Devenez<br/>
          l’<em>ultimate</em><br/>
          human.
        </h1>
        <p className="dt-hero-sub">
          Une société de transformation. Nutrition scientifique, entraînement intelligent,
          coaching hebdomadaire, et une ascension par rangs : de <em>Initiate</em> à <em>Elite</em>.
          Votre version actuelle n’est qu’un brouillon.
        </p>
        <div className="dt-hero-ctas">
          <button className="dt-btn dt-btn-primary" onClick={onJoin}>
            Rejoindre Ultimate Human <i data-lucide="arrow-up-right"></i>
          </button>
          <a className="dt-btn dt-btn-ghost" href="#systeme">Découvrir le Système</a>
        </div>
        <div className="dt-hero-stats">
          <Stat n={<CountUp to="14200" />} l="Membres en ascension" />
          <Stat n={<><span>−</span><CountUp to="14.2" decimals={1} suffix=" %" /></>} l="Masse grasse moy. · 90 j" volt />
          <Stat n={<CountUp to="4" />} l="Rangs du Temple" />
          <Stat n={<CountUp to="01" format={(n) => String(n).padStart(2, '0')} />} l="Mise à jour hebdo" />
        </div>
      </div>

      <div className="dt-hero-scrollhint">
        <span>Défiler</span>
        <span className="dt-hero-scrollline" />
      </div>
    </header>
  );
}

function Stat({ n, l, volt }) {
  return (
    <div className="dt-hero-stat">
      <div className={`dt-hero-stat-n ${volt ? 'volt' : ''}`}>{n}</div>
      <div className="dt-hero-stat-l">{l}</div>
    </div>
  );
}

window.Hero = Hero;
window.CinematicSlot = CinematicSlot;
