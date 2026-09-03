'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScienceFilm() {
  const frameRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [loadVideo, setLoadVideo] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReducedMotion(media.matches);
    syncPreference();
    media.addEventListener('change', syncPreference);
    return () => media.removeEventListener('change', syncPreference);
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        if (visible) setLoadVideo(true);
      },
      { rootMargin: '320px 0px', threshold: 0.08 },
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const shouldLoad = loadVideo && !reducedMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldLoad && isVisible) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isVisible, shouldLoad]);

  return (
    <figure ref={frameRef} className="dt-science-film dt-reveal" aria-label="Le protocole scientifique UH en action">
      <div className="dt-science-film-frame">
        <video
          ref={videoRef}
          className="dt-science-film-video"
          autoPlay={shouldLoad}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video-poster.webp"
          aria-label="Analyse biométrique, entraînement et progression avec UH"
          onCanPlay={() => {
            if (isVisible && shouldLoad) videoRef.current?.play().catch(() => undefined);
          }}
        >
          {shouldLoad && <source src="/video.mp4" type="video/mp4" />}
          Votre navigateur ne prend pas en charge la lecture vidéo.
        </video>

        <div className="dt-science-film-overlay" aria-hidden="true" />
        <div className="dt-science-film-grid" aria-hidden="true" />

        <div className="dt-science-film-topline" aria-hidden="true">
          <span>UH / PROTOCOLE 02</span>
          <span className="dt-science-film-live"><i /> SCIENCE APPLIQUÉE</span>
        </div>

        <figcaption className="dt-science-film-caption">
          <span>MESURER</span>
          <i aria-hidden="true" />
          <span>COMPRENDRE</span>
          <i aria-hidden="true" />
          <span>PROGRESSER</span>
        </figcaption>
      </div>
    </figure>
  );
}
