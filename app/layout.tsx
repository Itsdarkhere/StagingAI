import '@/styles/variables.css';
import '@/styles/globals.css';
import { Inter } from '@next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Providers from './providers';

const inter = Inter({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className}>
      <head />
      <body>
        <Providers>
          {children}
          <Analytics />  
        </Providers>
      </body>
    </html>
  );
}
