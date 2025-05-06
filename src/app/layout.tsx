import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { getPageContent } from "@/lib/content";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "STANFORD AMERICAN SCHOOL",
  description: "Exists for The Best Education",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' }
    ],
    apple: { url: '/apple-icon.png', type: 'image/png' }
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const content = await getPageContent();
  
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth antialiased`}>
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
