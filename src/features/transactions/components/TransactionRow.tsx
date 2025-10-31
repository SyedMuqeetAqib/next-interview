import { Transaction } from "../types/transaction.type";
import { TableCell, TableRow } from "@/shared/components/ui/table";
import TransactionStatusBadge from "./TransactionStatusBadge";

interface TransactionRowProps {
  transaction: Transaction;
  index: number;
}

const formatTime = (time: Date | string) => {
  const date = typeof time === "string" ? new Date(time) : time;
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};

const formatAddress = (address: string, length: number = 6) => {
  if (address.length <= length * 2) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

export default function TransactionRow({
  transaction,
  index,
}: TransactionRowProps) {
  return (
    <TableRow
      key={transaction.txHash || index}
      className="border-b border-border hover:bg-muted/30 transition-colors"
    >
      <TableCell className="py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm text-foreground font-medium">
        {formatTime(transaction.time)}
      </TableCell>
      <TableCell className="py-3 sm:py-4 px-4 sm:px-6">
        <TransactionStatusBadge action={transaction.action} />
      </TableCell>
      <TableCell className="py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm text-foreground text-right font-medium">
        {transaction.amountNative}
      </TableCell>
      <TableCell className="py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm text-foreground text-right font-medium">
        {transaction.amountToken}
      </TableCell>
      <TableCell className="py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm text-foreground font-mono">
        {transaction.wallet.includes("...")
          ? transaction.wallet
          : formatAddress(transaction.wallet)}
      </TableCell>
      <TableCell className="py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-mono">
        <a
          href={`https://solscan.io/tx/${transaction.txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary font-semibold transition-colors underline decoration-primary/50 underline-offset-2"
        >
          {formatAddress(transaction.txHash, 8)}
        </a>
      </TableCell>
    </TableRow>
  );
}
