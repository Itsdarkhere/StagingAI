import Header from './Header';
import '@/styles/variables.css';
import '@/styles/globals.css';
import { Inter } from '@next/font/google';

const poppins = Inter({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={poppins.className}>
      <head />
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
