import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store';

export const metadata: Metadata = {
  title: 'Guru Nanak Cycle | Anupgarh Premier Bicycles & Kids EVs Showroom',
  description:
    "Anupgarh's #1 showroom for Pro Mountain Bicycles, 12V Kids Electric Cars, Battery Cruiser Bikes & Toddler Tricycles. Bikaner Rd, RCP Colony, Anupgarh, Rajasthan 335701.",
  keywords: [
    'Guru Nanak Cycle',
    'Anupgarh Cycle Store',
    'Kids Electric Car Anupgarh',
    'Kids EV Rajasthan',
    'Hero Cycle Showroom Anupgarh',
    'Electric Toy Car Bikaner Road',
  ],
  authors: [{ name: 'Guru Nanak Cycle Store' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased flex flex-col selection:bg-[#E11D48] selection:text-white">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
