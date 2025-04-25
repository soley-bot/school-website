import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stanford Academy",
  description: "Learn English and Chinese with confidence",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex min-h-full flex-col`}>
        <ErrorBoundary>
          <Navigation />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
