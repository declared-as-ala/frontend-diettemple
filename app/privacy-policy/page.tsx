import type { Metadata } from 'next';
import styles from './privacy-policy.module.css';

export const metadata: Metadata = {
  title: 'DietTemple Privacy Policy',
  description:
    'How DietTemple collects, uses, stores, and protects your personal, health, nutrition, and meal-photo data across our mobile app and website.',
  alternates: { canonical: 'https://diettemple.tn/privacy-policy' },
};

const EFFECTIVE_DATE = '2026-08-01';
const LAST_UPDATED = '2026-08-01';

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Legal</p>
          <h1 className={styles.title}>DietTemple Privacy Policy</h1>
          <p className={styles.meta}>
            Effective date: {EFFECTIVE_DATE} &middot; Last updated: {LAST_UPDATED}
          </p>
        </header>

        <section className={styles.section}>
          <p>
            This Privacy Policy explains how <strong>DietTemple</strong> (&ldquo;DietTemple&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, stores, shares, and protects
            information when you use the DietTemple mobile application (Android and iOS) and the
            DietTemple website at <strong>diettemple.tn</strong> (together, the &ldquo;Service&rdquo;).
          </p>
          <p>
            DietTemple is operated by <strong>[LEGAL ENTITY]</strong>, as listed as the developer
            on the Google Play Store and Apple App Store listings for DietTemple. If you have any
            question about this policy or your data, contact us at{' '}
            <a href="mailto:support@diettemple.tn">support@diettemple.tn</a>.
          </p>
        </section>

        <nav className={styles.toc} aria-label="Table of contents">
          <ol>
            <li><a href="#information-we-collect">Information we collect</a></li>
            <li><a href="#meal-photos">Meal &amp; gym-verification photos</a></li>
            <li><a href="#why-we-process">Why we process your information</a></li>
            <li><a href="#sharing">Sharing with service providers</a></li>
            <li><a href="#retention">Data retention</a></li>
            <li><a href="#your-rights">Your rights &amp; account deletion</a></li>
            <li><a href="#security">Security</a></li>
            <li><a href="#children">Children&apos;s privacy</a></li>
            <li><a href="#international">International data transfers</a></li>
            <li><a href="#changes">Changes to this policy</a></li>
            <li><a href="#contact">Contact us</a></li>
          </ol>
        </nav>

        <section id="information-we-collect" className={styles.section}>
          <h2>1. Information we collect</h2>

          <h3>Account information</h3>
          <p>
            When you register, we collect your <strong>name, email address, phone number, and
            password</strong> (stored as a hashed value only — we never store your password in
            plain text). We assign an internal account role and, where applicable, link your
            account to an assigned training plan and subscription.
          </p>

          <h3>Profile information</h3>
          <p>
            You may provide additional profile information such as your <strong>age, sex/gender,
            weight, height, fitness goal, and a profile photo</strong>.
          </p>

          <h3>Health, nutrition, and body information</h3>
          <p>
            To provide personalized coaching, DietTemple collects and stores:
          </p>
          <ul>
            <li>Nutrition targets and daily macro/calorie logs (calories, protein, carbs, fat, water intake);</li>
            <li>Body composition data you or your coach enter (e.g. body-fat percentage, muscle-mass percentage, weight);</li>
            <li>Fitness level and workout history, including completed training sessions, sets, reps, and weights used;</li>
            <li>Progress/body photos you choose to upload to track your transformation over time.</li>
          </ul>

          <h3>Technical information</h3>
          <p>
            We automatically process standard request metadata needed to operate the Service
            (such as authentication tokens and API request logs). DietTemple does not currently
            integrate third-party analytics or crash-reporting SDKs in the mobile app.
          </p>
        </section>

        <section id="meal-photos" className={styles.section}>
          <h2>2. Meal &amp; gym-verification photos</h2>
          <p>
            To log a meal, you either <strong>take a new photo with your device camera</strong> or{' '}
            <strong>select one existing photo using your device&apos;s system photo picker</strong>{' '}
            (Android Photo Picker / iOS Photos picker). DietTemple does not request broad access
            to your photo library — the picker only shares the single image you explicitly choose,
            and the app cannot browse, list, or access any other photo on your device.
          </p>
          <p>
            <strong>The photo you select or capture is uploaded to DietTemple&apos;s servers</strong>{' '}
            and is sent to a third-party AI vision provider (<strong>Google Gemini</strong>) so it can automatically estimate the meal&apos;s
            calories and macronutrients. The same mechanism is used for the optional gym
            check-in / presence-verification photo, which is analyzed by the same provider to
            confirm you are at the gym.
          </p>
          <p>
            Progress/body photos you separately upload for your own tracking history are stored on
            our servers but are <strong>not</strong> sent to any AI analysis provider.
          </p>
        </section>

        <section id="why-we-process" className={styles.section}>
          <h2>3. Why we process your information</h2>
          <ul>
            <li><strong>To provide the Service</strong> — create your account, assign and display your training/nutrition plan, track workouts and meals, and show your progress.</li>
            <li><strong>To personalize coaching</strong> — compute nutrition targets, adjust training plans, and estimate meal macros from photos.</li>
            <li><strong>To process payments</strong> — manage your subscription and orders.</li>
            <li><strong>To provide support</strong> — respond to help requests sent via the app or support@diettemple.tn.</li>
            <li><strong>To maintain security</strong> — authenticate your account and protect against abuse.</li>
          </ul>
        </section>

        <section id="sharing" className={styles.section}>
          <h2>4. Sharing with service providers</h2>
          <p>
            We do not sell your personal information. We share information only with the
            service providers necessary to operate DietTemple, each acting under contractual
            confidentiality obligations:
          </p>
          <ul>
            <li><strong>Hosting &amp; database:</strong> MongoDB Atlas (database hosting) and our application server host, [HOSTING PROVIDER], to run the DietTemple API and store your data.</li>
            <li><strong>AI meal / gym-photo analysis:</strong> Google Gemini receives the specific photo you submit, solely to return an analysis result.</li>
            <li><strong>Authentication:</strong> DietTemple uses its own email/password authentication (JSON Web Tokens). We do not currently offer or use third-party social sign-in (e.g. Google or Apple Sign-In).</li>
            <li><strong>Payments &amp; subscriptions:</strong> ClickToPay, operated by Société Monétique Tunisie, processes card payments for subscriptions and orders. DietTemple does not store your full card number.</li>
            <li><strong>App distribution &amp; updates:</strong> Expo / Expo Application Services (EAS) is used to build and deliver app updates.</li>
            <li><strong>Analytics &amp; crash reporting:</strong> none currently integrated in the mobile app.</li>
            <li><strong>Legal requirements:</strong> we may disclose information if required by law, regulation, or valid legal process.</li>
          </ul>
        </section>

        <section id="retention" className={styles.section}>
          <h2>5. Data retention</h2>
          <p>
            We retain your account and health/nutrition data for as long as your account is
            active, and for <strong>[DATA RETENTION PERIOD]</strong> after account deletion, except
            where a longer period is required by law. Order records may be retained after account
            deletion for financial, tax, and accounting record-keeping purposes.
          </p>
        </section>

        <section id="your-rights" className={styles.section}>
          <h2>6. Your rights &amp; account deletion</h2>
          <p>
            Depending on your location, you may have the right to access, correct, export, or
            delete your personal data, and to object to or restrict certain processing.
          </p>
          <p>
            <strong>You can delete your account and associated personal data directly from the
            app:</strong> Profile → Account → Delete account. This permanently removes your user
            record and personal data (subscription, training/nutrition history, meal and workout
            logs, progress photos, check-ins). Order records are retained as described in{' '}
            <a href="#retention">Data retention</a> for financial record-keeping.
          </p>
          <p>
            You can also request deletion or exercise any other privacy right by emailing{' '}
            <a href="mailto:support@diettemple.tn">support@diettemple.tn</a>.
          </p>
        </section>

        <section id="security" className={styles.section}>
          <h2>7. Security</h2>
          <p>
            We use industry-standard measures to protect your information, including encrypted
            transport (HTTPS/TLS) for all API traffic, hashed password storage, and authenticated,
            token-based API access. No method of transmission or storage is 100% secure, and we
            cannot guarantee absolute security.
          </p>
        </section>

        <section id="children" className={styles.section}>
          <h2>8. Children&apos;s privacy</h2>
          <p>
            DietTemple is not directed at children under 16, and we do not knowingly collect
            personal information from children under 16. If we become aware that we have
            collected such information, we will delete it.
          </p>
        </section>

        <section id="international" className={styles.section}>
          <h2>9. International data transfers</h2>
          <p>
            DietTemple is based in Tunisia. Some of our service providers (including database
            hosting, AI photo analysis, and payment processing) may process your data outside
            Tunisia, including in the European Union and/or the United States. Where this occurs,
            we rely on our providers&apos; contractual and technical safeguards to protect your
            information.
          </p>
        </section>

        <section id="changes" className={styles.section}>
          <h2>10. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will update the &ldquo;Last
            updated&rdquo; date above when we do, and, for material changes, provide additional
            notice (such as an in-app notification).
          </p>
        </section>

        <section id="contact" className={styles.section}>
          <h2>11. Contact us</h2>
          <p>
            DietTemple — <strong>[LEGAL ENTITY]</strong>
            <br />
            Email: <a href="mailto:support@diettemple.tn">support@diettemple.tn</a>
            <br />
            Support form: <a href="https://diettemple.tn/support">diettemple.tn/support</a>
          </p>
        </section>
      </div>
    </main>
  );
}
