"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchHero() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {

  };

  return (
    <section
      className="relative py-32 px-4 text-center overflow-hidden mb-16"
      style={{
        backgroundImage: "url('/banner-bg.svg')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Find a review you can trust
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Real reviews by real people.
        </p>

        <div className="flex items-center gap-2 bg-white rounded-full shadow-md px-4 py-2 max-w-xl mx-auto">
          <label htmlFor="search" className="sr-only">
            Search company or category
          </label>
          <Input
            id="search"
            type="text"
            placeholder="Search company or category"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow border-none focus:ring-0 focus-visible:ring-0"
          />
          <Button size="icon" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Optional corner blobs */}
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-yellow-400 rounded-full -z-10" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-emerald-400 rounded-full -z-10" />
    </section>
  );
}
