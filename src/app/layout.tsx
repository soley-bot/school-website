import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "STANFORD AMERICAN SCHOOL",
  description: "Exists for The Best Education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth antialiased`}>
      <body className={`min-h-full flex flex-col bg-white font-sans text-gray-900`}>
        <ErrorBoundary>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
