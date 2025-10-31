import { Transaction } from "../types/transaction.type";

interface TransactionStatusBadgeProps {
  action: Transaction["action"];
}

export default function TransactionStatusBadge({
  action,
}: TransactionStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        action === "buy"
          ? "bg-[oklch(0.65_0.15_160/0.2)] text-[oklch(0.70_0.15_160)] border border-[oklch(0.70_0.15_160/0.3)]"
          : "bg-destructive/20 text-destructive border border-destructive/30"
      }`}
    >
      {action.toUpperCase()}
    </span>
  );
}
