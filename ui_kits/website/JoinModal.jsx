/* global React */
const { useState: useState_J, useEffect: useEffect_J, useRef: useRef_J } = React;

function JoinModal({ open, onClose, prefill }) {
  const [step, setStep] = useState_J(0); // 0 video, 1 form, 2 success
  const [form, setForm] = useState_J({ name: '', email: '', phone: '', goal: 'fat-loss', plan: prefill || 'ascension' });
  const dlgRef = useRef_J(null);

  useEffect_J(() => {
    if (open) {
      setStep(0);
      document.body.style.overflow = 'hidden';
      setTimeout(() => window.lucide && lucide.createIcons(), 30);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect_J(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div className="dt-modal-back" onClick={onClose}>
      <div className="dt-modal" ref={dlgRef} onClick={(e) => e.stopPropagation()}>
        <button className="dt-modal-close" onClick={onClose} aria-label="Fermer"><i data-lucide="x"></i></button>

        {step === 0 && (
          <div className="dt-modal-stage">
            <div className="dt-modal-eyebrow">— L'invitation · 90 secondes</div>
            <h2 className="dt-modal-title">Bienvenue dans le Temple.</h2>
            <div className="dt-modal-video">
              <div className="dt-modal-video-bg" />
              <div className="dt-modal-video-grain" />
              <div className="dt-modal-video-fig" />
              <button className="dt-modal-play" onClick={() => setStep(0)}>
                <i data-lucide="play"></i>
              </button>
              <div className="dt-modal-video-meta">
                <span className="dt-modal-video-eb">— Présentation · 1:32</span>
                <span className="dt-modal-video-eb">DT — UHS</span>
              </div>
              <div className="dt-modal-video-label">Vidéo · présentation du système Ultimate Human</div>
            </div>
            <div className="dt-modal-actions">
              <a className="dt-btn dt-btn-ghost dt-btn-lg" href="tel:+21671000000">
                <i data-lucide="phone"></i> Appeler · +216 71 000 000
              </a>
              <button className="dt-btn dt-btn-primary dt-btn-lg" onClick={() => setStep(1)}>
                Demander un rappel <i data-lucide="arrow-up-right"></i>
              </button>
            </div>
            <div className="dt-modal-foot">
              <span><i data-lucide="shield"></i>Vos données restent dans le Temple</span>
              <span><i data-lucide="clock"></i>Rappel sous 24h ouvrées</span>
            </div>
          </div>
        )}

        {step === 1 && (
          <form className="dt-modal-stage" onSubmit={submit}>
            <button type="button" className="dt-modal-back-btn" onClick={() => setStep(0)}>
              <i data-lucide="arrow-left"></i> Retour
            </button>
            <div className="dt-modal-eyebrow">— Demande de rappel</div>
            <h2 className="dt-modal-title">Un conseiller vous appelle.</h2>
            <p className="dt-modal-sub">
              Remplissez le formulaire. Un conseiller DietTemple vous contacte sous 24h ouvrées pour échanger sur vos objectifs et choisir la formule adaptée.
            </p>
            <div className="dt-modal-grid">
              <Field label="Nom complet" required>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Sahil Karim" />
              </Field>
              <Field label="Téléphone" required>
                <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+216 50 123 456" />
              </Field>
              <Field label="Email" required full>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="vous@diettemple.com" />
              </Field>
              <Field label="Objectif principal">
                <select value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })}>
                  <option value="fat-loss">Perte de masse grasse</option>
                  <option value="muscle">Prise de muscle</option>
                  <option value="recomp">Recomposition corporelle</option>
                  <option value="performance">Performance sportive</option>
                  <option value="wellness">Santé & longévité</option>
                </select>
              </Field>
              <Field label="Formule envisagée">
                <select value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })}>
                  <option value="fondation">Fondation · 590 TND/mois</option>
                  <option value="ascension">Ascension · 990 TND/mois</option>
                  <option value="elite">Elite · sur entretien</option>
                  <option value="undecided">À déterminer avec le conseiller</option>
                </select>
              </Field>
            </div>
            <label className="dt-modal-consent">
              <input type="checkbox" required defaultChecked />
              <span>J'accepte d'être contacté par DietTemple concernant ma demande.</span>
            </label>
            <button className="dt-btn dt-btn-primary dt-btn-lg" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
              Demander mon rappel <i data-lucide="arrow-up-right"></i>
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="dt-modal-stage dt-modal-success">
            <div className="dt-modal-success-mark">
              <i data-lucide="check"></i>
            </div>
            <div className="dt-modal-eyebrow">— Demande reçue</div>
            <h2 className="dt-modal-title">Le Temple vous a entendu.</h2>
            <p className="dt-modal-sub">
              Un conseiller vous rappelle au <b>{form.phone || 'numéro indiqué'}</b> sous 24 heures ouvrées.
              D'ici là, parcourez le système et préparez vos questions.
            </p>
            <div className="dt-modal-actions">
              <a className="dt-btn dt-btn-ghost dt-btn-lg" href="tel:+21671000000">
                <i data-lucide="phone"></i> Ou appelez maintenant
              </a>
              <button className="dt-btn dt-btn-primary dt-btn-lg" onClick={onClose}>
                Retourner au site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, required, full, children }) {
  return (
    <label className={`dt-field ${full ? 'is-full' : ''}`}>
      <span className="dt-field-l">{label}{required && <em>*</em>}</span>
      {children}
    </label>
  );
}

window.JoinModal = JoinModal;
