"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";

interface Review {
  id: number;
  text: string;
  rating: number;
  reviewer: {
    name: string;
    initial: string;
    avatarColor: string;
  };
  company: {
    name: string;
    logo: string;
    website: string;
  };
}

const reviewsPerPage = 6;

const reviews: Review[] = [
  {
    id: 1,
    text: "Great service! Highly recommended.",
    rating: 5,
    reviewer: {
      name: "Alice Johnson",
      initial: "A",
      avatarColor: "bg-red-500",
    },
    company: {
      name: "TechCorp",
<<<<<<< HEAD
      logo: "/logos/techcorp.svg",
=======
      logo: "https://images.unsplash.com/photo-1590102426319-c7526718cd70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
>>>>>>> 93b41c531e94d7c3569659ef20c2fa28e7705e29
      website: "techcorp.com",
    },
  },
  {
    id: 2,
    text: "Quick and reliable support team.",
    rating: 4,
    reviewer: {
      name: "Bob Smith",
      initial: "B",
      avatarColor: "bg-green-500",
    },
    company: {
      name: "DevSolutions",
<<<<<<< HEAD
      logo: "/logos/devsolutions.svg",
=======
      logo: "https://images.unsplash.com/photo-1670341447004-606a07fcfaa7?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
>>>>>>> 93b41c531e94d7c3569659ef20c2fa28e7705e29
      website: "devsolutions.com",
    },
  },
  {
    id: 3,
    text: "Their interface is intuitive and user-friendly.",
    rating: 4,
    reviewer: {
      name: "Clara West",
      initial: "C",
      avatarColor: "bg-blue-500",
    },
    company: {
      name: "UIExperts",
<<<<<<< HEAD
      logo: "/logos/uiexperts.svg",
=======
      logo: "https://images.unsplash.com/photo-1669975864803-6d8e6e431563?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
>>>>>>> 93b41c531e94d7c3569659ef20c2fa28e7705e29
      website: "uiexperts.com",
    },
  },
  {
    id: 4,
    text: "Affordable and efficient service.",
    rating: 5,
    reviewer: {
      name: "Daniel Roe",
      initial: "D",
      avatarColor: "bg-yellow-500",
    },
    company: {
      name: "EconoTech",
<<<<<<< HEAD
      logo: "/logos/econotech.svg",
=======
      logo: "https://images.unsplash.com/photo-1669975862041-997275f96aeb?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
>>>>>>> 93b41c531e94d7c3569659ef20c2fa28e7705e29
      website: "econotech.com",
    },
  },
  {
    id: 5,
    text: "Reliable team and excellent output.",
    rating: 5,
    reviewer: {
      name: "Ella Grey",
      initial: "E",
      avatarColor: "bg-pink-500",
    },
    company: {
      name: "DesignStudio",
      logo: "/logos/designstudio.svg",
      website: "designstudio.com",
    },
  },
  {
    id: 6,
    text: "Fast response and professional work.",
    rating: 5,
    reviewer: {
      name: "Frank James",
      initial: "F",
      avatarColor: "bg-purple-500",
    },
    company: {
      name: "CodeWorx",
<<<<<<< HEAD
      logo: "/logos/codeworx.svg",
=======
      logo: "https://images.unsplash.com/photo-1670341445726-8a9f4169da8c?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
>>>>>>> 93b41c531e94d7c3569659ef20c2fa28e7705e29
      website: "codeworx.com",
    },
  },
  {
    id: 7,
    text: "Exceeded my expectations in every way.",
    rating: 5,
    reviewer: {
      name: "Grace Moon",
      initial: "G",
      avatarColor: "bg-teal-500",
    },
    company: {
      name: "NovaApps",
<<<<<<< HEAD
      logo: "/logos/novaapps.svg",
=======
      logo: "https://images.unsplash.com/photo-1668419911970-899f8518a7bf?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
>>>>>>> 93b41c531e94d7c3569659ef20c2fa28e7705e29
      website: "novaapps.com",
    },
  },
];

const containerVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function RecentReview() {
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

  const currentReviews = reviews.slice(
    currentPage * reviewsPerPage,
    currentPage * reviewsPerPage + reviewsPerPage
  );

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div className="w-full mb-10 px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Recent reviews</h2>
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
            {currentReviews.map((review, index) => (
              <motion.div
                key={review.id}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.05 }}
                className="h-full"
              >
                <Card className="p-4 flex flex-col justify-between h-full hover:shadow-lg transition-all duration-300 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`${review.reviewer.avatarColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold`}
                    >
                      {review.reviewer.initial}
                    </div>
                    <div>
                      <p className="font-medium text-sm truncate">
                        {review.reviewer.name}
                      </p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-emerald-500 fill-emerald-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm mb-4 flex-grow line-clamp-4">{review.text}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <Image
                      src={review.company.logo}
                      alt={review.company.name}
                      width={24}
                      height={24}
                      className="rounded-sm"
                    />
                    <a
                      href={`https://${review.company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline truncate"
                    >
                      {review.company.name}
                    </a>
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
