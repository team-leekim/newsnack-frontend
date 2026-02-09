import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Newsnack',
  description: '세상을 만나는 가벼운 시작',
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Newsnack',
    description: '세상을 만나는 가벼운 시작',
    images: '/logo-white.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {' '}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZPNXLYFWTQ"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZPNXLYFWTQ');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-white text-black">{children}</body>
    </html>
  );
}
