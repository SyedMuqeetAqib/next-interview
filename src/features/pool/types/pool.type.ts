import { Chain } from "@/shared/contexts/AppContext";

export interface Pool {
  address: string;
  tokenSymbol: string;
  tokenName: string;
  chain: Chain;
}
