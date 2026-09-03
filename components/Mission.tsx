import { ShieldAlert, Compass, Sparkles, HelpCircle } from 'lucide-react';

export default function Mission() {
  return (
    <section className="dt-section dt-mission-section" id="mission">
      <div className="dt-container">
        
        {/* Section Header */}
        <div className="dt-mission-header dt-reveal">
          <div className="dt-eyebrow">
            <span className="dt-pip" /> 01 — NOTRE MISSION
          </div>
          <h2 className="dt-mission-main-title">
            VOUS N&apos;AVEZ PAS BESOIN D&apos;UN ÉNIÈME PROGRAMME... <br />
            <em>NI D&apos;UN RÉGIME INHUMAIN.</em>
          </h2>
        </div>

        {/* Part 1: Editorial Narrative Card */}
        <div className="dt-mission-story-box dt-reveal">
          <div className="dt-story-glow" />
          
          <div className="dt-story-lead">
            Vous avez peut-être déjà essayé plusieurs fois.
          </div>

          <p className="dt-story-paragraph">
            Que vous vous soyez infligé des régimes drastiques impossibles à maintenir toute une vie, ou que vous pensiez au contraire déjà bien manger et beaucoup manger sans réussir à voir le moindre résultat dans le miroir, le constat reste le même. Après des mois de sacrifices, une question lancinante persiste :
          </p>

          {/* Centered High-Impact Quote Showcase */}
          <div className="dt-story-focal-quote">
            <div className="dt-quote-glow" />
            <span className="dt-quote-mark">“</span>
            <p className="dt-quote-phrase">
              « Est-ce que je suis réellement en train de progresser ? »
            </p>
          </div>

          <p className="dt-story-paragraph dt-story-paragraph-muted">
            Le monde du fitness vous submerge d&apos;informations contradictoires et de méthodes extrêmes. Sans structure adaptée à votre réalité biologique et quotidienne, ces efforts dispersés ne créent que du doute, de l&apos;épuisement et de la frustration.
          </p>
        </div>

        {/* Part 2: Two Principle Pillars Grid */}
        <div className="dt-mission-pillars-grid">
          
          {/* Pillar 1 */}
          <div className="dt-mission-pillar-card dt-reveal">
            <div className="dt-pillar-top">
              <div className="dt-pillar-icon-wrap dt-pillar-icon-alert">
                <ShieldAlert size={22} />
              </div>
              <span className="dt-pillar-badge">Constat Fondamental</span>
            </div>

            <div className="dt-pillar-content">
              <h3 className="dt-pillar-headline">
                LE PROBLÈME N&apos;EST PAS VOTRE MOTIVATION. <br />
                <span className="dt-highlight-volt">LE PROBLÈME EST L&apos;ABSENCE DE DURABILITÉ.</span>
              </h3>
              <p className="dt-pillar-desc">
                Une transformation physique ne devrait jamais reposer sur la privation, l&apos;aveuglement ou les tendances éphémères. C&apos;est pourquoi nous avons créé UH — Ultimate Human.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="dt-mission-pillar-card dt-reveal">
            <div className="dt-pillar-top">
              <div className="dt-pillar-icon-wrap dt-pillar-icon-compass">
                <Compass size={22} />
              </div>
              <span className="dt-pillar-badge">Notre Solution</span>
            </div>

            <div className="dt-pillar-content">
              <h3 className="dt-pillar-headline">
                VOS EFFORTS DOIVENT AVOIR UNE DIRECTION <br />
                <span className="dt-highlight-champagne">ET RESTER VIABLES.</span>
              </h3>
              <p className="dt-pillar-desc">
                L&apos;entraînement, la nutrition, la récupération et la progression doivent fonctionner comme un tout harmonieux — et votre système doit s&apos;adapter à votre vraie vie, pas la paralyser.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
