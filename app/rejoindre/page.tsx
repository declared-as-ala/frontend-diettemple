'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function RejoindrePage() {
  return (
    <>
      {/* Top bar */}
      <div className="rj-bar">
        <div className="rj-bar-inner">
          <Link href="/" className="rj-back">
            <ArrowLeft size={14} /> Retour
          </Link>
          <Link href="/" className="dt-brand">
            <span>Diet<em>Temple</em></span>
          </Link>
          <div className="rj-step">Étape 1 · Choisissez votre voie</div>
        </div>
      </div>

      <main className="rj-main">
        <div className="rj-bg" aria-hidden="true" />

        <div className="rj-eyebrow">
          <span className="dt-pip" />
          Ultimate Human Society · Bienvenue
        </div>

        <h1 className="rj-headline">
          Quelle est<br />
          votre <em>voie</em>&nbsp;?
        </h1>

        <p className="rj-sub">
          Choisissez votre programme. Chaque voie est taillée sur mesure
          pour votre physiologie et vos objectifs.
        </p>

        {/* Gender choice cards — each navigates to its own page */}
        <div className="rj-cards">

          <Link href="/rejoindre/homme" className="rj-card rj-card-homme rj-card-link">
            <div className="rj-card-badge">♂</div>
            <div className="rj-card-label">Homme</div>
            <div className="rj-card-sub">Force &amp; Muscle</div>
            <div className="rj-card-arrow"><ArrowRight size={20} /></div>
          </Link>

          <Link href="/rejoindre/femme" className="rj-card rj-card-femme rj-card-link">
            <div className="rj-card-badge">♀</div>
            <div className="rj-card-label">Femme</div>
            <div className="rj-card-sub">Forme &amp; Vitalité</div>
            <div className="rj-card-arrow"><ArrowRight size={20} /></div>
          </Link>

        </div>
      </main>
    </>
  );
}
