'use client';
import { Button } from '@/components/ui/button';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useAnimation,
} from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function SiteBanner() {
  const [isMounted, setIsMounted] = useState(false);
  const bannerRef = useRef(null);
  const isInView = useInView(bannerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();

  // Scroll animation effects
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8], [0.8, 1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8], [100, 0, -20]);

  // Trigger animations when component comes into view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  // Prevent hydration errors with framer-motion
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              We're <span className="text-green-700">Review Hub</span>
            </h2>
            <p className="text-gray-800 text-base sm:text-lg">
              We're a review platform that's open to everyone. Our vision is to
              become the universal symbol of trust — by empowering people to
              shop with confidence, and helping companies improve.
            </p>
            <div>
              <Button className="rounded-full bg-gray-900 text-white hover:bg-gray-800 px-6 py-5 shadow-md">
                What we do
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-800 to-green-900 text-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-lg">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-4 flex-[2]">
                <h3 className="text-lg sm:text-xl font-bold">
                  Our Transparency Report has landed!
                </h3>
                <p className="text-sm sm:text-base text-green-50">
                  Find out which actions we've taken to protect you and promote
                  trust on our platform this year.
                </p>
                <div>
                  <Button
                    variant="outline"
                    className="rounded-full border-white text-white bg-transparent hover:bg-green-700 hover:border-green-700 mt-2 sm:mt-4"
                  >
                    Take a look
                  </Button>
                </div>
              </div>
              <div className="flex-[1] flex justify-center sm:justify-end items-center sm:items-end mt-4 sm:mt-0">
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {[
                    { bg: 'bg-emerald-400', num: '2' },
                    { bg: 'bg-orange-300', num: '0' },
                    { bg: 'bg-pink-400', num: '2' },
                    { bg: 'bg-yellow-300', num: '5' },
                  ].map((box, i) => (
                    <div
                      key={i}
                      className={`${box.bg} w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-md`}
                    >
                      {box.num}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const numberBoxVariants = {
    hidden: { scale: 0, rotate: -10 },
    visible: (i:number) => ({
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    }),
  };

  const hoverScale = {
    scale: 1.05,
    transition: { duration: 0.2 },
  };

  return (
    <motion.div
      ref={bannerRef}
      style={{ opacity, scale, y }}
      className="w-full bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
        {/* Left section */}
        <div className="space-y-4 md:space-y-6">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight"
            variants={itemVariants}
            initial={{ opacity: 1 }}
          >
            We're <span className="text-green-700">Review Hub</span>
          </motion.h2>

          <motion.p
            className="text-gray-800 text-base sm:text-lg"
            variants={itemVariants}
            initial={{ opacity: 1 }}
          >
            We're a review platform that's open to everyone. Our vision is to
            become the universal symbol of trust — by empowering people to shop
            with confidence, and helping companies improve.
          </motion.p>

          <motion.div
            variants={itemVariants}
            initial={{ opacity: 1 }}
            whileInView={{
              x: [50, 0],
              opacity: [0, 1],
              transition: { delay: 0.6, duration: 0.8 },
            }}
            viewport={{ once: false, amount: 0.6 }}
          >
            <motion.div whileHover={hoverScale} whileTap={{ scale: 0.95 }}>
              <Button className="rounded-full bg-gray-900 text-white hover:bg-gray-800 px-6 py-5 shadow-md">
                What we do
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right section */}
        <motion.div
          className="bg-gradient-to-br from-green-800 to-green-900 text-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-lg"
          variants={itemVariants}
          initial={{ opacity: 1 }}
          whileInView={{
            scale: [0.9, 1],
            opacity: [0, 1],
            transition: { duration: 0.8, ease: 'easeOut' },
          }}
          viewport={{ once: false, amount: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Left column with more space */}
            <div className="space-y-3 sm:space-y-4 flex-[2]">
              <motion.h3
                className="text-lg sm:text-xl font-bold"
                variants={itemVariants}
                initial={{ opacity: 1 }}
              >
                Our Transparency Report has landed!
              </motion.h3>

              <motion.p
                className="text-sm sm:text-base text-green-50"
                variants={itemVariants}
                initial={{ opacity: 1 }}
              >
                Find out which actions we've taken to protect you and promote
                trust on our platform this year.
              </motion.p>

              <motion.div
                variants={itemVariants}
                initial={{ opacity: 1 }}
                whileInView={{
                  x: [-30, 0],
                  opacity: [0, 1],
                  transition: { delay: 0.7, duration: 0.6 },
                }}
                viewport={{ once: false, amount: 0.6 }}
              >
                <motion.div whileHover={hoverScale} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="rounded-full border-white text-white bg-transparent hover:bg-green-700 hover:border-green-700 mt-2 sm:mt-4"
                  >
                    Take a look
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right column with number boxes */}
            <div className="flex-[1] flex justify-center sm:justify-end items-center sm:items-end mt-4 sm:mt-0">
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {[
                  { bg: 'bg-emerald-400', num: '2' },
                  { bg: 'bg-orange-300', num: '0' },
                  { bg: 'bg-pink-400', num: '2' },
                  { bg: 'bg-yellow-300', num: '5' },
                ].map((box, i) => (
                  <motion.div
                    key={i}
                    className={`${box.bg} w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-md`}
                    variants={numberBoxVariants}
                    initial={{ opacity: 1, scale: 1 }}
                    animate="visible"
                    custom={i}
                    whileInView={{
                      y: [50, 0],
                      opacity: [0, 1],
                      transition: { delay: 0.8 + i * 0.1, duration: 0.5 },
                    }}
                    viewport={{ once: false, amount: 0.6 }}
                    whileHover={{
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    {box.num}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
