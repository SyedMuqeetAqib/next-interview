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
      <body className={`${inter.variable} antialiased bg-background`}>
        <AppProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
