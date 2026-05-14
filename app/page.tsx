'use client';
import { useState } from 'react';
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
import JoinModal from '@/components/JoinModal';

export default function Home() {
  const [joinOpen, setJoinOpen] = useState(false);
  const open = () => setJoinOpen(true);
  const close = () => setJoinOpen(false);

  useReveal();

  return (
    <>
      <Nav onJoin={open} />
      <main>
        <Hero onJoin={open} />
        <Movement />
        <System />
        <Ranks />
        <AppShowcase />
        <Coaching />
        <Products />
        <Society />
        <FinalCta onJoin={open} />
      </main>
      <Footer />
      <div className="dt-sticky-cta">
        <button className="dt-btn dt-btn-primary" onClick={open}>
          Rejoindre Ultimate Human <ArrowUpRight size={16} />
        </button>
      </div>
      <JoinModal open={joinOpen} onClose={close} />
    </>
  );
}
