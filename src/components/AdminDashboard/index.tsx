"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { BiCategory } from "react-icons/bi";
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
  FaChevronUp,
  FaTrophy,
} from "react-icons/fa";
import { AdminDashboardProps, CompanyDetailsProps } from "@/types/company";
import { IReview } from "@/app/(WithDashboardLayout)/dashboard/admin/manageReviews/page";
import { cookies } from "next/headers";
import { allCategory, createCategory } from "@/services/category";
import { toast } from "sonner";

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminData,
  isLoading = false,
  premiumReviews,
}) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("overview");
  // State for product sorting
  const [productSortField, setProductSortField] = useState("createdAt");
  const [productSortDirection, setProductSortDirection] = useState("desc");
  // State for review sorting
  const [reviewSortField, setReviewSortField] = useState("createdAt");
  const [reviewSortDirection, setReviewSortDirection] = useState("desc");
  // State for search
  const [searchTerm, setSearchTerm] = useState("");
  // State for rating filter
  const [ratingFilter, setRatingFilter] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await allCategory();
      if (res?.success) {
        setCategories(res.data);
      } else {
        alert(res?.message || "Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  const toggleModal = () => setIsOpen(!isOpen);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image) return alert("Name and image are required");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("data", JSON.stringify({ name: name }));

    try {
      const res = await createCategory(formData);
      if (res?.success) {
        toast.success("Category created successfully");
        setName("");
        setImage(null);
        toggleModal();
      } else {
        toast.error(res?.message || "Failed to create category");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the category");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500 mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Loading Details
        </h2>
        <p className="text-gray-600 text-center">
          Please wait while we fetch the information...
        </p>
      </div>
    );
  }

  // If data is not available or loading failed
  if (!adminData?.success || !adminData?.data) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
        <FaBuilding className="text-gray-400 text-5xl mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Loading Admin Details
        </h2>
        {/*<p className="text-gray-600 text-center max-w-md mb-6">*/}
        {/*    {companyData?.message || "The company information you're looking for is not available."}*/}
        {/*</p>*/}
      </div>
    );
  }

  // Extract company data
  const admin = adminData.data;

  console.log(premiumReviews);

  const reviews = premiumReviews;

  console.log(reviews);

  const totalReviews = reviews.length;
  const totalUpvotes = reviews.reduce(
    (sum: number, review: IReview) => sum + review.upVotes,
    0
  );
  const totalDownvotes = reviews.reduce(
    (sum: number, review: IReview) => sum + review.downVotes,
    0
  );
  const totalVotes = totalUpvotes + totalDownvotes;

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (sum: number, review: { rating: number }) => sum + review.rating,
          0
        ) / reviews.length
      : 0;

  // Calculate rating distribution
  const ratingDistribution = [0, 0, 0, 0, 0]; // 1-5 stars
  reviews.forEach((review: { rating: number }) => {
    const ratingIndex = Math.floor(review.rating) - 1;
    if (ratingIndex >= 0 && ratingIndex < 5) {
      ratingDistribution[ratingIndex]++;
    }
  });

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(
      (review: any) =>
        (ratingFilter === 0 || review.rating === ratingFilter) &&
        (review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.reviewerName.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a: any, b: any) => {
      if (reviewSortField === "rating") {
        return reviewSortDirection === "asc"
          ? a.rating - b.rating
          : b.rating - a.rating;
      } else if (reviewSortField === "upVotes") {
        return reviewSortDirection === "asc"
          ? a.upVotes - b.upVotes
          : b.upVotes - a.upVotes;
      } else {
        // Default sort by createdAt
        return reviewSortDirection === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  // Helper functions
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStarRating = (rating: any) => {
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
  const toggleProductSort = (field: any) => {
    if (productSortField === field) {
      setProductSortDirection(productSortDirection === "asc" ? "desc" : "asc");
    } else {
      setProductSortField(field);
      setProductSortDirection("asc");
    }
  };

  const toggleReviewSort = (field: any) => {
    if (reviewSortField === field) {
      setReviewSortDirection(reviewSortDirection === "asc" ? "desc" : "asc");
    } else {
      setReviewSortField(field);
      setReviewSortDirection("asc");
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500 mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Loading Company Details
        </h2>
        <p className="text-gray-600 text-center">
          Please wait while we fetch the company information...
        </p>
      </div>
    );
  }

  const totalPremiumUsers = reviews.filter(
    (review: any) => review.isPremium
  ).length;

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Company Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                {adminData.data.admin.profileImage ? (
                  <Image
                    src={adminData.data.admin.profileImage}
                    alt={adminData.data.admin.profileImage}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <FaBuilding className="text-gray-400 text-2xl" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {adminData.data.admin.email}
                </h1>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <FaCalendarAlt className="mr-1" />
                  <span>
                    Joined {formatDate(adminData.data.admin.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Link
                href="/dashboard/admin/settings"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md flex items-center transition-colors duration-200"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </Link>
              <>
                <button
                  onClick={toggleModal}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md flex items-center gap-2 transition-colors duration-200"
                >
                  <FaPlus />
                  Create Category
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <>
                      {/* Backdrop */}
                      <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0  bg-opacity-40 z-40"
                        onClick={toggleModal}
                      />

                      {/* Modal */}
                      <motion.div
                        key="modal"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50 flex items-center justify-center"
                      >
                        <div className="bg-white rounded-md p-6 w-full max-w-md relative z-50 shadow-xl">
                          <button
                            onClick={toggleModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                          >
                            ×
                          </button>

                          <h2 className="text-xl font-semibold mb-4">
                            Create New Category
                          </h2>

                          <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4"
                          >
                            <input
                              type="text"
                              placeholder="Category Name"
                              className="border p-2 rounded-md"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />

                            <input
                              type="file"
                              accept="image/*"
                              className="border p-2 rounded-md"
                              onChange={(e) => {
                                if (e.target.files) setImage(e.target.files[0]);
                              }}
                              required
                            />

                            <button
                              type="submit"
                              className="bg-yellow-400 text-white py-2 rounded-md hover:bg-yellow-500 ease-linear duration-300 transition"
                            >
                              {isLoading ? "Creating..." : "Create Category"}
                            </button>
                          </form>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </>
            </div>
          </div>

          {/* Company Description */}
          {adminData.data.admin.bio && (
            <div className="mt-4 text-gray-600 max-w-4xl">
              <p>{adminData.data.admin.bio}</p>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="mt-8 border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-4 px-1 font-medium text-sm ${
                  activeTab === "overview"
                    ? "text-amber-600 border-b-2 border-amber-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Overview
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 px-1 font-medium text-sm ${
                  activeTab === "reviews"
                    ? "text-amber-600 border-b-2 border-amber-500"
                    : "text-gray-500 hover:text-gray-700"
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
        {activeTab === "overview" && (
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                variants={cardVariants}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Premium Users
                    </p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">
                      {totalPremiumUsers}
                    </h3>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FaTrophy className="text-yellow-600 text-xl" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={cardVariants}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Reviews
                    </p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">
                      {totalReviews}
                    </h3>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaStar className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    {renderStarRating(averageRating)}
                    <span className="ml-2">
                      {averageRating.toFixed(1)} average rating
                    </span>
                  </span>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Votes
                    </p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">
                      {totalUpvotes + totalDownvotes}
                    </h3>
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
                    <p className="text-sm font-medium text-gray-500">
                      Total Categories
                    </p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">
                      {categories.length}
                    </h3>
                  </div>{" "}
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <BiCategory className="text-green-600 text-xl" />
                  </div>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Rating Distribution
                </h3>
                {totalReviews > 0 ? (
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = ratingDistribution[rating - 1];
                      const percentage = Math.round(
                        (count / totalReviews) * 100
                      );

                      return (
                        <div key={rating} className="flex items-center">
                          <div className="w-12 flex items-center">
                            <span className="text-sm font-medium">
                              {rating}
                            </span>
                            <FaStar className="text-amber-400 ml-1" />
                          </div>
                          <div className="flex-1 h-4 mx-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="w-12 text-right">
                            <span className="text-sm text-gray-500">
                              {count} ({percentage}%)
                            </span>
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
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent Reviews
                  </h3>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className="text-sm text-amber-600 hover:text-amber-800 flex items-center"
                  >
                    View All
                    <FaArrowRight className="ml-1 text-xs" />
                  </button>
                </div>

                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.slice(0, 3).map((review: any) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                      >
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
                              <h4 className="font-medium text-gray-900">
                                {review.title}
                              </h4>
                              <div className="flex items-center mt-1">
                                <div className="flex text-amber-400 text-sm">
                                  {[...Array(5)].map((_, i) => (
                                    <span key={i}>
                                      {i < review.rating ? (
                                        <FaStar />
                                      ) : (
                                        <FaRegStar />
                                      )}
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
                            {/* <FaComment className="text-gray-400 mr-1" />
                            <span>{review?.ReviewComment.length}</span> */}
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
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
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
            </div>
          </motion.div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
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
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Review
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => toggleReviewSort("rating")}
                          >
                            <div className="flex items-center">
                              Rating
                              {reviewSortField === "rating" &&
                                (reviewSortDirection === "asc" ? (
                                  <FaChevronUp className="ml-1" />
                                ) : (
                                  <FaChevronDown className="ml-1" />
                                ))}
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => toggleReviewSort("createdAt")}
                          >
                            <div className="flex items-center">
                              Date
                              {reviewSortField === "createdAt" &&
                                (reviewSortDirection === "asc" ? (
                                  <FaChevronUp className="ml-1" />
                                ) : (
                                  <FaChevronDown className="ml-1" />
                                ))}
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => toggleReviewSort("upVotes")}
                          >
                            <div className="flex items-center">
                              Votes
                              {reviewSortField === "upVotes" &&
                                (reviewSortDirection === "asc" ? (
                                  <FaChevronUp className="ml-1" />
                                ) : (
                                  <FaChevronDown className="ml-1" />
                                ))}
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Product
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredReviews.map((review: any) => (
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
                                  <div className="font-medium text-gray-900">
                                    {review.title}
                                  </div>
                                  <div className="text-sm text-gray-500 line-clamp-2">
                                    {review.description}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    by {review.reviewerName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i}>
                                    {i < review.rating ? (
                                      <FaStar />
                                    ) : (
                                      <FaRegStar />
                                    )}
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
                              <div className="text-sm text-gray-500">
                                {formatDate(review.createdAt)}
                              </div>
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
                              <div className="text-xs text-gray-500 mt-1">
                                {review.categoryName}
                              </div>
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Reviews Yet
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Your products haven&apos;t received any reviews yet. Reviews
                    will appear here once customers start sharing their
                    feedback.
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

export default AdminDashboard;
