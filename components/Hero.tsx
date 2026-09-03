'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Volume2, VolumeX } from 'lucide-react';

interface HeroProps { onJoin: () => void; }

type Particle = { key: number; x: string; y: string; s: string; d: string; delay: string; o: number };

export default function Hero({ onJoin }: HeroProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);

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
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReducedMotion(preference.matches);
    syncPreference();
    preference.addEventListener('change', syncPreference);
    return () => preference.removeEventListener('change', syncPreference);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) video.pause();
    else video.play().catch(() => undefined);
  }, [reducedMotion]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) video.play().catch(() => undefined);
  };

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
        <video
          ref={videoRef}
          className="dt-hero-video"
          autoPlay={!reducedMotion}
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          poster="/video-poster.webp"
          aria-label="UH — entraînement et nutrition fondés sur la science"
        >
          <source src="/video.mp4" type="video/mp4" />
          Votre navigateur ne prend pas en charge la lecture vidéo.
        </video>
        <div className="dt-cine-grade" />
        <div className="dt-cine-figure" aria-hidden />
        <div className="dt-cine-grain" />
        <div className="dt-hero-glow" />
        <button
          type="button"
          className="dt-hero-sound"
          onClick={toggleSound}
          aria-label={isMuted ? 'Activer le son de la vidéo' : 'Couper le son de la vidéo'}
          aria-pressed={!isMuted}
        >
          {isMuted ? <VolumeX size={17} aria-hidden="true" /> : <Volume2 size={17} aria-hidden="true" />}
          <span>{isMuted ? 'Activer le son' : 'Son activé'}</span>
        </button>
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
