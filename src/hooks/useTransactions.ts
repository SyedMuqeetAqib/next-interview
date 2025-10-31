import { useEffect, useState } from "react";
import { Chain } from "../contexts/AppContext";
import { Transaction } from "../types/transaction.type";

// hooks/useTransactions.ts
export function useTransactions(poolAddress: string, chain: Chain) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // WebSocket connection logic
    // Cleanup on unmount
  }, [poolAddress, chain]);

  return { transactions, loading, error };
}
