"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import travel1 from "@/assets/Travel company-logo/travel-1.png";
import travel2 from "@/assets/Travel company-logo/travel-2.png";
import travel3 from "@/assets/Travel company-logo/travel-3.png";
import travel4 from "@/assets/Travel company-logo/travel-4.png";
import Link from "next/link";

const travelCompanyData = [
  {
    name: "AARDY",
    url: "www.aardy.com",
    logo: travel1,
    rating: 4.8,
    reviews: 4345,
  },
  {
    name: "Triplnsure101",
    url: "triplnsure101.com",
    logo: travel2,
    rating: 4.8,
    reviews: 1667,
  },
  {
    name: "MexiPass International Insurance Services",
    url: "mexipass.com",
    logo: travel3,
    rating: 4.8,
    reviews: 450,
  },
  {
    name: "WyZ Tech",
    url: "wyztech.com",
    logo: travel4,
    rating: 4.7,
    reviews: 11207,
  },
];

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-green-500" : "text-gray-300"}`}
    fill={filled ? "currentColor" : "none"}
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674h4.911c.969 0 1.371 1.24.588 1.81l-3.974 2.888 1.519 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.974 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674-3.974-2.888c-.784-.57-.38-1.81.588-1.81h4.911l1.519-4.674z" />
  </svg>
);

export default function SiteComparison() {
  return (
    <div className="w-full  mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Best Reviewed Company
        </h2>
        <Link href="/company">
          <button className="text-sm sm:text-base border border-blue-600 text-blue-600 font-medium px-4 py-1.5 rounded-full transition hover:bg-blue-600 hover:text-white active:scale-95">
            See more
          </button>
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth">
        {travelCompanyData.map((company, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="flex-shrink-0 w-64 bg-white border rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-14 h-14 mb-3">
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                width={56}
                height={56}
                className="rounded-md object-contain"
              />
            </div>
            <h3
              className="font-semibold text-base leading-tight truncate"
              title={company.name}
            >
              {company.name}
            </h3>
            <p className="text-gray-500 text-sm truncate">{company.url}</p>
            <div className="flex items-center mt-2">
              <div className="flex gap-[1px]">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} filled={i < Math.floor(company.rating)} />
                ))}
              </div>
              <p className="text-sm text-gray-700 ml-1">
                {company.rating} ({company.reviews.toLocaleString()})
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
