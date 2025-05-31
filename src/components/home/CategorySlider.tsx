'use client';

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
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-amber-500 my-8">Best Categories</h2>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth gap-8 scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {Object.values(categories).map((cat: ICategory) => (
          <div
            key={cat.id}
            className="category-card flex-shrink-0 p-4 rounded-xl text-center scroll-snap-align-start flex flex-col items-center hover:border-amber-500 border"
          >
            <div className="w-24 h-24 mb-2 relative ">
              <Image
                src={cat.categoryImage}
                alt={cat.name}
                layout="fill"
                className="rounded-md object-cover hover:scale-105 transition-transform duration-300 grayscale-100 hover:grayscale-0"
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
