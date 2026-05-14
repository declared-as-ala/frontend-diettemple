'use client';
import { useEffect, useState } from 'react';
import { X, Zap, VolumeX, Play, Heart, MessageCircle, Bookmark, ChevronRight, ChevronsLeftRight, GaugeCircle, ScanLine, ArrowLeftRight, Utensils, LineChart } from 'lucide-react';
import Image from 'next/image';
import SectionHeader from './SectionHeader';
import CountUp from './CountUp';

function PhoneFrame({ children, tilt = 0, className = '', style }: { children: React.ReactNode; tilt?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`dt-phone ${className}`} style={{ '--tilt': `${tilt}deg`, ...style } as React.CSSProperties}>
      <div className="dt-phone-bezel">
        <div className="dt-phone-screen">
          <div className="dt-phone-notch" />
          {children}
        </div>
      </div>
    </div>
  );
}

function Mini({ lbl, v, u, pct }: { lbl: string; v: string; u?: string; pct?: string }) {
  return (
    <div className="dt-app-metric">
      <div className="dt-app-metric-lbl">{lbl}</div>
      <div className="dt-app-metric-v">{v}{u && <span>{u}</span>}</div>
      {pct && <div className="dt-app-metric-bar"><span style={{ width: pct }} /></div>}
    </div>
  );
}

function ScreenDashboard() {
  return (
    <div className="dt-app-screen">
      <div className="dt-app-statusbar"><span>9:41</span><span className="dt-app-statusbar-r"><span>●●●●</span></span></div>
      <div className="dt-app-hdr">
        <div><div className="dt-app-eb">Rang 03 · Champion</div><div className="dt-app-hdr-name">Sahil.</div></div>
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
      <div className="dt-app-row"><Mini lbl="Protéines" v="142" u="g" pct="71%" /><Mini lbl="kcal" v="2 040" pct="86%" /></div>
      <div className="dt-app-row"><Mini lbl="Pas" v="11 420" /><Mini lbl="Sommeil" v="7:24" /></div>
    </div>
  );
}

function ScreenScanner() {
  return (
    <div className="dt-app-screen dt-app-screen-dark">
      <div className="dt-app-statusbar"><span>9:41</span><span className="dt-app-statusbar-r"><span>●●●●</span></span></div>
      <div className="dt-app-scan-head"><X size={18} /><span>Scanner une assiette</span><Zap size={18} /></div>
      <div className="dt-app-scan-frame">
        <div className="dt-app-scan-target" />
        <div className="dt-app-scan-line" />
        <div className="dt-app-scan-meta">— ANALYSE · 6 éléments</div>
      </div>
      <div className="dt-app-scan-card">
        <div className="dt-app-scan-card-h">
          <div><div className="dt-app-scan-card-eb">Détecté</div><div className="dt-app-scan-card-t">Poulet grillé + bol quinoa</div></div>
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
      <div className="dt-app-statusbar"><span>9:41</span><span className="dt-app-statusbar-r"><span>●●●●</span></span></div>
      <div className="dt-reels">
        <div className="dt-reels-card">
          <div className="dt-reels-bg" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <Image src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=85&fit=crop" alt="Workout reel" fill style={{ objectFit: 'cover', objectPosition: 'top center' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,6,10,.3) 0%, transparent 40%, rgba(5,6,10,.7) 100%)' }} />
          </div>
          <div className="dt-reels-fig" />
          <div className="dt-reels-top">
            <span className="dt-reels-counter">02 / 14</span>
            <span className="dt-reels-mute"><VolumeX size={12} /></span>
          </div>
          <button className="dt-reels-play"><Play size={18} /></button>
          <div className="dt-reels-meta">
            <div className="dt-reels-eb">— Démo de forme</div>
            <div className="dt-reels-t">Bench press · retraction scapulaire</div>
            <div className="dt-reels-sub">Coach Nina · 38 s</div>
          </div>
          <div className="dt-reels-actions">
            <button><Heart size={18} /><span>2.4k</span></button>
            <button><MessageCircle size={18} /><span>83</span></button>
            <button><Bookmark size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenCompare() {
  const [pos, setPos] = useState(50);
  return (
    <div className="dt-app-screen" style={{ gap: 10 }}>
      <div className="dt-app-statusbar"><span>9:41</span><span className="dt-app-statusbar-r"><span>●●●●</span></span></div>
      <div style={{ padding: '4px 4px 0' }}>
        <div className="dt-app-eb" style={{ color: 'var(--volt)' }}>— Évolution corporelle</div>
        <div className="dt-app-hdr-name" style={{ fontSize: 20 }}>−12,6 % gras<br />+3,2 kg lean</div>
      </div>
      <div className="dt-compare"
        onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setPos(Math.max(8, Math.min(92, ((e.clientX - r.left) / r.width) * 100))); }}
        onTouchMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setPos(Math.max(8, Math.min(92, ((e.touches[0].clientX - r.left) / r.width) * 100))); }}
      >
        <div className="dt-compare-before" style={{ position: 'relative', overflow: 'hidden' }}>
          <Image src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80&fit=crop&sat=-60&bri=-20" alt="Avant" fill style={{ objectFit: 'cover', objectPosition: 'top center', filter: 'grayscale(60%) brightness(0.7)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,12,18,.45)' }} />
          <div className="dt-compare-tag">Jour 0</div>
        </div>
        <div className="dt-compare-after" style={{ clipPath: `inset(0 0 0 ${pos}%)`, position: 'relative', overflow: 'hidden' }}>
          <Image src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=85&fit=crop" alt="Après" fill style={{ objectFit: 'cover', objectPosition: 'top center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,5,.2)' }} />
          <div className="dt-compare-tag right">Jour 124</div>
        </div>
        <div className="dt-compare-handle" style={{ left: `${pos}%` }}>
          <span className="dt-compare-knob"><ChevronsLeftRight size={14} /></span>
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
    { img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&q=80&fit=crop', t: 'Bowl de poulet', m: '612 kcal · 58 P', tag: 'F1' },
    { img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=120&q=80&fit=crop', t: 'Saumon teriyaki', m: '548 kcal · 42 P', tag: 'C2' },
    { img: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=120&q=80&fit=crop', t: 'Omelette épinards', m: '380 kcal · 30 P', tag: 'F1' },
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
          <div className="dt-recipe-img" style={{ position: 'relative', overflow: 'hidden' }}>
            <Image src={r.img} alt={r.t} fill style={{ objectFit: 'cover' }} />
            <span className="dt-recipe-tag" style={{ position: 'relative', zIndex: 1 }}>{r.tag}</span>
          </div>
          <div><div className="dt-recipe-t">{r.t}</div><div className="dt-recipe-m">{r.m}</div></div>
          <ChevronRight size={14} style={{ color: 'var(--bone-3)' }} />
        </div>
      ))}
    </div>
  );
}

const SCREENS = [
  { id: 'dashboard', label: 'Tableau de bord', Icon: GaugeCircle, comp: <ScreenDashboard /> },
  { id: 'scanner',   label: 'Scanner IA',      Icon: ScanLine,    comp: <ScreenScanner /> },
  { id: 'reels',     label: 'Reels workout',   Icon: Play,        comp: <ScreenReels /> },
  { id: 'compare',   label: 'Avant / Après',   Icon: ArrowLeftRight, comp: <ScreenCompare /> },
  { id: 'recipes',   label: 'Recettes',        Icon: Utensils,    comp: <ScreenRecipes /> },
];

function CenterPhone() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SCREENS.length), 4200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="dt-app-center">
      <PhoneFrame tilt={0} className="dt-phone-center">
        {SCREENS.map((s, i) => (
          <div key={s.id} className={`dt-screen-slide ${i === idx ? 'is-active' : ''}`}>{s.comp}</div>
        ))}
      </PhoneFrame>
      <div className="dt-app-dots">
        {SCREENS.map((s, i) => (
          <button key={s.id} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)} aria-label={s.label}>
            <s.Icon size={13} /><span>{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Feature({ ic, t, d, stat }: { ic: React.ReactNode; t: string; d: string; stat: React.ReactNode }) {
  return (
    <article className="dt-feat-v2 dt-reveal">
      <div className="dt-feat-v2-top">
        <div className="dt-feat-v2-ic">{ic}</div>
        <div className="dt-feat-v2-stat">{stat}</div>
      </div>
      <div className="dt-feat-v2-t">{t}</div>
      <div className="dt-feat-v2-d">{d}</div>
    </article>
  );
}

export default function AppShowcase() {
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
          <PhoneFrame tilt={-7} className="dt-phone-left"><ScreenReels /></PhoneFrame>
          <CenterPhone />
          <PhoneFrame tilt={7} className="dt-phone-right"><ScreenCompare /></PhoneFrame>
          <div className="dt-app-orb dt-app-orb-1" />
          <div className="dt-app-orb dt-app-orb-2" />
        </div>
        <div className="dt-app-features-v2">
          <Feature ic={<ScanLine size={20} />} t="Scanner IA d'assiette" d="Une photo. Le moteur lit calories, protéines, glucides, lipides et micros en moins de 2 secondes." stat={<><CountUp to={98.4} decimals={1} suffix=" %" /><span> précision</span></>} />
          <Feature ic={<ArrowLeftRight size={20} />} t="Avant / Après immersif" d="Slider de comparaison automatique par date. Voyez 90 jours de transformation glisser sous votre doigt." stat={<><CountUp to={124} /><span> photos archivées</span></>} />
          <Feature ic={<Play size={20} />} t="Reels d'entraînement" d="Feed style cinéma, démos de forme par les coachs élite. Pas de fluff, pas de pub." stat={<><CountUp to={640} /><span> reels signature</span></>} />
          <Feature ic={<Utensils size={20} />} t="Recettes du protocole" d="Recettes alignées sur votre cadre macro de la semaine. Auto-mises à jour avec votre coach." stat={<><CountUp to={320} /><span> recettes curées</span></>} />
          <Feature ic={<GaugeCircle size={20} />} t="Plans & dashboard" d="Programme du jour, score énergétique, alertes hydratation, fenêtre de sommeil — tout en un seul écran." stat={<><CountUp to={79} suffix=" %" /><span> score moyen membre</span></>} />
          <Feature ic={<LineChart size={20} />} t="Historique & analytique" d="Tous vos plans, scans et photos archivés à la date. La timeline de votre métamorphose." stat={<><CountUp to={2} /><span>+ ans d&apos;historique</span></>} />
        </div>
      </div>
    </section>
  );
}
