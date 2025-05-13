"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface ReviewCategory {
  name: string;
}

interface ProductReview {
  id: string;
  title: string;
  description: string;
  rating: number;
  categoryId: string;
  productId: string;
  isPremium: boolean;
  reviewerName: string;
  reviewerEmail: string;
  reviewerProfilePhoto: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  isDeleted: boolean;
  upVotes: number;
  downVotes: number;
  category: ReviewCategory;
}

export default function RecentReview({
  reviews,
}: {
  reviews: ProductReview[];
}) {
  const reviewsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef);

  const goToNextPage = () => {
    if ((currentPage + 1) * reviewsPerPage < reviews.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const currentReviews = reviews?.slice(
    currentPage * reviewsPerPage,
    currentPage * reviewsPerPage + reviewsPerPage
  );

  const totalPages = Math.ceil(reviews?.length / reviewsPerPage);

  return (
    <div className="w-full mb-10" ref={sectionRef}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-amber-500">Recent Reviews</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            aria-label="Previous reviews"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            aria-label="Next reviews"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div ref={containerRef} className="relative overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentPage}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
          >
            {currentReviews?.map((review, index) => (
              <motion.div
                key={review.id}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.05 }}
                className="h-full"
              >
                <Card className="p-4 flex flex-col justify-between h-full hover:shadow-lg transition-all duration-300 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    {review.reviewerProfilePhoto ? (
                      <Image
                        src={review.reviewerProfilePhoto}
                        alt={review.reviewerName}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center font-bold">
                        {review.reviewerName?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-sm truncate">
                        {review.reviewerName}
                      </p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm mb-3 line-clamp-4 text-gray-700">
                    {review.description}
                  </p>

                  <div className="text-xs text-gray-500 mt-auto">
                    <span>Category: </span>
                    <span className="font-medium">{review.category?.name}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                    <span>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex gap-1">
                      👍 {review.upVotes} / 👎 {review.downVotes}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
