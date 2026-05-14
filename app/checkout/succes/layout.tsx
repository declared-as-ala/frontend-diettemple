import { Suspense } from 'react';

export default function SuccesLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
