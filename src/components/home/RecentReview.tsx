'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  id: string;
  reviewer: {
    name: string;
    initial: string;
    avatarColor: string;
  };
  rating: number;
  text: string;
  company: {
    name: string;
    website: string;
    logo: string;
  };
}

export default function RecentReview() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const containerRef = useRef<HTMLDivElement>(null);

  const reviews: Review[] = [
    {
      id: '1',
      reviewer: {
        name: 'Christian Lorenz',
        initial: 'C',
        avatarColor: 'bg-purple-500',
      },
      rating: 5,
      text: "Feels like an actual project, not just hype I've seen soooo many crypto projects with fancy words and zero behind them. But BlockDAG it's really building...",
      company: {
        name: 'Blockdag',
        website: 'blockdag.network',
        logo: '/placeholder.svg?height=40&width=40',
      },
    },
    {
      id: '2',
      reviewer: {
        name: 'Naomi Leigh',
        initial: 'N',
        avatarColor: 'bg-purple-600',
      },
      rating: 5,
      text: 'What a lovely company to deal with from beginning to the end. Knowledgable staff & super polite & tidy guys who put the shed up. I will be recommending them to...',
      company: {
        name: 'Albany Shed Co',
        website: 'albanysheds.co.uk',
        logo: '/placeholder.svg?height=40&width=40',
      },
    },
    {
      id: '3',
      reviewer: {
        name: 'Darren Singer',
        initial: 'D',
        avatarColor: 'bg-purple-400',
      },
      rating: 5,
      text: "The citizen meds team is very responsive to your needs. I've used them now for six months, and I've been nothing more than impressed with them and the...",
      company: {
        name: 'Citizen Meds®',
        website: 'citizenmeds.com',
        logo: '/placeholder.svg?height=40&width=40',
      },
    },
    {
      id: '4',
      reviewer: {
        name: 'Anne Kneale',
        initial: 'A',
        avatarColor: 'bg-purple-500',
      },
      rating: 5,
      text: "I got all that I was looking for for great prices, it's so easy to order online and arrives very quickly There's always great offers to have",
      company: {
        name: 'Boots',
        website: 'www.boots.com',
        logo: '/placeholder.svg?height=40&width=40',
      },
    },
    {
      id: '5',
      reviewer: {
        name: 'Duncan Sangster',
        initial: 'D',
        avatarColor: 'bg-green-700',
      },
      rating: 1,
      text: 'Flowers were fine. Did not sign up to be spammed, still get my inbox drowned in spam. Have tried unsubscribing to no effect. They even use multiple email address...',
      company: {
        name: 'Bloom & Wild UK',
        website: 'www.bloomandwild.com',
        logo: '/placeholder.svg?height=40&width=40',
      },
    },
    {
      id: '6',
      reviewer: {
        name: 'Samantha Hadnutt',
        initial: 'S',
        avatarColor: 'bg-orange-500',
      },
      rating: 5,
      text: 'The harness is well made and a great fit. It has a loop on the front for when she gets excited and another loop on the back for the car. The staff were helpful and it...',
      company: {
        name: 'Pawezy',
        website: 'pawezy.com.au',
        logo: '/placeholder.svg?height=40&width=40',
      },
    },
    {
      id: '7',
      reviewer: {
        name: 'Helen Middleton',
        initial: 'H',
        avatarColor: 'bg-red-500',
      },
      rating: 5,
      text: 'Great value for money, quality brands, excellent service. I love my Radley glasses that were custom-made for under £30! Would highly recommend.',
      company: {
        name: 'SpeckyFourEyes®.com',
        website: 'www.speckyfoureyeyes.com',
        logo: '/placeholder.svg?height=40&width=40',
      },
    },
    {
      id: '8',
      reviewer: {
        name: 'Christiane MacAulay Readhead',
        initial: 'C',
        avatarColor: 'bg-purple-500',
      },
      rating: 5,
      text: 'I found this Company great, on time and did my tumble dryer repair as booked in, on time. Neat and tidy, polite. Great job , thank you.',
      company: {
        name: 'Appliance Serve',
        website: 'applianceserve.co.uk',
        logo: '/placeholder.svg?height=40&width=40',
      },
    },
    // Add more reviews if needed to demonstrate pagination
    {
      id: '9',
      reviewer: {
        name: 'John Smith',
        initial: 'J',
        avatarColor: 'bg-blue-500',
      },
      rating: 4,
      text: "Good service overall, but delivery took a bit longer than expected. Product quality was excellent though, so I'm still giving 4 stars.",
      company: {
        name: 'Tech Gadgets',
        website: 'techgadgets.com',
        logo: '/placeholder.svg?height=40&width=40',
      },
    },
    {
      id: '10',
      reviewer: {
        name: 'Emma Wilson',
        initial: 'E',
        avatarColor: 'bg-pink-500',
      },
      rating: 5,
      text: 'Absolutely fantastic service from start to finish. The team went above and beyond to help me find exactly what I needed. Will definitely use again!',
      company: {
        name: 'Home Essentials',
        website: 'homeessentials.com',
        logo: '/placeholder.svg?height=40&width=40',
      },
    },
  ];

  // Calculate total pages based on reviews length (8 cards per page)
  useEffect(() => {
    setTotalPages(Math.ceil(reviews.length / 8));
  }, [reviews.length]);

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };

  // Get current page reviews
  const currentReviews = reviews.slice(currentPage * 8, (currentPage + 1) * 8);

  // Animation variants
  const containerVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    }),
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="w-full mb-10">
      <div className="flex justify-between items-center mb-4">
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
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {currentReviews.map((review, index) => (
              <motion.div
                key={review.id}
                variants={cardVariants}
                custom={index}
              >
                <Card className="p-4 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`${review.reviewer.avatarColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold`}
                    >
                      {review.reviewer.initial}
                    </div>
                    <div>
                      <p className="font-medium">{review.reviewer.name}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-emerald-500 fill-emerald-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm mb-4 flex-grow">{review.text}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-8 h-8">
                      <Image
                        src={review.company.logo || '/placeholder.svg'}
                        alt={`${review.company.name} logo`}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {review.company.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {review.company.website}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination indicators */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentPage === index ? 'bg-primary' : 'bg-gray-300'
              } transition-colors`}
              onClick={() => {
                setDirection(index > currentPage ? 1 : -1);
                setCurrentPage(index);
              }}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
