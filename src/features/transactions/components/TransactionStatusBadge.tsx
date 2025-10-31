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
          ? "bg-green-500/20 text-green-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {action.toUpperCase()}
    </span>
  );
}
