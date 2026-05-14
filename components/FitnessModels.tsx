'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const MODELS = [
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=85&fit=crop',
    label: 'Force',
    rank: 'Champion',
    stat: '+18 kg muscle',
    delay: 0,
  },
  {
    src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=85&fit=crop',
    label: 'Définition',
    rank: 'Fighter',
    stat: '−22 kg graisse',
    delay: 120,
  },
  {
    src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=85&fit=crop',
    label: 'Performance',
    rank: 'Elite',
    stat: '14 mois de protocole',
    delay: 240,
  },
  {
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=85&fit=crop',
    label: 'Discipline',
    rank: 'Ascension',
    stat: 'Recomposition totale',
    delay: 360,
  },
];

function ModelCard({ model, index }: { model: typeof MODELS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isLarge = index === 0 || index === 3;

  return (
    <div
      ref={ref}
      className={`dt-fm-card ${isLarge ? 'dt-fm-card--large' : ''} ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${model.delay}ms` }}
    >
      {/* Image */}
      <div className="dt-fm-img-wrap">
        <Image
          src={model.src}
          alt={model.label}
          fill
          sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 30vw"
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
        />
        {/* Overlays */}
        <div className="dt-fm-grade" />
        <div className="dt-fm-grain" />
      </div>

      {/* Top pill */}
      <div className="dt-fm-top">
        <span className="dt-fm-rank-pill">{model.rank}</span>
      </div>

      {/* Bottom info */}
      <div className="dt-fm-bottom">
        <div className="dt-fm-label">{model.label}</div>
        <div className="dt-fm-stat">{model.stat}</div>
      </div>

      {/* Hover volt line */}
      <div className="dt-fm-line" />
    </div>
  );
}

export default function FitnessModels() {
  return (
    <section className="dt-section dt-fm-section" id="transformations">
      <div className="dt-container">
        {/* Header */}
        <div className="dt-fm-header dt-reveal">
          <div className="dt-eyebrow">Transformations réelles</div>
          <h2 className="dt-sec-title">
            Des corps <em>sculptés</em><br />par le protocole.
          </h2>
          <p className="dt-sec-kicker">
            Chaque transformation est le résultat d&apos;un protocole sur mesure —
            nutrition, entraînement, coaching. Pas de raccourcis. Que de la méthode.
          </p>
        </div>

        {/* Grid */}
        <div className="dt-fm-grid">
          {MODELS.map((m, i) => <ModelCard key={i} model={m} index={i} />)}
        </div>

        {/* Floating stat bar */}
        <div className="dt-fm-stats-bar dt-reveal">
          {[
            { n: '94%', l: 'atteignent leur objectif' },
            { n: '6 sem.', l: 'premiers résultats visibles' },
            { n: '3×', l: 'plus efficace qu\'en solo' },
            { n: '24/7', l: 'suivi via l\'app' },
          ].map(s => (
            <div key={s.l} className="dt-fm-stat-item">
              <div className="dt-fm-stat-n">{s.n}</div>
              <div className="dt-fm-stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
