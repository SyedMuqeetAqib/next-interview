"use client";

import { useApp } from "@/contexts/AppContext";
import { Chain } from "@/contexts/AppContext";

export default function Navbar() {
  const { chain, setChain } = useApp();

  return (
    <nav className="w-full border-b border-gray-800 bg-gray-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-semibold text-white">Mockswap</h1>

          {/* Chain Toggle */}
          <div className="flex items-center gap-2 rounded-lg bg-gray-900 p-1">
            <button
              onClick={() => setChain("ethereum")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                chain === "ethereum"
                  ? "bg-gray-800 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Ethereum
            </button>
            <button
              onClick={() => setChain("solana")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                chain === "solana"
                  ? "bg-gray-800 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Solana
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search pool address..."
              className="w-64 rounded-lg border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
            />
          </div>

          {/* Trading Page Link */}
          <a
            href="#"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Trading Page
          </a>
        </div>
      </div>
    </nav>
  );
}
