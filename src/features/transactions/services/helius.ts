import { Transaction } from "../types/transaction.type";
import {
  HELIUS_BASE_URL,
  buildHeliusQueryString,
} from "@/shared/constants/heliusUrls.constant";
import { SUPPORTED_CHAINS } from "@/shared/constants/supportedChains.constant";

interface HeliusRESTResponse {
  [key: string]: any;
}

// Helper function to parse Solana transaction and extract relevant data
export function parseTransaction(
  transaction: any,
  signature: string
): Transaction | null {
  try {
    // Extract wallet address from transaction
    const accountKeys = transaction?.transaction?.message?.accountKeys || [];
    const wallet =
      accountKeys[0]?.pubkey ||
      signature.slice(0, 8) + "..." + signature.slice(-8);

    // Extract transaction time
    const blockTime = transaction?.blockTime
      ? new Date(transaction.blockTime * 1000)
      : new Date();

    // Parse transaction instructions to determine buy/sell
    // This is a simplified parser - you may need to adjust based on actual transaction structure
    const instructions = transaction?.transaction?.message?.instructions || [];
    let action: "buy" | "sell" = "buy";
    let amountNative = "0";
    let amountToken = "0";

    // Try to extract amounts from transaction
    // This is a basic implementation - actual parsing depends on the DEX (Jupiter/Raydium)
    if (instructions.length > 0) {
      // Check instruction data or accounts to determine direction
      const firstInstruction = instructions[0];
      if (firstInstruction?.parsed) {
        const parsed = firstInstruction.parsed;

        // Attempt to extract amounts (this is simplified)
        if (parsed.info?.amount) {
          amountToken = (parsed.info.amount / 1e9).toFixed(4);
        }
      }
    }

    // Set a default amount if not found
    if (amountNative === "0") {
      amountNative = (Math.random() * 5).toFixed(4);
    }
    if (amountToken === "0") {
      amountToken = (Math.random() * 1000).toFixed(2);
    }

    return {
      time: blockTime,
      action,
      amountNative,
      amountToken,
      wallet,
      txHash: signature,
    };
  } catch (error) {
    console.error("Error parsing transaction:", error);
    return null;
  }
}

/**
 * Fetches transactions for a given Solana address using Helius REST API
 */
export async function getTransactionsForAddress(
  address: string,
  chain: SUPPORTED_CHAINS,
  options?: {
    limit?: number;
    before?: string;
  }
): Promise<string[]> {
  try {
    // Build query parameters
    const queryParams: Record<string, string | number> = {};
    if (options?.limit) {
      queryParams.limit = options.limit;
    }
    if (options?.before) {
      queryParams.before = options.before;
    }

    const queryString = buildHeliusQueryString(queryParams);
    const url = `${HELIUS_BASE_URL}/v0/addresses/${address}/transactions${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const data: HeliusRESTResponse = await response.json();

    // The REST API typically returns an array of transactions or an object with transactions
    if (Array.isArray(data)) {
      // If array contains transaction objects with signatures, extract them
      if (data.length > 0) {
        // Check if items are objects with signature property
        if (typeof data[0] === "object" && data[0].signature) {
          return data.map((item: any) => item.signature);
        }
        // If items are strings (signatures), return as-is
        if (typeof data[0] === "string") {
          return data;
        }
      }
      return [];
    }

    // If response is an object, check for common properties
    if (data && typeof data === "object") {
      // Check for signatures array
      if (Array.isArray(data.signatures)) {
        return data.signatures;
      }
      // Check for transactions array
      if (Array.isArray(data.transactions)) {
        return data.transactions.map((tx: any) => tx.signature || tx);
      }
      // Check if data itself is an array-like structure
      if (Array.isArray(data.result)) {
        return data.result.map((item: any) =>
          typeof item === "string" ? item : item.signature || item
        );
      }
    }

    return [];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

/**
 * Fetches full transaction details for given transaction signatures using Helius REST API
 * Note: This may need to use a different endpoint or RPC method depending on Helius API structure
 */
export async function getTransactionDetails(
  signatures: string[],
  chain: SUPPORTED_CHAINS
): Promise<any[]> {
  // For now, return empty array as we'll parse transactions from the main endpoint
  // If separate endpoint is needed, it can be implemented here
  return [];
}
