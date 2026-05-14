'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Zap, Shield, Lock } from 'lucide-react';
import { useAuth } from '@/lib/authContext';

function SignInForm() {
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get('from') ?? '/produits';

  const [form, setForm]     = useState({ emailOrPhone: '', password: '' });
  const [show, setShow]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');

  useEffect(() => {
    if (isLoggedIn) router.replace(redirect);
  }, [isLoggedIn, redirect, router]);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.emailOrPhone, form.password);
      router.replace(redirect);
    } catch (err: any) {
      setError(err.message ?? 'Erreur de connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dt-signin-card">
      {/* Logo */}
      <Link href="/" className="dt-signin-brand">
        <Image src="/logo.webp" alt="DietTemple" width={36} height={36} />
        <span>Diet<em>Temple</em></span>
      </Link>

      <div className="dt-signin-head">
        <div className="dt-signin-eyebrow"><Zap size={11} /> Espace membre</div>
        <h1 className="dt-signin-title">Connexion</h1>
        <p className="dt-signin-sub">Accédez à votre espace personnel et à vos tarifs membres.</p>
      </div>

      <form onSubmit={handle} className="dt-signin-form">
        <div className="dt-field">
          <label className="dt-field-l">Email ou téléphone</label>
          <input
            type="text"
            required
            autoFocus
            autoComplete="username"
            placeholder="email@exemple.com ou 2X XXX XXX"
            value={form.emailOrPhone}
            onChange={e => setForm(f => ({ ...f, emailOrPhone: e.target.value }))}
          />
        </div>

        <div className="dt-field">
          <label className="dt-field-l">Mot de passe</label>
          <div className="dt-signin-pw-wrap">
            <input
              type={show ? 'text' : 'password'}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            />
            <button type="button" className="dt-signin-pw-toggle" onClick={() => setShow(s => !s)} tabIndex={-1}>
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && <div className="dt-checkout-error">{error}</div>}

        <button type="submit" className="dt-btn dt-btn-primary dt-btn-lg dt-signin-submit" disabled={loading}>
          {loading
            ? <span className="dt-signin-loading"><span className="dt-spin-ring" />Connexion…</span>
            : <><Lock size={15} /> Se connecter <ArrowRight size={15} /></>
          }
        </button>
      </form>

      <div className="dt-signin-footer">
        <Shield size={12} />
        <span>Pas de compte ? Rejoignez-nous via l&apos;application mobile.</span>
        <Link href="/" className="dt-signin-home-link">Retour à l&apos;accueil</Link>
      </div>
    </div>
  );
}

export default function ConnexionPage() {
  return (
    <div className="dt-signin-page">
      {/* Background */}
      <div className="dt-signin-bg">
        <div className="dt-signin-bg-grad" />
        <div className="dt-cine-grain" />
      </div>

      {/* Floating features */}
      <div className="dt-signin-features">
        {[
          { icon: '⚡', title: 'Tarifs membres', desc: 'Jusqu\'à −30% sur les produits' },
          { icon: '🎯', title: 'Coaching',        desc: 'Suivi nutritionnel personnalisé' },
          { icon: '📱', title: 'Application',     desc: 'Accès complet à l\'app UH' },
        ].map(f => (
          <div key={f.title} className="dt-signin-feature">
            <span className="dt-signin-feature-icon">{f.icon}</span>
            <div>
              <div className="dt-signin-feature-title">{f.title}</div>
              <div className="dt-signin-feature-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <Suspense>
        <SignInForm />
      </Suspense>
    </div>
  );
}
