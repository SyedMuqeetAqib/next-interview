"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Wallet, ExternalLink } from "lucide-react";
import { useApp, Chain } from "@/shared/contexts/AppContext";
import { Button } from "@/components/ui/button";
import TransactionModal from "./TransactionModal";
import { SUPPORTED_CHAINS } from "@/shared/constants/supportedChains.constant";
import { cn } from "@/lib/utils";
import { PoolInfo } from "../types/raydium.type";

interface BuyWidgetProps {
  poolAddress: string;
  chain: Chain | SUPPORTED_CHAINS;
  poolInfo: PoolInfo | null;
}

export default function BuyWidget({
  poolAddress,
  chain,
  poolInfo,
}: BuyWidgetProps) {
  const { chain: contextChain } = useApp();
  const effectiveChain = contextChain || chain;

  const [spendAmount, setSpendAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get token symbol from pool info, fallback to pool address if not available
  const tokenSymbol = useMemo(() => {
    if (poolInfo?.tokenSymbol) {
      return poolInfo.tokenSymbol;
    }
    if (!poolAddress) return "TOKEN";
    // Fallback: Extract first 4 characters of address and make uppercase for token symbol
    return poolAddress.slice(0, 4).toUpperCase();
  }, [poolInfo, poolAddress]);

  // Calculate receive amount based on spend amount and pool price
  const receiveAmount = useMemo(() => {
    if (!spendAmount || parseFloat(spendAmount) <= 0) return "0.0";
    if (!poolInfo?.price) return "0.0";

    const spend = parseFloat(spendAmount);

    // Use poolInfo.price for exchange rate
    // Price represents how many quote tokens (e.g., PAYAI) per base token (e.g., WSOL)
    // So if we spend WSOL, we receive: spend * price = quote tokens
    const calculated = (spend * poolInfo.price).toFixed(6);
    return parseFloat(calculated).toString();
  }, [spendAmount, poolInfo, poolAddress]);

  // Get native token symbol from pool info, fallback to chain-based default
  const nativeTokenSymbol = useMemo(() => {
    if (poolInfo?.baseTokenSymbol) {
      return poolInfo.baseTokenSymbol;
    }
    return effectiveChain === SUPPORTED_CHAINS.SOLANA ? "SOL" : "ETH";
  }, [poolInfo, effectiveChain]);

  // Get token logos
  const tokenLogo = poolInfo?.tokenLogo || null;
  const baseTokenLogo = poolInfo?.baseTokenLogo || null;

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

  // Mock max balance (fake functionality)
  const maxBalance = "10.5"; // Mock wallet balance

  const handleMaxClick = () => {
    setSpendAmount(maxBalance);
  };

  return (
    <>
      <div className="rounded-xl border border-primary/20 bg-card/60 backdrop-blur-md p-4 sm:p-5 lg:p-6 shadow-inner">
        {/* Connected Wallet Indicator */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-foreground">
            Buy Tokens
          </h2>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary border border-border">
            <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">Phantom</span>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
                <span>You spend</span>
                <div className="flex items-center gap-1.5">
                  {baseTokenLogo && (
                    <Image
                      src={baseTokenLogo}
                      alt={nativeTokenSymbol}
                      width={16}
                      height={16}
                      className="rounded-full"
                      onError={(e) => {
                        // Hide image on error
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  <span className="text-foreground font-semibold">
                    ({nativeTokenSymbol})
                  </span>
                </div>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  Balance: {maxBalance}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleMaxClick}
                  className="h-6 px-2 text-xs font-medium text-primary hover:text-primary/80 hover:bg-primary/10"
                >
                  Max
                </Button>
              </div>
            </div>
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
            <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">
              <span>You receive</span>
              <div className="flex items-center gap-1.5">
                {tokenLogo && (
                  <Image
                    src={tokenLogo}
                    alt={tokenSymbol}
                    width={16}
                    height={16}
                    className="rounded-full"
                    onError={(e) => {
                      // Hide image on error
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
                <span className="text-foreground font-semibold">
                  ({tokenSymbol})
                </span>
              </div>
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

          {/* Terms and Conditions */}
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              By continuing, you agree to our{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  // Fake functionality - could open a modal or navigate
                  alert("Terms of Service");
                }}
                className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors inline-flex items-center gap-1"
              >
                Terms of Service
                <ExternalLink className="h-3 w-3" />
              </a>{" "}
              and{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  // Fake functionality - could open a modal or navigate
                  alert("Privacy Policy");
                }}
                className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors inline-flex items-center gap-1"
              >
                Privacy Policy
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>
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
