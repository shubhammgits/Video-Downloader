import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VideoDownloader - Download Videos in Seconds',
  description: 'Download videos from YouTube, Instagram, Facebook, TikTok, and Twitter in one click. No ads, no redirects.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}