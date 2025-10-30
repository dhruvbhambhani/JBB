import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JBB Asset Management LLC - Professional Real Estate Investment',
  description: 'Leading real estate asset management firm delivering exceptional returns through strategic property investments and professional portfolio management.',
  keywords: 'real estate, asset management, property investment, commercial real estate, residential properties, JBB Asset Management',
  openGraph: {
    title: 'JBB Asset Management LLC - Professional Real Estate Investment',
    description: 'Leading real estate asset management firm delivering exceptional returns through strategic property investments.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body className={inter.className}>
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}