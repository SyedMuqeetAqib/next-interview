import { useEffect, useState, useRef } from "react";
import { Chain } from "@/shared/contexts/AppContext";
import { Transaction } from "../types/transaction.type";
import { getTransactionsForAddress } from "../services/helius";
import { SUPPORTED_CHAINS } from "@/shared/constants/supportedChains.constant";

// hooks/useTransactions.ts
export function useTransactions(poolAddress: string, chain: Chain) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!poolAddress || chain !== SUPPORTED_CHAINS.SOLANA) {
      setLoading(false);
      return;
    }

    const fetchTransactions = async () => {
      try {
        setError(null);
        // Fetch transaction signatures
        const signatures = await getTransactionsForAddress(poolAddress, chain, {
          limit: 10,
        });

        // Transform signatures into Transaction objects
        // Note: You may need to fetch full transaction details to get
        // buy/sell info, amounts, etc. For now, creating placeholder transactions
        const transformedTransactions: Transaction[] = signatures
          .slice(0, 10)
          .map((signature, index) => ({
            time: new Date(Date.now() - index * 60000), // Mock time, descending
            action: index % 2 === 0 ? "buy" : "sell", // Mock action
            amountNative: (Math.random() * 5).toFixed(4), // Mock SOL amount
            amountToken: (Math.random() * 1000).toFixed(2), // Mock token amount
            wallet: signature.slice(0, 8) + "..." + signature.slice(-8), // Shortened wallet
            txHash: signature,
          }));

        setTransactions(transformedTransactions);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch transactions"
        );
        setLoading(false);
      }
    };

    // Initial fetch
    fetchTransactions();

    // Set up polling for real-time updates (poll every 15 seconds)
    pollingIntervalRef.current = setInterval(fetchTransactions, 15000);

    // Cleanup on unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [poolAddress, chain]);

  return { transactions, loading, error };
}
