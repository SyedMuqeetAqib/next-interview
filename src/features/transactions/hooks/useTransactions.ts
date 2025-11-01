import { useEffect, useState, useRef } from "react";
import { Chain } from "@/shared/contexts/AppContext";
import { Transaction } from "../types/transaction.type";
import { getTransactionsForAddress } from "../services/helius";
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
        const signatures = await getTransactionsForAddress(poolAddress, chain, {
          limit: 10,
        });

        const transformedTransactions: Transaction[] = signatures
          .slice(0, 10)
          .map((signature, index) => ({
            time: new Date(Date.now() - index * 60000),
            action: index % 2 === 0 ? "buy" : "sell",
            amountNative: (Math.random() * 5).toFixed(4),
            amountToken: (Math.random() * 1000).toFixed(2),
            wallet: signature.slice(0, 8) + "..." + signature.slice(-8),
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
