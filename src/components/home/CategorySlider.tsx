"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

const categories = [
  { name: "Pet Store", icon: "🐾" },
  { name: "Energy Supplier", icon: "⚡" },
  { name: "Real Estate Agents", icon: "🏠" },
  { name: "Insurance Agency", icon: "☂️" },
  { name: "Bedroom Furniture Store", icon: "🛏️" },
  { name: "Activewear Store", icon: "🛍️" },
  { name: "Women's Clothing Store", icon: "👗" },
  { name: "Men's Clothing Store", icon: "👔" },
  { name: "Electronics", icon: "💻" },
  { name: "Grocery", icon: "🛒" },
  { name: "Pet Store", icon: "🐾" },
  { name: "Energy Supplier", icon: "⚡" },
  { name: "Real Estate Agents", icon: "🏠" },
  { name: "Insurance Agency", icon: "☂️" },
  { name: "Bedroom Furniture Store", icon: "🛏️" },
  { name: "Activewear Store", icon: "🛍️" },
  { name: "Women's Clothing Store", icon: "👗" },
  { name: "Men's Clothing Store", icon: "👔" },
  { name: "Electronics", icon: "💻" },
  { name: "Grocery", icon: "🛒" },
];

export default function CategorySlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    scrollRef.current.scrollTo({
      left:
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth,
      behavior: "smooth",
    });
  };

  //for auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      scroll("right");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">What are you looking for?</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
          <button className="ml-2 text-sm px-3 py-1 border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50">
            See more
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth scrollbar-hide gap-5"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-centre flex-shrink-0 w-[25%]  max-w-[225px] text-center scroll-snap-align-start"
          >
            <div className="text-3xl mb-2">{cat.icon}</div>
            <span className="text-sm text-gray-700 px-2 break-words leading-snug">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
