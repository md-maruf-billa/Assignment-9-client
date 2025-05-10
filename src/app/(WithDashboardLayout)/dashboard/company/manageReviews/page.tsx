"use client";

import { useUser } from "@/context/UserContext";
import { getAllPremiumReview } from "@/services/AdminServices/PremiumServices";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaImage, FaSearch } from "react-icons/fa";

export interface IReview {
  id: string;
  title: string;
  description: string;
  rating: number;
  categoryId: string;
  productId: string;
  isPremium: boolean;
  reviewerName: string;
  reviewerEmail: string;
  reviewerProfilePhoto: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  accountId: string | null;
  category: { name: string };
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    companyId: string;
    categoryId: string;
  };
}

const ManageReviews = () => {
  const [premiumReviews, setPremiumReviews] = useState<IReview[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const { user } = useUser(); // ✅ use hook normally
  const companyId = user?.company?.id;
  console.log("USSER:", user?.company?.id);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await getAllPremiumReview();
      // ✅ Filter by company ID
      const filtered = res?.data?.filter(
        (review: IReview) => review.product.companyId === companyId
      );
      console.log("Filtered Reviews:", filtered);
      setPremiumReviews(filtered || []);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companyId) {
      fetchReviews();
    }
  }, [companyId]);  

  const filteredReviews = premiumReviews.filter((review) =>
    review.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="bg-gray-900 p-6">
          <h1 className="text-2xl font-bold text-white">Manage Reviews</h1>
          <p className="text-gray-300 mt-1">
            View or delete premium reviews submitted by users.
          </p>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews..."
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <button
              className="text-amber-600 hover:text-amber-800"
              onClick={() => {
                setSearchTerm("");
                setCurrentPage(1);
              }}
            >
              Clear all filters
            </button>
          </div>
        </div>

        {/* Review Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-16">Loading reviews...</div>
          ) : paginatedReviews.length > 0 ? (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Review
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence>
                    {paginatedReviews.map((review, index) => (
                      <motion.tr
                        key={review.id}
                        custom={index}
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {review.title}
                          </div>
                          <div className="text-sm text-gray-600">
                            {review.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-amber-600">
                          {review.product.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-amber-600">
                          {review.category.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(review.createdAt)}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-200">
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="space-x-2">
                  <button
                    className="px-3 py-1 text-sm rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="px-3 py-1 text-sm rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <FaImage className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No reviews found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? "Try adjusting your search or filter criteria."
                  : "There are currently no premium reviews."}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Help Section */}
      <motion.div
        className="mt-8 bg-white rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Managing User Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">Review Moderation</h3>
              <p className="text-sm text-blue-700">
                Approve or flag inappropriate content to maintain platform quality.
              </p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <h3 className="font-medium text-amber-800 mb-2">Responding to Feedback</h3>
              <p className="text-sm text-amber-700">
                Show users you value their feedback and are committed to improvement.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="font-medium text-green-800 mb-2">Highlighting Top Reviews</h3>
              <p className="text-sm text-green-700">
                Showcase helpful reviews on product pages to build trust.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageReviews;
