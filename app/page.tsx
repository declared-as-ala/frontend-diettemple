'use client';
import { useRouter } from 'next/navigation';
import { useReveal } from '@/hooks/useReveal';
import { ArrowUpRight } from 'lucide-react';

import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Science from '@/components/Science';
import Footer from '@/components/Footer';

export default function Home() {
  const router = useRouter();

  // All "Rejoindre UH" CTAs navigate to the gender-choice + video page
  const joinNow = () => router.push('/rejoindre');

  useReveal();

  return (
    <>
      <Nav onJoin={joinNow} />
      <main>
        <Hero onJoin={joinNow} />
        <Mission />
        <Science onJoin={joinNow} />
      </main>
      <Footer />
      <div className="dt-sticky-cta">
        <button className="dt-btn dt-btn-primary" onClick={joinNow}>
          REJOINDRE UH <ArrowUpRight size={16} />
        </button>
      </div>
    </>
  );
}
