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
        className="w-64 rounded-lg border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
      />
    </form>
  );
};

export default SearchBar;
