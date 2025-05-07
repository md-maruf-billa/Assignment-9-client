'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import bank1 from '@/assets/bank logo/bank-1.png';
import bank2 from '@/assets/bank logo/bank-2.png';
import bank3 from '@/assets/bank logo/bank-3.png';
import bank4 from '@/assets/bank logo/bank-4.png';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const bankData = [
  {
    name: 'DuGood Credit Union',
    url: 'www.dugood.org',
    logo: bank1,
    rating: 4.8,
    reviews: 4345,
  },
  {
    name: 'EECU Credit Union',
    url: 'eecu.org',
    logo: bank2,
    rating: 4.8,
    reviews: 1667,
  },
  {
    name: 'Superior Funding',
    url: 'superiorfunding.net',
    logo: bank3,
    rating: 4.8,
    reviews: 450,
  },
  {
    name: 'MAJORITY - Mobile Banking',
    url: 'majority.com',
    logo: bank4,
    rating: 4.7,
    reviews: 11207,
  },
];

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-4 h-4 ${filled ? 'text-green-500' : 'text-gray-300'}`}
    fill={filled ? 'currentColor' : 'none'}
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674h4.911c.969 0 1.371 1.24.588 1.81l-3.974 2.888 1.519 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.974 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674-3.974-2.888c-.784-.57-.38-1.81.588-1.81h4.911l1.519-4.674z" />
  </svg>
);

export default function SiteReview() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <div ref={sectionRef} className="mx-auto px-4 py-6 md:py-10 ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
        <h2 className="text-2xl md:text-3xl font-bold">Best in Bank</h2>
        <button className="text-sm sm:text-base border border-blue-600 text-blue-600 font-medium px-4 py-1.5 rounded-full transition hover:bg-blue-600 hover:text-white active:scale-95">
          See more
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 pb-4">
        {bankData.map((bank, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            className="flex-shrink-0 w-64 md:w-full bg-white border rounded-xl p-4 shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-14 h-14 mb-2">
              <Image
                src={bank.logo}
                alt={`${bank.name} logo`}
                width={56}
                height={56}
                className="rounded-md object-contain"
              />
            </div>
            <h3
              className="font-semibold text-[15px] leading-tight truncate"
              title={bank.name}
            >
              {bank.name}
            </h3>
            <p className="text-gray-500 text-sm">{bank.url}</p>
            <div className="flex items-center mt-2">
              <div className="flex gap-[1px]">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} filled={i < Math.floor(bank.rating)} />
                ))}
              </div>
              <p className="text-sm text-gray-700 ml-1">
                {bank.rating} ({bank.reviews.toLocaleString()})
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
