"use client";

import { useParams } from "next/navigation";
import TradingViewWidget from "@/features/trading/components/TradingView";
import TransactionTable from "@/features/transactions/components/TransactionTable";
import { DEFAULT_ADDRESS_ON_LANDING_PAGE } from "@/shared/constants/raydiumUrls.constant";
import { useApp } from "@/shared/contexts/AppContext";
import PoolHeader from "./PoolHeader";
import BuyWidget from "./BuyWidget";

export default function PoolComponent() {
  const params = useParams();
  const { chain } = useApp();
  const poolAddress =
    (params.address as string) ?? DEFAULT_ADDRESS_ON_LANDING_PAGE;
  console.log("🚀 ~ PoolPage ~ poolAddress:", poolAddress);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <PoolHeader />

      <div className="grid gap-6">
        {/* Chart & Buy Widget Side by Side */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Chart Section - Takes 2 columns */}
          <div className="lg:col-span-2 rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Price Chart
            </h2>
            <div className="h-96 flex items-center justify-center text-gray-500">
              <TradingViewWidget
                baseSymbol={chain === "solana" ? "SOL" : "ETH"}
                quoteSymbol="ETH"
              />
            </div>
          </div>

          {/* Buy Widget - Takes 1 column */}
          <BuyWidget />
        </div>

        {/* Transactions Table - Full width below */}
        <TransactionTable poolAddress={poolAddress} />
      </div>
    </div>
  );
}
