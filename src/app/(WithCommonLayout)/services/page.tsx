"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { MdSecurity, MdSpeed, MdVerified } from "react-icons/md";
import { BsCollection, BsGraphUp, BsReply, BsCodeSlash, BsPeople, BsBarChart  } from "react-icons/bs";

const Page = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        },
        hover: {
            scale: 1.03,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: { duration: 0.3 }
        }
    };

    const serviceCards = [
        {
            title: "Review Management Platform",
            description: "Our review management platform helps businesses collect, monitor, and respond to customer reviews across multiple platforms in one centralized dashboard.",
            features: ["Multi-platform integration", "Real-time notifications", "Analytics dashboard"],
            icon: <BsCollection className="w-8 h-8" />
        },
        {
            title: "Reputation Management",
            description: "Our reputation management service helps businesses build and maintain a positive online presence through strategic review solicitation and response.",
            features: ["Review generation", "Crisis management", "Competitor analysis"],
            icon: <BsGraphUp className="w-8 h-8" />
        },
        {
            title: "Review Marketing",
            description: "Our review marketing service helps businesses leverage positive reviews to attract new customers and build trust with potential clients.",
            features: ["Social proof widgets", "Review showcasing", "Testimonial campaigns"],
            icon: <BsReply className="w-8 h-8" />
        }
    ];

    const specializedServices = [
        {
            title: "Review Collection",
            description: "Our review collection service helps businesses gather authentic customer feedback through customized campaigns and automated follow-ups to increase review volume.",
            icon: <BsCollection />,
            color: "gray-900"
        },
        {
            title: "Review Analysis",
            description: "Our review analysis service uses advanced AI to extract actionable insights from your customer reviews, helping you identify trends and improvement opportunities.",
            icon: <BsGraphUp />,
            color: "gray-800"
        },
        {
            title: "Review Response",
            description: "Our review response service provides professional, timely responses to customer reviews, helping you maintain a positive brand image and customer relationship.",
            icon: <BsReply />,
            color: "gray-700"
        },
        {
            title: "Review Integration",
            description: "Our review integration service seamlessly incorporates reviews into your website and marketing materials to boost credibility and conversion rates.",
            icon: <BsCodeSlash />,
            color: "amber-400"
        },
        {
            title: "Review Training",
            description: "Our review training service equips your team with the skills and knowledge to effectively manage customer reviews and leverage them for business growth.",
            icon: <BsPeople />,
            color: "gray-900"
        },
        {
            title: "Review Reporting",
            description: "Our review reporting service delivers detailed, easy-to-understand reports on review performance across platforms, enabling data-driven decision-making.",
            icon: <BsBarChart />,
            color: "gray-600"
        }

    ];

    const testimonials = [
        {
            quote: "ReviewHub has completely transformed how we manage our customer reviews. The platform is intuitive, and the insights we've gained have been invaluable for our business growth.",
            author: "Sarah Johnson",
            position: "Marketing Director, TechSolutions Inc."
        },
        {
            quote: "Since implementing ReviewHub, we've seen a 40% increase in positive reviews and a significant improvement in our online reputation. Their team is responsive and always helpful.",
            author: "Michael Chen",
            position: "Owner, Eastside Retail"
        }
    ];

    return (
        <div className="bg-[#FAF8F5] min-h-screen overflow-hidden">
            {/* Hero Section with Parallax Effect */}
            <div className="relative px-4 py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-28">
                <motion.div
                    className="absolute inset-0 -z-10 opacity-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ duration: 1.5 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-amber-100 transform -skew-y-6"></div>
                </motion.div>

                <motion.div
                    className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-gray-900">
                            ReviewHub Services
                        </p>
                    </motion.div>
                    <motion.h1
                        className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <span className="relative inline-block">
                            <svg viewBox="0 0 52 24" fill="currentColor"
                                 className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-amber-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
                                <defs>
                                    <pattern id="fdca20a0-aeb4-4caf-ba1b-4351eee42363" x="0" y="0" width=".135"
                                             height=".30">
                                        <circle cx="1" cy="1" r=".7"></circle>
                                    </pattern>
                                </defs>
                                <rect fill="url(#fdca20a0-aeb4-4caf-ba1b-4351eee42363)" width="52" height="24"></rect>
                            </svg>
                            <span className="relative">Trusted</span>
                        </span>{" "}
                        services to enhance your business reviews
                    </motion.h1>
                    <motion.p
                        className="text-base text-gray-700 md:text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        We provide comprehensive solutions to help businesses collect, manage, and leverage customer reviews
                        to build trust and improve their online presence.
                    </motion.p>
                </motion.div>

                {/* Service Cards with Animation */}
                <motion.div
                    className="grid max-w-md gap-8 row-gap-10 sm:mx-auto lg:max-w-full lg:grid-cols-3 mt-16"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {serviceCards.map((card, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col bg-white p-8 rounded-xl shadow-sm transition-all duration-300"
                            variants={cardVariants}
                            whileHover="hover"
                            onHoverStart={() => setHoveredCard(index)}
                            onHoverEnd={() => setHoveredCard(null)}
                        >
                            <div className="mb-6">
                                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-amber-50 text-amber-500">
                                    {card.icon}
                                </div>
                                <h2 className="mb-3 text-xl font-bold leading-5">{card.title}</h2>
                                <p className="mb-6 text-gray-700">
                                    {card.description}
                                </p>
                                <ul className="mb-6 space-y-3">
                                    {card.features.map((feature, i) => (
                                        <motion.li
                                            key={i}
                                            className="flex items-center"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{
                                                opacity: hoveredCard === index ? 1 : 0.8,
                                                x: 0,
                                                transition: { delay: i * 0.1 }
                                            }}
                                        >
                                            <motion.span
                                                className="mr-2 text-amber-500"
                                                animate={{
                                                    scale: hoveredCard === index ? [1, 1.2, 1] : 1,
                                                    transition: { duration: 0.3 }
                                                }}
                                            >
                                                <svg className="w-5 h-5" stroke="currentColor" viewBox="0 0 52 52">
                                                    <polygon strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
                                                             points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                                                </svg>
                                            </motion.span>
                                            <span className="text-gray-700">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <Link href="/"
                                          className="inline-flex items-center font-semibold transition-colors duration-200 text-amber-500 hover:text-amber-700"
                                    >
                                        Learn more
                                        <FaArrowRightLong className="ml-2" />
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Features Section with Counter Animation */}
            <motion.div
                className="container mx-auto max-w-5xl flex gap-12 flex-wrap items-start justify-center md:justify-between py-16 px-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
            >
                <motion.div
                    className="grid gap-4 justify-items-center text-center md:flex-1"
                    variants={fadeIn}
                >
                    <motion.div
                        className="rounded-full border-8 border-amber-400 p-4 text-gray-800"
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <MdSecurity className="w-14 h-14" />
                    </motion.div>
                    <h3 className="text-3xl font-bold">Secure</h3>
                    <p className="text-gray-700">Your data and reviews are protected with enterprise-grade security</p>
                </motion.div>

                <motion.div
                    className="grid gap-4 justify-items-center text-center md:flex-1"
                    variants={fadeIn}
                >
                    <motion.div
                        className="rounded-full border-8 border-amber-400 p-4 text-gray-800"
                        whileHover={{ rotate: -5, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <MdSpeed className="w-14 h-14" />
                    </motion.div>
                    <h3 className="text-3xl font-bold">Efficient</h3>
                    <p className="text-gray-700">Streamlined processes to save you time and resources</p>
                </motion.div>

                <motion.div
                    className="grid gap-4 justify-items-center text-center md:flex-1"
                    variants={fadeIn}
                >
                    <motion.div
                        className="rounded-full border-8 border-amber-400 p-4 text-gray-800"
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <MdVerified className="w-14 h-14" />
                    </motion.div>
                    <h3 className="text-3xl font-bold">Trusted</h3>
                    <p className="text-gray-700">Leading the review management industry for years</p>
                </motion.div>
            </motion.div>

            {/* Specialized Services Section with Staggered Animation */}
            <motion.div
                className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 py-16 "
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeIn}
            >
                <motion.h2
                    className="mb-1 text-3xl font-extrabold leading-tight text-gray-900"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Specialized Services
                </motion.h2>
                <motion.p
                    className="mb-12 text-lg text-gray-500"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Discover our specialized services designed to meet your specific needs.
                </motion.p>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {specializedServices.map((service, index) => (
                        <motion.div
                            key={index}
                            className="relative"
                            variants={cardVariants}
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <span className={`absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-${service.color} rounded-lg`}></span>
                            <div className="relative h-full p-6 bg-white border-2 border-gray-900 rounded-lg">
                                <div className="flex items-center mb-4">
                                    <div className="p-3 mr-3 text-white bg-gray-900 rounded-full">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800">{service.title}</h3>
                                </div>
                                <p className="mt-3 mb-1 text-xs font-medium text-amber-500 uppercase">------------</p>
                                <p className="mb-2 text-gray-600">{service.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

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
                        Join thousands of businesses that use ReviewHub to collect, manage, and leverage customer reviews to grow their business.
                    </motion.p>
                    <motion.div
                        className="flex flex-col sm:flex-row justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-md text-gray-900 bg-amber-400 hover:bg-amber-500 transition duration-300 shadow-lg">
                                Get Started
                                <FaArrowRightLong className="ml-2" />
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link href="/demo" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-md text-white hover:bg-gray-800 transition duration-300">
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Discover how ReviewHub has helped businesses improve their online reputation and customer engagement.
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
                                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
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
                                        <p className="font-semibold text-gray-900">{testimonial.author}</p>
                                        <p className="text-gray-600 text-sm">{testimonial.position}</p>
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

export default Page;
