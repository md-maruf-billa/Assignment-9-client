"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt, FaUser, FaTag, FaSearch } from "react-icons/fa";
import { FaArrowRightLong} from "react-icons/fa6";
import { motion } from "framer-motion";

const BlogsPage = () => {
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [hoveredBlog, setHoveredBlog] = useState<number | null>(null);

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

    const categories = [
        "all",
        "customer reviews",
        "reputation management",
        "marketing",
        "business growth",
        "case studies"
    ];

    const blogPosts = [
        {
            id: 1,
            title: "How to Respond to Negative Reviews: A Complete Guide",
            excerpt: "Learn effective strategies for responding to negative reviews and turning unhappy customers into loyal advocates for your business.",
            category: "customer reviews",
            author: "Sarah Johnson",
            date: "June 15, 2023",
            image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop",
            readTime: "8 min read"
        },
        {
            id: 2,
            title: "The Impact of Reviews on Purchase Decisions: Latest Research",
            excerpt: "Discover the latest research on how customer reviews influence purchase decisions and why they're more important than ever for your business.",
            category: "marketing",
            author: "Michael Chen",
            date: "July 3, 2023",
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
            readTime: "6 min read"
        },
        {
            id: 3,
            title: "Building Trust Online: The Role of Customer Reviews",
            excerpt: "Explore how customer reviews help build trust with potential customers and establish credibility for your brand in the digital marketplace.",
            category: "reputation management",
            author: "Emily Rodriguez",
            date: "July 22, 2023",
            image: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop",
            readTime: "5 min read"
        },
        {
            id: 4,
            title: "From 3 to 5 Stars: How ReviewHub Transformed Our Business",
            excerpt: "Read how a local restaurant used ReviewHub to improve their online reputation and increase customer satisfaction and revenue.",
            category: "case studies",
            author: "David Wilson",
            date: "August 10, 2023",
            image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
            readTime: "10 min read"
        },
        {
            id: 5,
            title: "The Psychology Behind Customer Reviews: Why They Matter",
            excerpt: "Delve into the psychological aspects of why customers trust reviews from strangers and how businesses can leverage this understanding.",
            category: "customer reviews",
            author: "Alex Thompson",
            date: "August 28, 2023",
            image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
            readTime: "7 min read"
        },
        {
            id: 6,
            title: "5 Strategies to Encourage More Customer Reviews",
            excerpt: "Learn practical strategies to encourage your satisfied customers to leave positive reviews for your business online.",
            category: "business growth",
            author: "Jessica Brown",
            date: "September 15, 2023",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
            readTime: "6 min read"
        },
        {
            id: 7,
            title: "How ReviewHub Helped a Tech Startup Increase Conversions by 45%",
            excerpt: "Discover how a tech startup leveraged ReviewHub's platform to showcase customer testimonials and dramatically increase their conversion rate.",
            category: "case studies",
            author: "Ryan Martinez",
            date: "October 5, 2023",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
            readTime: "9 min read"
        },
        {
            id: 8,
            title: "The Future of Online Reviews: Trends to Watch in 2024",
            excerpt: "Stay ahead of the curve with our analysis of emerging trends in online reviews and reputation management for the coming year.",
            category: "reputation management",
            author: "Olivia Parker",
            date: "November 12, 2023",
            image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop",
            readTime: "8 min read"
        },
        {
            id: 9,
            title: "Leveraging Reviews in Your Marketing Strategy",
            excerpt: "Learn how to effectively incorporate customer reviews and testimonials into your broader marketing strategy for maximum impact.",
            category: "marketing",
            author: "Daniel Lee",
            date: "December 3, 2023",
            image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=2070&auto=format&fit=crop",
            readTime: "7 min read"
        }
    ];

    const filteredBlogs = blogPosts.filter(blog => {
        // Filter by category
        const categoryMatch = activeCategory === "all" || blog.category === activeCategory;

        // Filter by search query
        const searchMatch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.category.toLowerCase().includes(searchQuery.toLowerCase());

        return categoryMatch && searchMatch;
    });

    return (
        <div className="bg-[#FAF8F5] min-h-screen overflow-hidden">
            {/* Hero Section */}
            <div className="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
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
                            ReviewHub Blog
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
                            <span className="relative">Insights</span>
                        </span>{" "}
                        and resources for review management
                    </motion.h1>
                    <motion.p
                        className="text-base text-gray-700 md:text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        Explore our collection of articles, guides, and case studies to help you leverage customer reviews
                        and build a stronger online reputation.
                    </motion.p>
                </motion.div>
            </div>

            {/* Search and Filter Section */}
            <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 mb-12">
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 rounded-lg shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Search Bar */}
                    <div className="relative w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full px-4 py-3 pl-10 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 w-full md:w-2/3">
                        {categories.map((category, index) => (
                            <motion.button
                                key={index}
                                className={`px-4 py-2 text-sm font-medium rounded-full capitalize transition-colors duration-200 ${
                                    activeCategory === category
                                        ? 'bg-amber-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                                onClick={() => setActiveCategory(category)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Blog Grid */}
            <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 pb-20">
                {filteredBlogs.length > 0 ? (
                    <motion.div
                        className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredBlogs.map((blog, index) => (
                            <motion.div
                                key={blog.id}
                                className="bg-white rounded-xl overflow-hidden shadow-sm"
                                variants={cardVariants}
                                whileHover="hover"
                                onHoverStart={() => setHoveredBlog(index)}
                                onHoverEnd={() => setHoveredBlog(null)}
                            >
                                <div className="relative h-64 w-full overflow-hidden">
                                    <motion.div
                                        className="h-full w-full"
                                        animate={{
                                            scale: hoveredBlog === index ? 1.05 : 1
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Image
                                            src={blog.image}
                                            alt={blog.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>
                                    <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full capitalize">
                                        {blog.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center text-gray-500 text-sm mb-3 gap-4">
                                        <div className="flex items-center">
                                            <FaCalendarAlt className="mr-1" />
                                            <span>{blog.date}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaUser className="mr-1" />
                                            <span>{blog.author}</span>
                                        </div>
                                        <div>{blog.readTime}</div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {blog.excerpt}
                                    </p>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <Link
                                            href={`/blogs/${blog.id}`}
                                            className="inline-flex items-center font-semibold text-amber-600 hover:text-amber-800 transition-colors duration-200"
                                        >
                                            Read More
                                            <FaArrowRightLong className="ml-2" />
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        className="text-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
                        <p className="text-gray-600 mb-6">
                            We couldn&apos;t find any articles matching your search criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setActiveCategory("all");
                            }}
                            className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Featured Article Section */}
            <motion.div
                className="bg-white py-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Article</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Our most popular and insightful content to help you master review management
                        </p>
                    </div>

                    <motion.div
                        className="grid md:grid-cols-2 gap-8 items-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop"
                                alt="The Ultimate Guide to Review Management in 2024"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <div className="flex items-center mb-4">
                                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full capitalize mr-3">
                                    Guide
                                </span>
                                <span className="text-gray-500 text-sm">January 15, 2024 • 15 min read</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                The Ultimate Guide to Review Management in 2024
                            </h3>
                            <p className="text-gray-600 mb-6">
                                A comprehensive guide covering everything from collecting reviews ethically, responding to both positive and negative feedback, leveraging reviews in your marketing, and using analytics to drive business improvements.
                            </p>
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-gray-600 font-bold">
                                    JD
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">James Davis</p>
                                    <p className="text-gray-600 text-sm">Chief Content Officer</p>
                                </div>
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    href="/blogs/featured"
                                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
                                >
                                    Read Full Guide
                                    <FaArrowRightLong className="ml-2" />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Newsletter Section */}
            <motion.div
                className="bg-amber-50 py-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <motion.div
                        className="bg-white p-8 md:p-12 rounded-xl shadow-sm relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-amber-100 rounded-full opacity-50"></div>
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-amber-100 rounded-full opacity-50"></div>

                        <div className="relative z-10 text-center md:text-left md:flex items-center justify-between">
                            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    Subscribe to our newsletter
                                </h3>
                                <p className="text-gray-600">
                                    Get the latest articles, resources, and tips on review management delivered straight to your inbox.
                                </p>
                            </div>
                            <div className="md:w-1/3">
                                <form className="flex flex-col sm:flex-row md:flex-col gap-3">
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                                        required
                                    />
                                    <motion.button
                                        type="submit"
                                        className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Subscribe
                                    </motion.button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Topics Section */}
            <motion.div
                className="bg-[#FAF8F5] py-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Topics</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Explore our most popular categories and discover valuable insights
                        </p>
                    </div>

                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {categories.filter(cat => cat !== "all").map((category, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                                variants={cardVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(category)}
                            >
                                <div className="mb-3 text-amber-500">
                                    <FaTag size={24} className="mx-auto" />
                                </div>
                                <h3 className="font-semibold text-gray-900 capitalize">{category}</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {filteredBlogs.filter(blog => blog.category === category).length} articles
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
                className="bg-gray-900 text-white py-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-extrabold mb-4">Ready to transform your review management?</h2>
                        <p className="text-lg mb-8 max-w-3xl mx-auto">
                            Join thousands of businesses that use ReviewHub to collect, manage, and leverage customer reviews to grow their business.
                        </p>
                        <motion.div
                            className="flex flex-col sm:flex-row justify-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/plans" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-md text-gray-900 bg-amber-400 hover:bg-amber-500 transition duration-300 shadow-lg">
                                    View Plans
                                    <FaArrowRightLong className="ml-2" />
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-md text-white hover:bg-gray-800 transition duration-300">
                                    Contact Us
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogsPage;

