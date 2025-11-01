"use client";

import { useApp } from "@/shared/contexts/AppContext";
import { SUPPORTED_CHAINS } from "@/shared/constants/supportedChains.constant";
import SearchBar from "./SearchBar";
import Link from "next/link";

export default function Navbar() {
  const { chain, setChain } = useApp();

  return (
    <nav className="w-full border-b border-border/50 bg-card/60 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Logo */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link href="/">
            <h1 className="text-lg sm:text-xl font-semibold text-primary drop-shadow-sm hover:text-primary/80 transition-colors">
              Mockswap
            </h1>
          </Link>

          {/* Chain Toggle */}
          <div className="flex items-center gap-1 rounded-lg bg-secondary p-1 border border-border">
            <button
              onClick={() => setChain(SUPPORTED_CHAINS.ETHEREUM)}
              className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                chain === SUPPORTED_CHAINS.ETHEREUM
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/40 border border-primary/50"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              Ethereum
            </button>
            <button
              onClick={() => setChain(SUPPORTED_CHAINS.SOLANA)}
              className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                chain === "solana"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/40 border border-primary/50"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              Solana
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Bar */}
          <SearchBar />

          {/* Trading Page Link */}
          <a
            href="#"
            className="text-xs sm:text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            Trading Page
          </a>
        </div>
      </div>
    </nav>
  );
}
