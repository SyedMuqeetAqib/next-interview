"use client";

import { useState, useMemo } from "react";
import { useApp, Chain } from "@/shared/contexts/AppContext";
import { Button } from "@/components/ui/button";
import TransactionModal from "./TransactionModal";
import { SUPPORTED_CHAINS } from "@/shared/constants/supportedChains.constant";
import { cn } from "@/lib/utils";

interface BuyWidgetProps {
  poolAddress: string;
  chain: Chain | SUPPORTED_CHAINS;
}

export default function BuyWidget({ poolAddress, chain }: BuyWidgetProps) {
  const { chain: contextChain } = useApp();
  const effectiveChain = contextChain || chain;

  const [spendAmount, setSpendAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derive token symbol from pool address (use first 4 chars as mock token symbol)
  const tokenSymbol = useMemo(() => {
    if (!poolAddress) return "TOKEN";
    // Extract first 4 characters of address and make uppercase for token symbol
    return poolAddress.slice(0, 4).toUpperCase();
  }, [poolAddress]);

  // Calculate receive amount based on spend amount
  // Mock calculation: Use a simple ratio based on pool address hash
  const receiveAmount = useMemo(() => {
    if (!spendAmount || parseFloat(spendAmount) <= 0) return "0.0";

    const spend = parseFloat(spendAmount);
    // Create a mock exchange rate based on pool address
    // Use a hash-like approach: sum of character codes % 100 + 50 gives us 50-150 ratio
    const addressSum = poolAddress
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const exchangeRate = (addressSum % 100) + 50; // Rate between 50-150 tokens per native token

    const calculated = (spend * exchangeRate).toFixed(6);
    return parseFloat(calculated).toString();
  }, [spendAmount, poolAddress]);

  const nativeTokenSymbol =
    effectiveChain === SUPPORTED_CHAINS.SOLANA ? "SOL" : "ETH";

  const isBuyDisabled =
    !spendAmount ||
    parseFloat(spendAmount) <= 0 ||
    isNaN(parseFloat(spendAmount));

  const handleBuy = () => {
    if (isBuyDisabled) return;
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optionally reset the form after successful transaction
    // setSpendAmount("");
  };

  return (
    <>
      <div className="rounded-xl border border-primary/10 bg-card p-4 sm:p-5 lg:p-6 backdrop-blur-sm shadow-lg shadow-primary/10">
        <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
          Buy Tokens
        </h2>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">
              You spend ({nativeTokenSymbol})
            </label>
            <input
              type="number"
              placeholder="0.0"
              value={spendAmount}
              onChange={(e) => setSpendAmount(e.target.value)}
              min="0"
              step="any"
              className="w-full rounded-lg border border-border bg-input px-3 sm:px-4 py-2.5 sm:py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">
              You receive ({tokenSymbol})
            </label>
            <input
              type="text"
              placeholder="0.0"
              value={receiveAmount}
              readOnly
              className="w-full rounded-lg border border-border/70 bg-input/60 px-3 sm:px-4 py-2.5 sm:py-3 text-muted-foreground cursor-not-allowed"
            />
          </div>
          <Button
            onClick={handleBuy}
            disabled={isBuyDisabled}
            className={cn(
              "w-full bg-primary hover:bg-primary/90 text-primary-foreground active:scale-[0.98] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed",
              !isBuyDisabled && "shadow-lg shadow-primary/40"
            )}
            size="lg"
          >
            Buy
          </Button>
        </div>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        amountSpent={spendAmount}
        amountReceived={receiveAmount}
        tokenSpent={nativeTokenSymbol}
        tokenReceived={tokenSymbol}
      />
    </>
  );
}
