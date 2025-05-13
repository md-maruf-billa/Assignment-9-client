"use client"

import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {FaArrowRightLong, FaBuilding, FaGlobe, FaProductHunt,} from 'react-icons/fa6';
import {FaSearch} from 'react-icons/fa';
import {motion} from 'framer-motion';
import {CompaniesProps} from "@/types/company";


const Companies: React.FC<CompaniesProps> = ({companiesData}) => {
    // Default placeholder image for companies without an image
    const defaultCompanyImage = "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop";

    // State for search and hover effects
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);

    console.log(companiesData);

    // Function to format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Animation variants
    const fadeIn = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.6}
        }
    };

    const staggerContainer = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.5}
        },
        hover: {
            scale: 1.03,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: {duration: 0.3}
        }
    };


    const filteredCompanies = companiesData?.success
        ? companiesData?.data?.filter(company => {
            // Always include company if there's no search query
            if (!searchQuery) return true;

            const nameMatch = company?.name?.toLowerCase().includes(searchQuery.toLowerCase());
            const descMatch = company?.description?.toLowerCase().includes(searchQuery.toLowerCase());

            return nameMatch || descMatch;
        })
        : [];


    return (
        <div className="bg-[#FAF8F5] py-12 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section with Animation */}
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-12"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <motion.div
                        initial={{scale: 0.8, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{duration: 0.5}}
                    >
                        <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-gray-900">
                            Partner Network
                        </p>
                    </motion.div>
                    <motion.h2
                        className="text-3xl font-bold text-gray-900 mb-4"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2, duration: 0.6}}
                    >
                        Our Partner Companies
                    </motion.h2>
                    <motion.p
                        className="text-lg text-gray-600"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.4, duration: 0.6}}
                    >
                        Discover our network of trusted companies that provide high-quality products and services with
                        verified reviews.
                    </motion.p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    className="max-w-xl mx-auto mb-12"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search companies..."
                            className="w-full px-4 py-3 pl-10 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                    </div>
                </motion.div>

                {/* Companies Grid with Animation */}
                {companiesData.success && filteredCompanies.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredCompanies.map((company) => (
                            <motion.div
                                key={company.id}
                                className="bg-white rounded-xl shadow-sm overflow-hidden"
                                variants={cardVariants}
                                whileHover="hover"
                                onHoverStart={() => setHoveredCompany(company.id)}
                                onHoverEnd={() => setHoveredCompany(null)}
                            >
                                {/* Company Image with Animation */}
                                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                                    <motion.div
                                        className="h-full w-full"
                                        animate={{
                                            scale: hoveredCompany === company.id ? 1.05 : 1
                                        }}
                                        transition={{duration: 0.5}}
                                    >
                                        <Image
                                            src={company.companyImage || defaultCompanyImage}
                                            alt={company.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-4 w-full">
                                        <h3 className="text-xl font-bold text-white">{company.name}</h3>
                                        {company.account.status === "ACTIVE" ? (
                                            <span
                                                className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                        Active
                      </span>
                                        ) : (
                                            <span
                                                className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                        Inactive
                      </span>
                                        )}
                                    </div>
                                </div>

                                {/* Company Details */}
                                <div className="p-6">
                                    <div className="flex items-center text-gray-500 mb-4">
                                        <FaBuilding className="mr-2"/>
                                        <span>Joined: {formatDate(company.createdAt)}</span>
                                    </div>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center text-gray-500">
                                            <FaProductHunt className="mr-2"/>
                                            <span>{company.products.length} Products</span>
                                        </div>

                                        {company.website && (
                                            <div className="flex items-center text-gray-500">
                                                <FaGlobe className="mr-2"/>
                                                <a
                                                    href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-amber-600 hover:text-amber-800 transition-colors duration-200"
                                                >
                                                    Visit Website
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-gray-600 mb-6 line-clamp-3">
                                        {company.description ||
                                            `${company.name} is one of our trusted partners providing quality products with verified customer reviews.`}
                                    </p>

                                    <div className="flex justify-between items-center">
                                        <motion.div
                                            whileHover={{x: 5}}
                                            transition={{type: "spring", stiffness: 400}}
                                        >
                                            <Link
                                                href={`/company/${company.id}`}
                                                className="inline-flex items-center font-semibold text-amber-600 hover:text-amber-800 transition-colors duration-200"
                                            >
                                                View Company
                                                <FaArrowRightLong className="ml-2"/>
                                            </Link>
                                        </motion.div>

                                        <span className="text-sm text-gray-500">
                      {company.products.length > 0
                          ? `Latest product: ${new Date(company.products[0].createdAt).toLocaleDateString()}`
                          : 'No products yet'}
                    </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        className="text-center py-16 bg-white rounded-lg shadow-sm"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.5}}
                    >
                        <FaBuilding className="mx-auto text-gray-400 text-5xl mb-4"/>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Companies Found</h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            {searchQuery
                                ? "No companies match your search criteria. Please try a different search term."
                                : companiesData.message || "There are currently no companies available. Please check back later."}
                        </p>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="mt-4 inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
                            >
                                Clear Search
                            </button>
                        )}
                    </motion.div>
                )}

                {/* Stats Section with Animation */}
                <motion.div
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.7}}
                >
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-sm text-center"
                        whileHover={{y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"}}
                        transition={{duration: 0.3}}
                    >
                        <motion.div
                            className="text-3xl font-bold text-amber-600 mb-2"
                            initial={{opacity: 0, scale: 0.5}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={{once: true}}
                            transition={{delay: 0.1, duration: 0.5}}
                        >
                            {companiesData.success ? companiesData.data.length : 0}
                        </motion.div>
                        <div className="text-gray-600">Partner Companies</div>
                    </motion.div>

                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-sm text-center"
                        whileHover={{y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"}}
                        transition={{duration: 0.3}}
                    >
                        <motion.div
                            className="text-3xl font-bold text-amber-600 mb-2"
                            initial={{opacity: 0, scale: 0.5}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={{once: true}}
                            transition={{delay: 0.2, duration: 0.5}}
                        >
                            {companiesData.success
                                ? companiesData.data.reduce((total, company) => total + company.products.length, 0)
                                : 0}
                        </motion.div>
                        <div className="text-gray-600">Total Products</div>
                    </motion.div>

                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-sm text-center"
                        whileHover={{y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"}}
                        transition={{duration: 0.3}}
                    >
                        <motion.div
                            className="text-3xl font-bold text-amber-600 mb-2"
                            initial={{opacity: 0, scale: 0.5}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={{once: true}}
                            transition={{delay: 0.3, duration: 0.5}}
                        >
                            {companiesData.success
                                ? companiesData.data.filter(company => company.account.status === "ACTIVE").length
                                : 0}
                        </motion.div>
                        <div className="text-gray-600">Active Companies</div>
                    </motion.div>
                </motion.div>

                {/* CTA Section with Animation */}
                <motion.div
                    className="mt-16 bg-gray-900 text-white p-8 rounded-xl text-center relative overflow-hidden"
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: true}}
                    transition={{duration: 0.8}}
                >
                    {/* Decorative elements */}
                    <motion.div
                        className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full opacity-10"
                        initial={{x: 100, y: -100}}
                        whileInView={{x: 50, y: -50}}
                        viewport={{once: true}}
                        transition={{duration: 1.2}}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500 rounded-full opacity-10"
                        initial={{x: -100, y: 100}}
                        whileInView={{x: -50, y: 50}}
                        viewport={{once: true}}
                        transition={{duration: 1.2}}
                    />

                    <div className="relative z-10">
                        <motion.h3
                            className="text-2xl font-bold mb-4"
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.5}}
                        >
                            Become a Partner Company
                        </motion.h3>
                        <motion.p
                            className="text-lg mb-6 max-w-2xl mx-auto"
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: 0.2, duration: 0.5}}
                        >
                            Join our network of trusted companies and showcase your products with verified customer
                            reviews.
                        </motion.p>
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: 0.4, duration: 0.5}}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
                            >
                                Register Your Company
                                <FaArrowRightLong className="ml-2"/>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Featured Company Section (if applicable) */}
                {companiesData.success && companiesData.data.length > 0 && (
                    <motion.div
                        className="mt-20 bg-white rounded-xl shadow-sm overflow-hidden"
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.7}}
                    >
                        <div className="p-6 text-center mb-4">
                            <h3 className="text-2xl font-bold text-gray-900">Featured Company</h3>
                            <p className="text-gray-600 mt-2">Spotlight on one of our outstanding partners</p>
                        </div>

                        {/* Get the company with the most products */}
                        {(() => {
                            if (!companiesData.success || companiesData.data.length === 0) return null;

                            const featuredCompany = [...companiesData.data].sort((a, b) =>
                                b.products.length - a.products.length
                            )[0];

                            return (
                                <div className="grid md:grid-cols-2 gap-6 p-6">
                                    <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
                                        <Image
                                            src={featuredCompany.companyImage || defaultCompanyImage}
                                            alt={featuredCompany.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="flex items-center mb-2">
                                            <h4 className="text-xl font-bold text-gray-900 mr-3">{featuredCompany.name}</h4>
                                            {featuredCompany.account.status === "ACTIVE" ? (
                                                <span
                                                    className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Active
                        </span>
                                            ) : (
                                                <span
                                                    className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Inactive
                        </span>
                                            )}
                                        </div>

                                        <p className="text-gray-600 mb-4">
                                            {featuredCompany.description ||
                                                `${featuredCompany.name} is one of our trusted partners providing quality products with verified customer reviews.`}
                                        </p>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <div
                                                    className="text-amber-600 font-bold text-lg">{featuredCompany.products.length}</div>
                                                <div className="text-gray-500 text-sm">Products</div>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <div className="text-amber-600 font-bold text-lg">
                                                    {formatDate(featuredCompany.createdAt).split(',')[0]}
                                                </div>
                                                <div className="text-gray-500 text-sm">Joined</div>
                                            </div>
                                        </div>

                                        <motion.div
                                            whileHover={{x: 5}}
                                            transition={{type: "spring", stiffness: 400}}
                                        >
                                            <Link
                                                href={`/company/${featuredCompany.id}`}
                                                className="inline-flex items-center font-semibold text-amber-600 hover:text-amber-800 transition-colors duration-200"
                                            >
                                                View Company Profile
                                                <FaArrowRightLong className="ml-2"/>
                                            </Link>
                                        </motion.div>
                                    </div>
                                </div>
                            );
                        })()}
                    </motion.div>
                )}

                {/* Industry Categories Section */}
                <motion.div
                    className="mt-20"
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: true}}
                    transition={{duration: 0.7}}
                >
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Browse by Industry</h3>
                        <p className="text-gray-600">Explore our partner companies by industry category</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Technology', 'Retail', 'Healthcare', 'Education', 'Finance', 'Food & Beverage', 'Entertainment', 'Travel'].map((industry, index) => (
                            <motion.div
                                key={industry}
                                className="bg-white p-5 rounded-lg shadow-sm text-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                                whileHover={{y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"}}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{delay: index * 0.1, duration: 0.5}}
                            >
                                <h4 className="font-semibold text-gray-900">{industry}</h4>
                                <p className="text-sm text-gray-500 mt-1">
                                    {Math.floor(Math.random() * 20) + 1} Companies
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Companies;
