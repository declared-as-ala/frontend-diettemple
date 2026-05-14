import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cartContext';
import { AuthProvider } from '@/lib/authContext';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'DietTemple — Devenez l\'Ultimate Human',
  description: 'Une société de transformation. Nutrition scientifique, entraînement intelligent, coaching hebdomadaire, et une ascension par rangs : de Initiate à Elite.',
  icons: { icon: '/logo.webp' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
