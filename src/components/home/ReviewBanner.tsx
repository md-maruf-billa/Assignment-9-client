'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebookF } from 'react-icons/fa';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import banner1 from '@/assets/ReviewBanner/banner-1.jpg';
import banner2 from '@/assets/ReviewBanner/banner-2.jpg';
import banner3 from '@/assets/ReviewBanner/banner-3.jpg';

export default function ReviewBanner() {
  const [isMounted, setIsMounted] = useState(false);
  const bannerRef = useRef(null);
  const isInView = useInView(bannerRef, { once: false, amount: 0.2 });

  // Prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll animation setup
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start end', 'end start'],
  });

  // Transform values for scroll-based animations
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0.5, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.5], [0.95, 1, 1.02]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.5], [50, 0, -10]);

  // Individual image animation setup
  const imgY1 = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const imgY2 = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);
  const imgY3 = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);

  const imgOpacity1 = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const imgOpacity2 = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const imgOpacity3 = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  // Make sure images are properly imported and displayed
  const images = [
    { src: banner1, alt: 'Person in garden' },
    { src: banner2, alt: 'People walking' },
    { src: banner3, alt: 'Person enjoying coffee' },
  ];

  // Non-animated fallback for SSR/initial render
  if (!isMounted) {
    return (
      <div className="w-full bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 sm:p-8 md:p-12 shadow-lg relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Help millions make the{' '}
              <span className="text-orange-600">right choice</span>
            </h2>
            <p className="text-base sm:text-lg mb-6 text-gray-700">
              Share your experience on ReviewHub, where real reviews make a
              difference. Join our community and help others make informed
              decisions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="rounded-full bg-black text-white hover:bg-black/90 px-6 py-5 shadow-md">
                Login or sign up
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full shadow-sm bg-white"
                >
                  <FcGoogle className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full text-[#1877F2] shadow-sm bg-white"
                >
                  <FaFacebookF className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full text-black shadow-sm bg-white"
                >
                  <FaApple className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-md h-48 sm:h-60 md:h-72"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={bannerRef}
      style={{ opacity, scale, y }}
      className="w-full bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 sm:p-8 md:p-12 shadow-lg overflow-hidden relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Left section */}
        <div className="flex flex-col justify-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 tracking-tight"
            variants={itemVariants}
            initial={{ opacity: 1, y: 0 }}
          >
            Help millions make the{' '}
            <span className="text-orange-600">right choice</span>
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg mb-6 text-gray-700"
            variants={itemVariants}
            initial={{ opacity: 1, y: 0 }}
          >
            Share your experience on ReviewHub, where real reviews make a
            difference. Join our community and help others make informed
            decisions.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            variants={itemVariants}
            initial={{ opacity: 1, y: 0 }}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button className="rounded-full bg-black text-white hover:bg-black/90 px-6 py-5 shadow-md">
                Login or sign up
              </Button>
            </motion.div>

            <div className="flex gap-2">
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full shadow-sm bg-white"
                >
                  <FcGoogle className="w-5 h-5" />
                </Button>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full text-[#1877F2] shadow-sm bg-white"
                >
                  <FaFacebookF className="w-5 h-5" />
                </Button>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full text-black shadow-sm bg-white"
                >
                  <FaApple className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right section - Images with individual scroll animations */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <motion.div
            className="rounded-lg overflow-hidden shadow-md h-48 sm:h-60 md:h-72"
            style={{ y: imgY1, opacity: imgOpacity1 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <Image
              src={banner1}
              alt="Person in garden"
              width={400}
              height={600}
              className="w-full h-full object-cover"
              priority={true}
            />
          </motion.div>

          <motion.div
            className="rounded-lg overflow-hidden shadow-md h-48 sm:h-60 md:h-72"
            style={{ y: imgY2, opacity: imgOpacity2 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <Image
              src={banner2}
              alt="People walking"
              width={400}
              height={600}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            className="rounded-lg overflow-hidden shadow-md h-48 sm:h-60 md:h-72"
            style={{ y: imgY3, opacity: imgOpacity3 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <Image
              src={banner3}
              alt="Person enjoying coffee"
              width={400}
              height={600}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-orange-300 opacity-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { delay: 0.8, duration: 1 } }}
      />

      <motion.div
        className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-orange-400 opacity-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { delay: 1, duration: 1 } }}
      />
    </motion.div>
  );
}
