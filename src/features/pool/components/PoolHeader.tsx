"use client";

import { useApp } from "@/shared/contexts/AppContext";

export default function PoolHeader() {
  const { chain } = useApp();

  return (
    <div className="mb-4 sm:mb-6 px-2">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Trading Dashboard
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground">
        Current chain:{" "}
        <span className="text-foreground font-medium capitalize">{chain}</span>
      </p>
    </div>
  );
}
