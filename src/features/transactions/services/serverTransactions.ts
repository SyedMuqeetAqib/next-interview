import { Transaction } from "../types/transaction.type";
import { getTransactionsForAddress } from "./helius";
import { SUPPORTED_CHAINS } from "@/shared/constants/supportedChains.constant";

/**
 * Serializable transaction type for passing from server to client
 * Dates are serialized as ISO strings
 */
export interface SerializableTransaction {
  time: string; // ISO date string
  action: "buy" | "sell";
  amountNative: string;
  amountToken: string;
  wallet: string;
  txHash: string;
}

/**
 * Server-side function to fetch and transform transactions
 * Returns serializable transactions that can be passed to client components
 */
export async function fetchInitialTransactions(
  poolAddress: string,
  chain: SUPPORTED_CHAINS,
  options?: {
    limit?: number;
  }
): Promise<SerializableTransaction[]> {
  try {
    if (!poolAddress || chain !== SUPPORTED_CHAINS.SOLANA) {
      return [];
    }

    // Fetch transaction signatures
    const signatures = await getTransactionsForAddress(poolAddress, chain, {
      limit: options?.limit || 10,
    });

    // Transform signatures into serializable Transaction objects
    const transformedTransactions: SerializableTransaction[] = signatures
      .slice(0, options?.limit || 10)
      .map((signature, index) => ({
        time: new Date(Date.now() - index * 60000).toISOString(), // Mock time, descending, serialized
        action: (index % 2 === 0 ? "buy" : "sell") as "buy" | "sell", // Mock action
        amountNative: (Math.random() * 5).toFixed(4), // Mock SOL amount
        amountToken: (Math.random() * 1000).toFixed(2), // Mock token amount
        wallet: signature.slice(0, 8) + "..." + signature.slice(-8), // Shortened wallet
        txHash: signature,
      }));

    return transformedTransactions;
  } catch (error) {
    console.error("Error fetching initial transactions:", error);
    throw error;
  }
}
