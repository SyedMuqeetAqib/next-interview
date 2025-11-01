import {
  getTransactionsForAddress,
  parseTransaction,
  HeliusTransaction,
} from "./helius";
import { SUPPORTED_CHAINS } from "@/shared/constants/supportedChains.constant";

export interface SerializableTransaction {
  time: string;
  action: "buy" | "sell";
  amountNative: string;
  amountToken: string;
  wallet: string;
  txHash: string;
}

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

    const result = await getTransactionsForAddress(poolAddress, chain, {
      limit: options?.limit || 10,
    });

    const transformedTransactions: SerializableTransaction[] = result
      .slice(0, options?.limit || 10)
      .map((item) => {
        // If it's a string (signature), we can't parse it without details
        if (typeof item === "string") {
          // Fallback: return a basic transaction structure
          return {
            time: new Date().toISOString(),
            action: "buy" as const,
            amountNative: "0",
            amountToken: "0",
            wallet: item.slice(0, 8) + "..." + item.slice(-8),
            txHash: item,
          };
        }
        // If it's a HeliusTransaction object, parse it
        const parsed = parseTransaction(item as HeliusTransaction);
        if (!parsed) {
          // Fallback if parsing fails
          return {
            time: new Date().toISOString(),
            action: "buy" as const,
            amountNative: "0",
            amountToken: "0",
            wallet:
              item.signature.slice(0, 8) + "..." + item.signature.slice(-8),
            txHash: item.signature,
          };
        }
        return {
          ...parsed,
          time: parsed.time.toISOString(),
        };
      })
      .filter((tx) => tx !== null);

    return transformedTransactions;
  } catch (error) {
    throw error;
  }
}
