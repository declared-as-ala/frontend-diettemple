'use client';
import { useEffect, useRef, useState } from 'react';

export function useInView(threshold = 0.25, once = true): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) io.unobserve(el);
      } else if (!once) {
        setInView(false);
      }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  return [ref, inView];
}
