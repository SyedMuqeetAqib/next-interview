"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim()) {
      const address = searchValue.trim();
      router.push(`/pool/${address}`);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.trim()) {
      const address = searchValue.trim();
      router.push(`/pool/${address}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search pool address..."
        className="w-48 sm:w-64 rounded-lg border border-border bg-input px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-sm"
      />
    </form>
  );
};

export default SearchBar;
