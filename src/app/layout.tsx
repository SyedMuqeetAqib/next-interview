import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/shared/contexts/AppContext";
import Navbar from "@/features/navigation/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mockswap - Trading Dashboard",
  description: "Trading dashboard for EVM and Solana pools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        {/* Gradient background overlay */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none" />
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent pointer-events-none" />

        <AppProvider>
          <div className="min-h-screen relative">
            <Navbar />
            <main className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 relative">
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
