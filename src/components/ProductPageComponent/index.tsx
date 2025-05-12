"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import {
  BsBarChart,
  BsCodeSlash,
  BsCollection,
  BsGraphUp,
  BsPeople,
  BsReply,
} from "react-icons/bs";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const ProductPageComponent = () => {
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
        staggerChildren: 0.2,
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

  const serviceCards = [
    {
      title: "Review Management Platform",
      description:
        "Our review management platform helps businesses collect, monitor, and respond to customer reviews across multiple platforms in one centralized dashboard.",
      features: [
        "Multi-platform integration",
        "Real-time notifications",
        "Analytics dashboard",
      ],
      icon: <BsCollection className="w-8 h-8" />,
    },
    {
      title: "Reputation Management",
      description:
        "Our reputation management service helps businesses build and maintain a positive online presence through strategic review solicitation and response.",
      features: [
        "Review generation",
        "Crisis management",
        "Competitor analysis",
      ],
      icon: <BsGraphUp className="w-8 h-8" />,
    },
    {
      title: "Review Marketing",
      description:
        "Our review marketing service helps businesses leverage positive reviews to attract new customers and build trust with potential clients.",
      features: [
        "Social proof widgets",
        "Review showcasing",
        "Testimonial campaigns",
      ],
      icon: <BsReply className="w-8 h-8" />,
    },
  ];

  const specializedServices = [
    {
      title: "Review Collection",
      description:
        "Our review collection service helps businesses gather authentic customer feedback through customized campaigns and automated follow-ups to increase review volume.",
      icon: <BsCollection />,
      color: "gray-900",
    },
    {
      title: "Review Analysis",
      description:
        "Our review analysis service uses advanced AI to extract actionable insights from your customer reviews, helping you identify trends and improvement opportunities.",
      icon: <BsGraphUp />,
      color: "gray-800",
    },
    {
      title: "Review Response",
      description:
        "Our review response service provides professional, timely responses to customer reviews, helping you maintain a positive brand image and customer relationship.",
      icon: <BsReply />,
      color: "gray-700",
    },
    {
      title: "Review Integration",
      description:
        "Our review integration service seamlessly incorporates reviews into your website and marketing materials to boost credibility and conversion rates.",
      icon: <BsCodeSlash />,
      color: "amber-400",
    },
    {
      title: "Review Training",
      description:
        "Our review training service equips your team with the skills and knowledge to effectively manage customer reviews and leverage them for business growth.",
      icon: <BsPeople />,
      color: "gray-900",
    },
    {
      title: "Review Reporting",
      description:
        "Our review reporting service delivers detailed, easy-to-understand reports on review performance across platforms, enabling data-driven decision-making.",
      icon: <BsBarChart />,
      color: "gray-600",
    },
  ];

  const testimonials = [
    {
      quote:
        "ReviewHub has completely transformed how we manage our customer reviews. The platform is intuitive, and the insights we've gained have been invaluable for our business growth.",
      author: "Sarah Johnson",
      position: "Marketing Director, TechSolutions Inc.",
    },
    {
      quote:
        "Since implementing ReviewHub, we've seen a 40% increase in positive reviews and a significant improvement in our online reputation. Their team is responsive and always helpful.",
      author: "Michael Chen",
      position: "Owner, Eastside Retail",
    },
  ];

  return (
    <div>
      {/* CTA Section with Animation */}
      <motion.div
        className="bg-gray-900 text-white py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <motion.h2
            className="text-3xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to transform your review management?
          </motion.h2>
          <motion.p
            className="text-lg mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of businesses that use ReviewHub to collect, manage,
            and leverage customer reviews to grow their business.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-md text-gray-900 bg-amber-400 hover:bg-amber-500 transition duration-300 shadow-lg"
              >
                Get Started
                <FaArrowRightLong className="ml-2" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-md text-white hover:bg-gray-800 transition duration-300"
              >
                Request Demo
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Testimonial Section with Animation */}
      <div className="bg-[#FAF8F5] py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover how ReviewHub has helped businesses improve their online
              reputation and customer engagement.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md relative overflow-hidden"
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-amber-100 rounded-full opacity-50"></div>
                <div className="flex items-center mb-6">
                  <div className="text-amber-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="mr-1" />
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <FaQuoteLeft className="text-gray-200 text-4xl absolute -top-2 -left-2" />
                  <p className="text-gray-700 mb-6 italic pl-6 relative z-10">
                    {testimonial.quote}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center text-gray-600 font-bold text-xl">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats Section with Counter Animation */}
      <motion.div
        className="bg-white py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="text-5xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              >
                10K+
              </motion.p>
              <p className="text-gray-600">Reviews Collected Daily</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.p
                className="text-5xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              >
                98%
              </motion.p>
              <p className="text-gray-600">Client Satisfaction</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.p
                className="text-5xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              >
                5000+
              </motion.p>
              <p className="text-gray-600">Businesses Served</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductPageComponent;
