import { Activity, Sliders, ArrowUpRight, CheckCircle2, FlaskConical } from 'lucide-react';
import ScienceFilm from './ScienceFilm';

interface ScienceProps {
  onJoin?: () => void;
}

export default function Science({ onJoin }: ScienceProps) {
  return (
    <section className="dt-section dt-science-section" id="science">
      <div className="dt-container">
        
        {/* Section Header */}
        <div className="dt-sec-head dt-reveal">
          <div className="dt-eyebrow">02 — FONDÉ SUR LA SCIENCE</div>
          <h2 className="dt-sec-title">
            DE LA RECHERCHE CLINIQUE À <br className="dt-hide-mob" />
            <em>L&apos;APPLICATION DANS LA SALLE.</em>
          </h2>
          <div className="dt-science-lead-quote">
            « Fondé sur la science » n&apos;est pas un slogan marketing.
          </div>
          <p className="dt-sec-kicker" style={{ maxWidth: '75ch' }}>
            Conçu à l&apos;intersection de la rigueur des études en pharmacie et de plus de 10 ans d&apos;expérience intensive sur le terrain, le système UH synthétise les données validées en biomécanique, hypertrophie et nutrition clinique pour les traduire en instructions concrètes :
          </p>
        </div>

        <ScienceFilm />

        {/* 2 Key Pillars / Instructions */}
        <div className="dt-science-grid">
          
          {/* Card 1 */}
          <div className="dt-science-card dt-reveal">
            <div className="dt-science-card-badge">
              <span className="dt-science-badge-num">01</span>
              <Activity size={20} className="dt-science-icon" />
            </div>
            <h3 className="dt-science-card-title">
              Sélection et perfectionnement des mouvements
            </h3>
            <p className="dt-science-card-body">
              Parmi les centaines d&apos;exercices existants, nous avons filtré uniquement les options les plus rentables. Les mouvements et techniques d&apos;exécution sont calibrés puis intégrés dans un cadre si limpide qu&apos;un enfant de 6 ans pourrait les appliquer immédiatement.
            </p>
            <div className="dt-science-card-foot">
              <CheckCircle2 size={15} /> <span>Biomécanique & Hypertrophie optimisées</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="dt-science-card dt-reveal">
            <div className="dt-science-card-badge">
              <span className="dt-science-badge-num">02</span>
              <Sliders size={20} className="dt-science-icon" />
            </div>
            <h3 className="dt-science-card-title">
              Prescription exacte
            </h3>
            <p className="dt-science-card-body">
              Quel volume précis de travail exécuter ? Quelle intensité et quelle fréquence appliquer ? Chaque variable est calculée avec exactitude.
            </p>
            <div className="dt-science-card-foot">
              <CheckCircle2 size={15} /> <span>Dosage clinique du volume et de l&apos;intensité</span>
            </div>
          </div>

        </div>

        {/* Synthesis Box */}
        <div className="dt-science-synthesis dt-reveal">
          <div className="dt-science-synthesis-icon">
            <FlaskConical size={28} />
          </div>
          <p className="dt-science-synthesis-text">
            UH transforme l&apos;extrême complexité scientifique en une méthode d&apos;une simplicité désarmante. Dès le premier jour, vous vous entraînez avec la précision d&apos;un professionnel, même sans aucune connaissance préalable.
          </p>
        </div>

        {/* Final Impact Punchline */}
        <div className="dt-science-impact dt-reveal">
          <div className="dt-impact-glow" />
          <h3 className="dt-impact-title">
            LA SCIENCE EST LA FONDATION. <br />
            <span className="dt-highlight-volt">LA PROGRESSION EST L&apos;OBJECTIF.</span>
          </h3>

          {onJoin && (
            <div className="dt-impact-cta-wrap">
              <button className="dt-btn dt-btn-primary dt-btn-lg" onClick={onJoin}>
                REJOINDRE UH <ArrowUpRight size={18} />
              </button>
              <p className="dt-hero-disclaimer" style={{ marginTop: 14 }}>
                *Votre parcours commence par une évaluation diagnostique individuelle chez DietTemple
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
