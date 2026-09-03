'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

interface UHPromoCardProps {
  onDiscover?: () => void;
  className?: string;
}

const BENEFIT_ITEMS = [
  {
    title: 'Alliance science et terrain :',
    desc: 'Une méthode conçue par des experts en pharmacie et en entraînement.',
  },
  {
    title: 'Approche durable et vivable :',
    desc: 'Dites adieu aux régimes drastiques grâce à une nutrition adaptée à votre quotidien.',
  },
  {
    title: 'Exécution simple et précise :',
    desc: 'Appliquez des instructions ultra-claires dès le premier jour pour progresser comme un pro.',
  },
  {
    title: 'Diagnostic sur mesure',
    desc: '',
  },
];

export default function UHPromoCard({ onDiscover, className = '' }: UHPromoCardProps) {
  const router = useRouter();

  const handleAction = () => {
    if (onDiscover) {
      onDiscover();
    } else {
      router.push('/rejoindre');
    }
  };

  return (
    <div className={`uh-promo-wrapper ${className}`}>
      <div className="uh-promo-card" onClick={handleAction}>
        {/* Background Image with Gold Particle Texture */}
        <div className="uh-promo-bg">
          <Image
            src="/background.png"
            alt="UH Background"
            fill
            priority
            className="uh-promo-bg-img"
          />
          <div className="uh-promo-overlay" />
        </div>

        {/* Elegant Gold Borders & Corner Accents */}
        <div className="uh-promo-border" />
        <div className="uh-corner uh-corner-tl" />
        <div className="uh-corner uh-corner-tr" />
        <div className="uh-corner uh-corner-bl" />
        <div className="uh-corner uh-corner-br" />

        {/* Card Content Layout */}
        <div className="uh-promo-content">
          <div className="uh-promo-top">
            {/* Left: UH Golden Crest */}
            <div className="uh-promo-crest-wrap">
              <Image
                src="/logo-uh.png"
                alt="UH Crest"
                width={140}
                height={150}
                className="uh-promo-crest"
              />
            </div>

            {/* Right: Content & Benefits */}
            <div className="uh-promo-info">
              <span className="uh-promo-subhead">The Ultimate Human : Path</span>
              <h2 className="uh-promo-title">FINI L'IMPROVISATION</h2>
              <p className="uh-promo-desc">
                UH est le premier système tunisien alliant la science et le terrain pour garantir une transformation physique mesurable et durable.
              </p>

              <div className="uh-promo-benefits">
                {BENEFIT_ITEMS.map((item, idx) => (
                  <div key={idx} className="uh-benefit-row">
                    <div className="uh-check-icon">
                      <Check size={13} strokeWidth={3} />
                    </div>
                    <div className="uh-benefit-text">
                      <strong className="uh-benefit-title">{item.title} </strong>
                      {item.desc && <span className="uh-benefit-desc">{item.desc}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom: Luxury Gold CTA */}
          <div className="uh-promo-bottom">
            <button
              type="button"
              className="uh-promo-cta"
              onClick={(e) => {
                e.stopPropagation();
                handleAction();
              }}
            >
              <span>DÉCOUVRIR UH</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .uh-promo-wrapper {
          width: 100%;
          margin: 36px 0 24px;
          display: flex;
          justifyContent: center;
        }

        .uh-promo-card {
          position: relative;
          width: 100%;
          max-width: 860px;
          border-radius: 20px;
          overflow: hidden;
          background: #080604;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.7), 0 0 24px rgba(212, 175, 55, 0.18);
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .uh-promo-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 44px rgba(0, 0, 0, 0.8), 0 0 32px rgba(212, 175, 55, 0.32);
        }

        .uh-promo-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .uh-promo-bg-img {
          object-fit: cover;
          object-position: center top;
          opacity: 0.45;
        }

        .uh-promo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(6, 5, 4, 0.75) 0%, rgba(12, 9, 6, 0.88) 50%, rgba(5, 4, 3, 0.96) 100%);
        }

        .uh-promo-border {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          border: 1.2px solid rgba(212, 175, 55, 0.42);
          pointer-events: none;
          z-index: 3;
        }

        .uh-corner {
          position: absolute;
          width: 16px;
          height: 16px;
          border-color: #f3c958;
          pointer-events: none;
          z-index: 4;
        }

        .uh-corner-tl {
          top: 8px;
          left: 8px;
          border-top: 2px solid #f3c958;
          border-left: 2px solid #f3c958;
        }

        .uh-corner-tr {
          top: 8px;
          right: 8px;
          border-top: 2px solid #f3c958;
          border-right: 2px solid #f3c958;
        }

        .uh-corner-bl {
          bottom: 8px;
          left: 8px;
          border-bottom: 2px solid #f3c958;
          border-left: 2px solid #f3c958;
        }

        .uh-corner-br {
          bottom: 8px;
          right: 8px;
          border-bottom: 2px solid #f3c958;
          border-right: 2px solid #f3c958;
        }

        .uh-promo-content {
          position: relative;
          z-index: 2;
          padding: 32px 36px 26px;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .uh-promo-top {
          display: flex;
          align-items: flex-start;
          gap: 28px;
        }

        .uh-promo-crest-wrap {
          flex-shrink: 0;
          width: 130px;
          display: flex;
          justifyContent: center;
          align-items: center;
          padding-top: 6px;
        }

        .uh-promo-crest {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 4px 14px rgba(212, 175, 55, 0.35));
        }

        .uh-promo-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .uh-promo-subhead {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 15px;
          color: #ebd082;
          letter-spacing: 0.8px;
          font-style: italic;
        }

        .uh-promo-title {
          font-size: 22px;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 0.8px;
          margin: 0;
          text-transform: uppercase;
          text-shadow: 0 2px 10px rgba(0,0,0,0.8);
        }

        .uh-promo-desc {
          font-size: 13.5px;
          line-height: 1.45;
          color: rgba(240, 240, 240, 0.86);
          margin: 4px 0 10px;
        }

        .uh-promo-benefits {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .uh-benefit-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .uh-check-icon {
          flex-shrink: 0;
          margin-top: 2px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(132, 216, 54, 0.18);
          color: #84d836;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .uh-benefit-text {
          font-size: 13px;
          line-height: 1.4;
        }

        .uh-benefit-title {
          color: #ffffff;
          font-weight: 700;
        }

        .uh-benefit-desc {
          color: rgba(225, 225, 225, 0.78);
        }

        .uh-promo-bottom {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-top: 4px;
        }

        .uh-promo-cta {
          width: 100%;
          max-width: 380px;
          padding: 13px 28px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.45);
          background: linear-gradient(135deg, #ffeb99 0%, #e5c058 50%, #c6992e 100%);
          color: #080602;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.4);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }

        .uh-promo-cta:hover {
          transform: scale(1.02);
          filter: brightness(1.06);
          box-shadow: 0 6px 22px rgba(212, 175, 55, 0.6);
        }

        .uh-promo-cta:active {
          transform: scale(0.98);
        }

        @media (max-width: 640px) {
          .uh-promo-content {
            padding: 22px 18px 18px;
            gap: 16px;
          }

          .uh-promo-top {
            flex-direction: row;
            gap: 14px;
          }

          .uh-promo-crest-wrap {
            width: 80px;
          }

          .uh-promo-title {
            font-size: 16px;
          }

          .uh-promo-subhead {
            font-size: 12px;
          }

          .uh-promo-desc {
            font-size: 11.5px;
          }

          .uh-benefit-text {
            font-size: 11.5px;
          }

          .uh-promo-cta {
            max-width: 100%;
            padding: 11px 20px;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}
