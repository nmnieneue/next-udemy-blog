"use client";

import { useState } from "react";
import SearchBox from "../post/SearchBox";
import { FiSearch } from "react-icons/fi";

export default function SearchOverlay() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div className="sm:hidden">
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="text-xl p-2"
        >
          <FiSearch />
        </button>
      </div>
      <div className="hidden sm:block">
        <SearchBox />
      </div>
      {isSearchOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-white flex items-center px-4">
          <SearchBox />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-4 text-xl"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}