import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Wrapper from './wrapper';
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Fortuna Fortress',
  description:
    'Explore asset custody, liquidity, risk-free trading, DeFi, & staking on our secure, regulated infrastructure. Fully licensed & insured.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
