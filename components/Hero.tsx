'use client';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import heroImg from '@/assets/hero.png';

interface HeroProps {
  onJoin: () => void;
}

type Particle = {
  key: number;
  x: string;
  y: string;
  s: string;
  d: string;
  delay: string;
  color: 'volt' | 'gold';
  o: number;
};

export default function Hero({ onJoin }: HeroProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Generate 12 elegant decorative particles (faint gold and neon-green)
    setParticles(
      Array.from({ length: 12 }, (_, i) => ({
        key: i,
        x: `${Math.random() * 92 + 4}%`,
        y: `${Math.random() * 88 + 6}%`,
        s: `${Math.random() * 2.5 + 1.5}px`,
        d: `${Math.random() * 10 + 12}s`,
        delay: `${-Math.random() * 12}s`,
        color: i % 2 === 0 ? 'volt' : 'gold',
        o: Math.random() * 0.35 + 0.15,
      }))
    );
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    // Small, controlled shift (max 10-12px)
    setParallax({
      x: Math.round(-nx * 20),
      y: Math.round(-ny * 14),
    });
  }, [reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  return (
    <header
      className="dt-hero-section"
      id="top"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background ambient lighting and grain */}
      <div className="dt-hero-bg-gradient" aria-hidden="true" />
      <div className="dt-cine-grain" aria-hidden="true" />

      {/* Decorative subtle floating particles (behind content) */}
      <div className="dt-hero-particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.key}
            className={p.color === 'gold' ? 'dt-hero-particle-gold' : 'dt-hero-particle-volt'}
            style={{
              '--x': p.x,
              '--y': p.y,
              '--s': p.s,
              '--d': p.d,
              '--delay': p.delay,
              '--o': p.o,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="dt-hero-container">
        {/* LEFT COLUMN: Hero copy & CTAs with staggered entrance */}
        <div className="dt-hero-content-col">
          <div className="dt-hero-eyebrow dt-hero-stagger-1">
            <span className="dt-pip" /> UH — ULTIMATE HUMAN
          </div>

          <h1 className="dt-hero-headline dt-hero-stagger-2">
            ARRÊTEZ DE DEVINER.<br />
            <em>COMMENCEZ À PROGRESSER.</em>
          </h1>

          <div className="dt-hero-sub-block dt-hero-stagger-3">
            <div className="dt-hero-brand-tag">UH — Ultimate Human</div>
            <p className="dt-hero-lead-text">
              Le premier système 100 % tunisien d&apos;entraînement et de nutrition fondé sur la science.
            </p>
          </div>

          <p className="dt-hero-sub dt-hero-stagger-3">
            Né de la rencontre entre la rigueur clinique des études en pharmacie et plus de 10 ans d&apos;expérience du terrain en salle de sport, UH s&apos;adapte à votre biologie unique pour garantir une progression mesurable, sans perte de temps ni frustration.
          </p>

          <div className="dt-hero-ctas dt-hero-stagger-4" style={{ marginBottom: 16 }}>
            <button className="dt-btn dt-btn-primary dt-btn-lg" onClick={onJoin}>
              REJOINDRE UH <ArrowUpRight size={18} />
            </button>
          </div>

          <p className="dt-hero-disclaimer dt-hero-stagger-4">
            *Votre parcours commence par une évaluation diagnostique individuelle chez DietTemple
          </p>
        </div>

        {/* RIGHT COLUMN: Animated hero.png with cinematic glows & parallax */}
        <div className="dt-hero-visual-col">
          {/* Cinematic lighting: lime green glow behind UH + gold glow bottom-right */}
          <div className="dt-hero-glow-green" aria-hidden="true" />
          <div className="dt-hero-glow-gold" aria-hidden="true" />
          <div className="dt-hero-light-streak" aria-hidden="true" />

          {/* Initial entrance and mouse parallax container */}
          <div
            className="dt-hero-image-stage"
            style={{
              transform: reducedMotion
                ? 'none'
                : `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
            }}
          >
            {/* Continuous floating & slow scale breathing */}
            <div className="dt-hero-float-container">
              <div className="dt-hero-floating-card">
                <Image
                  src={heroImg}
                  alt="DietTemple Ultimate Human — Entraînement et nutrition fondés sur la science"
                  priority
                  quality={95}
                  className="dt-hero-img"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                />
                <div className="dt-hero-img-overlay" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dt-hero-scrollhint" aria-hidden="true">
        <span>Défiler</span>
        <span className="dt-hero-scrollline" />
      </div>
    </header>
  );
}
