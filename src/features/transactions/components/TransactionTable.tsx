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
      <div className="rounded-lg border border-gray-800 bg-gray-950 p-8">
        <h2 className="text-lg font-semibold text-white mb-4">
          Latest Transactions
        </h2>
        <div className="text-sm text-gray-500">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-gray-800 bg-gray-950 p-8">
        <h2 className="text-lg font-semibold text-white mb-4">
          Latest Transactions
        </h2>
        <div className="text-sm text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="rounded-lg border border-gray-800 bg-gray-950 p-8">
        <h2 className="text-lg font-semibold text-white mb-4">
          Latest Transactions
        </h2>
        <div className="text-sm text-gray-500">No transactions found</div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-950 p-8 overflow-x-auto">
      <h2 className="text-lg font-semibold text-white mb-4">
        Latest Transactions
      </h2>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-800">
            <TableHead className="text-left py-5 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Time
            </TableHead>
            <TableHead className="text-left py-5 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Action
            </TableHead>
            <TableHead className="text-right py-5 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Amount (Native)
            </TableHead>
            <TableHead className="text-right py-5 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Amount (Token)
            </TableHead>
            <TableHead className="text-left py-5 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Wallet
            </TableHead>
            <TableHead className="text-left py-5 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
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
