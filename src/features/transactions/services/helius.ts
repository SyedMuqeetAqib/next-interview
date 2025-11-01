import { Transaction } from "../types/transaction.type";
import {
  HELIUS_BASE_URL,
  buildHeliusQueryString,
} from "@/shared/constants/heliusUrls.constant";
import { SUPPORTED_CHAINS } from "@/shared/constants/supportedChains.constant";

export interface TokenTransfer {
  fromTokenAccount?: string;
  toTokenAccount?: string;
  fromUserAccount?: string;
  toUserAccount?: string;
  tokenAmount?: number;
  mint?: string;
  tokenAmounts?: number[];
}

export interface NativeTransfer {
  fromUserAccount: string;
  toUserAccount: string;
  amount: number;
}

export interface SwapEvent {
  [key: string]: any;
}

export interface HeliusTransaction {
  accountData?: any[];
  description?: string;
  events?: {
    swap?: SwapEvent;
  };
  fee?: number;
  feePayer?: string;
  instructions?: any[];
  nativeTransfers?: NativeTransfer[];
  signature: string;
  slot?: number;
  source?: string;
  timestamp?: number;
  tokenTransfers?: TokenTransfer[];
  transactionError?: any;
  type?: string;
}

interface HeliusRESTResponse extends Array<HeliusTransaction> {}

export function parseTransaction(
  transaction: HeliusTransaction
): Transaction | null {
  try {
    if (!transaction.signature) {
      return null;
    }

    const signature = transaction.signature;
    const wallet =
      transaction.feePayer ||
      signature.slice(0, 8) + "..." + signature.slice(-8);

    // Timestamp is in seconds, convert to milliseconds for Date
    const timestamp = transaction.timestamp
      ? new Date(transaction.timestamp * 1000)
      : new Date();

    let action: "buy" | "sell" = "buy";
    let amountNative = "0";
    let amountToken = "0";

    // Parse native transfers (SOL)
    const nativeTransfers = transaction.nativeTransfers || [];
    let totalSolTransferred = 0;

    // Determine buy/sell by checking if feePayer is receiving or sending SOL
    // In a buy: feePayer sends SOL, receives tokens
    // In a sell: feePayer receives SOL, sends tokens
    let solSent = 0;
    let solReceived = 0;

    nativeTransfers.forEach((transfer) => {
      const amount = transfer.amount / 1e9; // Convert lamports to SOL
      totalSolTransferred += Math.abs(amount);

      if (transfer.fromUserAccount === transaction.feePayer) {
        solSent += amount;
      }
      if (transfer.toUserAccount === transaction.feePayer) {
        solReceived += amount;
      }
    });

    // Parse token transfers
    const tokenTransfers = transaction.tokenTransfers || [];
    let totalTokenAmount = 0;

    tokenTransfers.forEach((transfer) => {
      // Check different possible fields for token amount
      if (transfer.tokenAmount) {
        totalTokenAmount += transfer.tokenAmount;
      } else if (transfer.tokenAmounts && transfer.tokenAmounts.length > 0) {
        totalTokenAmount += transfer.tokenAmounts.reduce((a, b) => a + b, 0);
      }
    });

    // Determine action: if feePayer sent SOL, it's a buy; if they received SOL, it's a sell
    // Or use the description if available (most reliable)
    if (transaction.description) {
      const desc = transaction.description.toLowerCase();
      // Pattern 1: "wallet swapped X SOL for Y TOKEN" = buy
      if (
        desc.includes("swapped") &&
        desc.includes("sol") &&
        desc.includes("for")
      ) {
        const solForTokenMatch = desc.match(
          /swapped\s+([\d.]+)\s+sol\s+for\s+([\d.]+)/
        );
        if (solForTokenMatch) {
          action = "buy";
          amountNative = parseFloat(solForTokenMatch[1]).toFixed(4);
          amountToken = parseFloat(solForTokenMatch[2]).toFixed(2);
        } else {
          // Fallback: try simpler patterns
          const solMatch = desc.match(/([\d.]+)\s*sol/);
          const tokenMatch = desc.match(/for\s+([\d.]+)/);
          if (solMatch && desc.indexOf(solMatch[0]) < desc.indexOf("for")) {
            action = "buy";
            amountNative = parseFloat(solMatch[1]).toFixed(4);
            if (tokenMatch) {
              amountToken = parseFloat(tokenMatch[1]).toFixed(2);
            }
          }
        }
      }
      // Pattern 2: "wallet swapped X TOKEN for Y SOL" = sell
      else if (
        desc.includes("swapped") &&
        desc.includes("for") &&
        desc.includes("sol")
      ) {
        // Try to match "swapped X.Y TOKEN for Z.Z SOL"
        const tokenForSolMatch = desc.match(
          /swapped\s+([\d.]+)\s+\w+\s+for\s+([\d.]+)\s+sol/
        );
        if (tokenForSolMatch) {
          action = "sell";
          amountToken = parseFloat(tokenForSolMatch[1]).toFixed(2);
          amountNative = parseFloat(tokenForSolMatch[2]).toFixed(4);
        } else {
          // Fallback
          const solMatch = desc.match(/for\s+([\d.]+)\s*sol/);
          const tokenMatch = desc.match(/([\d.]+)\s+\w+\s+for/);
          if (
            solMatch &&
            solMatch.index &&
            desc.indexOf("sol", solMatch.index) !== -1
          ) {
            action = "sell";
            amountNative = parseFloat(solMatch[1]).toFixed(4);
            if (tokenMatch) {
              amountToken = parseFloat(tokenMatch[1]).toFixed(2);
            }
          }
        }
      }
    }

    // If description parsing didn't work or no description, use transfer data
    if (amountNative === "0" && amountToken === "0") {
      // Determine from transfers
      if (solSent > solReceived) {
        action = "buy";
        amountNative = solSent.toFixed(4);
      } else if (solReceived > solSent) {
        action = "sell";
        amountNative = solReceived.toFixed(4);
      } else {
        // Default to buy if we can't determine
        action = "buy";
        amountNative =
          totalSolTransferred > 0 ? totalSolTransferred.toFixed(4) : "0";
      }

      if (totalTokenAmount > 0) {
        amountToken = totalTokenAmount.toFixed(2);
      }
    }

    // Fallback values if parsing failed
    if (amountNative === "0" && totalSolTransferred > 0) {
      amountNative = totalSolTransferred.toFixed(4);
    }
    if (amountToken === "0" && totalTokenAmount > 0) {
      amountToken = totalTokenAmount.toFixed(2);
    }

    return {
      time: timestamp,
      action,
      amountNative,
      amountToken,
      wallet,
      txHash: signature,
    };
  } catch (error) {
    return null;
  }
}

export async function getTransactionsForAddress(
  address: string,
  chain: SUPPORTED_CHAINS,
  options?: {
    limit?: number;
    before?: string;
  }
): Promise<(string | HeliusTransaction)[]> {
  try {
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

    const data: HeliusRESTResponse | HeliusTransaction[] =
      await response.json();

    if (Array.isArray(data)) {
      if (data.length > 0) {
        // Check if it's an array of transaction objects with signature property
        if (typeof data[0] === "object" && data[0].signature) {
          // Return the full transaction objects, not just signatures
          return data;
        }
        // Check if it's an array of strings (signatures)
        if (typeof data[0] === "string") {
          return data;
        }
      }
      return [];
    }

    if (data && typeof data === "object" && !Array.isArray(data)) {
      if (Array.isArray((data as any).signatures)) {
        return (data as any).signatures;
      }
      if (Array.isArray((data as any).transactions)) {
        return (data as any).transactions.map((tx: any) => tx.signature || tx);
      }
      if (Array.isArray((data as any).result)) {
        return (data as any).result.map((item: any) =>
          typeof item === "string" ? item : item.signature || item
        );
      }
    }

    return [];
  } catch (error) {
    throw error;
  }
}

export async function getTransactionDetails(
  signatures: string[],
  chain: SUPPORTED_CHAINS
): Promise<HeliusTransaction[]> {
  return [];
}
