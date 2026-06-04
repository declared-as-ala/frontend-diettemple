/* global React */
const { useEffect: useEffect_H, useRef: useRef_H, useState: useState_H } = React;

/* Trigger a class change when an element enters the viewport.
   Returns a ref to attach. */
function useInView(threshold = 0.25, once = true) {
  const ref = useRef_H(null);
  const [inView, setInView] = useState_H(false);
  useEffect_H(() => {
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

/* Count from 0 to `value` over `duration` ms, easing out, when it scrolls in.
   Pass a formatter for thousands separators / units. */
function CountUp({ to, duration = 1600, format = (n) => n.toLocaleString('fr-FR'), prefix = '', suffix = '', decimals = 0 }) {
  const [ref, inView] = useInView(0.4);
  const [val, setVal] = useState_H(0);
  useEffect_H(() => {
    if (!inView) return;
    const start = performance.now();
    let raf;
    const target = parseFloat(to);
    const step = (t) => {
      const k = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      setVal(target * eased);
      if (k < 1) raf = requestAnimationFrame(step);
      else setVal(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  const display = decimals
    ? val.toFixed(decimals).replace('.', ',')
    : format(Math.round(val));
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

window.useInView = useInView;
window.CountUp = CountUp;
