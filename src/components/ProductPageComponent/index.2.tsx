"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/types/company";
import {
  FaRegStar,
  FaShoppingCart,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";

export default function ProductComponent({
  products,
}: {
  products: Product[];
}) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const router = useRouter();

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

  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-amber-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-amber-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-amber-400" />);
      }
    }

    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="mx-auto px-4 py-6 md:py-10">
    
        <h2 className="text-2xl md:text-3xl font-bold text-center ">
          All Products
        </h2>
        
 

      {products.length > 0 ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="relative h-48 w-full bg-gray-100">
                <Image
                  src={product.imageUrl}
                  fill
                  alt={product.name}
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  ${product.price.toFixed(2)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="mb-3">{renderStarRating(4.5)}</div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/product/${product.id}`);
                    }}
                  >
                    <FaShoppingCart className="mr-2" />
                    View Product
                  </motion.button>
                  <span className="text-sm text-gray-500">
                    Added: {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-16 bg-white rounded-lg shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 12H4"
            />
          </svg>
          <h3 className="mt-2 text-xl font-semibold text-gray-900">
            No products available
          </h3>
          <p className="mt-1 text-gray-500">
            This company hasn&apos;t added any products yet.
          </p>
        </motion.div>
      )}
    </div>
  );
}
