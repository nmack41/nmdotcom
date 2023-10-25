import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/app/layout/Header';
import Footer from '@/app/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NickMackowski',
  description: 'Created by Nick Mackowski',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html >
        <body suppressHydrationWarning={true}>
          <Header />
          <div className='mb-16'></div>
          <div className="grid min-h-screen grid-rows-layout">
          {children}
          </div>
          <Footer />
        </body>
      </html>
  );
}

