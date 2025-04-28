import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${inter.className} min-h-full flex flex-col bg-white`}>
        <ErrorBoundary>
          <Header />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
