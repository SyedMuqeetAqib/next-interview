import { Suspense } from "react";
import PoolClient from "@/features/pool/components/PoolClient";
import { fetchInitialTransactions } from "@/features/transactions/services/serverTransactions";
import { fetchPoolInfo } from "@/features/pool/services/raydium";
import { SUPPORTED_CHAINS } from "@/shared/constants/supportedChains.constant";
import { DEFAULT_ADDRESS_ON_LANDING_PAGE } from "@/shared/constants/raydiumUrls.constant";

export default async function Home() {
  const poolAddress = DEFAULT_ADDRESS_ON_LANDING_PAGE;
  const chain = SUPPORTED_CHAINS.SOLANA;

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
    <Suspense fallback={<div>Loading...</div>}>
      <PoolClient
        poolAddress={poolAddress}
        initialTransactions={initialTransactions}
        chain={chain}
        poolInfo={poolInfo}
      />
    </Suspense>
  );
}
