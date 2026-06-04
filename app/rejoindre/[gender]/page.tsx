'use client';
import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Phone } from 'lucide-react';
import { API_URL } from '@/lib/config';
import JoinModal from '@/components/JoinModal';

/* ── Config ───────────────────────────────────────────────────────────────── */
const API_HOST = API_URL.replace(/\/api\/?$/, '');

const GENDER_META = {
  homme: {
    emoji: '♂',
    label: 'Homme',
    sub: 'Force & Muscle',
    desc: 'Programme conçu pour la transformation masculine : prise de masse, force et nutrition optimisées.',
    prefill: 'ascension',
  },
  femme: {
    emoji: '♀',
    label: 'Femme',
    sub: 'Forme & Vitalité',
    desc: 'Un programme pensé pour la femme moderne : silhouette, tonus et énergie durable.',
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

  useEffect(() => {
    fetch(`${API_HOST}/api/landing/videos`)
      .then(r => r.ok ? r.json() : null)
      .catch(() => null)
      .then(data => {
        const cfg = data?.[gender];
        if (cfg?.videoUrl) setVideoUrl(cfg.videoUrl);
        if (cfg?.title)    setTitle(cfg.title);
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
            <div className="rj-gender-sub">{meta.sub}</div>
          </div>
        </div>

        {/* Video player */}
        <div className="rj-player-wrap">
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
              <div className="rj-player-ctas">
                <a className="dt-btn dt-btn-ghost" href="tel:+21671000000">
                  <Phone size={14} /> Appeler
                </a>
                <button
                  className="dt-btn dt-btn-primary dt-btn-lg"
                  onClick={() => setJoinOpen(true)}
                >
                  Commencer mon parcours <ArrowUpRight size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <JoinModal
        open={joinOpen}
        onClose={() => setJoinOpen(false)}
        prefill={meta.prefill}
      />
    </>
  );
}
