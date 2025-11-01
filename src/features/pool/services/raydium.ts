import { RAYDIUM_BASE_URL } from "@/shared/constants/raydiumUrls.constant";
import { RaydiumApiResponse, PoolInfo } from "../types/raydium.type";

/**
 * Fetches pool information from Raydium API
 * @param poolId - The pool ID (address) to fetch
 * @returns Pool information including token symbol, name, logo, and price
 */
export async function fetchPoolInfo(poolId: string): Promise<PoolInfo | null> {
  try {
    const response = await fetch(
      `${RAYDIUM_BASE_URL}pools/info/ids?ids=${poolId}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
        // Cache for 60 seconds to reduce API calls
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch pool info: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const data: RaydiumApiResponse = await response.json();

    if (!data.success || !data.data || data.data.length === 0) {
      console.error("No pool data returned from API");
      return null;
    }

    const poolData = data.data[0];

    // Determine which token is the quote token (usually the non-SOL token)
    // mintB is typically the token being traded
    const quoteToken = poolData.mintB;
    const baseToken = poolData.mintA;

    return {
      tokenSymbol: quoteToken.symbol,
      tokenName: quoteToken.name,
      tokenLogo: quoteToken.logoURI,
      baseTokenSymbol: baseToken.symbol,
      baseTokenName: baseToken.name,
      baseTokenLogo: baseToken.logoURI,
      price: poolData.price,
      poolId: poolData.id,
    };
  } catch (error) {
    console.error("Error fetching pool info from Raydium API:", error);
    return null;
  }
}
