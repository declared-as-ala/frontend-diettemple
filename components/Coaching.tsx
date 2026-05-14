import { Video, ScanLine, SlidersHorizontal, TrendingUp, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import SectionHeader from './SectionHeader';
import CinematicSlot from './CinematicSlot';

export default function Coaching() {
  return (
    <section className="dt-section dt-coaching" id="coaching">
      <div className="dt-container">
        <div className="dt-coaching-grid">
          <div className="dt-reveal">
            <SectionHeader
              eyebrow="Le Coach"
              title={<>Un <em>humain</em>, tous les sept jours.</>}
              kicker="Votre coach n'est pas un chatbot. Il analyse votre scan, vos photos, votre sommeil et votre semaine — puis met à jour votre protocole en temps réel."
            />
            <ul className="dt-coaching-list">
              <li><Video size={18} /><span><b>Consultation de 45 minutes</b>Appel vidéo, protocole partagé à l&apos;écran.</span></li>
              <li><ScanLine size={18} /><span><b>Bilan de composition</b>Évaluation BIA + visuelle, archivée.</span></li>
              <li><SlidersHorizontal size={18} /><span><b>Mise à jour du protocole</b>Macros, entraînement, récupération — recalibrés.</span></li>
              <li><TrendingUp size={18} /><span><b>Validation d&apos;ascension</b>Êtes‑vous prêt pour le rang suivant ? Il décide.</span></li>
            </ul>
            <div className="dt-coaching-ctas">
              <a className="dt-btn dt-btn-ghost" href="tel:+21671000000">+216 71 000 000</a>
            </div>
          </div>
          <CinematicSlot label="Coach · 4:5" ratio="4/5" tone="portrait">
            <Image
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=90&fit=crop"
              alt="Coach DietTemple"
              fill
              sizes="(max-width:768px) 100vw, 45vw"
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
            />
          </CinematicSlot>
        </div>
      </div>
    </section>
  );
}
