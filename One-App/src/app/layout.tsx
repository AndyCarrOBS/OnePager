import './globals.css';
import { FeatureProvider } from '@/contexts/FeatureContext';
import { MenuProvider } from '@/contexts/MenuContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OnPager',
  description: 'Modern OnPager application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning={true}>
        <FeatureProvider>
          <MenuProvider>
            {children}
          </MenuProvider>
        </FeatureProvider>
      </body>
    </html>
  );
}
