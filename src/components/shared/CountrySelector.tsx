/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Country = {
  name: string;
  code: string;
  flagUrl: string;
};

export default function CountrySelector() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selected, setSelected] = useState<Country | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();

      const formatted: Country[] = data
        .map((c: any) => ({
          name: c.name.common,
          code: c.cca2?.toLowerCase(),
          flagUrl: c.flags?.svg || c.flags?.png,
        }))
        .filter((c: any) => c.code && c.flagUrl)
        .sort((a: any, b: any) => a.name.localeCompare(b.name));

      setCountries(formatted);
      setSelected(formatted[0]);
    };

    fetchCountries();
  }, []);

  return (
    <div className="relative w-full max-w-xs">
      <h3 className="text-gray-400 font-semibold mb-2">Choose country</h3>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-gray-800 text-white border border-gray-600 p-2 rounded"
      >
        {selected && (
          <span className="flex items-center gap-2">
            <Image
              height={100}
              width={100}
              src={selected.flagUrl}
              alt={selected.name}
              className="w-5 h-4"
            />
            {selected.name}
          </span>
        )}
        <span>▼</span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 max-h-60 w-full overflow-auto bg-gray-900 border border-gray-700 rounded shadow-lg">
          {countries.map((country) => (
            <li
              key={country.code}
              onClick={() => {
                setSelected(country);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer text-white"
            >
              <Image
                height={100}
                width={100}
                src={country.flagUrl}
                alt={country.name}
                className="w-5 h-4"
              />
              {country.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
