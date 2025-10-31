"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

type TransactionStatus = "pending" | "success" | "failed";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  amountSpent: string;
  amountReceived: string;
  tokenSpent: string;
  tokenReceived: string;
}

export default function TransactionModal({
  isOpen,
  onClose,
  amountSpent,
  amountReceived,
  tokenSpent,
  tokenReceived,
}: TransactionModalProps) {
  const [status, setStatus] = useState<TransactionStatus>("pending");

  useEffect(() => {
    if (isOpen) {
      // Reset to pending when modal opens
      setStatus("pending");

      // Simulate transaction delay (2-4 seconds)
      const delay = 2000 + Math.random() * 2000;
      const timer = setTimeout(() => {
        // Randomly determine success or failure (50/50)
        const isSuccess = Math.random() > 0.5;
        setStatus(isSuccess ? "success" : "failed");
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setStatus("pending");
    onClose();
  };

  const handleRetry = () => {
    setStatus("pending");
    // Simulate retry
    const delay = 2000 + Math.random() * 2000;
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;
      setStatus(isSuccess ? "success" : "failed");
    }, delay);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {status === "pending" && "Transaction Pending"}
            {status === "success" && "Transaction Successful"}
            {status === "failed" && "Transaction Failed"}
          </DialogTitle>
          <DialogDescription>
            {status === "pending" && "Your transaction is being processed..."}
            {status === "success" &&
              "Your swap has been completed successfully."}
            {status === "failed" && "Your transaction could not be completed."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          {/* Status Icon */}
          <div className="flex items-center justify-center">
            {status === "pending" && (
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
            )}
            {status === "success" && (
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            )}
            {status === "failed" && (
              <XCircle className="h-16 w-16 text-destructive" />
            )}
          </div>

          {/* Transaction Details */}
          <div className="w-full space-y-3 text-sm">
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-muted-foreground">You spent</span>
              <span className="font-semibold">
                {amountSpent} {tokenSpent}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-muted-foreground">You received</span>
              <span className="font-semibold">
                {amountReceived} {tokenReceived}
              </span>
            </div>
          </div>

          {/* Status Message */}
          {status === "pending" && (
            <p className="text-sm text-muted-foreground text-center">
              Please wait while we process your transaction...
            </p>
          )}
          {status === "success" && (
            <p className="text-sm text-green-600 dark:text-green-400 text-center">
              Transaction confirmed on chain!
            </p>
          )}
          {status === "failed" && (
            <div className="space-y-3 w-full">
              <p className="text-sm text-destructive text-center">
                Transaction failed. This could be due to network congestion,
                insufficient funds, or other issues. Please try again.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {status === "failed" && (
            <Button variant="outline" onClick={handleRetry} className="flex-1">
              Retry
            </Button>
          )}
          <Button
            onClick={handleClose}
            className="flex-1"
            variant={status === "failed" ? "default" : "default"}
          >
            {status === "pending" ? "Waiting..." : "Close"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
