'use client';
import { useRouter } from 'next/navigation';
import { useReveal } from '@/hooks/useReveal';
import { ArrowUpRight } from 'lucide-react';

import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Movement from '@/components/Movement';
import System from '@/components/System';
import Ranks from '@/components/Ranks';
import AppShowcase from '@/components/AppShowcase';
import Coaching from '@/components/Coaching';
import Products from '@/components/Products';
import Society from '@/components/Society';
import FinalCta from '@/components/FinalCta';
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
        <Movement />
        <System />
        <Ranks />
        <AppShowcase />
        <Coaching />
        <Products />
        <Society />
        <FinalCta onJoin={joinNow} />
      </main>
      <Footer />
      <div className="dt-sticky-cta">
        <button className="dt-btn dt-btn-primary" onClick={joinNow}>
          Rejoindre Ultimate Human <ArrowUpRight size={16} />
        </button>
      </div>
    </>
  );
}
