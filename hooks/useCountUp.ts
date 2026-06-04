'use client';
import { useEffect, useState } from 'react';
import { useInView } from './useInView';

interface CountUpOptions {
  to: number | string;
  duration?: number;
  decimals?: number;
  format?: (n: number) => string;
}

export function useCountUp({ to, duration = 1600, decimals = 0, format }: CountUpOptions) {
  const [ref, inView] = useInView(0.4);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf: number;
    const target = parseFloat(String(to));
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      setVal(target * eased);
      if (k < 1) raf = requestAnimationFrame(step);
      else setVal(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  const defaultFormat = (n: number) => n.toLocaleString('fr-FR');
  const display = decimals
    ? val.toFixed(decimals).replace('.', ',')
    : (format ?? defaultFormat)(Math.round(val));

  return { ref, display };
}
