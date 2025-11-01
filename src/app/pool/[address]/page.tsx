import PoolClient from "@/features/pool/components/PoolClient";
import { fetchInitialTransactions } from "@/features/transactions/services/serverTransactions";
import { fetchPoolInfo } from "@/features/pool/services/dexscreener";
import { SUPPORTED_CHAINS } from "@/shared/constants/supportedChains.constant";
import { DEFAULT_ADDRESS_ON_LANDING_PAGE } from "@/shared/constants/raydiumUrls.constant";

interface PoolPageProps {
  params: Promise<{
    address: string;
  }>;
  searchParams: Promise<{
    chain?: string;
  }>;
}

export default async function PoolPage({
  params,
  searchParams,
}: PoolPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  // Explicitly preserve case - Next.js may normalize route params on case-insensitive file systems
  // Use the raw param value and ensure proper decoding
  const rawAddress = resolvedParams.address;
  const poolAddress = rawAddress
    ? decodeURIComponent(rawAddress)
    : DEFAULT_ADDRESS_ON_LANDING_PAGE;

  let chain = SUPPORTED_CHAINS.SOLANA;
  if (resolvedSearchParams.chain) {
    const chainParam = resolvedSearchParams.chain.toLowerCase();
    if (
      chainParam === SUPPORTED_CHAINS.SOLANA ||
      chainParam === SUPPORTED_CHAINS.ETHEREUM
    ) {
      chain = chainParam as SUPPORTED_CHAINS;
    }
  }

  let initialTransactions;
  try {
    initialTransactions = await fetchInitialTransactions(poolAddress, chain, {
      limit: 10,
    });
  } catch (error) {
    initialTransactions = undefined;
  }

  let poolInfo;
  try {
    poolInfo = await fetchPoolInfo(poolAddress);
  } catch (error) {
    poolInfo = null;
  }

  return (
    <PoolClient
      poolAddress={poolAddress}
      initialTransactions={initialTransactions}
      chain={chain}
      poolInfo={poolInfo}
    />
  );
}
