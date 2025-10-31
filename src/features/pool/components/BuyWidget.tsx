"use client";

import { useApp } from "@/shared/contexts/AppContext";

export default function BuyWidget() {
  const { chain } = useApp();

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Buy Tokens</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            You spend ({chain === "solana" ? "SOL" : "ETH"})
          </label>
          <input
            type="number"
            placeholder="0.0"
            className="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder-gray-600 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            You receive (TOKEN)
          </label>
          <input
            type="text"
            placeholder="0.0"
            readOnly
            className="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-gray-500"
          />
        </div>
        <button className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-all hover:bg-blue-700 active:scale-[0.98]">
          Buy
        </button>
      </div>
    </div>
  );
}
