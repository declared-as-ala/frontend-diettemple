'use client';
import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Phone, CalendarCheck, Check } from 'lucide-react';
import { API_URL, CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '@/lib/config';

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

  const meta       = GENDER_META[gender as Gender];
  const [videoUrl,   setVideoUrl]   = useState('');
  const [title,      setTitle]      = useState('');
  const [desc,       setDesc]       = useState('');
  const [loading,    setLoading]    = useState(true);
  const [showForm,   setShowForm]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [form,       setForm]       = useState({ name: '', email: '', phone: '' });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          gender,
          plan: meta.prefill,
          source: `rejoindre-${gender}`,
        }),
      });
    } catch {
      // still show success even if network drops
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

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
          <div className="rj-step">
            {showForm ? 'Étape 3 · Rendez-vous' : 'Étape 2 · Votre programme'}
          </div>
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

        {/* Collapsible Video Presentation Section */}
        <div className={`rj-player-transition-wrap ${showForm ? 'is-collapsed' : ''}`}>
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
              {/* Single primary CTA without Appeler */}
              <div className="rj-player-ctas" style={{ justifyContent: 'center' }}>
                <button
                  className="dt-btn dt-btn-primary dt-btn-lg"
                  onClick={() => {
                    setShowForm(true);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  style={{ minWidth: 280, justifyContent: 'center' }}
                  id="btn-demander-rdv"
                >
                  <CalendarCheck size={18} /> DEMANDER UN RENDEZ-VOUS
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Appointment Form Section directly revealed upon clicking CTA */}
        {showForm && (
          <div className="rj-appointment-stage">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="rj-form-wrapper">
                <button
                  type="button"
                  className="dt-modal-back-btn"
                  onClick={() => setShowForm(false)}
                  style={{ marginBottom: 14 }}
                >
                  <ArrowLeft size={14} /> Revoir la présentation
                </button>

                <div className="dt-eyebrow" style={{ color: 'var(--volt)', marginBottom: 8 }}>
                  — Diagnostic &amp; Accompagnement sur mesure
                </div>

                <h2 className="rj-form-title">
                  PRENEZ RENDEZ-VOUS
                </h2>

                <p className="rj-form-sub">
                  Remplissez vos coordonnées pour le programme UH <strong>{meta.label}</strong>. Un conseiller DietTemple vous contacte sous 24h ouvrées pour fixer votre entretien et répondre à vos questions.
                </p>

                <div className="dt-modal-grid" style={{ marginTop: 24 }}>
                  <label className="dt-field">
                    <span className="dt-field-l">Nom complet<em>*</em></span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Votre nom complet"
                    />
                  </label>

                  <label className="dt-field">
                    <span className="dt-field-l">Téléphone<em>*</em></span>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+216 50 123 456"
                    />
                  </label>

                  <label className="dt-field is-full">
                    <span className="dt-field-l">Email<em>*</em></span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="vous@exemple.com"
                    />
                  </label>
                </div>

                <label className="dt-modal-consent" style={{ marginTop: 18 }}>
                  <input type="checkbox" required defaultChecked />
                  <span>J&apos;accepte d&apos;être contacté par l&apos;équipe DietTemple concernant ma demande.</span>
                </label>

                <button
                  className="dt-btn dt-btn-primary dt-btn-lg"
                  type="submit"
                  disabled={submitting}
                  style={{ width: '100%', justifyContent: 'center', marginTop: 24 }}
                  id="btn-confirmer-rdv"
                >
                  {submitting ? 'Envoi en cours…' : <>DEMANDER MON RENDEZ-VOUS <ArrowUpRight size={16} /></>}
                </button>

                {/* Relocated Call action at the bottom of the appointment form */}
                <div className="rj-call-section">
                  <div className="rj-call-divider" />
                  <p className="rj-call-title">Vous préférez nous appeler ?</p>
                  <a
                    className="dt-btn dt-btn-ghost dt-btn-lg rj-call-btn"
                    href={`tel:${CONTACT_PHONE}`}
                    id="btn-call-rdv"
                  >
                    <Phone size={16} /> APPELER · {CONTACT_PHONE_DISPLAY}
                  </a>
                </div>
              </form>
            ) : (
              <div className="dt-modal-stage dt-modal-success" style={{ padding: '36px 20px' }}>
                <div className="dt-modal-success-mark"><Check size={36} /></div>
                <div className="dt-modal-eyebrow" style={{ marginTop: 16 }}>— Rendez-vous enregistré</div>
                <h2 className="dt-modal-title" style={{ marginTop: 8 }}>Le Temple vous a entendu.</h2>
                <p className="dt-modal-sub" style={{ marginTop: 12, maxWidth: '48ch' }}>
                  Un conseiller vous contacte au <b>{form.phone || 'numéro indiqué'}</b> sous 24 heures ouvrées pour confirmer votre rendez-vous pour le programme <b>{meta.label}</b>.
                </p>
                <div className="rj-call-section" style={{ borderTop: 'none', paddingTop: 16 }}>
                  <p className="rj-call-title">Besoin d&apos;échanger immédiatement ?</p>
                  <a className="dt-btn dt-btn-ghost dt-btn-lg rj-call-btn" href={`tel:${CONTACT_PHONE}`}>
                    <Phone size={16} /> APPELER MAINTENANT · {CONTACT_PHONE_DISPLAY}
                  </a>
                </div>
                <div style={{ marginTop: 24 }}>
                  <Link href="/" className="dt-btn dt-btn-primary dt-btn-lg">
                    Retourner au site
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

      </main>
    </>
  );
}
