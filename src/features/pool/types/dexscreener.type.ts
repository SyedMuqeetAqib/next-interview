// DexScreener API Response Types
export interface DexScreenerToken {
  address: string;
  name: string;
  symbol: string;
}

export interface DexScreenerPairInfo {
  imageUrl?: string;
  header?: string;
  openGraph?: string;
  websites?: Array<{ url: string; label: string }>;
  socials?: Array<{ url: string; type: string }>;
}

export interface DexScreenerPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: DexScreenerToken;
  quoteToken: DexScreenerToken;
  priceNative: string;
  priceUsd: string;
  txns?: {
    m5?: { buys: number; sells: number };
    h1?: { buys: number; sells: number };
    h6?: { buys: number; sells: number };
    h24?: { buys: number; sells: number };
  };
  volume?: {
    h24?: number;
    h6?: number;
    h1?: number;
    m5?: number;
  };
  priceChange?: {
    m5?: number;
    h1?: number;
    h6?: number;
    h24?: number;
  };
  liquidity?: {
    usd?: number;
    base?: number;
    quote?: number;
  };
  fdv?: number;
  marketCap?: number;
  pairCreatedAt?: number;
  info?: DexScreenerPairInfo;
  boosts?: {
    active?: number;
  };
}

export interface DexScreenerApiResponse {
  schemaVersion: string;
  pairs: DexScreenerPair[];
  pair?: DexScreenerPair;
}

export interface PoolInfo {
  tokenSymbol: string;
  tokenName: string;
  tokenLogo: string;
  baseTokenSymbol: string;
  baseTokenName: string;
  baseTokenLogo: string;
  price: number;
  poolId: string;
}
