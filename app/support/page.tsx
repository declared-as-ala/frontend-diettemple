'use client';

import { useState } from 'react';
import styles from './support.module.css';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general',
    priority: 'medium',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.diettemple.tn/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erreur lors de la soumission');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general',
        priority: 'medium',
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.supportContainer}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.highlight}>Support</span> DietTemple
          </h1>
          <p className={styles.heroSubtitle}>
            Nous sommes là pour vous aider. Contactez-nous avec vos questions ou préoccupations.
          </p>
        </div>
        <div className={styles.heroGlow}></div>
      </section>

      <div className={styles.contentWrapper}>
        {/* Form Section */}
        <section className={styles.formSection}>
          <div className={styles.formCard}>
            {submitted && (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <div className={styles.successText}>
                  <h3>Demande soumise avec succès!</h3>
                  <p>Nous vous répondrons dans les 24 heures.</p>
                </div>
              </div>
            )}

            {error && (
              <div className={styles.errorMessage}>
                <div className={styles.errorIcon}>⚠</div>
                <div className={styles.errorText}>
                  <h3>Erreur</h3>
                  <p>{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Name */}
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Nom complet <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                  className={styles.input}
                />
              </div>

              {/* Email */}
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Adresse email <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  required
                  className={styles.input}
                />
              </div>

              {/* Category & Priority */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="category" className={styles.label}>
                    Catégorie <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="general">Question générale</option>
                    <option value="technical">Problème technique</option>
                    <option value="billing">Facturation</option>
                    <option value="feedback">Retour d'expérience</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="priority" className={styles.label}>
                    Priorité <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>
                  Sujet <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Sujet de votre demande"
                  required
                  className={styles.input}
                />
              </div>

              {/* Message */}
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Message <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre problème ou votre question en détail..."
                  required
                  className={styles.textarea}
                  rows={6}
                />
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={loading} className={styles.submitButton}>
                <span>{loading ? 'Envoi en cours...' : 'Envoyer la demande'}</span>
                {!loading && <span className={styles.arrow}>→</span>}
              </button>

              <p className={styles.formFooter}>
                Nous répondons à toutes les demandes dans les 24 heures.
              </p>
            </form>
          </div>

          {/* Info Cards */}
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>💬</div>
              <h3>Support par Email</h3>
              <p>support@diettemple.tn</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>⏱️</div>
              <h3>Temps de réponse</h3>
              <p>Dans les 24 heures</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📚</div>
              <h3>Centre d'aide</h3>
              <p>FAQ et guides disponibles</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
