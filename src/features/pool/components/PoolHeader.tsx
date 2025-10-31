"use client";

import { useApp } from "@/shared/contexts/AppContext";

export default function PoolHeader() {
  const { chain } = useApp();

  return (
    <div className="mb-8 px-2">
      <h1 className="text-3xl font-bold text-white mb-2">Trading Dashboard</h1>
      <p className="text-gray-400">
        Current chain:{" "}
        <span className="text-white font-medium capitalize">{chain}</span>
      </p>
    </div>
  );
}
