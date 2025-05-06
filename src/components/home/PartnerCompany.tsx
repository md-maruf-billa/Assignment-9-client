'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';

const PartnerCompany = () => {
  return (
    <div className="relative z-10 text-center bg-black text-white rounded-2xl pt-16 pb-16 mb-16">
      <motion.h3
        className="text-2xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Become a Partner Company
      </motion.h3>
      <motion.p
        className="text-lg mb-6 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Join our network of trusted companies and showcase your products with
        verified customer reviews.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/register"
          className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
        >
          Register Your Company
          <FaArrowRightLong className="ml-2" />
        </Link>
      </motion.div>
    </div>
  );
};

export default PartnerCompany;
