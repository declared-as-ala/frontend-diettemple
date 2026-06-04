'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Phone, Check } from 'lucide-react';
import { API_URL } from '@/lib/config';
import JoinModal from '@/components/JoinModal';

/* ── Types ─────────────────────────────────────────────────────────────────── */
type Gender = 'homme' | 'femme';
interface VideoConfig { title: string; description: string; videoUrl: string; }
interface Videos { homme: VideoConfig | null; femme: VideoConfig | null; }

/* ── Helpers ────────────────────────────────────────────────────────────────── */
function isYouTube(url: string) {
  return url.includes('youtube.com') || url.includes('youtu.be');
}
function isVimeo(url: string) {
  return url.includes('vimeo.com');
}
function youtubeEmbed(url: string) {
  const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0` : url;
}
function vimeoEmbed(url: string) {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m ? `https://player.vimeo.com/video/${m[1]}?autoplay=1` : url;
}

/* ── Video player ───────────────────────────────────────────────────────────── */
function VideoPlayer({ url }: { url: string }) {
  if (!url) return (
    <div className="rj-placeholder">
      <div className="rj-placeholder-icon">🎬</div>
      <p>Vidéo à configurer</p>
    </div>
  );
  if (isYouTube(url)) return (
    <iframe
      src={youtubeEmbed(url)}
      className="rj-iframe"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowFullScreen
    />
  );
  if (isVimeo(url)) return (
    <iframe
      src={vimeoEmbed(url)}
      className="rj-iframe"
      allow="autoplay; fullscreen"
      allowFullScreen
    />
  );
  return <video src={url} controls autoPlay playsInline className="rj-video" />;
}

/* ── Main page ──────────────────────────────────────────────────────────────── */
export default function RejoindrePage() {
  const [videos,    setVideos]    = useState<Videos>({ homme: null, femme: null });
  const [loading,   setLoading]   = useState(true);
  const [selected,  setSelected]  = useState<Gender | null>(null);
  const [joinOpen,  setJoinOpen]  = useState(false);

  /* fetch video config */
  useEffect(() => {
    fetch(`${API_URL.replace('/api', '')}/api/landing/videos`)
      .then(r => r.ok ? r.json() : null)
      .catch(() => null)
      .then(data => {
        if (data) setVideos(data);
        setLoading(false);
      });
  }, []);

  const cfg = selected ? videos[selected] : null;

  const genderMeta: Record<Gender, { emoji: string; label: string; sub: string; desc: string }> = {
    homme: {
      emoji: '♂',
      label: 'Homme',
      sub: 'Force & Muscle',
      desc: 'Programme conçu pour la transformation masculine : prise de masse, force et nutrition optimisées.',
    },
    femme: {
      emoji: '♀',
      label: 'Femme',
      sub: 'Forme & Vitalité',
      desc: 'Un programme pensé pour la femme moderne : silhouette, tonus et énergie durable.',
    },
  };

  return (
    <>
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
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

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <main className="rj-main">
        {/* Ambient glow */}
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

        {/* ── Gender cards ─────────────────────────────────────────────── */}
        <div className="rj-cards">
          {(['homme', 'femme'] as Gender[]).map(g => (
            <button
              key={g}
              className={`rj-card rj-card-${g}${selected === g ? ' is-active' : ''}`}
              onClick={() => setSelected(prev => prev === g ? null : g)}
            >
              {selected === g && (
                <div className="rj-card-check"><Check size={16} strokeWidth={3} /></div>
              )}
              <div className="rj-card-badge">{genderMeta[g].emoji}</div>
              <div className="rj-card-label">{genderMeta[g].label}</div>
              <div className="rj-card-sub">{genderMeta[g].sub}</div>
            </button>
          ))}
        </div>

        {/* ── Video player ─────────────────────────────────────────────── */}
        {selected && (
          <div className="rj-player-wrap">
            <div className="rj-player">
              <div className="rj-player-head">
                <span className="rj-player-badge">{genderMeta[selected].emoji}</span>
                <div>
                  <div className="rj-player-title">
                    {cfg?.title || `Programme ${genderMeta[selected].label}`}
                  </div>
                  <div className="rj-player-sub-label">Votre voie · DietTemple</div>
                </div>
              </div>

              <div className="rj-player-screen">
                {loading ? (
                  <div className="rj-placeholder"><div className="rj-spinner" /></div>
                ) : (
                  <VideoPlayer url={cfg?.videoUrl || ''} />
                )}
              </div>

              <div className="rj-player-foot">
                <p className="rj-player-desc">
                  {cfg?.description || genderMeta[selected].desc}
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
        )}

        {!selected && (
          <p className="rj-hint">↑ Sélectionnez votre programme pour continuer</p>
        )}
      </main>

      {/* Registration modal */}
      <JoinModal
        open={joinOpen}
        onClose={() => setJoinOpen(false)}
        prefill={selected === 'femme' ? 'fondation' : 'ascension'}
      />
    </>
  );
}
