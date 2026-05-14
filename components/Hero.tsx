'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import CountUp from './CountUp';

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
          alt="Ultimate Human"
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
          <span className="dt-pip" /> Ultimate Human Society · Est. 2025
        </div>
        <h1 className="dt-hero-headline">
          Devenez<br />
          l&apos;<em>ultimate</em><br />
          human.
        </h1>
        <p className="dt-hero-sub">
          Une société de transformation. Nutrition scientifique, entraînement intelligent,
          coaching hebdomadaire, et une ascension par rangs : de <em>Initiate</em> à <em>Elite</em>.
          Votre version actuelle n&apos;est qu&apos;un brouillon.
        </p>
        <div className="dt-hero-ctas">
          <button className="dt-btn dt-btn-primary" onClick={onJoin}>
            Rejoindre Ultimate Human <ArrowUpRight size={16} />
          </button>
          <a className="dt-btn dt-btn-ghost" href="#systeme">Découvrir le Système</a>
        </div>
        <div className="dt-hero-stats">
          <Stat n={<CountUp to={14200} />} l="Membres en ascension" />
          <Stat n={<><span>−</span><CountUp to={14.2} decimals={1} suffix=" %" /></>} l="Masse grasse moy. · 90 j" volt />
          <Stat n={<CountUp to={4} />} l="Rangs du Temple" />
          <Stat n={<CountUp to={1} format={(n) => String(n).padStart(2, '0')} />} l="Mise à jour hebdo" />
        </div>
      </div>

      <div className="dt-hero-scrollhint">
        <span>Défiler</span>
        <span className="dt-hero-scrollline" />
      </div>
    </header>
  );
}

function Stat({ n, l, volt }: { n: React.ReactNode; l: string; volt?: boolean }) {
  return (
    <div className="dt-hero-stat">
      <div className={`dt-hero-stat-n ${volt ? 'volt' : ''}`}>{n}</div>
      <div className="dt-hero-stat-l">{l}</div>
    </div>
  );
}
