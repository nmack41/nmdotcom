import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
      <html>
              <Header />
        <body>
          <div className='mb-16'></div>
          {children}
        </body>
        <Footer />
      </html>
  );
}

