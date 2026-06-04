/* global React */
function Coaching() {
  return (
    <section className="dt-section dt-coaching" id="coaching">
      <div className="dt-container">
        <div className="dt-coaching-grid">
          <div className="dt-reveal">
            <SectionHeader
              eyebrow="Le Coach"
              title={<>Un <em>humain</em>, tous les sept jours.</>}
              kicker="Votre coach n’est pas un chatbot. Il analyse votre scan, vos photos, votre sommeil et votre semaine — puis met à jour votre protocole en temps réel."
            />
            <ul className="dt-coaching-list">
              <li><i data-lucide="video"></i><span><b>Consultation de 45 minutes</b>Appel vidéo, protocole partagé à l’écran.</span></li>
              <li><i data-lucide="scan-line"></i><span><b>Bilan de composition</b>Évaluation BIA + visuelle, archivée.</span></li>
              <li><i data-lucide="sliders-horizontal"></i><span><b>Mise à jour du protocole</b>Macros, entraînement, récupération — recalibrés.</span></li>
              <li><i data-lucide="trending-up"></i><span><b>Validation d’ascension</b>Êtes‑vous prêt pour le rang suivant ? Il décide.</span></li>
            </ul>
          </div>
          <CinematicSlot label="Coach · 4:5" ratio="4/5" tone="portrait" />
        </div>
      </div>
    </section>
  );
}

window.Coaching = Coaching;
