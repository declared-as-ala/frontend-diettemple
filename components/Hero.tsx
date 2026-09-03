'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

interface HeroProps { onJoin: () => void; }

type Particle = { key: number; x: string; y: string; s: string; d: string; delay: string; o: number };

export default function Hero({ onJoin }: HeroProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        key: i,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        s: `${Math.random() * 3 + 1}px`,
        d: `${Math.random() * 14 + 10}s`,
        delay: `${-Math.random() * 14}s`,
        o: Math.random() * 0.4 + 0.2,
      }))
    );
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const cine = document.querySelector<HTMLElement>('.dt-hero-section .dt-cine');
      const glow = document.querySelector<HTMLElement>('.dt-hero-glow');
      if (cine) cine.style.transform = `translateY(${y * 0.18}px)`;
      if (glow) glow.style.transform = `translate(${y * 0.04}px, ${y * 0.06}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="dt-hero-section" id="top">
      <div className="dt-cine dt-cine-hero" style={{ position: 'absolute', inset: 0, aspectRatio: 'auto', borderRadius: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=85&fit=crop"
          alt="UH — Ultimate Human"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'right center' }}
          priority
        />
        <div className="dt-cine-grade" />
        <div className="dt-cine-figure" aria-hidden />
        <div className="dt-cine-grain" />
        <div className="dt-hero-glow" />
        <div className="dt-hero-particles" aria-hidden>
          {particles.map((p) => (
            <span key={p.key} style={{
              '--x': p.x, '--y': p.y, '--s': p.s,
              '--d': p.d, '--delay': p.delay, '--o': p.o,
            } as React.CSSProperties} />
          ))}
        </div>
      </div>

      <div className="dt-hero-content">
        <div className="dt-hero-eyebrow">
          <span className="dt-pip" /> UH — ULTIMATE HUMAN
        </div>

        <h1 className="dt-hero-headline">
          ARRÊTEZ DE DEVINER.<br />
          <em>COMMENCEZ À PROGRESSER.</em>
        </h1>

        <div className="dt-hero-sub-block">
          <div className="dt-hero-brand-tag">UH — Ultimate Human</div>
          <p className="dt-hero-lead-text">
            Le premier système 100 % tunisien d&apos;entraînement et de nutrition fondé sur la science.
          </p>
        </div>

        <p className="dt-hero-sub">
          Né de la rencontre entre la rigueur clinique des études en pharmacie et plus de 10 ans d&apos;expérience du terrain en salle de sport, UH s&apos;adapte à votre biologie unique pour garantir une progression mesurable, sans perte de temps ni frustration.
        </p>

        <div className="dt-hero-ctas" style={{ marginBottom: 16 }}>
          <button className="dt-btn dt-btn-primary dt-btn-lg" onClick={onJoin}>
            REJOINDRE UH <ArrowUpRight size={18} />
          </button>
        </div>

        <p className="dt-hero-disclaimer">
          *Votre parcours commence par une évaluation diagnostique individuelle chez DietTemple
        </p>
      </div>

      <div className="dt-hero-scrollhint">
        <span>Défiler</span>
        <span className="dt-hero-scrollline" />
      </div>
    </header>
  );
}
