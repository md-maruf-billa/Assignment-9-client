"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    FaBuilding,
    FaGlobe,
    FaProductHunt,
    FaStar,
    FaRegStar,
    FaStarHalfAlt,
    FaUser,
    FaThumbsUp,
    FaThumbsDown,
    FaComment,
    FaCalendarAlt,
    FaEdit,
    FaPlus,
    FaEye,
    FaArrowRight,
    FaExternalLinkAlt,
    FaSearch,
    FaFilter,
    FaChevronDown,
    FaChevronUp
} from 'react-icons/fa';
import {CompanyDetailsProps} from "@/types/company";

const CompanyDashboard: React.FC<CompanyDetailsProps>  = ({ companyData, isLoading = false }) => {

    // State for active tab
    const [activeTab, setActiveTab] = useState('overview');
    // State for product sorting
    const [productSortField, setProductSortField] = useState('createdAt');
    const [productSortDirection, setProductSortDirection] = useState('desc');
    // State for review sorting
    const [reviewSortField, setReviewSortField] = useState('createdAt');
    const [reviewSortDirection, setReviewSortDirection] = useState('desc');
    // State for search
    const [searchTerm, setSearchTerm] = useState('');
    // State for rating filter
    const [ratingFilter, setRatingFilter] = useState(0);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500 mb-4"></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Company Details</h2>
                <p className="text-gray-600 text-center">Please wait while we fetch the company information...</p>
            </div>
        );
    }

    // If data is not available or loading failed
    if (!companyData?.success || !companyData?.data) {
        return (
            <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
                <FaBuilding className="text-gray-400 text-5xl mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Company Details</h2>
                {/*<p className="text-gray-600 text-center max-w-md mb-6">*/}
                {/*    {companyData?.message || "The company information you're looking for is not available."}*/}
                {/*</p>*/}
            </div>
        );
    }





    // Extract company data
    const company = companyData.data;
    const products = company.products;
    const reviews = company.reviews;

    // Calculate statistics
    const totalProducts = products.length;
    const totalReviews = reviews.length;
    const totalUpvotes = reviews.reduce((sum:number, review:{upVotes:number}) => sum + review.upVotes, 0);
    const totalDownvotes = reviews.reduce((sum:number, review:{downVotes:number}) => sum + review.downVotes, 0);
    const totalComments = reviews.reduce((sum:number, review:{ReviewComment:[]}) => sum + review.ReviewComment.length, 0);

    // Calculate average rating
    const averageRating = reviews.length > 0
        ? reviews.reduce((sum:number, review:{rating:number}) => sum + review.rating, 0) / reviews.length
        : 0;

    // Calculate rating distribution
    const ratingDistribution = [0, 0, 0, 0, 0]; // 1-5 stars
    reviews.forEach((review:{rating:number}) => {
        const ratingIndex = Math.floor(review.rating) - 1;
        if (ratingIndex >= 0 && ratingIndex < 5) {
            ratingDistribution[ratingIndex]++;
        }
    });

    // Filter and sort products
    const filteredProducts = products
        .filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (productSortField === 'name') {
                return productSortDirection === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else if (productSortField === 'price') {
                return productSortDirection === 'asc'
                    ? a.price - b.price
                    : b.price - a.price;
            } else {
                // Default sort by createdAt
                return productSortDirection === 'asc'
                    ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });

    // Filter and sort reviews
    const filteredReviews = reviews
        .filter((review:any) =>
            (ratingFilter === 0 || review.rating === ratingFilter) &&
            (review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                review.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                review.reviewerName.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a:any, b:any) => {
            if (reviewSortField === 'rating') {
                return reviewSortDirection === 'asc'
                    ? a.rating - b.rating
                    : b.rating - a.rating;
            } else if (reviewSortField === 'upVotes') {
                return reviewSortDirection === 'asc'
                    ? a.upVotes - b.upVotes
                    : b.upVotes - a.upVotes;
            } else {
                // Default sort by createdAt
                return reviewSortDirection === 'asc'
                    ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });

    // Helper functions
    const formatDate = (dateString:any) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const renderStarRating = (rating:any) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className="text-amber-400" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} className="text-amber-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-amber-400" />);
            }
        }

        return <div className="flex">{stars}</div>;
    };

    // Toggle sort direction
    const toggleProductSort = (field:any) => {
        if (productSortField === field) {
            setProductSortDirection(productSortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setProductSortField(field);
            setProductSortDirection('asc');
        }
    };

    const toggleReviewSort = (field:any) => {
        if (reviewSortField === field) {
            setReviewSortDirection(reviewSortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setReviewSortField(field);
            setReviewSortDirection('asc');
        }
    };

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500 mb-4"></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Company Details</h2>
                <p className="text-gray-600 text-center">Please wait while we fetch the company information...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#FAF8F5] min-h-screen">
            {/* Company Header */}
            <div className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                                {company.companyImage ? (
                                    <Image
                                        src={company.companyImage}
                                        alt={company.name}
                                        width={64}
                                        height={64}
                                        className="rounded-full object-cover"
                                    />
                                ) : (
                                    <FaBuilding className="text-gray-400 text-2xl" />
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
                                <div className="flex items-center text-gray-500 text-sm mt-1">
                                    <FaCalendarAlt className="mr-1" />
                                    <span>Joined {formatDate(company.createdAt)}</span>
                                    {company.website && (
                                        <>
                                            <span className="mx-2">•</span>
                                            <FaGlobe className="mr-1" />
                                            <a
                                                href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-amber-600 hover:underline"
                                            >
                                                {company.website}
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <Link
                                href="/dashboard/company/settings"
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md flex items-center transition-colors duration-200"
                            >
                                <FaEdit className="mr-2" />
                                Edit Profile
                            </Link>
                            <Link
                                href="/dashboard/company/manageProducts"
                                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md flex items-center transition-colors duration-200"
                            >
                                <FaPlus className="mr-2" />
                                Add Product
                            </Link>
                        </div>
                    </div>

                    {/* Company Description */}
                    {company.description && (
                        <div className="mt-4 text-gray-600 max-w-4xl">
                            <p>{company.description}</p>
                        </div>
                    )}

                    {/* Navigation Tabs */}
                    <div className="mt-8 border-b border-gray-200">
                        <nav className="flex space-x-8">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`pb-4 px-1 font-medium text-sm ${
                                    activeTab === 'overview'
                                        ? 'text-amber-600 border-b-2 border-amber-500'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('products')}
                                className={`pb-4 px-1 font-medium text-sm ${
                                    activeTab === 'products'
                                        ? 'text-amber-600 border-b-2 border-amber-500'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Products ({totalProducts})
                            </button>
                            <button
                                onClick={() => setActiveTab('reviews')}
                                className={`pb-4 px-1 font-medium text-sm ${
                                    activeTab === 'reviews'
                                        ? 'text-amber-600 border-b-2 border-amber-500'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Reviews ({totalReviews})
                            </button>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <motion.div
                                variants={cardVariants}
                                className="bg-white p-6 rounded-lg shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Total Products</p>
                                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{totalProducts}</h3>
                                    </div>
                                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                                        <FaProductHunt className="text-amber-600 text-xl" />
                                    </div>
                                </div>
                                <div className="mt-4 text-sm text-gray-500">
                                    <Link href="/dashboard/company/manageProducts" className="text-amber-600 hover:underline flex items-center">
                                        Manage Products
                                        <FaArrowRight className="ml-1 text-xs" />
                                    </Link>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={cardVariants}
                                className="bg-white p-6 rounded-lg shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Total Reviews</p>
                                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{totalReviews}</h3>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <FaStar className="text-blue-600 text-xl" />
                                    </div>
                                </div>
                                <div className="mt-4 text-sm text-gray-500">
                                    <span className="flex items-center">
                                        {renderStarRating(averageRating)}
                                        <span className="ml-2">{averageRating.toFixed(1)} average rating</span>
                                    </span>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={cardVariants}
                                className="bg-white p-6 rounded-lg shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Total Votes</p>
                                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{totalUpvotes + totalDownvotes}</h3>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <FaThumbsUp className="text-green-600 text-xl" />
                                    </div>
                                </div>
                                <div className="mt-4 text-sm text-gray-500 flex items-center">
                                    <div className="flex items-center mr-4">
                                        <FaThumbsUp className="text-green-500 mr-1" />
                                        <span>{totalUpvotes} upvotes</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaThumbsDown className="text-red-500 mr-1" />
                                        <span>{totalDownvotes} downvotes</span>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={cardVariants}
                                className="bg-white p-6 rounded-lg shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Total Comments</p>
                                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{totalComments}</h3>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <FaComment className="text-purple-600 text-xl" />
                                    </div>
                                </div>
                                <div className="mt-4 text-sm text-gray-500">
                                    <span>
                                        {totalComments > 0
                                            ? `${(totalComments / totalReviews).toFixed(1)} comments per review`
                                            : 'No comments yet'}
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Charts and Recent Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Rating Distribution */}
                            <motion.div
                                variants={cardVariants}
                                className="bg-white p-6 rounded-lg shadow-sm lg:col-span-1"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
                                {totalReviews > 0 ? (
                                    <div className="space-y-3">
                                        {[5, 4, 3, 2, 1].map((rating) => {
                                            const count = ratingDistribution[rating - 1];
                                            const percentage = Math.round((count / totalReviews) * 100);

                                            return (
                                                <div key={rating} className="flex items-center">
                                                    <div className="w-12 flex items-center">
                                                        <span className="text-sm font-medium">{rating}</span>
                                                        <FaStar className="text-amber-400 ml-1" />
                                                    </div>
                                                    <div className="flex-1 h-4 mx-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-amber-400 rounded-full"
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="w-12 text-right">
                                                        <span className="text-sm text-gray-500">{count} ({percentage}%)</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        No reviews yet
                                    </div>
                                )}
                            </motion.div>

                            {/* Recent Reviews */}
                            <motion.div
                                variants={cardVariants}
                                className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Recent Reviews</h3>
                                    <button
                                        onClick={() => setActiveTab('reviews')}
                                        className="text-sm text-amber-600 hover:text-amber-800 flex items-center"
                                    >
                                        View All
                                        <FaArrowRight className="ml-1 text-xs" />
                                    </button>
                                </div>

                                {reviews.length > 0 ? (
                                    <div className="space-y-4">
                                        {reviews.slice(0, 3).map((review:any) => (
                                            <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-start">
                                                        <div className="mr-3">
                                                            {review.reviewerProfilePhoto ? (
                                                                <Image
                                                                    src={review.reviewerProfilePhoto}
                                                                    alt={review.reviewerName}
                                                                    width={40}
                                                                    height={40}
                                                                    className="rounded-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                                    <FaUser className="text-gray-500 text-sm" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium text-gray-900">{review.title}</h4>
                                                            <div className="flex items-center mt-1">
                                                                <div className="flex text-amber-400 text-sm">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <span key={i}>
                                                                            {i < review.rating ? <FaStar /> : <FaRegStar />}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                                <span className="ml-2 text-xs text-gray-500">
                                                                    by {review.reviewerName}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                                {review.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {formatDate(review.createdAt)}
                                                    </div>
                                                </div>
                                                <div className="flex items-center mt-2 text-sm text-gray-500">
                                                    <div className="flex items-center mr-4">
                                                        <FaThumbsUp className="text-gray-400 mr-1" />
                                                        <span>{review.upVotes}</span>
                                                    </div>
                                                    <div className="flex items-center mr-4">
                                                        <FaThumbsDown className="text-gray-400 mr-1" />
                                                        <span>{review.downVotes}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <FaComment className="text-gray-400 mr-1" />
                                                        <span>{review.ReviewComment.length}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        No reviews yet
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* Recent Products */}
                        <motion.div
                            variants={cardVariants}
                            className="bg-white p-6 rounded-lg shadow-sm mt-6"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Products</h3>
                                <button
                                    onClick={() => setActiveTab('products')}
                                    className="text-sm text-amber-600 hover:text-amber-800 flex items-center"
                                >
                                    View All
                                    <FaArrowRight className="ml-1 text-xs" />
                                </button>
                            </div>

                            {products.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.slice(0, 3).map((product) => (
                                        <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                                            <div className="h-48 bg-gray-100 relative">
                                                {product.imageUrl ? (
                                                    <Image
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-gray-400">
                                                        <FaProductHunt size={40} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
                                                <p className="text-amber-600 font-bold mb-2">${product.price.toFixed(2)}</p>
                                                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-500">Added {formatDate(product.createdAt)}</span>
                                                    <Link
                                                        href={`/products/${product.id}`}
                                                        className="text-sm text-amber-600 hover:text-amber-800 flex items-center"
                                                    >
                                                        <FaEye className="mr-1" />
                                                        View
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    No products yet. Add your first product to get started.
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 md:mb-0">
                                    Products ({totalProducts})
                                </h2>
                                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search products..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                                        />
                                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                    <Link
                                        href="/dashboard/company/manageProducts"
                                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md flex items-center justify-center transition-colors duration-200"
                                    >
                                        <FaPlus className="mr-2" />
                                        Add Product
                                    </Link>
                                </div>
                            </div>

                            {products.length > 0 ? (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Product
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                    onClick={() => toggleProductSort('price')}
                                                >
                                                    <div className="flex items-center">
                                                        Price
                                                        {productSortField === 'price' && (
                                                            productSortDirection === 'asc'
                                                                ? <FaChevronUp className="ml-1" />
                                                                : <FaChevronDown className="ml-1" />
                                                        )}
                                                    </div>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                    onClick={() => toggleProductSort('createdAt')}
                                                >
                                                    <div className="flex items-center">
                                                        Date Added
                                                        {productSortField === 'createdAt' && (
                                                            productSortDirection === 'asc'
                                                                ? <FaChevronUp className="ml-1" />
                                                                : <FaChevronDown className="ml-1" />
                                                        )}
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Reviews
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredProducts.map((product) => {
                                                const productReviews = reviews.filter((review:any) => review.productId === product.id);
                                                const productAvgRating = productReviews.length > 0
                                                    ? productReviews.reduce((sum:number, review:{rating:number}) => sum + review.rating, 0) / productReviews.length
                                                    : 0;

                                                return (
                                                    <tr key={product.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="h-10 w-10 flex-shrink-0 mr-3">
                                                                    {product.imageUrl ? (
                                                                        <Image
                                                                            src={product.imageUrl}
                                                                            alt={product.name}
                                                                            width={40}
                                                                            height={40}
                                                                            className="rounded object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                                                                            <FaProductHunt className="text-gray-400" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium text-gray-900">{product.name}</div>
                                                                    <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-amber-600">${product.price.toFixed(2)}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-500">{formatDate(product.createdAt)}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex text-amber-400 text-sm mr-2">
                                                                    {productReviews.length > 0 ? renderStarRating(productAvgRating) : <span className="text-gray-400">No reviews</span>}
                                                                </div>
                                                                <span className="text-sm text-gray-500">
                                                                        {productReviews.length > 0 && `(${productReviews.length})`}
                                                                    </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="flex justify-end space-x-2">
                                                                <Link
                                                                    href={`/products/${product.id}`}
                                                                    className="text-gray-600 hover:text-gray-900"
                                                                    title="View Product"
                                                                >
                                                                    <FaEye />
                                                                </Link>
                                                                <Link
                                                                    href={`/dashboard/company/manageProducts/${product.id}`}
                                                                    className="text-amber-600 hover:text-amber-800"
                                                                    title="Edit Product"
                                                                >
                                                                    <FaEdit />
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                    </div>

                                    {filteredProducts.length === 0 && (
                                        <div className="text-center py-8 text-gray-500">
                                            No products match your search criteria.
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-12 bg-gray-50 rounded-lg">
                                    <FaProductHunt className="mx-auto text-gray-400 text-4xl mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Yet</h3>
                                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                                        You haven't added any products yet. Add your first product to start collecting reviews.
                                    </p>
                                    <Link
                                        href="/dashboard/company/manageProducts"
                                        className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
                                    >
                                        <FaPlus className="mr-2" />
                                        Add Your First Product
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 md:mb-0">
                                    Reviews ({totalReviews})
                                </h2>
                                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search reviews..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                                        />
                                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                    <div className="relative">
                                        <select
                                            value={ratingFilter}
                                            onChange={(e) => setRatingFilter(Number(e.target.value))}
                                            className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200 appearance-none"
                                        >
                                            <option value={0}>All Ratings</option>
                                            <option value={5}>5 Stars</option>
                                            <option value={4}>4 Stars</option>
                                            <option value={3}>3 Stars</option>
                                            <option value={2}>2 Stars</option>
                                            <option value={1}>1 Star</option>
                                        </select>
                                        <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            {reviews.length > 0 ? (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Review
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                    onClick={() => toggleReviewSort('rating')}
                                                >
                                                    <div className="flex items-center">
                                                        Rating
                                                        {reviewSortField === 'rating' && (
                                                            reviewSortDirection === 'asc'
                                                                ? <FaChevronUp className="ml-1" />
                                                                : <FaChevronDown className="ml-1" />
                                                        )}
                                                    </div>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                    onClick={() => toggleReviewSort('createdAt')}
                                                >
                                                    <div className="flex items-center">
                                                        Date
                                                        {reviewSortField === 'createdAt' && (
                                                            reviewSortDirection === 'asc'
                                                                ? <FaChevronUp className="ml-1" />
                                                                : <FaChevronDown className="ml-1" />
                                                        )}
                                                    </div>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                    onClick={() => toggleReviewSort('upVotes')}
                                                >
                                                    <div className="flex items-center">
                                                        Votes
                                                        {reviewSortField === 'upVotes' && (
                                                            reviewSortDirection === 'asc'
                                                                ? <FaChevronUp className="ml-1" />
                                                                : <FaChevronDown className="ml-1" />
                                                        )}
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Product
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredReviews.map((review:any) => (
                                                <tr key={review.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-start">
                                                            <div className="mr-3">
                                                                {review.reviewerProfilePhoto ? (
                                                                    <Image
                                                                        src={review.reviewerProfilePhoto}
                                                                        alt={review.reviewerName}
                                                                        width={40}
                                                                        height={40}
                                                                        className="rounded-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                                        <FaUser className="text-gray-500 text-sm" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-900">{review.title}</div>
                                                                <div className="text-sm text-gray-500 line-clamp-2">{review.description}</div>
                                                                <div className="text-xs text-gray-500 mt-1">by {review.reviewerName}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex text-amber-400">
                                                            {[...Array(5)].map((_, i) => (
                                                                <span key={i}>
                                                                        {i < review.rating ? <FaStar /> : <FaRegStar />}
                                                                    </span>
                                                            ))}
                                                        </div>
                                                        {review.isPremium && (
                                                            <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full mt-1">
                                                                    Premium
                                                                </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{formatDate(review.createdAt)}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex items-center text-green-500">
                                                                <FaThumbsUp className="mr-1" />
                                                                <span>{review.upVotes}</span>
                                                            </div>
                                                            <div className="flex items-center text-red-500">
                                                                <FaThumbsDown className="mr-1" />
                                                                <span>{review.downVotes}</span>
                                                            </div>
                                                            <div className="flex items-center text-gray-500">
                                                                <FaComment className="mr-1" />
                                                                <span>{review.ReviewComment.length}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <Link
                                                            href={`/products/${review.productId}`}
                                                            className="text-amber-600 hover:text-amber-800 flex items-center"
                                                        >
                                                            {review.productName}
                                                            <FaExternalLinkAlt className="ml-1 text-xs" />
                                                        </Link>
                                                        <div className="text-xs text-gray-500 mt-1">{review.categoryName}</div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {filteredReviews.length === 0 && (
                                        <div className="text-center py-8 text-gray-500">
                                            No reviews match your search criteria.
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-12 bg-gray-50 rounded-lg">
                                    <FaStar className="mx-auto text-gray-400 text-4xl mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                                    <p className="text-gray-600 max-w-md mx-auto">
                                        Your products haven&apos;t received any reviews yet. Reviews will appear here once customers start sharing their feedback.
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CompanyDashboard;

