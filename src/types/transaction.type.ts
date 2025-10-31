export interface Transaction {
  time: Date;
  action: "buy" | "sell";
  amountNative: string; // SOL/ETH
  amountToken: string;
  wallet: string;
  txHash: string;
}
