import React from "react";
import { useApp } from "@/shared/contexts/AppContext";
import { useTransactions } from "../hooks/useTransactions";
import { Transaction } from "../types/transaction.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import TransactionRow from "./TransactionRow";

const TransactionTable = ({ poolAddress }: { poolAddress: string }) => {
  const { chain } = useApp();
  const { transactions, loading, error } = useTransactions(poolAddress, chain);

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 lg:p-6 backdrop-blur-sm shadow-lg shadow-primary/10 border-primary/10">
        <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
          Latest Transactions
        </h2>
        <div className="text-sm text-muted-foreground">
          Loading transactions...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 lg:p-6 backdrop-blur-sm shadow-lg shadow-primary/10 border-primary/10">
        <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
          Latest Transactions
        </h2>
        <div className="text-sm text-destructive font-medium">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 lg:p-6 backdrop-blur-sm shadow-lg shadow-primary/10 border-primary/10">
        <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
          Latest Transactions
        </h2>
        <div className="text-sm text-muted-foreground">
          No transactions found
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5 lg:p-6 backdrop-blur-sm shadow-lg shadow-primary/10 border-primary/10 overflow-x-auto">
      <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
        Latest Transactions
      </h2>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border hover:bg-muted/40">
            <TableHead className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Time
            </TableHead>
            <TableHead className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Action
            </TableHead>
            <TableHead className="text-right py-3 sm:py-4 px-4 sm:px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Amount (Native)
            </TableHead>
            <TableHead className="text-right py-3 sm:py-4 px-4 sm:px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Amount (Token)
            </TableHead>
            <TableHead className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Wallet
            </TableHead>
            <TableHead className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Transaction Hash
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction: Transaction, index: number) => (
            <TransactionRow
              key={transaction.txHash || index}
              transaction={transaction}
              index={index}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
