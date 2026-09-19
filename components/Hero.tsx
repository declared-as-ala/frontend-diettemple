'use client';
import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import heroImg from '@/assets/hero.png';

interface HeroProps {
  onJoin: () => void;
}

interface SlideData {
  id: string;
  eyebrow: string;
  titleWhite: string;
  titleAccent: string;
  brandTag: string;
  lead: string;
  desc: string;
  ctaText: string;
  image: StaticImageData;
  alt: string;
}

// Configurable slides architecture (supports 1 or multiple slides seamlessly)
const SLIDES: SlideData[] = [
  {
    id: 'uh-science',
    eyebrow: 'UH — ULTIMATE HUMAN',
    titleWhite: 'ARRÊTEZ DE DEVINER.',
    titleAccent: 'COMMENCEZ À PROGRESSER.',
    brandTag: 'UH — Ultimate Human',
    lead: "Le premier système 100 % tunisien d'entraînement et de nutrition fondé sur la science.",
    desc: "Né de la rencontre entre la rigueur clinique des études en pharmacie et plus de 10 ans d'expérience du terrain en salle de sport, UH s'adapte à votre biologie unique pour garantir une progression mesurable, sans perte de temps ni frustration.",
    ctaText: 'REJOINDRE UH',
    image: heroImg,
    alt: 'DietTemple Ultimate Human — Entraînement et nutrition fondés sur la science',
  },
];

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
  const [activeSlide, setActiveSlide] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const hasMultipleSlides = SLIDES.length > 1;

  useEffect(() => {
    // 10 subtle ambient particles
    setParticles(
      Array.from({ length: 10 }, (_, i) => ({
        key: i,
        x: `${Math.random() * 92 + 4}%`,
        y: `${Math.random() * 88 + 6}%`,
        s: `${Math.random() * 2.2 + 1.2}px`,
        d: `${Math.random() * 10 + 12}s`,
        delay: `${-Math.random() * 12}s`,
        color: i % 2 === 0 ? 'volt' : 'gold',
        o: Math.random() * 0.3 + 0.12,
      }))
    );
  }, []);

  const nextSlide = () => {
    if (!hasMultipleSlides) return;
    setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    if (!hasMultipleSlides) return;
    setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const slide = SLIDES[activeSlide] ?? SLIDES[0];

  return (
    <header className="dt-hero-bleed" id="top">
      {/* ── 1. Full-Bleed Background Artwork with slow Ken Burns effect ── */}
      <div className="dt-hero-media-backdrop" aria-hidden="true">
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          priority
          quality={94}
          sizes="100vw"
          className="dt-hero-media-img"
        />
      </div>

      {/* ── 2. Layered Cinematic Lighting & Contrast Overlays ── */}
      <div className="dt-hero-vignette-horiz" aria-hidden="true" />
      <div className="dt-hero-vignette-vert" aria-hidden="true" />
      <div className="dt-hero-glow-volt" aria-hidden="true" />
      <div className="dt-hero-glow-gold" aria-hidden="true" />
      <div className="dt-cine-grain" aria-hidden="true" />

      {/* ── 3. Subtle floating particles ── */}
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

      {/* ── 4. Content Container: Dominant Sports Typography & Clear Action ── */}
      <div className="dt-hero-bleed-container">
        <div className="dt-hero-text-stage">
          
          {/* Eyebrow badge */}
          <div className="dt-hero-badge dt-anim-stagger-1">
            <span className="dt-pip" />
            <span>{slide.eyebrow}</span>
          </div>

          {/* Main Campaign Headline */}
          <h1 className="dt-hero-headline-bleed dt-anim-stagger-2">
            <span className="dt-hero-hl-white">{slide.titleWhite}</span>
            <span className="dt-hero-hl-accent">{slide.titleAccent}</span>
          </h1>

          {/* Subheading / Value Proposition */}
          <div className="dt-hero-lead-box dt-anim-stagger-3">
            <div className="dt-hero-brand-kicker">{slide.brandTag}</div>
            <p className="dt-hero-lead-text">{slide.lead}</p>
          </div>

          {/* Narrative description */}
          <p className="dt-hero-body-desc dt-anim-stagger-3">
            {slide.desc}
          </p>

          {/* Primary CTA */}
          <div className="dt-hero-cta-row dt-anim-stagger-4">
            <button
              className="dt-hero-btn-volt"
              onClick={onJoin}
              aria-label="Rejoindre Ultimate Human"
            >
              <span>{slide.ctaText}</span>
              <ArrowUpRight size={19} className="dt-btn-arrow-icon" />
            </button>
          </div>

          {/* Footnote */}
          <p className="dt-hero-disclaimer-bleed dt-anim-stagger-4">
            *Votre parcours commence par une évaluation diagnostique individuelle chez DietTemple
          </p>

        </div>

        {/* ── 5. Sports Carousel Controls & Slide Indicators ── */}
        <div className="dt-hero-meta-dock">
          {/* Carousel arrows (only visible if multiple slides configured) */}
          {hasMultipleSlides && (
            <div className="dt-hero-nav-arrows">
              <button
                className="dt-hero-nav-btn"
                onClick={prevSlide}
                aria-label="Diapositive précédente"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className="dt-hero-nav-btn"
                onClick={nextSlide}
                aria-label="Diapositive suivante"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Slide Indicator Badge (inspired by premium sports campaign badge) */}
          <div
            className="dt-hero-counter-badge"
            aria-label={`Diapositive ${activeSlide + 1} sur ${SLIDES.length}`}
          >
            <span className="dt-hero-counter-nums">
              {activeSlide + 1} / {SLIDES.length}
            </span>
            <span className="dt-hero-counter-sep">|</span>
            <div className="dt-hero-counter-bars">
              {SLIDES.map((_, idx) => (
                <span
                  key={idx}
                  className={`dt-hero-counter-bar ${
                    idx === activeSlide ? 'is-active' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="dt-hero-scrollhint" aria-hidden="true">
        <span>Défiler</span>
        <span className="dt-hero-scrollline" />
      </div>
    </header>
  );
}
