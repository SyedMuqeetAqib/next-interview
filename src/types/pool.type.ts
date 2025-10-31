import { Chain } from "../contexts/AppContext";

export interface Pool {
  address: string;
  tokenSymbol: string;
  tokenName: string;
  chain: Chain;
}
