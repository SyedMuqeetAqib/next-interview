"use client";

import TradingViewWidget from "@/features/trading/components/TradingView";
import TransactionTable from "@/features/transactions/components/TransactionTable";
import { useApp } from "@/shared/contexts/AppContext";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";
import BuyWidget from "./BuyWidget";
import { SerializableTransaction } from "@/features/transactions/services/serverTransactions";
import { SUPPORTED_CHAINS } from "@/shared/constants/supportedChains.constant";

interface PoolClientProps {
  poolAddress: string;
  initialTransactions?: SerializableTransaction[];
  chain: SUPPORTED_CHAINS;
}

export default function PoolClient({
  poolAddress,
  initialTransactions,
  chain,
}: PoolClientProps) {
  const { chain: contextChain } = useApp();
  console.log("🚀 ~ PoolPage ~ poolAddress:", poolAddress);

  // Use chain from props (server-side) but allow context to override on client
  // For polling, use context chain which may be updated by user
  const effectiveChain = contextChain || chain;

  // Check for transaction errors using the hook with initial data
  const { error: transactionError } = useTransactions(
    poolAddress,
    effectiveChain,
    initialTransactions
  );

  // Check if error is related to invalid address (HTTP 400 with "invalid address" message)
  const isInvalidAddressError =
    transactionError &&
    (transactionError.includes("400") ||
      transactionError.toLowerCase().includes("invalid address") ||
      transactionError.includes("-32600"));

  // Show full-page error if there's an invalid address error
  if (isInvalidAddressError) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
        <div className="rounded-xl border border-destructive/20 bg-card p-8 sm:p-10 lg:p-12 backdrop-blur-sm shadow-lg shadow-destructive/10">
          <div className="text-center">
            <div className="mb-4 sm:mb-6">
              <svg
                className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-destructive"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-3 sm:mb-4">
              Invalid Address
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto">
              The address you provided is invalid. Please use a different
              address to view pool information.
            </p>
            <div className="text-xs sm:text-sm text-muted-foreground/70">
              Error details: {transactionError}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
      {/* <PoolHeader /> */}

      <div className="grid gap-4 sm:gap-5 lg:gap-6">
        {/* Chart & Buy Widget Side by Side */}
        <div className="grid gap-4 sm:gap-5 lg:gap-6 lg:grid-cols-3">
          {/* Chart Section - Takes 2 columns */}
          <div className="lg:col-span-2 rounded-xl border border-primary/10 bg-card p-4 sm:p-5 lg:p-6 backdrop-blur-sm shadow-lg shadow-primary/10">
            <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
              Price Chart
            </h2>
            <div className="h-80 sm:h-96 flex items-center justify-center text-muted-foreground rounded-lg bg-muted/30 border border-border/50">
              <TradingViewWidget
                baseSymbol={
                  effectiveChain === SUPPORTED_CHAINS.SOLANA ? "SOL" : "ETH"
                }
                quoteSymbol="ETH"
              />
            </div>
          </div>

          {/* Buy Widget - Takes 1 column */}
          <BuyWidget poolAddress={poolAddress} chain={effectiveChain} />
        </div>

        {/* Transactions Table - Full width below */}
        <TransactionTable
          poolAddress={poolAddress}
          initialTransactions={initialTransactions}
        />
      </div>
    </div>
  );
}
