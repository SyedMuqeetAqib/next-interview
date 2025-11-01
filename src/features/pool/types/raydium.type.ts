// Raydium API Response Types
export interface RaydiumToken {
  chainId: number;
  address: string;
  programId: string;
  logoURI: string;
  symbol: string;
  name: string;
  decimals: number;
  tags: string[];
  extensions: Record<string, unknown>;
}

export interface RaydiumPoolPeriod {
  volume: number;
  volumeQuote: number;
  volumeFee: number;
  apr: number;
  feeApr: number;
  priceMin: number;
  priceMax: number;
  rewardApr: number[];
}

export interface RaydiumPoolData {
  type: string;
  programId: string;
  id: string;
  mintA: RaydiumToken;
  mintB: RaydiumToken;
  price: number;
  mintAmountA: number;
  mintAmountB: number;
  feeRate: number;
  openTime: string;
  tvl: number;
  day: RaydiumPoolPeriod;
  week: RaydiumPoolPeriod;
  month: RaydiumPoolPeriod;
  pooltype: string[];
  rewardDefaultInfos: unknown[];
  farmUpcomingCount: number;
  farmOngoingCount: number;
  farmFinishedCount: number;
  marketId: string;
  lpMint: RaydiumToken;
  lpPrice: number;
  lpAmount: number;
  burnPercent: number;
  launchMigratePool: boolean;
}

export interface RaydiumApiResponse {
  id: string;
  success: boolean;
  data: RaydiumPoolData[];
}

// Extracted pool info for component usage
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
