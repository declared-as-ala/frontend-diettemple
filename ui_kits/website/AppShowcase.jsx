/* global React */
const { useEffect: useEffect_A, useState: useState_A, useRef: useRef_A } = React;

/* ---------- shared phone wrapper ---------- */
function PhoneFrame({ children, tilt = 0, className = '', style }) {
  return (
    <div className={`dt-phone ${className}`} style={{ '--tilt': `${tilt}deg`, ...(style || {}) }}>
      <div className="dt-phone-bezel">
        <div className="dt-phone-screen">
          <div className="dt-phone-notch" />
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---------- mini app screens (5) ---------- */

function ScreenDashboard() {
  return (
    <div className="dt-app-screen">
      <div className="dt-app-statusbar"><span>9:41</span><span className="dt-app-statusbar-r"><span>●●●●</span></span></div>
      <div className="dt-app-hdr">
        <div>
          <div className="dt-app-eb">Rang 03 · Champion</div>
          <div className="dt-app-hdr-name">Sahil.</div>
        </div>
        <div className="dt-app-avatar">SK</div>
      </div>
      <div className="dt-app-ring">
        <svg viewBox="0 0 120 120" width="120" height="120">
          <circle cx="60" cy="60" r="52" stroke="rgba(255,255,255,.08)" strokeWidth="6" fill="none" />
          <circle cx="60" cy="60" r="52" stroke="#C8FF3D" strokeWidth="6" fill="none" strokeDasharray="326" strokeDashoffset="68" strokeLinecap="round" transform="rotate(-90 60 60)" style={{ filter: 'drop-shadow(0 0 6px rgba(200,255,61,.5))' }} />
        </svg>
        <div className="dt-app-ring-c">
          <div className="dt-app-ring-num">79<span>%</span></div>
          <div className="dt-app-ring-lbl">Jour</div>
        </div>
      </div>
      <div className="dt-app-row">
        <Mini lbl="Protéines" v="142" u="g" pct="71%" />
        <Mini lbl="kcal" v="2 040" pct="86%" />
      </div>
      <div className="dt-app-row">
        <Mini lbl="Pas" v="11 420" />
        <Mini lbl="Sommeil" v="7:24" />
      </div>
    </div>
  );
}

function Mini({ lbl, v, u, pct }) {
  return (
    <div className="dt-app-metric">
      <div className="dt-app-metric-lbl">{lbl}</div>
      <div className="dt-app-metric-v">{v}{u && <span>{u}</span>}</div>
      {pct && <div className="dt-app-metric-bar"><span style={{ width: pct }} /></div>}
    </div>
  );
}

function ScreenScanner() {
  return (
    <div className="dt-app-screen dt-app-screen-dark">
      <div className="dt-app-statusbar"><span>9:41</span><span className="dt-app-statusbar-r"><span>●●●●</span></span></div>
      <div className="dt-app-scan-head">
        <i data-lucide="x"></i><span>Scanner une assiette</span><i data-lucide="zap"></i>
      </div>
      <div className="dt-app-scan-frame">
        <div className="dt-app-scan-target" />
        <div className="dt-app-scan-line" />
        <div className="dt-app-scan-meta">— ANALYSE · 6 éléments</div>
      </div>
      <div className="dt-app-scan-card">
        <div className="dt-app-scan-card-h">
          <div>
            <div className="dt-app-scan-card-eb">Détecté</div>
            <div className="dt-app-scan-card-t">Poulet grillé + bol quinoa</div>
          </div>
          <div className="dt-app-scan-card-cal">612<span>kcal</span></div>
        </div>
        <div className="dt-app-scan-card-macros">
          <div className="dt-app-macro"><div className="dt-app-macro-bar" style={{ background: '#C8FF3D' }} /><div className="dt-app-macro-l">P</div><div className="dt-app-macro-v">58g</div></div>
          <div className="dt-app-macro"><div className="dt-app-macro-bar" style={{ background: '#D8C9A3' }} /><div className="dt-app-macro-l">C</div><div className="dt-app-macro-v">46g</div></div>
          <div className="dt-app-macro"><div className="dt-app-macro-bar" style={{ background: '#B8B5AB' }} /><div className="dt-app-macro-l">L</div><div className="dt-app-macro-v">22g</div></div>
        </div>
      </div>
    </div>
  );
}

function ScreenReels() {
  return (
    <div className="dt-app-screen" style={{ padding: '36px 12px 12px', gap: 8 }}>
      <div className="dt-app-statusbar" style={{ padding: '0 6px' }}><span>9:41</span><span className="dt-app-statusbar-r"><span>●●●●</span></span></div>
      <div className="dt-reels">
        <div className="dt-reels-card">
          <div className="dt-reels-bg" style={{ background: 'radial-gradient(60% 40% at 50% 30%, rgba(200,255,61,.25), transparent 60%), linear-gradient(180deg, #1a1f2a 0%, #05060a 100%)' }} />
          <div className="dt-reels-fig" />
          <div className="dt-reels-top">
            <span className="dt-reels-counter">02 / 14</span>
            <span className="dt-reels-mute"><i data-lucide="volume-x"></i></span>
          </div>
          <button className="dt-reels-play"><i data-lucide="play"></i></button>
          <div className="dt-reels-meta">
            <div className="dt-reels-eb">— Démo de forme</div>
            <div className="dt-reels-t">Bench press · retraction scapulaire</div>
            <div className="dt-reels-sub">Coach Nina · 38 s</div>
          </div>
          <div className="dt-reels-actions">
            <button><i data-lucide="heart"></i><span>2.4k</span></button>
            <button><i data-lucide="message-circle"></i><span>83</span></button>
            <button><i data-lucide="bookmark"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenCompare() {
  const [pos, setPos] = useState_A(50);
  return (
    <div className="dt-app-screen" style={{ gap: 10 }}>
      <div className="dt-app-statusbar"><span>9:41</span><span className="dt-app-statusbar-r"><span>●●●●</span></span></div>
      <div style={{ padding: '4px 4px 0' }}>
        <div className="dt-app-eb" style={{ color: 'var(--volt)' }}>— Évolution corporelle</div>
        <div className="dt-app-hdr-name" style={{ fontSize: 20 }}>−12,6 % gras<br/>+3,2 kg lean</div>
      </div>
      <div
        className="dt-compare"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setPos(Math.max(8, Math.min(92, ((e.clientX - r.left) / r.width) * 100)));
        }}
        onTouchMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const x = e.touches[0].clientX;
          setPos(Math.max(8, Math.min(92, ((x - r.left) / r.width) * 100)));
        }}
      >
        <div className="dt-compare-before">
          <div className="dt-compare-tag">Jour 0</div>
        </div>
        <div className="dt-compare-after" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <div className="dt-compare-tag right">Jour 124</div>
        </div>
        <div className="dt-compare-handle" style={{ left: `${pos}%` }}>
          <span className="dt-compare-knob"><i data-lucide="chevrons-left-right"></i></span>
        </div>
      </div>
      <div className="dt-compare-delta">
        <div><b>−9,4</b><span>kg masse</span></div>
        <div><b>−12,6</b><span>% gras</span></div>
        <div><b>+3,2</b><span>kg lean</span></div>
      </div>
    </div>
  );
}

function ScreenRecipes() {
  const recs = [
    { c: '#C8FF3D', t: 'Bowl de poulet', m: '612 kcal · 58 P', tag: 'F1' },
    { c: '#D8C9A3', t: 'Saumon teriyaki', m: '548 kcal · 42 P', tag: 'C2' },
    { c: '#B8B5AB', t: 'Omelette épinards', m: '380 kcal · 30 P', tag: 'F1' },
  ];
  return (
    <div className="dt-app-screen" style={{ gap: 10 }}>
      <div className="dt-app-statusbar"><span>9:41</span><span className="dt-app-statusbar-r"><span>●●●●</span></span></div>
      <div style={{ padding: '4px 4px 0' }}>
        <div className="dt-app-eb">— Recettes du protocole</div>
        <div className="dt-app-hdr-name" style={{ fontSize: 20 }}>Cette semaine.</div>
      </div>
      {recs.map((r) => (
        <div key={r.t} className="dt-recipe">
          <div className="dt-recipe-img" style={{ background: `radial-gradient(60% 60% at 50% 40%, ${r.c}33, transparent 70%), linear-gradient(180deg, #1a1f2a, #0a0c12)` }}>
            <span className="dt-recipe-tag">{r.tag}</span>
          </div>
          <div>
            <div className="dt-recipe-t">{r.t}</div>
            <div className="dt-recipe-m">{r.m}</div>
          </div>
          <i data-lucide="chevron-right" style={{ width: 14, height: 14, color: 'var(--bone-3)' }}></i>
        </div>
      ))}
    </div>
  );
}

const SCREENS = [
  { id: 'dashboard', label: 'Tableau de bord', icon: 'gauge-circle',  comp: <ScreenDashboard /> },
  { id: 'scanner',   label: 'Scanner IA',      icon: 'scan-line',     comp: <ScreenScanner   /> },
  { id: 'reels',     label: 'Reels workout',   icon: 'play',          comp: <ScreenReels     /> },
  { id: 'compare',   label: 'Avant / Après',   icon: 'arrow-left-right', comp: <ScreenCompare /> },
  { id: 'recipes',   label: 'Recettes',        icon: 'utensils',      comp: <ScreenRecipes   /> },
];

/* ---------- Auto-cycling center phone ---------- */
function CenterPhone() {
  const [idx, setIdx] = useState_A(0);
  useEffect_A(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SCREENS.length), 4200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="dt-app-center">
      <PhoneFrame tilt={0} className="dt-phone-center">
        {SCREENS.map((s, i) => (
          <div key={s.id} className={`dt-screen-slide ${i === idx ? 'is-active' : ''}`}>
            {s.comp}
          </div>
        ))}
      </PhoneFrame>
      <div className="dt-app-dots">
        {SCREENS.map((s, i) => (
          <button key={s.id} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)} aria-label={s.label}>
            <i data-lucide={s.icon}></i>
            <span>{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AppShowcase() {
  return (
    <section className="dt-section dt-app-v2" id="app">
      <div className="dt-app-v2-grain" />
      <div className="dt-container">
        <SectionHeader
          eyebrow="L'Instrument"
          title={<>Votre corps, <em>quantifié</em>.</>}
          kicker="L'application DietTemple est le tableau de bord de votre transformation. Cinq écrans clés : scannez vos repas, comparez votre évolution, consommez les reels d'entraînement, suivez votre protocole, ouvrez votre bibliothèque de recettes."
        />

        <div className="dt-app-stage-v2 dt-reveal">
          <PhoneFrame tilt={-7} className="dt-phone-left">
            <ScreenReels />
          </PhoneFrame>

          <CenterPhone />

          <PhoneFrame tilt={7} className="dt-phone-right">
            <ScreenCompare />
          </PhoneFrame>

          <div className="dt-app-orb dt-app-orb-1" />
          <div className="dt-app-orb dt-app-orb-2" />
        </div>

        <div className="dt-app-features-v2">
          <Feature ic="scan-line" t="Scanner IA d'assiette" d="Une photo. Le moteur lit calories, protéines, glucides, lipides et micros en moins de 2 secondes."
            stat={<><CountUp to="98.4" decimals={1} suffix=" %" /><span> précision</span></>} />
          <Feature ic="arrow-left-right" t="Avant / Après immersif" d="Slider de comparaison automatique par date. Voyez 90 jours de transformation glisser sous votre doigt."
            stat={<><CountUp to="124" /><span> photos archivées</span></>} />
          <Feature ic="play" t="Reels d'entraînement" d="Feed style cinéma, démos de forme par les coachs élite. Pas de fluff, pas de pub."
            stat={<><CountUp to="640" /><span> reels signature</span></>} />
          <Feature ic="utensils" t="Recettes du protocole" d="Recettes alignées sur votre cadre macro de la semaine. Auto-mises à jour avec votre coach."
            stat={<><CountUp to="320" /><span> recettes curées</span></>} />
          <Feature ic="gauge-circle" t="Plans & dashboard" d="Programme du jour, score énergétique, alertes hydratation, fenêtre de sommeil — tout en un seul écran."
            stat={<><CountUp to="79" suffix=" %" /><span> score moyen membre</span></>} />
          <Feature ic="line-chart" t="Historique & analytique" d="Tous vos plans, scans et photos archivés à la date. La timeline de votre métamorphose."
            stat={<><CountUp to="2" /><span>+ ans d'historique</span></>} />
        </div>
      </div>
    </section>
  );
}

function Feature({ ic, t, d, stat }) {
  return (
    <article className="dt-feat-v2 dt-reveal">
      <div className="dt-feat-v2-top">
        <div className="dt-feat-v2-ic"><i data-lucide={ic}></i></div>
        <div className="dt-feat-v2-stat">{stat}</div>
      </div>
      <div className="dt-feat-v2-t">{t}</div>
      <div className="dt-feat-v2-d">{d}</div>
    </article>
  );
}

window.AppShowcase = AppShowcase;
