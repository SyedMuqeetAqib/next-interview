"use client";

import { useApp } from "@/shared/contexts/AppContext";
import { Button } from "@/components/ui/button";

export default function BuyWidget() {
  const { chain } = useApp();

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5 lg:p-6 backdrop-blur-sm shadow-lg shadow-primary/10 border-primary/10">
      <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
        Buy Tokens
      </h2>
      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">
            You spend ({chain === "solana" ? "SOL" : "ETH"})
          </label>
          <input
            type="number"
            placeholder="0.0"
            className="w-full rounded-lg border border-border bg-input px-3 sm:px-4 py-2.5 sm:py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">
            You receive (TOKEN)
          </label>
          <input
            type="text"
            placeholder="0.0"
            readOnly
            className="w-full rounded-lg border border-border/70 bg-input/60 px-3 sm:px-4 py-2.5 sm:py-3 text-muted-foreground cursor-not-allowed"
          />
        </div>
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground active:scale-[0.98] shadow-lg shadow-primary/40 transition-all font-semibold"
          size="lg"
        >
          Buy
        </Button>
      </div>
    </div>
  );
}
