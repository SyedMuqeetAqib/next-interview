import { SUPPORTED_CHAINS } from "./supportedChains.constant";

// In Next.js, client-side environment variables must be prefixed with NEXT_PUBLIC_
export const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY;

const getHeliusBaseUrl = (): string => {
  return "https://api-mainnet.helius-rpc.com";
};

// Helper to build query string with API key
export const buildHeliusQueryString = (
  params?: Record<string, string | number>
): string => {
  const queryParams = new URLSearchParams();

  if (HELIUS_API_KEY) {
    queryParams.append("api-key", HELIUS_API_KEY);
  }

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, String(value));
    });
  }

  return queryParams.toString();
};

export const HELIUS_BASE_URL = getHeliusBaseUrl();

// Legacy URLs for backward compatibility (if needed for other endpoints)
export const HELIUS_URLS = {
  [SUPPORTED_CHAINS.ETHEREUM]: getHeliusBaseUrl(),
  [SUPPORTED_CHAINS.SOLANA]: getHeliusBaseUrl(),
};
