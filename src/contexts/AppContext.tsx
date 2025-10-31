"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Chain = "ethereum" | "solana";

interface AppContextType {
  chain: Chain;
  setChain: (chain: Chain) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [chain, setChain] = useState<Chain>("solana");

  return (
    <AppContext.Provider value={{ chain, setChain }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
