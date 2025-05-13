"use client";

import Image from "next/image";
import {
  FaArrowRightLong,
  FaBuilding,
  FaGlobe,
  FaProductHunt,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import travel1 from "@/assets/Travel company-logo/travel-1.png";
import travel2 from "@/assets/Travel company-logo/travel-2.png";
import travel3 from "@/assets/Travel company-logo/travel-3.png";
import travel4 from "@/assets/Travel company-logo/travel-4.png";
import Link from "next/link";
import { Company } from "@/types/company";
import { StarIcon } from "lucide-react";

export default function SiteComparison({
  companies,
}: {
  companies: Company[];
}) {
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.03,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 },
    },
  };

  const defaultCompanyImage =
    "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop";

  return (
    <div className="w-full  mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h2 className="text-xl font-semibold text-amber-500">
          Best Companies
        </h2>
        <Link href="/company">
          <button className="text-sm sm:text-base border border-blue-600 text-blue-600 font-medium px-4 py-1.5 rounded-full transition hover:bg-blue-600 hover:text-white active:scale-95">
            See more
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-6 overflow-x-auto pb-4 scroll-smooth">
        {companies.map((company, idx) => (
          <motion.div
            key={company.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
            variants={cardVariants}
            whileHover="hover"
          >
            {/* Company Image with Animation */}
            <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
              <motion.div
                className="h-full w-full"
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={company.companyImage || defaultCompanyImage}
                  alt={company.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <h3 className="text-xl font-bold text-white">{company.name}</h3>
                {company.account.status === "ACTIVE" ? (
                  <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                    Active
                  </span>
                ) : (
                  <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                    Inactive
                  </span>
                )}
              </div>
            </div>

            {/* Company Details */}
            <div className="p-6">
              <div className="flex items-center text-gray-500 mb-4">
                <FaBuilding className="mr-2" />
                <span>Joined: {formatDate(company.createdAt)}</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-gray-500">
                  <FaProductHunt className="mr-2" />
                  <span>{company.products.length} Products</span>
                </div>

                {company.website && (
                  <div className="flex items-center text-gray-500">
                    <FaGlobe className="mr-2" />
                    <a
                      href={
                        company.website.startsWith("http")
                          ? company.website
                          : `https://${company.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-800 transition-colors duration-200"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>

              <p className="text-gray-600 mb-6 line-clamp-3">
                {company.description ||
                  `${company.name} is one of our trusted partners providing quality products with verified customer reviews.`}
              </p>

              <div className="flex justify-between items-center">
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link
                    href={`/company/${company.id}`}
                    className="inline-flex items-center font-semibold text-amber-600 hover:text-amber-800 transition-colors duration-200"
                  >
                    View Company
                    <FaArrowRightLong className="ml-2" />
                  </Link>
                </motion.div>

                <span className="text-sm text-gray-500">
                  {company.products.length > 0
                    ? `Latest product: ${new Date(
                        company.products[0].createdAt
                      ).toLocaleDateString()}`
                    : "No products yet"}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
