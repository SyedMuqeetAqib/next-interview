import { useEffect, useState, useRef } from "react";
import { Chain } from "@/shared/contexts/AppContext";
import { Transaction } from "../types/transaction.type";
import {
  getTransactionsForAddress,
  parseTransaction,
  HeliusTransaction,
} from "../services/helius";
import { SUPPORTED_CHAINS } from "@/shared/constants/supportedChains.constant";
import { SerializableTransaction } from "../services/serverTransactions";

export function useTransactions(
  poolAddress: string,
  chain: Chain,
  initialTransactions?: SerializableTransaction[]
) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (initialTransactions) {
      return initialTransactions.map((tx) => ({
        ...tx,
        time: new Date(tx.time),
      }));
    }
    return [];
  });
  const [loading, setLoading] = useState(!initialTransactions);
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
        const result = await getTransactionsForAddress(poolAddress, chain, {
          limit: 10,
        });

        // Parse transactions - result can be either string[] or HeliusTransaction[]
        const transformedTransactions: Transaction[] = result
          .slice(0, 10)
          .map((item) => {
            // If it's a string (signature), we can't parse it without details
            if (typeof item === "string") {
              // Fallback: return a basic transaction structure
              return {
                time: new Date(),
                action: "buy" as const,
                amountNative: "0",
                amountToken: "0",
                wallet: item.slice(0, 8) + "..." + item.slice(-8),
                txHash: item,
              };
            }
            // If it's a HeliusTransaction object, parse it
            return parseTransaction(item as HeliusTransaction);
          })
          .filter((tx): tx is Transaction => tx !== null);

        setTransactions(transformedTransactions);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch transactions"
        );
        setLoading(false);
      }
    };

    if (!initialTransactions) {
      fetchTransactions();
    }

    pollingIntervalRef.current = setInterval(fetchTransactions, 15000);

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [poolAddress, chain, initialTransactions]);

  return { transactions, loading, error };
}
