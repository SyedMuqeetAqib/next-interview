import { RAYDIUM_BASE_URL } from "@/shared/constants/raydiumUrls.constant";
import { RaydiumApiResponse, PoolInfo } from "../types/raydium.type";

export async function fetchPoolInfo(poolId: string): Promise<PoolInfo | null> {
  try {
    const response = await fetch(
      `${RAYDIUM_BASE_URL}pools/info/ids?ids=${poolId}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data: RaydiumApiResponse = await response.json();

    if (!data.success || !data.data || data.data.length === 0) {
      return null;
    }

    const poolData = data.data[0];
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
    return null;
  }
}
