'use client';
import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Phone, CalendarCheck } from 'lucide-react';
import { API_URL, CONTACT_PHONE } from '@/lib/config';
import JoinModal from '@/components/JoinModal';

/* ── Config ───────────────────────────────────────────────────────────────── */
const API_HOST = API_URL.replace(/\/api\/?$/, '');

const GENDER_META = {
  homme: {
    emoji: '♂',
    label: 'Homme',
    desc: 'Programme conçu pour la transformation masculine : force, hypertrophie et nutrition clinique sur mesure.',
    prefill: 'ascension',
  },
  femme: {
    emoji: '♀',
    label: 'Femme',
    desc: 'Un programme pensé pour la femme : tonus, recomposition corporelle et énergie durable.',
    prefill: 'fondation',
  },
} as const;

type Gender = keyof typeof GENDER_META;

/* ── Video helpers ────────────────────────────────────────────────────────── */
function resolveUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_HOST}${url.startsWith('/') ? '' : '/'}${url}`;
}

function VideoPlayer({ url }: { url: string }) {
  const src = resolveUrl(url);
  if (!src) return (
    <div className="rj-placeholder">
      <div className="rj-placeholder-icon">🎬</div>
      <p>Vidéo en cours de configuration</p>
    </div>
  );
  if (src.includes('youtube.com') || src.includes('youtu.be')) {
    const m = src.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    const embedSrc = m ? `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0` : src;
    return <iframe src={embedSrc} className="rj-iframe" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />;
  }
  if (src.includes('vimeo.com')) {
    const m = src.match(/vimeo\.com\/(\d+)/);
    const embedSrc = m ? `https://player.vimeo.com/video/${m[1]}?autoplay=1` : src;
    return <iframe src={embedSrc} className="rj-iframe" allow="autoplay; fullscreen" allowFullScreen />;
  }
  return <video src={src} controls autoPlay playsInline className="rj-video" />;
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function GenderPage() {
  const params   = useParams();
  const gender   = params?.gender as string;

  // Validate gender param
  if (!['homme', 'femme'].includes(gender)) notFound();

  const meta     = GENDER_META[gender as Gender];
  const [videoUrl, setVideoUrl] = useState('');
  const [title,    setTitle]    = useState('');
  const [desc,     setDesc]     = useState('');
  const [loading,  setLoading]  = useState(true);
  const [joinOpen, setJoinOpen] = useState(false);
  const [started,  setStarted]  = useState(false);

  useEffect(() => {
    fetch(`${API_HOST}/api/landing/videos`)
      .then(r => r.ok ? r.json() : null)
      .catch(() => null)
      .then(data => {
        const cfg = data?.[gender];
        // Prefer the backend stream endpoint (bypasses Caddy→MinIO) over raw videoUrl
        if (cfg?.streamUrl) setVideoUrl(`${API_HOST}${cfg.streamUrl}`);
        else if (cfg?.videoUrl) setVideoUrl(cfg.videoUrl);
        if (cfg?.title)       setTitle(cfg.title);
        if (cfg?.description) setDesc(cfg.description);
        setLoading(false);
      });
  }, [gender]);

  return (
    <>
      {/* Top bar */}
      <div className="rj-bar">
        <div className="rj-bar-inner">
          <Link href="/rejoindre" className="rj-back">
            <ArrowLeft size={14} /> Choisir
          </Link>
          <Link href="/" className="dt-brand">
            <Image src="/logo.webp" alt="DietTemple" width={26} height={26} />
            <span>Diet<em>Temple</em></span>
          </Link>
          <div className="rj-step">Étape 2 · Votre programme</div>
        </div>
      </div>

      <main className="rj-main rj-main-video">
        <div className="rj-bg" aria-hidden="true" />

        {/* Gender badge */}
        <div className="rj-gender-badge">
          <span className="rj-gender-emoji">{meta.emoji}</span>
          <div>
            <div className="rj-gender-label">{meta.label}</div>
            <div className="rj-gender-sub">Ultimate Human Society</div>
          </div>
        </div>

        {/* Collapsible Video Player Section */}
        <div className={`rj-player-transition-wrap ${started ? 'is-collapsed' : ''}`}>
          <div className="rj-player">

            <div className="rj-player-head">
              <span className="rj-player-badge">{meta.emoji}</span>
              <div>
                <div className="rj-player-title">
                  {title || `Programme ${meta.label} — DietTemple`}
                </div>
                <div className="rj-player-sub-label">Votre voie · Ultimate Human</div>
              </div>
            </div>

            <div className="rj-player-screen">
              {loading
                ? <div className="rj-placeholder"><div className="rj-spinner" /></div>
                : <VideoPlayer url={videoUrl} />
              }
            </div>

            <div className="rj-player-foot">
              <p className="rj-player-desc">
                {desc || meta.desc}
              </p>
              {/* Initial state: single primary CTA "Commencer mon parcours" */}
              <div className="rj-player-ctas" style={{ justifyContent: 'center' }}>
                <button
                  className="dt-btn dt-btn-primary dt-btn-lg"
                  onClick={() => setStarted(true)}
                  style={{ minWidth: 260, justifyContent: 'center' }}
                >
                  COMMENCER MON PARCOURS <ArrowUpRight size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Post-"Commencer mon parcours" Contact Actions */}
        {started && (
          <div className="rj-contact-stage">
            <div className="dt-eyebrow" style={{ color: 'var(--volt)', marginBottom: 12 }}>
              — Prêt pour votre transformation
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: 'var(--bone)',
              margin: '0 0 14px',
              textAlign: 'center',
            }}>
              Activez votre parcours UH {meta.label}
            </h2>
            <p style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: 'var(--bone-2)',
              maxWidth: '52ch',
              margin: '0 auto',
            }}>
              Prenez rendez-vous directement pour votre évaluation diagnostique ou appelez notre équipe dédiée pour échanger immédiatement.
            </p>

            <div className="rj-contact-actions">
              <button
                className="dt-btn dt-btn-primary dt-btn-lg"
                onClick={() => setJoinOpen(true)}
              >
                <CalendarCheck size={18} /> DEMANDER UN RENDEZ-VOUS
              </button>
              <a
                className="dt-btn dt-btn-ghost dt-btn-lg"
                href={`tel:${CONTACT_PHONE}`}
              >
                <Phone size={18} /> APPELER
              </a>
            </div>
          </div>
        )}

      </main>

      <JoinModal
        open={joinOpen}
        onClose={() => setJoinOpen(false)}
        prefill={meta.prefill}
      />
    </>
  );
}
