'use client';
import { useCountUp } from '@/hooks/useCountUp';

interface Props {
  to: number | string;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  format?: (n: number) => string;
}

export default function CountUp({ to, duration, decimals, suffix = '', prefix = '', format }: Props) {
  const { ref, display } = useCountUp({ to, duration, decimals, format });
  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>}>
      {prefix}{display}{suffix}
    </span>
  );
}
