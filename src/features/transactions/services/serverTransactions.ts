import { getTransactionsForAddress } from "./helius";
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

    const signatures = await getTransactionsForAddress(poolAddress, chain, {
      limit: options?.limit || 10,
    });

    const transformedTransactions: SerializableTransaction[] = signatures
      .slice(0, options?.limit || 10)
      .map((signature, index) => ({
        time: new Date(Date.now() - index * 60000).toISOString(),
        action: (index % 2 === 0 ? "buy" : "sell") as "buy" | "sell",
        amountNative: (Math.random() * 5).toFixed(4),
        amountToken: (Math.random() * 1000).toFixed(2),
        wallet: signature.slice(0, 8) + "..." + signature.slice(-8),
        txHash: signature,
      }));

    return transformedTransactions;
  } catch (error) {
    throw error;
  }
}
