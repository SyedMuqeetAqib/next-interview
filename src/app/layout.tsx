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
        <AppProvider>
          <div className="min-h-screen bg-gray-950">
            <Navbar />
            <main className="w-full">{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
