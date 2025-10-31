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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
      {/* <PoolHeader /> */}

      <div className="grid gap-4 sm:gap-5 lg:gap-6">
        {/* Chart & Buy Widget Side by Side */}
        <div className="grid gap-4 sm:gap-5 lg:gap-6 lg:grid-cols-3">
          {/* Chart Section - Takes 2 columns */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-4 sm:p-5 lg:p-6 backdrop-blur-sm shadow-lg shadow-primary/10 border-primary/10">
            <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
              Price Chart
            </h2>
            <div className="h-80 sm:h-96 flex items-center justify-center text-muted-foreground rounded-lg bg-muted/30 border border-border/50">
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
