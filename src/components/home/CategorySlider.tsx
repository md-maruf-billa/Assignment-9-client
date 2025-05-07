'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { JSX, useEffect, useRef } from 'react';

export interface ICategory {
  name: string;
  categoryImage: string;
  id: string;
}

export default function CategorySlider(categories: ICategory[]): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector(
      '.category-card'
    ) as HTMLElement;
    if (!card) return;

    const scrollAmount = card.offsetWidth + 20; // 20px = gap
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      scroll('right');
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">What are you looking for?</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
          <button className="text-sm sm:text-base border border-blue-600 text-blue-600 font-medium px-4 py-1.5 rounded-full transition hover:bg-blue-600 hover:text-white active:scale-95">
            See more
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth gap-5 scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {Object.values(categories).map((cat: ICategory) => (
          <div
            key={cat.id}
            className="category-card flex-shrink-0 w-[70vw] sm:w-[40vw] md:w-[25vw] lg:w-[20vw] max-w-[225px] text-center scroll-snap-align-start flex flex-col items-center"
          >
            <div className="w-24 h-24 mb-2 relative">
              <Image
                src={cat.categoryImage}
                alt={cat.name}
                layout="fill"
                className="rounded-full object-cover hover:scale-105 transition-transform duration-300 grayscale-100 hover:grayscale-0"
                style={{ scrollSnapAlign: 'start' }}
              />
            </div>
            <span className="text-sm text-gray-700 px-2 break-words leading-snug">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
