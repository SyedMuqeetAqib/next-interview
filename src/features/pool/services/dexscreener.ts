import { DEXSCREENER_URL } from "../../../shared/constants/dexscreener.constant";
import { DexScreenerApiResponse, PoolInfo } from "../types/dexscreener.type";

export async function fetchPoolInfo(poolId: string): Promise<PoolInfo | null> {
  try {
    const response = await fetch(
      `${DEXSCREENER_URL}/latest/dex/pairs/solana/${poolId}`,
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

    const data: DexScreenerApiResponse = await response.json();

    // Use the primary pair if available, otherwise use the first pair from pairs array
    const poolData =
      data.pair || (data.pairs && data.pairs.length > 0 ? data.pairs[0] : null);

    if (!poolData) {
      return null;
    }

    const quoteToken = poolData.quoteToken;
    const baseToken = poolData.baseToken;
    const priceUsd = parseFloat(poolData.priceUsd) || 0;
    const imageUrl = poolData.info?.imageUrl || "";
    const priceNative = parseFloat(poolData.priceNative) || 0;

    // Solana native token address (Wrapped SOL)
    const SOL_NATIVE_ADDRESS = "So11111111111111111111111111111111111111112";

    // Determine logos: if quoteToken is SOL, use Solana logo, otherwise use imageUrl
    const getTokenLogo = (tokenAddress: string) => {
      if (tokenAddress === SOL_NATIVE_ADDRESS) {
        return "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png";
      }
      return imageUrl;
    };

    return {
      tokenSymbol: quoteToken.symbol,
      tokenName: quoteToken.name,
      tokenLogo: getTokenLogo(quoteToken.address),
      baseTokenSymbol: baseToken.symbol,
      baseTokenName: baseToken.name,
      baseTokenLogo: getTokenLogo(baseToken.address),
      price: priceNative,
      poolId: poolData.pairAddress,
    };
  } catch (error) {
    return null;
  }
}
