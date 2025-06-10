import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { getPageContent } from "@/lib/content";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "STANFORD AMERICAN SCHOOL",
  description: "Exists for The Best Education",
  manifest: '/icons/manifest.json',
  icons: {
    icon: [
      { url: '/icons/favicon.ico', sizes: 'any' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/safari-pinned-tab.svg',
        color: '#000000'
      }
    ]
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const content = await getPageContent();
  
  return (
    <html lang="en" className={`${montserrat.variable} h-full scroll-smooth antialiased`}>
      <body className={`min-h-full flex flex-col bg-white font-sans text-gray-900`}>
        <ErrorBoundary>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer content={content.footer} />
        </ErrorBoundary>
      </body>
    </html>
  );
}
