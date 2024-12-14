"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";

export const SearchBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.push(`?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    } else {
      params.delete("q");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <form
        onSubmit={handleSearchSubmit}
        className="relative w-full max-w-44 md:hidden"
      >
        <Search
          size={20}
          onClick={toggleSearch}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300"
          role="button"
          aria-label="Toggle Search"
        />
        <div
          className={`transition-all duration-300 ease-in-out ${
            isSearchVisible ? "max-w-44 opacity-100" : "max-w-0 opacity-0"
          } overflow-hidden`}
        >
          <Input
            className="pl-10 h-11"
            placeholder="Search"
            name="q"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery.trim() !== "" && (
            <X
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300 cursor-pointer"
              onClick={handleClearSearch}
            />
          )}
        </div>
      </form>

      <form
        onSubmit={handleSearchSubmit}
        className="hidden md:block relative w-full md:max-w-52 lg:max-w-72"
      >
        <Input
          className="pl-12 h-10 w-full"
          placeholder="Search"
          name="q"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300"
          aria-label="Search icon"
        />
        {searchQuery.trim() !== "" && (
          <X
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300 cursor-pointer"
            onClick={handleClearSearch}
          />
        )}
      </form>
    </>
  );
};
